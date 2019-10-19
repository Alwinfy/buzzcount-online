function main() {
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
	const parent = document.querySelector(".inner-word-box");
	for(let i=0; i<bc.all.length; i++) {
		const buzz = bc.all[i] || 'fail';
		const letter = firstletter(buzz);
		const word = buzz.toUpperCase();
		const hl = !~letter ? word :
			`${word.slice(0, letter)}<u>${word[letter]}</u>${word.slice(letter + 1)}`;
		this.buttons.push(new ToggleButton(
			parent, hl,
			[(i + 1).toString(), buzz[letter]]));
		this.buttons[i].button.classList.add("game-elem");
		this.buttons[i].button.classList.add("buzz-button");
		this.buttons[i].button.style.backgroundColor = `hsl(${Styler.hueByIndex(i)}, 40%, 90%)`;
	}
	const goword = "go!";
	const go = new KeyedButton(document.querySelector('.game-container'), goword.toUpperCase(), ["Enter", goword[firstletter(goword)]]);
	go.button.classList.add("flex-elem");
	go.button.classList.add("go-button");
	const rng = new RangeMaker();
	let num;
	const promp = document.querySelector('.number');
	function update() {
		num = rng.roll();
		promp.innerText = 'CALC: ' + num;
	}
	go.button.addEventListener("click", ev => {
		let allok = true;
		for(let i=0; i<buttons.length; i++) {
			const ok = buttons[i].checked == bc[bc.all[i]](num);
			allok = allok && ok;
			if(!ok) animateByClass(buttons[i].button, "btn-wrong");
			buttons[i].reset();
		};
		animateByClass(promp, allok ? "btn-right" : "btn-wrong");
		update();
	});
	update();
}
