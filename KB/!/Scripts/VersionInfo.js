
function exportVersionInfo (tp, tR, versionInfo) {
    return new VersionInfo(versionInfo);
}
module.exports = exportVersionInfo;

class VersionInfo {
	major = 0;
	minor = 0;

	static #delimiter = ".";
	static #errMsg1 = "Class VersionInfo has invalid constructor argument: ";
	static #errMsg2 = "Class VersionInfo has invalid 'fromString' argument: ";

	constructor(versionInfo) {
		if (!versionInfo)
			return;
		if (typeof versionInfo == "string") {
			var v = VersionInfo.fromString(versionInfo);
			if (v) {
				this.major = v.major;
				this.minor = v.minor;
			}
			return;
		}
		if (typeof versionInfo == "object") {
			if (Array.isArray(versionInfo)) {
				if (versionInfo.length > 0) {
					if (!isNaN(versionInfo[0]))
						this.major = parseInt(versionInfo[0]);
					if (versionInfo.length > 1) {
						if (!isNaN(versionInfo[1]))
							this.minor = parseInt(versionInfo[1]);
					}
				}
			}
			else {
				this.major = ((versionInfo.major) && !(isNaN(versionInfo.major))) ? versionInfo.major : 0;
				this.minor = ((versionInfo.minor) && !(isNaN(versionInfo.minor))) ? versionInfo.minor : 0;
			}
			return;
		}
		console.error(VersionInfo.#errMsg1, versionInfo);
	}

	static fromString(versionInfo) {
		if ((!versionInfo) || (typeof versionInfo !== "string") || (versionInfo.trim() == "")) {
			console.error(VersionInfo.#errMsg2, versionInfo);
			return;
		}
		const nums = versionInfo.split(VersionInfo.#delimiter);
		if ((!nums) || !((nums.length == 1) || (nums.length == 2))) {
			console.error(VersionInfo.#errMsg2, versionInfo);
			return;
		}
		if (isNaN(nums[0]) || ((nums.length == 2) && isNaN(nums[1]))) {
			console.error(VersionInfo.#errMsg2, versionInfo);
			return;
		}
		let vi = new VersionInfo();
		vi.major = parseInt(nums[0]);
		vi.minor = (nums.length == 2) ? parseInt(nums[1]) : 0;
		return vi;
	}

	toString() {
		return this.major.toString() + VersionInfo.#delimiter + this.minor.toString();
	}

	compare(ver) {
		const verInfo = new VersionInfo(ver);
		if (this.major > verInfo.major)
			return 1;
		if (this.major < verInfo.major)
			return -1;
		if (this.minor > verInfo.minor)
			return 1;
		if (this.minor < verInfo.minor)
			return -1;
		return 0;
	}
}
