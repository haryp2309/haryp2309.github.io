document.body.className += 'fade-out';

function fadeOut() {
	var bodyEl = document.getElementsByTagName("body")[0];
		bodyEl.classList.remove("fade-out");
}

window.onload=fadeOut;

function openContactMe() {
	window.open("contact-info.html", "_self")
}

function openVideoGallery() {
	window.open("video-gallery.html", "_self")
}

function openIndex() {
	window.open("index.html", "_self")
}

function fadeOutAnimation() {
	var bodyEl = document.getElementsByTagName("body")[0];
		bodyEl.classList.add("fade-out-animation");
}
