function exportStandardBlockProcessor (tp, tR, note) {
    return new StandardBlockProcessor(tp, tR, note);
}
module.exports = exportStandardBlockProcessor;

class StandardBlockProcessor {
	#note;
	#df;

	constructor(tp, tR, note) {
		this.#note = note;
		// Try tp extract date from the note's name in format "YYYY-MM-DD"
		let nd = null;
		let nn = this.#note?.file?.basename;
		if (nn) {
			let nni = nn.split("-");
			if (nni && nni.length == 3)
				nd = new Date(nni[0], nni[1]-1, nni[2]); // index of month (month - 1) 
		}
		// For all other notes the current date will be use
		this.#df = tp.user.DateFormatter(tp, tR, nd);
	}

	process(blockName) {
		if (blockName == "Title")
			return this.#note?.file?.basename;

		if (blockName == "YearDailyNote")
			return this.#df.getYearString();

		if (blockName == "PrevYearDailyNote")
			return this.#df.getYearString(-1);

		if (blockName == "NextYearDailyNote")
			return this.#df.getYearString(+1);

		if (blockName == "MonthDailyNote")
			return this.#df.getFormatString("YYYY-MM");

		if (blockName == "YesterdayDailyNote")
			return this.#df.getYesterday().getFormatString("YYYY-MM-DD");

		if (blockName == "TomorrowDailyNote")
			return this.#df.getTomorrow().getFormatString("YYYY-MM-DD");

		if (blockName == "PrevMonthDailyNote")
			return this.#df.getPrevMonth().getFormatString("YYYY-MM");

		if (blockName == "NextMonthDailyNote")
			return this.#df.getNextMonth().getFormatString("YYYY-MM");

		// the block is not found	
		return null;
	}
}
