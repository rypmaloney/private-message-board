function menuController() {
    //Close menu when clicking away from it
    const setWindowRemover = () => {
        window.addEventListener("mouseover", clickAway);
        function clickAway(e) {
            if (
                !e.target.matches(".side-menu") ||
                !e.target.matches("#menu-opener")
            ) {
                let menuItem = document.getElementById("side-menu");
                menuItem.classList.remove("open");
            }
        }
    };

    //Mobile menu expand
    (function () {
        let menuBtn = document.getElementById("menu-opener");
        menuBtn.addEventListener("click", () => expandMenu());
        function expandMenu() {
            let menuItem = document.getElementById("side-menu");
            menuItem.classList.toggle("open");
            setWindowRemover();
        }
    })();
}

menuController();
