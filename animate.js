function animateByClass(object, cls) {
	object.classList.remove(cls);
	void(object.offsetWidth);
	object.classList.add(cls);
	object.addEventListener("animationend", function end() {
		object.classList.remove(cls);
		object.removeEventListener("animationend", end);
	});
}
