class Styler {
	static get PHI() {return -.5 + Math.sqrt(5) / 2;}
	static hueByIndex(index) {
		return parseInt((Styler.PHI * index) % 1.0 * 360);
	}
}
