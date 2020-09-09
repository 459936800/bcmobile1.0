const getters = {
	getPlaytype: (state) => {
		return state.playtype;
	},
	getShowLottery: (state) => {
		return state.showLottery;
	},
	getLotteryShortName: (state) => {
		return state.LotteryShortName;
	},
	getPlayTypeColumns: (state) => {
		return state.playTypeColumns;
	}
};
export default getters;
