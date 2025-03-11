window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


const headerContainer = document.querySelector(".header");

if (headerContainer) {
    let isScrolled = false;
    let originalHeight = headerContainer.offsetHeight;
    let newHeight = window.innerWidth > 1024 ? 120 : 80;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            if (!isScrolled) {
                headerContainer.style.transition = "height 0.3s ease-in-out, background-color 0.3s ease-in-out";
                headerContainer.style.height = newHeight + "px";
                headerContainer.style.backgroundColor = "#433b33";
                isScrolled = true;
            }
        } else if (window.scrollY < 20) {
            if (isScrolled) {
                headerContainer.style.height = originalHeight + "px";
                headerContainer.style.backgroundColor = "transparent";
                isScrolled = false;
            }
        }
    });
}


   



    
    