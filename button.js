class KeyedButton {
	constructor(paren, label, keys) {
		this.button = document.createElement("button");
		this.button.classList.add("keyed-button");
		this.button.innerHTML = label;
		if(keys)
			this.button.title = `Press ${keys.join(" or ")} to toggle`;
		
		this.keys = new Set(keys);
		document.body.addEventListener("keydown", this.hkey.bind(this));
		paren.appendChild(this.button);
	}
	hkey(ev) {
		if(!ev.target.parentNode.contains(this.button))
			return;
		if(this.keys.has(ev.key))
			this.button.click();
	}
}
class ToggleButton extends KeyedButton {
	constructor(paren, label, keys) {
		super(paren, label, keys);
		this.checked = false;
		this.button.classList.add("toggle-button");
		this.button.addEventListener("click", this.handle.bind(this));
	}
	handle(ev) {
		this.checked = !this.checked;
		this.button.style.borderStyle = this.checked ? 'inset' : 'outset';
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
		const buzz = bc.all[i] || 'fail';
		const letter = firstletter(buzz);
		const word = buzz.toUpperCase();
		const hl = !~letter ? word :
			`${word.slice(0, letter)}<u>${word[letter]}</u>${word.slice(letter + 1)}`;
		this.buttons.push(new ToggleButton(
			paren, hl,
			[(i + 1).toString(), buzz[letter]]));
		this.buttons[i].button.classList.add("flex-elem");
		this.buttons[i].button.style.backgroundColor = `hsl(${Styler.hueByIndex(i)}, 40%, 90%)`;
		console.log(Styler.hueByIndex(i));
	}
	const goword = "go!";
	const go = new KeyedButton(document.querySelector('.flex-container'), goword.toUpperCase(), ["Enter", goword[firstletter(goword)]]);
	go.button.classList.add("flex-elem");

})
