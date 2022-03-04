let upvoteButtons = document.querySelectorAll(".upvote-btn");
upvoteButtons.forEach((button) => {
    button.addEventListener("click", () => upvote(button.id));
});

function upvote(id) {
    //Set up new XML HTTP request
    //Middleware function increments upvote in the server
    var xml = new XMLHttpRequest();
    xml.open("POST", `/board/message/like/${id}`, true);
    xml.send();

    //Increase the upvote number without refreshing the page with a normal POST request
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
