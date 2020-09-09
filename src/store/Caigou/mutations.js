const mutations = {
	setPlaytype: (state, res) => {
		state.playtype = res;
	},
	setShowLottery: (state, res) => {
		state.showLottery = res;
	},
	setLotteryShortName: (state, res) => {
		state.LotteryShortName = res;
	},
	setPlayTypeColumns: (state, res) => {
		state.playTypeColumns = res;
	}
};
export default mutations;
