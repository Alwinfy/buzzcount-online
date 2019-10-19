class BuzzData {
	get allData() {
		return {};
	}
	constructor(key) {
		this.lastSerialization = null;
		this.data = {};
		this.key = key;
		
		const data = this.allData;
		let parsed = {};
		try {
			parsed = JSON.parse(localStorage.getItem(key));
		}
		for(let datum in data)
			this.data[datum] = ((datum in parsed) ? parsed : stats)[stat];
	}
	serialize() {
		if(this.lastSerialize)
			clearTimeout(this.lastSerialize);
		this.lastSerialize = setTimeout(this.doSerialize.bind(this));
	}
	doSerialize() {
		localStorage.setItem(this.key, JSON.stringify(this.data));
	}
}
class BuzzStats extends BuzzPersist {
	get allData() {
		return {
			attempts: 0,
			correct: 0,
			bestStreak: 0,
			currentStreak: 0,
		};
	}
	constructor(key) {
		super(key);
	}
	increment(name) {
		this.data[name]++;
		this.serialize();
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
}
class BuzzDConf extends BuzzPersist {
	get allData() {
		return {
			min: 1,
			max: 250,
			random: true,
			seed: -1,
			blacklist: []
		};
	}
	constructor(key, parent) {
