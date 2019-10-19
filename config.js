"use strict";

class BuzzConfig extends BuzzPersist {
	static get allData() {
		return {
			min: 1,
			max: 250,
			linear: false,
			randStart: false,
			blacklist: []
		};
	}
	static get allMeta() {
		return {
			min: {
				type: "number",
				name: "Minimum Generated",
				desc: "The minimum number that the system will generate."
				constrain: val => parseInt(val) === val && val > 0 && val <= this.data.max
			},
			max: {
				type: "number",
				name: "Maximum Generated",
				desc: "The maximum number that the system will generate. (Ignored if 'linear' is true.)"
				constrain: val => parseInt(val) === val && val <= 1e6 && val >= this.data.min
			},
			linear: {
				type: "toggle",
				name: "Linear Mode",
				desc: "Whether the system jumps to the next number instead of hopping around."
			},
			randStart: {
				type: "number",
				name: "Seed",
				desc: "If linear, whether the system should start at a random value in [min, max]",
			},
			blacklist: {
				type: "multitoggle",
				name: "Blacklist",
				desc: "What words to exclude in gameplay",
				list: BuzzCount.prototype.all
			}
		};
	}
	constructor(key, parent) {
		this.parent = parent;
	}
}
