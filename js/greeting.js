import Clock from './modules/moduleClock.js';
import Store from './modules/store.js';

const form = document.querySelector(".js-form"),
	input = form.querySelector("input"),
	greeting = document.querySelector(".js-greetings");
const clockTitle = document.querySelector(".js-clock");
	
const USER_LS = "currentUser",
	SHOWING_ON = "showing";	

let when = "";

// 사용자가 이름 적고 Enter 치면 일어날 일
function handleSubmit(event) {
	event.preventDefault();
	const currentValue = input.value;
	
	paintGreeting(currentValue);
	saveName(currentValue);
}

// 사용자 이름이 존재하지 않을 경우
function askForName() {	
	form.classList.add(SHOWING_ON);
	form.addEventListener("submit", handleSubmit);
}	

// 사용자 이름이 존재할경우 
function paintGreeting(text) {
	form.classList.remove(SHOWING_ON);
	greeting.classList.add(SHOWING_ON);
	greeting.innerText = `${when}, ${text}`;
}

function loadName() {
	const currentUser = localStorage.getItem(USER_LS);
	// const store = new Store();
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

function setTime() {
	const clock = new Clock();
	const time = clock.getTime();
	
	if( 0 <= time.hours && time.hours < 5 ) when = "Good night";
	else if( time.hours < 12 ) when = "Good morning";
	else if( time.hours < 17 ) when = "Good afternoon";
	else if( time.hours < 20 ) when = "Good evening";
	else 						when = "Good night";

	clockTitle.innerText = `${time.hours < 10 
		? `0${time.hours}` : time.hours}:${time.minutes < 10 
		? `0${time.minutes}` : time.minutes}:${time.seconds < 10 
		? `0${time.seconds}` : time.seconds}`;
}

function init() {
	setTime();
	loadName();
	setInterval(setTime, 1000);
	setInterval(loadName, 1000*60*24);
}

init();