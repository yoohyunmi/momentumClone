class Clock {
    constructor() {
    }
    getTime() {
        // console.log("CLOCK CALLS !!!")
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        return {hours, minutes, seconds};
    }
}
export default Clock