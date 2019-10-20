"use strict";

function main() {
	const conf = JSON.parse(localStorage.getItem("settings"));
	const rng = new RangeMaker(conf.min, conf.max, conf.linear, conf.randStart);
	const bc = new PartialBuzzCount(conf.blacklist);
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
		const buzz = bc.all[i] || "fail";
		const letter = firstletter(buzz);
		const word = buzz.toUpperCase();
		const hl = !~letter ? word :
			`${word.slice(0, letter)}<u>${word[letter]}</u>${word.slice(letter + 1)}`;
		this.buttons.push(new ToggleButton(
			parent, hl,
			[(i + 1).toString(), buzz[letter]]));
		this.buttons[i].button.classList.add("game-elem");
		this.buttons[i].button.classList.add("buzz-button");
		this.buttons[i].button.style.backgroundColor = `hsl(${Util.hueByIndex(i)}, 40%, 90%)`;
	}
	const goword = "go!";
	const go = new KeyedButton(document.querySelector(".game-container"), goword.toUpperCase(), ["Enter", goword[firstletter(goword)]]);
	go.button.classList.add("flex-elem");
	go.button.classList.add("go-button");
	let num;
	const promp = document.querySelector(".number");
	const stats = new BuzzStats("all", document.querySelector(".stats"));
	function update() {
		num = rng.roll();
		promp.innerText = "CALC: " + num;
	}
	go.button.addEventListener("click", function initial() {
		stats.start();
		animateByClass(promp, "btn-right");
		go.button.removeEventListener("click", initial);
		go.button.addEventListener("click", ev => {
			let allok = true;
			for(let i=0; i<buttons.length; i++) {
				const ok = buttons[i].checked == bc[bc.all[i]](num);
				allok = allok && ok;
				if(!ok) animateByClass(buttons[i].button, "btn-wrong");
				buttons[i].reset();
			};
			animateByClass(promp, allok ? "btn-right" : "btn-wrong");
			stats.next(allok);
			update();
		});
		update();
	});
	this.statReset = () => {
		if(confirm("Are you sure you want to wipe all your stats? This cannot be undone!"))
			stats.wipe();
		location.reload();
	}
}

function settings() {
	const settings = new BuzzConfig("settings", document.querySelector(".settings"));
	document.querySelector(".snr").addEventListener("click", ev => {
		settings.write();
		location.replace("index.html");
	});
	document.querySelector(".cnr").addEventListener("click", ev => {
		if(confirm("Are you sure you want to discard changes?"))
			location.replace("index.html");
	});
}
