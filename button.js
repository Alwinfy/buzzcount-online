"use strict";

class KeyedButton {
	constructor(parent, label, keys) {
		this.button = document.createElement("button");
		this.button.classList.add("keyed-button");
		this.button.innerHTML = label;
		if(keys)
			this.button.title = `Press ${keys.join(" or ")} to toggle`;
		
		this.keys = new Set(keys);
		document.body.addEventListener("keydown", this.hkey.bind(this));
		parent.appendChild(this.button);
	}
	hkey(ev) {
		if(!ev.target.parentNode.contains(this.button))
			return;
		if(this.keys.has(ev.key))
			this.button.click();
	}
}

class ToggleButton extends KeyedButton {
	constructor(parent, label, keys) {
		super(parent, label, keys);
		this.checked = false;
		this.button.classList.add("toggle-button");
		this.button.addEventListener("click", this.click.bind(this));
	}
	click(ev) {
		this.checked = !this.checked;
		this.button.style.borderStyle = this.checked ? 'inset' : 'outset';
	}
	reset() {
		this.checked = true;
		this.click(null);
	}
}
