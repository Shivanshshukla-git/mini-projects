const Images= [
    "Image/beautiful-scenery.jpg",
    "Image/mountain-camping.jpg",
    "Image/night-sky.jpg",
    "Image/ocean-art.jpg",
    "Image/table-chair.jpg",
    "Image/vintage-train.jpg"
];

let currIndex= 0;

const sliderImage= document.querySelector("#sliderImage");
const nextBtn= document.querySelector("#nextBtn");
const prevBtn= document.querySelector("#prevBtn");
const sliderContainer= document.querySelector(".slider");
const bgImage= document.querySelector("#bgImage");

function updateSliderImage(){
    sliderImage.style.opacity= 0;

    sliderImage.src= Images[currIndex];

    sliderImage.onload= ()=>{
        sliderImage.style.opacity= 1;
        
        setTimeout(() => {
            bgImage.src = Images[currIndex];
        }, 400);
    };
};

nextBtn.addEventListener("click", function(){
    currIndex++;

    if(currIndex >= Images.length){
        currIndex= 0;
    }

    updateSliderImage();

    startAutoSlider();
})

prevBtn.addEventListener("click", function(){
    currIndex--;

    if(currIndex < 0){
        currIndex= Images.length - 1;
    }

    updateSliderImage();

    startAutoSlider();
})

let autoSlider;

function startAutoSlider(){
    clearInterval(autoSlider);

    autoSlider= setInterval(() => {
        currIndex++;

        if(currIndex >= Images.length){
            currIndex= 0;
        }

        updateSliderImage();

    }, 3000);
}

startAutoSlider();

sliderContainer.addEventListener("keydown", function(detail){
    if(detail.key=== "ArrowRight"){
        nextBtn.click();
    }
    else if(detail.key=== "ArrowLeft"){
        prevBtn.click();
    }
});