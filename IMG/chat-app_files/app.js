
$("form").on("submit",function (event) {
    event.preventDefault();
    let $userInput = $(this).find("[id=user-input]")
    let userInput = $userInput.val();
    let timeStamp = new Date($.now());
    let minutes = (timeStamp.getMinutes()<10?'0':'') + timeStamp.getMinutes();
    let time = timeStamp.getHours() + ":" + minutes + "h";
    let msgText = `User said: ${userInput} || ${time}`;
    let newMsg = $("<p>");
    newMsg.text(msgText);
    $("#message-log").append(newMsg);
    $(this).trigger("reset");
})



//Comment out previous js to add jquery version

/*let form = document.getElementById("new-message");
form.addEventListener("submit", function(event) {
    
    event.preventDefault();
    
    let userInput = document.getElementById("user-input").value;
    console.log(userInput);
    
    let userTag = document.createElement("p")
    
    let currentDate = new Date();
    let timeHours = currentDate.getHours();
    let timeMinutes = currentDate.getMinutes();

    let userText = document.createTextNode(`User: ${userInput} | ${timeHours}:${timeMinutes}`);
    
    userTag.appendChild(userText);
    
    let messageLog = document.getElementById("message-log");
    
    messageLog.append(userTag);
    
    let computerTag = document.createElement("p")
    
    let computerText = document.createTextNode("Computer: Very nice")
    
    computerTag.appendChild(computerText);
    
    messageLog.append(computerTag);
    
    form.reset()
})*/

