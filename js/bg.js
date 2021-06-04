const body = document.querySelector("body");

const IMG_NUMBER = 5;

// function handleImgLoad() {
//     console.log("finish loading...");
// }

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    // body.prepend(image);
    body.appendChild(image);
    // image.addEventListener("loader", handleImgLoad);     // 원격으로 API로 받았으면 사용 가능.
}

function getRandom() {
    const number = Math.floor(Math.random() * 5);
    return number;
}

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();