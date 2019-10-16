"use strict";

class LeastPrime {
	constructor() {
		this.cache = [2];
		this.lastNum = null;
		this.lastVal = null;
	}
	get last() {
		return this.cache[this.cache.length - 1];
	}
	cacheTo(number) {
		let next = this.last + 1;
		while(number > this.last) {
			let ok = true;
			for(let i=0; this.cache[i] * this.cache[i] <= next; i++)
				if(next % this.cache[i] === 0) {
					ok = false;
					break;
				}
			if(ok)
				this.cache.push(next);
			next++;
		}
	}
	leastPrime(number) {
		if(isNaN(+number)) throw new Error("Bad number!");
		if(number === this.lastNum) return this.lastVal;
		this.lastNum = number;
		this.cacheTo(1 + parseInt(Math.sqrt(number)));
		for(let i=0; this.cache[i] * this.cache[i] <= number; i++)
			if(number % this.cache[i] === 0)
				return this.lastVal = this.cache[i];
		return this.lastVal = number;
	}
}

class BuzzCount extends LeastPrime {
	constructor() {
		super();
		this.fibbiL = 0;
		this.fibbiR = 1;
		this.fibbiCache = new Set([0, 1]);
	}
	gcd(x, y) {
		return y == 0 ? x : this.gcd(y, x % y);
	}

	get all() {
		return ["bang", "buzz", "crash", "fibbi", "pop", "squawk", "whizz", "zip"];
	}
	which(number) {
		return this.all.filter(fun => this[fun](all));
	}
	bang(number) {
		return number % 5 === 0 || number.toString().includes("5");
	}
	buzz(number) {
		return number % 7 === 0 || number.toString().includes("7");
	}
	crash(number) {
		return number > 1 && this.leastPrime(number) === number;
	}
	fibbi(number) {
		while(this.fibbiR < number) {
			let old = this.fibbiR;
			this.fibbiR += this.fibbiL;
			this.fibbiL = old;
			this.fibbiCache.add(this.fibbiR);
		}
		return this.fibbiCache.has(number);
	}
	pop(number) {
		const left = this.leastPrime(number);
		const right = number / left;
		return right > 1 && left !== right && this.crash(right);
	}
	squawk(number) {
		if(number === 0) return true;
		while((number & 1) === 0) number >>= 1;
		let op = 1, np, count = 0;
		while(number > 1) {
			np = this.leastPrime(number);
			if(op !== np) {
				if((count & 1) && (op & 2))
					return false;
				count = 0;
				op = np;
			}
			count++;
			number /= np;
		}
		return !((count & 1) && (op & 2));
	}
	whizz(number) {
		let prime;
		while(number > 1) {
			prime = this.leastPrime(number);
			number /= prime;
			if(prime > 1 && number % prime == 0)
				return false;
		}
		return true;
	}
	zip(number) {
		if(number < 3)
			return number == 1;
		let perst = 0, cur = 0;
		let cnumber, onumber = 1;
		while(number > 1) {
			cnumber = this.leastPrime(number);
			if(cnumber != onumber) {
				perst = this.gcd(cur, perst);
				cur = 0;
				onumber = cnumber;
			}
			number /= cnumber;
			cur++;
		}
		return this.gcd(cur, perst) > 1;
	}
}

class PartialBuzzCount extends BuzzCount {
	constructor() {
		super();
		this.list = {};
		for(let i of super.all)
			this.list[i] = true;
	}
	get all() {
		return super.all.filter(word => this.list[word]);
	}
	set(word) {
		if(word in this.list)
			this.list[word] = true;
	}
	clear(word) {
		if(word in this.list)
			this.list[word] = false;
	}
}
