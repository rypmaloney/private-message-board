function menuController() {
    //Close menu when clicking away from it
    // (function () {
    //     window.addEventListener("mouseover", clickAway);
    //     function clickAway(e) {
    //         if (e.target.matches(".main")) {
    //             let dropdown = document.getElementsByClassName("menu-item");
    //             for (let i = 0; i < dropdown.length; i++) {
    //                 if (dropdown[i].classList.contains("showMobile")) {
    //                     dropdown[i].classList.remove("showMobile");
    //                 }
    //             }
    //         }
    //     }
    // })();

    //Mobile menu expand
    (function () {
        let menuBtn = document.getElementById("menu-opener");
        menuBtn.addEventListener("click", () => expandMenu());
        function expandMenu() {
            let menuItem = document.getElementById("side-menu");
            menuItem.classList.toggle("open");
        }
    })();
}

function likeController() {}

menuController();
