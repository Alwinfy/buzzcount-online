class Styling {
	PHI = .5 + Math.sqrt(5) / 2;
	hueByIndex(index) {
		return parseInt(Math.pow(PHI, index) % 1.0 * 360);
	}
}
