function exportStandardBlockProcessor (tp, tR, note) {
    return new StandardBlockProcessor(tp, tR, note);
}
module.exports = exportStandardBlockProcessor;

class StandardBlockProcessor {
	#note;
	#df;

	constructor(tp, tR, note) {
		this.#note = note;
		this.#df = tp.user.DateFormatter(tp, tR, null);
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
