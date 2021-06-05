const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");
	
const TODOS_LS = 'toDos';
let toDos = [];

// array의 모든 데이터들을 통과시켜서 값이 true가 나오는 아이템들만 남김
function deleteTodo(event) {
	// console.log(event.target.parentElement.id);
	const btn = event.target;
	const li = btn.parentNode;

	toDoList.removeChild(li);

	// 각각의 아이템을 실행하면서 true를 return하는 아이템을 array로 반환
	const cleanToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	// console.log(cleanToDos);
	toDos = cleanToDos;

	saveToDos();
}

function checkTodoCounts() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos === null) return 0;
	else {
		const parsedToDos = JSON.parse(loadedToDos);
		return parsedToDos.length;
	}
}
// Maximum Input -> 5
function setInputDisabled() {
	if(checkTodoCounts() > 4) {	
		toDoInput.disabled = true;
		// console.log("input text disabled.")
	} else {
		toDoInput.disabled = false;
	}
}
// to-do 출력
function paintToDo(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("span");
	const span = document.createElement("span");

	const newId = toDos.length + 1;

	delBtn.innerText = "X";
	delBtn.className = "checkbox";
	delBtn.addEventListener("click", deleteTodo);

	span.className="todo"
	span.innerText = text;

	li.appendChild(delBtn);
	li.appendChild(span);

	li.id = newId;
	toDoList.appendChild(li);

	const toDoObj = {
		text: text,
		id: toDos.length + 1
	};
	toDos.push(toDoObj);
	saveToDos();
}

// 사용자가 Enter 칠 때 발생
function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	toDoInput.value = "";
	
	paintToDo(currentValue);
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function(toDo) {
			paintToDo(toDo.text);
		});
	}
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));	// localStorage는 String 타입으로 바꿔서 넣으려고 함.

	setInputDisabled();
}

function init() {

	setInputDisabled();

	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();
