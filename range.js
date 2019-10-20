"use strict";

class RangeMaker {
	constructor(min, max, linear, rs) {
		this.min = min;
		this.max = max;
		this.linear = linear;
		if(linear) {
			this.pos = rs ? this.randRoll() : min;
		}
	}
	randRoll() {
		return parseInt(this.min + Math.random() * (this.max - this.min));
	}
	roll() {
		return this.linear ? this.pos++ : this.randRoll();
	}
}
