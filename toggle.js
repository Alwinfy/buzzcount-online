class ToggleButton {
	constructor(paren, label, keys) {
		//this.box = document.createElement("input");
		//this.box.hidden = "true";
		//this.box.type = "checkbox";
		//this.box.className = "toggle-box";
		this.checked = false;
		
		this.button = document.createElement("button");
		this.button.className = "flex-elem toggle-button";
		this.button.innerHTML = label;
		if(keys)
			this.button.title = `Press ${keys.join(" or ")} to toggle`;
		
		this.keys = new Set(keys);
		this.button.addEventListener("click", this.handle.bind(this));
		document.body.addEventListener("keydown", this.hkey.bind(this));
		//paren.appendChild(this.box);
		paren.appendChild(this.button);
	}
	handle(ev) {
		//this.box.checked = !this.box.checked;
		this.checked = !this.checked;
		this.button.style.borderStyle = this.checked ? 'inset' : 'outset';
	}
	hkey(ev) {
		if(!ev.target.parentNode.contains(this.button))
			return;
		if(this.keys.has(ev.key))
			this.handle(ev);
	}
}
window.addEventListener("DOMContentLoaded", () => {
	const bc = new BuzzCount();
	this.buttons = [];
	const letters = new Set();
	const firstletter = word => {
		for(let i=0; i<word.length; i++)
			if(!letters.has(word[i])) {
				letters.add(word[i]);
				return i;
			}
		return -1;
	}
	const paren = document.querySelector(".inner-word-box");
	for(let i=0; i<bc.all.length; i++) {
		const letter = firstletter(bc.all[i]);
		const word = bc.all[i].toUpperCase();
		const hl = !~letter ? word :
			`${word.slice(0, letter)}<u>${word[letter]}</u>${word.slice(letter + 1)}`;
		this.buttons.push(new ToggleButton(
			paren, hl,
			[(i + 1).toString(), !~letter ? null : bc.all[i][letter]]));
	}

})
