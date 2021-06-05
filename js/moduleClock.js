class Clock {

    constructor() {

    }
    getTime() {
        console.log("CLOCK CALLS !!!")
        
        const date = new Date();	// 클래스, 객체
        
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        // console.log(clockTitle.innerText);
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
}
export default Clock