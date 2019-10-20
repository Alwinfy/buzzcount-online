"use strict";

class Option {
	get value() {}
}

class NumberOption extends Option {
	constructor(parent, meta, initial) {
		super();
		this.input = document.createElement("input");
		this.input.classList.add("number-option");
		this.input.addEventListener("change", this.onChange.bind(this));
		parent.appendChild(this.input);
		this.constrain = meta.constrain.bind(this) || (_ => true);
		this.input.value = initial;
		this.lastInput = this.constrain(+this.input.value) ? +this.input.value : 0;
	}
	onChange(ev) {
		if(this.constrain(+this.input.value))
			this.lastInput = +this.input.value;
		else
			this.input.value = this.lastInput;
	}
	get value() {
		this.onChange(null);
		return +this.input.value;
	}
}
class ToggleOption extends Option {
	constructor(parent, meta, initial) {
		super();
		this.toggle = new ToggleButton(parent, "Enabled", []);
		if(initial) this.toggle.click(null);
	}
	get value() {
		return this.toggle.checked;
	}
}
class MultiToggleOption extends Option {
	constructor(parent, meta, initial) {
		super();
		Object.assign(parent.style, {
			display: "inline-flex",
			flexFlow: "row-wrap"
		});
		this.words = meta.list;
		this.buttons = {};
		meta.list.forEach(word => this.buttons[word] = new ToggleButton(parent, word, []));
		initial.map(word => this.buttons[word].click(null));
	}
	get value() {
		return this.words.filter(word => this.buttons[word].checked);
	}
}

class BuzzConfig extends BuzzPersist {
	static optTypes(type) {
		return {
			"number": NumberOption,
			"toggle": ToggleOption,
			"multitoggle": MultiToggleOption
		}[type];
	}
	static get allData() {
		return {
			min: 1,
			max: 250,
			linear: false,
			randStart: false,
			blacklist: []
		};
	}
	get allMeta() {
		return {
			min: {
				type: "number",
				name: "Minimum Generated",
				desc: "The minimum number that the system will generate.",
				constrain: val => parseInt(val) === val && val > 0 && val <= this.data.max
			},
			max: {
				type: "number",
				name: "Maximum Generated",
				desc: "The maximum number that the system will generate. (Ignored if 'linear' is true.)",
				constrain: val => parseInt(val) === val && val <= 1e6 && val >= this.data.min
			},
			linear: {
				type: "toggle",
				name: "Linear Mode",
				desc: "Whether the system jumps to the next number instead of hopping around."
			},
			randStart: {
				type: "toggle",
				name: "Random Start",
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
		super(key);
		this.parent = document.createElement("table");
		parent.appendChild(this.parent);
		this.configs = {};
		for(let conf in this.data) {
			const span = document.createElement("tr");
			const key = document.createElement("td");
			const value = document.createElement("td");
			span.appendChild(key);
			span.appendChild(value);
			key.style.textAlign = "right";
			value.style.textAlign = "left";
			const meta = this.allMeta[conf];
			this.parent.appendChild(span);
			key.innerText = meta.name;
			key.title = meta.desc;
			this.configs[conf] = new (this.constructor.optTypes(meta.type))(value, meta, this.data[conf]);
		}
	}
	write() {
		for(let conf in this.data) {
			this.data[conf] = this.configs[conf].value;
		}
		this.doSerialize();
	}
}
