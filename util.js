"use strict";

class Util {
	static get PHI() {return -.5 + Math.sqrt(5) / 2;}
	static hueByIndex(index) {
		return parseInt((this.PHI * index) % 1.0 * 360);
	}
	static _pad2(val) {
		return parseInt(val).toString().padStart(2, "0");
	}
	static toTime(ms) {
		const pad2 = Util._pad2;
		return `${pad2(ms / 3600e3)}:${pad2(ms / 60e3 % 60)}:${pad2(ms / 1e3 % 60)}`;
	}
}
