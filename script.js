document.body.className += 'fade-out';

 function fadeOut() {
	var bodyEl = document.getElementsByTagName("body")[0];
		bodyEl.classList.remove("fade-out");
}

window.onload=fadeOut;