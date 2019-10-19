class BuzzStats {
	public get allStats() {
		return {
			attempts: 0,
			correct: 0,
			bestStreak: 0,
			currentStreak: 0,
		};
	}
	constructor(key) {
		this.lastSerialization = null;
		this.data = {};
		this.key = key;
		
		const stats = this.allStats;
		let parsed = {};
		try {
			parsed = JSON.parse(localStorage.getItem(key));
		}
		for(let stat in stats)
			this.data[stat] = ((stat in parsed) ? parsed : stats)[stat];
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
	serialize() {
		if(this.lastSerialize)
			clearTimeout(this.lastSerialize);
		this.lastSerialize = setTimeout(this.doSerialize.bind(this));
	}
	doSerialize() {
		localStorage.setItem(this.key, JSON.stringify(this.data));
	}
}
