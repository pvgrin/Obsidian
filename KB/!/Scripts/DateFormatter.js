function exportDateFormatter (tp, tR, newDate) {
    return new DateFormatter(newDate);
}
module.exports = exportDateFormatter;

class DateFormatter {
	#dayLength = 24 * 60 * 60 * 1000;
	#d = new Date();

	constructor(newDate) {
		this.#d = new Date(newDate?.valueOf() ?? Date.now());
	}

	getYesterday() {
		let val = new Date(this.#d.valueOf() - this.#dayLength);
		return new DateFormatter(val);
	}

	getTomorrow() {
		let val = new Date(this.#d.valueOf() + this.#dayLength);
		return new DateFormatter(val);
	}

	getPrevMonth() {
		let m = this.#d?.getMonth() - 1;
		let y = this.#d?.getFullYear();
		if (m == -1) {
			m = 11;
			y = y - 1;
		}
		let val = new Date(y, m, 1);
		return new DateFormatter(val);
	}

	getNextMonth() {
		let m = this.#d?.getMonth() + 1;
		let y = this.#d?.getFullYear();
		if (m == 12) {
			m = 0;
			y = y + 1;
		}
		let val = new Date(y, m, 1);
		return new DateFormatter(val);
	}

	getYearString(delta) {
		return (this.#d?.getFullYear() + (delta ?? 0)).toString();
	}

	addLeadZero(str) {
		return (str?.length == 1) ? "0" + str : str;
	}

	getMonthString() {
		return this.addLeadZero((this.#d?.getMonth() + 1).toString());
	}

	getDateString() {
		return this.addLeadZero(this.#d?.getDate()?.toString());
	}

	getFormatString(format) {
		return format
			?.replace("YYYY", this.getYearString())
			?.replace("MM", this.getMonthString())
			?.replace("DD", this.getDateString());
	}
}
