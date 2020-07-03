/*
	Hey there!
	This is the client file for your theme. If you need to do any client-side work in javascript,
	this is where it needs to go.
	You can listen for page changes by writing something like this:
	  $(window).on('action:ajaxify.end', function(data) {
		var	url = data.url;
		console.log('I am now at: ' + url);
	  });
*/

const myFunction = function (event) {
	console.log('myFunction');
	const attribute = this.getAttribute("data-atc");
	if (event.ctrlKey) {
		const newWindow = window.open(decodeURIComponent(window.atob(attribute)), '_blank');
		newWindow.focus();
	} else {
		document.location.href = decodeURIComponent(window.atob(attribute));
	}
};
//fonction du click droit
const myRightFunction = function (event) {
	const attribute = this.getAttribute("data-atc");
	if (event.ctrlKey) {
		const newWindow = window.open(decodeURIComponent(window.atob(attribute)), '_blank');
		newWindow.focus();
	} else {
		window.open(decodeURIComponent(window.atob(attribute)), '_blank');
	}
}
$(window).on('action:ajaxify.contentLoaded', function (ev, data) {
	const classname = document.getElementsByClassName("atc");

	for (var i = 0; i < classname.length; i++) {
		console.log('addEventListener');
		//click gauche
		classname[i].addEventListener('click', myFunction, false);
		//click droit
		classname[i].addEventListener('contextmenu', myRightFunction, false);
	}
});
