const form = document.querySelector(".js-form"),
	input = form.querySelector("input"),
	greeting = document.querySelector(".js-greetings");

	
const USER_LS = "currentUser",
	SHOWING_ON = "showing";

// 사용자가 Enter 치면 일어날 일
function handleSubmit(event) {
	event.preventDefault();
	const currentValue = input.value;
	
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askForName() {	
	form.classList.add(SHOWING_ON);
	form.addEventListener("submit", handleSubmit);
}	


// 사용자 이름이 존재할경우 
function paintGreeting(text) {
	form.classList.remove(SHOWING_ON);
	greeting.classList.add(SHOWING_ON);
	greeting.innerText = `Hello ${text}`;
}

function loadName() {
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null) {
		askForName();
		greeting.classList.remove(SHOWING_ON);
	} else {
		paintGreeting(currentUser);
	}
}
function saveName(name) {
	localStorage.setItem(USER_LS, name);
}

function init() {
	loadName();
}

init();