const clockContainer = document.querySelector(".js-clock"),
	clockTitle = clockContainer.querySelector("h1");

function getTime(){
	const date = new Date();	// 클래스, 객체

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// console.log(clockTitle.innerText);
	clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	
}

function init(){
	getTime();
	setInterval(getTime, 1000);
}

init();