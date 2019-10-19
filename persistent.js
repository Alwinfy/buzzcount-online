"use strict";

class BuzzPersist {
	static get allData() {
		return {};
	}
	static get allMeta() {
		return {};
	}
	constructor(key) {
		this.lastSerialize = null;
		this.data = {};
		this.key = key;
		
		const data = this.constructor.allData;
		let parsed = {};
		try {
			parsed = JSON.parse(localStorage.getItem(key)) || {};
		}
		catch(e) {}
		for(let datum in data)
			this.data[datum] = ((datum in parsed) ? parsed : data)[datum];
	}
	serialize() {
		if(this.lastSerialize)
			clearTimeout(this.lastSerialize);
		this.lastSerialize = setTimeout(this.doSerialize.bind(this));
	}
	doSerialize() {
		localStorage.setItem(this.key, JSON.stringify(this.data));
		this.lastSerialize = null;
	}
}
