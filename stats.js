"use strict";

class BuzzStats extends BuzzPersist {
	static get allData() {
		return {
			attempts: 0,
			correct: 0,
			percentCorrect: 0,
			bestStreak: 0,
			currentStreak: 0,
			totalTime: 0,
			averageTime: 0,
			bestTime: null,
		};
	}
	static get allMeta() {
		return {
			attempts: {
				desc: "The total number of attempts made",
			},
			correct: {
				desc: "The total number of correct attempts you've made",
			},
			percentCorrect: {
				desc: "Your approximate accuracy rate.",
				transform: val => (val * 100).toFixed(2) + "%"
			},
			bestStreak: {
				desc: "The most problems in a row you've gotten right",
			},
			currentStreak: {
				desc: "The number of problems you've just gotten right",
			},
			totalTime: {
				desc: "Total time spent working on BuzzCount",
				transform: Util.toTime
			},
			averageTime: {
				desc: "Average time spent on a number",
				transform: ms => (ms / 1000).toFixed(3) + "s"
			},
			bestTime: {
				desc: "The least amount of time spent on a correct number",
				transform: ms => ms === null ? "Never" : (ms / 1000).toFixed(3) + "s"
			}
		};
	}
			
	constructor(key, parent) {
		super(key);
		this.table = document.createElement("table");
		parent.appendChild(this.table);
		this.lastTime = null;
		this.dataSlots = {};
		this.setupTable();
	}
	setupTable() {
		for(let stat in this.data) {
			const row = document.createElement("tr");
			const key = document.createElement("td");
			const value = document.createElement("td");
			const meta = this.constructor.allMeta[stat];
			key.innerText = (stat[0].toUpperCase() + stat.slice(1).replace(/[A-Z]/g, " $&")).replace("Percent", "%");
			key.title = meta.desc;
			key.style.textAlign = "right";
			this.dataSlots[stat] = value;
			row.appendChild(key);
			row.appendChild(value);
			this.table.appendChild(row);
		}
		this.updateView();
	}
	updateView() {
		for(let stat in this.data) {
			const meta = this.constructor.allMeta[stat];
			this.dataSlots[stat].innerText = (meta.transform || (x => x))(this.data[stat]);
		}
	}
	add(name, value) {
		this.data[name] += value;
		this.serialize();
	}
	increment(name) {
		this.add(name, 1);
	}
	clear(name) {
		this.data[name] = 0;
		this.serialize();
	}
	greatest(name, value) {
		if(value > this.data[name]) {
			this.data[name] = value;
			this.serialize();
		}
	}
	least(name, value) {
		if(this.data[name] === null || value < this.data[name]) {
			this.data[name] = value;
			this.serialize();
		}
	}
	
	start() {
		this.last = performance.now();
	}
	next(correct) {
		const now = performance.now();
		const elapsed = now - this.last;
		this.last = now;
		this.increment("attempts");
		this.add("totalTime", elapsed);
		this.set("averageTime", this.get("totalTime") / this.get("attempts"));
		this.set("percentCorrect", this.get("correct") / this.get("attempts"));
		if(correct) {
			this.increment("correct");
			this.increment("currentStreak");
			this.greatest("bestStreak", this.get("currentStreak"));
			this.least("bestTime", elapsed);
		}
		else this.clear("currentStreak");
		this.updateView();
	}
	wipe() {
		this.data = {};
		Object.assign(this.data, this.constructor.allData);
		this.doSerialize();
		this.updateView();
	}
}
