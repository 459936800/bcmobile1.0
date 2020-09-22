const path = require('path')
const fs = require('fs')
const co = require('co')
const thunkify = require('thunkify');
const archiver = require('archiver')
const cubeModulePath = resolve('./');
const buildPath = resolve('release/dist');
var statFile = thunkify(fs.stat);
var mkdirFile = thunkify(fs.mkdir);

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * 文件复制
 */
function transferCubeModule(sourceFile, destPath) {
  let cube = readCubeModule(sourceFile)
  // 测试环境打包，交换版本构建号
  if (process.env.VUE_APP_NODE_TYPE == 1) {
    let temp = {
      version: cube.version,
      build: cube.build
    }
    for (let p in temp) {
      cube[p] = cube['test' + p[0].toUpperCase() + p.slice(1)]
      cube['test' + p[0].toUpperCase() + p.slice(1)] = temp[p]
    }
  }
  fs.writeFileSync(destPath, JSON.stringify(cube, null, 2))
}


/**
 * 读取cube文件
 * @param {*} filePath
 */
function readCubeModule(filePath) {
  console.log(filePath)
  if (fs.existsSync(filePath)) {
    let fileContent = JSON.parse(fs.readFileSync(filePath))
    return fileContent
  } else {
    throw new Error('项目中不存在 ' + filePath)
  }
}


/**
 * 压缩目录到指定的zip
 */
function compress(inputPath, outPutPath) {
  let output = fs.createWriteStream(outPutPath)

  let archive = archiver('zip', {
    zlib: {
      level: 9
    } // Sets the compression level.
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', () => {
    console.log('compress done!\n')
    console.log(outPutPath, (archive.pointer() / 1024 / 1024).toFixed(2) + 'Mb')
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', () => {
    console.log('Data has been drained')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', err => {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory and naming it `new-subdir` within the archive
  archive.directory(inputPath, '')

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getZipName(type, info) {
  var d = new Date();
  var year = d.getFullYear();
  var month = checkTime(d.getMonth() + 1);
  var day = checkTime(d.getDate());
  var hour = checkTime(d.getHours());
  var minute = checkTime(d.getMinutes());
  var mode = type == 2 ? '-pro' : '-test';
  var ver = type == 2 ? info.version : info.testVersion;
  return info.name + '-' + ver + mode + '-' + year + month + day + hour + minute + '.zip';
}

function creatZip(info, zipName){
  if(process.env.VUE_APP_NODE_TYPE == 1) {
    zipName = getZipName(1, info)
    compress(buildPath, resolve(`release/test/${zipName}`))
  } else {
    zipName = getZipName(2, info)
    compress(buildPath, resolve(`release/product/${zipName}`))
  }
}

class MxBuildPlugin {
  apply(compiler) {
    //生成资源之前检查文件目录
    compiler.hooks.emit.tap('Creat File', compilation => {
      if (process.env.NODE_ENV === 'production') {
        co(function *() {
          try{
            yield statFile(resolve(`release/`))
          }catch(error){
            yield mkdirFile(resolve(`release/`))
          }
          try{
            yield statFile(resolve(`release/dist`))
          }catch(error){
            yield mkdirFile(resolve(`release/dist`))
          }
          try{
            yield statFile(resolve(`release/test/`))
          }catch(e){
            yield mkdirFile(resolve(`release/test/`))
          }
          try{
            yield statFile(resolve(`release/product/`))
          }catch(e){
            yield mkdirFile(resolve(`release/product/`))
          }
        });
      }
    })

    // 生成资源之后生成cubeModule文件
    compiler.hooks.afterEmit.tap('CubeModule Move', compilation => {
      if (process.env.NODE_ENV === 'production') {
        console.log('生成cubeModule.json')
        transferCubeModule(cubeModulePath + '/CubeModule.json', buildPath + '/CubeModule.json')
      }
    })

    // 完成编译后打包项目
    compiler.hooks.done.tap('Compress Project', stats => {
      let info = require(cubeModulePath + '/CubeModule.json');
      let zipName = ''
      if (process.env.NODE_ENV === 'production') {
        creatZip(info, zipName)
      }
    })
  }
}
module.exports = MxBuildPlugin
