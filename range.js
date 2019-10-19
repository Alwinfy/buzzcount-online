class RangeMaker {
	constructor(paren) {
		this.min = 1;
		this.max = 200;
	}
	roll() {
		return parseInt(this.min + Math.random() * (this.max - this.min));
	}
}
