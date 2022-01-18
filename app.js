
//Show current date on top of message log
let currentDate = new Date ($.now())
let currentYear = currentDate.getFullYear();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let monthName = month[currentDate.getMonth()];
let currentDay = currentDate.getUTCDate() //Uses UTC (not GMT+1)
let sessionDate = $("<div>");
sessionDate
    .addClass("session-date")    
    .html(`${monthName} ${currentDay}, ${currentYear}`);
$("#session-date-wrapper").append(sessionDate);

//Show welcome message from the computer
let welcomeTimestamp = new Date($.now());
    let welcomeMinutes = (welcomeTimestamp.getMinutes()<10?'0':'') + welcomeTimestamp.getMinutes(); //Pending attribution
    let welcomeTime = welcomeTimestamp.getHours() + ":" + welcomeMinutes + "h"; //Uses GMT+1
let welcomeMsg = $("<div>");
let welcomeTimeMsg = $("<div>");
welcomeMsg.html("Tell me, O Muse, of the man of many devices, who wandered full many ways after he had sacked the sacred citadel of Troy."
);
welcomeTimeMsg.html(welcomeTime);

setTimeout(function() { 
    $("#welcome-message").append(welcomeMsg);
    $("#welcome-timestamp").append(welcomeTimeMsg);
    }, 1000);


//Generate random sentence (https://stackoverflow.com/questions/33160766/generate-random-sentences-from-an-array-javascript)
let sentences= [
    'So, surrender to sleep at last. What a misery, keeping watch through the night, wide awake -- you’ll soon come up from under all your troubles.',
    'Nobody -- that’s my name. Nobody -- so my mother and father call me, all my friends.',
    'Her gifts were mixed with good and evil both.',
    'Man is the vainest of all creatures that have their being upon earth.',
    'There is a time for making speeches, and a time for going to bed.',
    'For there is nothing better in this world than that man and wife should be of one mind in a house.',
    'Quick, dear boy, come in, let me look at you, look to my heart’s content -- under my own roof, the rover home at last.',
    'But I will gladly advise him -- I’ll hide nothing--',
    'I swear by the greatest, grimmest oath that binds the happy gods.',
    'My every impulse bends to what is right. Not iron, trust me, the heart with my breast. I am all compassion.',
],

maxSentences = sentences.length;

function generateRandomSentence () {
    let index = Math.floor(Math.random() * (maxSentences - 1));
    return sentences[index];
    
}

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
    let time = timeStamp.getHours() + ":" + minutes + "h"; //Uses GMT+1
    
    //Prevent sending empty messages
    if (($userInput.val().trim()) !== "") {
    
        //Add new paragraph (before end of message log). Pending message log div containing username, message and time.
        let newUserMsg = $("<div>")
            .addClass("user-message")
            .html(userInput);
        let newUserTime= $("<div>")
            .addClass("user-timestamp")
            .html(time);
        $("#end-of-messages-wrapper").before($(newUserMsg));
        $("#end-of-messages-wrapper").before($(newUserTime));
        //After new user message, scroll to the end of the message log (https://stackoverflow.com/questions/2346011/how-do-i-scroll-to-an-element-within-an-overflowed-div)
        $("#message-log").scrollTop($("#message-log").scrollTop() + $("#end-of-messages-wrapper").position().top)
        
        // Reset form to blank
        $(this).trigger("reset");

        //Display random message from the computer
        let computerRandomText = generateRandomSentence();
        let newComputerMsg = $("<div>")
            .addClass("computer-message")
            .html(computerRandomText);
        let newComputerTime= $("<div>")
            .addClass("computer-timestamp")
            .html(time);
        
        //Delay the computer's message by 2 seconds (pending 3 dot delay animation)
        setTimeout(function() { 
            $("#end-of-messages-wrapper").before($(newComputerMsg))
            $("#end-of-messages-wrapper").before($(newComputerTime)) 
        //After new computer message, scroll to the end of the message log
            $("#message-log").scrollTop($("#message-log").scrollTop() + $("#end-of-messages-wrapper").position().top)
            }, 1000);
        
        }
    
    //General scroll function (in progress) --> scrollToMessageElement($messageElement)

});