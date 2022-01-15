let form = document.getElementById("new-message");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let userInput = document.getElementById("user-input").value;
    console.log(userInput);
    let userTag = document.createElement("p")
    let userText = document.createTextNode("User: " + userInput)
    userTag.appendChild(userText);
    let messageLog = document.getElementById("message-log");
    messageLog.append(userTag);
    let computerTag = document.createElement("p")
    let computerText = document.createTextNode("Computer: Very nice")
    computerTag.appendChild(computerText);
    messageLog.append(computerTag);
    form.reset()
})

