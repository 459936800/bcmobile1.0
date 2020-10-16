<template>
  <div class="list-table">
    <table class="openPast" cellspacing="0" cellpadding="0">
      <tr >
        <td
        v-for="(item,idx) in tableHeader" :key="'header-'+idx"
        >{{item.name}}</td>
      </tr>
      <tr
      :style="{'background-color':item.bgcolor,'color': item.bgcolor==null?'#000':'#fff'}"
       v-for="(item,idx) in tableBody" :key="'tr-'+idx">
        <td
        v-for="(unit,idx) in tableHeader" :key="'td-'+idx"
        >{{item[unit.key]}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'table-components',
  props: {
    tableHeader: {
      type: Array,
      default: () => [],
    },
    tableBody: {
      type: Array,
      default: () => [],
    },
  }
}
</script>

<style lang="less">
.list-table{
.openPast {
  max-height: 19.91em;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff;
  width: 100%;
  font-size: 0.6em;
  color: #777;
  text-align: center;
  clear: both;
  tr {
    width: 50%;
    height: 2em;
  }
  td {
    padding: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-right: none;
  }
}
}

</style>
