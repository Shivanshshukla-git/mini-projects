const btn= document.querySelector("#btn");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const body= document.querySelector("body");

function customTheme(){
    const savedTheme= localStorage.getItem("theme");
    if(savedTheme === "dark"){
        body.classList.add("dark");
        body.classList.remove("light");
        btn.textContent= "Light Mode?"
    }
    else if(savedTheme === "light"){
        body.classList.add("light");
        body.classList.remove("dark");
        btn.textContent= "Dark Mode?"
    }
    else{
         if (prefersDark.matches) {
            body.classList.add("dark");
            body.classList.remove("light");
            btn.textContent= "Light Mode?"
        } else {
            body.classList.add("light");
            body.classList.remove("dark");
            btn.textContent= "Dark Mode?"
        }
    }
};
customTheme();

prefersDark.addEventListener("change", function(){
    if(!localStorage.getItem("theme")){
        customTheme();
    }
})

btn.addEventListener("click", function(){
    if(body.classList.contains("dark")){
        body.classList.add("light");
        body.classList.remove("dark");
        localStorage.setItem("theme", "light");
        btn.textContent= "Dark Mode?"
    }
    else{
        body.classList.add("dark");
        body.classList.remove("light");
        localStorage.setItem("theme", "dark");
        btn.textContent= "Light Mode?"
    }
});