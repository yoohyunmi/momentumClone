const jsQuote = document.querySelector(".js-quote");

function loadSaying() {
    fetch(`https://api.adviceslip.com/advice`).then(function(response) {
        if(response.status === 200) {
            return response.json()
        } else {
            console.error('Error occured while fetching wise-saying.');
        }
    }).then(function(json) {
        const advice = json.slip.advice;
        console.log(wiseSaying);

        console.log(advice);
        wiseSaying.innerText = "@ " + advice;
    });
    
}

function init() {
    loadSaying();
}

init();