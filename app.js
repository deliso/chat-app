
//Show current date on top of message log
let currentDate = new Date ($.now())
let currentYear = currentDate.getFullYear();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let monthName = month[currentDate.getMonth()];
let currentDay = currentDate.getUTCDate() 
let sessionDate = $("<p>");
sessionDate.text(`--${monthName} ${currentDay}, ${currentYear}--`);
console.log(sessionDate);
$("#session-date").append(sessionDate);

//Show welcome message from the computer (pending delay and time)
let welcomeMsg = $("<p>");
welcomeMsg.html("<strong>Homer:</strong> Tell me, O Muse, of the man of many devices, who wandered full many ways after he had sacked the sacred citadel of Troy."
);
setTimeout(function() { 
    $("#welcome-message").append(welcomeMsg);
    }, 2000);

//Actions on submit
$("form").on("submit",function (event) {
    
    //Prevent the page from refreshing on submit
    event.preventDefault();
    
    //Find input value (message) and save it into the userInput variable
    let $userInput = $(this).find("[id=user-input]")
    let userInput = $userInput.val();
    
    //Get timestamp and parse hours and minutes
    let timeStamp = new Date($.now());
    let minutes = (timeStamp.getMinutes()<10?'0':'') + timeStamp.getMinutes();
    let time = timeStamp.getHours() + ":" + minutes + "h";
    
    //Append new paragraph to the message log div containing username (pending), message and time.
    let userText = `<strong>Muse:</strong> ${userInput} || ${time}`;
    let newUserMsg = $("<p>");
    newUserMsg.html(userText);
    $("#message-log").append(newUserMsg);
    
    // Reset form to blank
    $(this).trigger("reset");

    //Display random message from the computer
    let computerText= `<strong>Homer:</strong> Nice to see you again, my beloved friend || ${time}`;
    let newComputerMsg = $("<div>")
        .addClass("computer-message")
        .html(computerText);
    
    //Delay the computer's message by 2 seconds (pending 3 dot delay animation)
    setTimeout(function() { 
        $("#message-log").append(newComputerMsg);
        }, 2000);

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

