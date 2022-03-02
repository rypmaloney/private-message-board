let upvoteButtons = document.querySelectorAll(".upvote-btn");
upvoteButtons.forEach((button) => {
    button.addEventListener("click", () => upvote(button.id));
});

function upvote(id) {
    var xml = new XMLHttpRequest();
    xml.open("POST", `/board/message/like/${id}`, true);
    xml.send();

    let likedButton = document.getElementById(id);
    likedButton.classList.add("upvoted");

    let upvoteNumber = document.getElementById(`upvote-number-${id}`);
    if (upvoteNumber === 0) {
        upvoteNumber.textContent = 1;
    } else {
        let newUpvoteNumber = parseInt(upvoteNumber.textContent);
        upvoteNumber.textContent = newUpvoteNumber += 1;
    }
}
