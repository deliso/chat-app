

function getCurrentTime() {
    let timestamp = new Date($.now());
    let minutes = (timestamp.getMinutes()<10?'0':'') + timestamp.getMinutes(); // Attribution: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers
    return`${timestamp.getHours()}:${minutes}h`;
}

function displayWelcomePage() {

    function getCurrentDate() {
        let currentDate = new Date ($.now())
        let currentYear = currentDate.getFullYear();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let monthName = month[currentDate.getMonth()];
        let currentDay = currentDate.getDate()
        return `${monthName} ${currentDay}, ${currentYear}`; 
    }

    function displaySessionDate() {
        let sessionDate = $("<div>");
        sessionDate
            .addClass("session-date")    
            .html(getCurrentDate());
        $("#session-date-wrapper").append(sessionDate);
    };

    function displayWelcomeMsg() { 
        
        let welcomeMsg = $("<div>");
        let welcomeTimeMsg = $("<div>");
        welcomeMsg.html("Tell me, O Muse, of the man of many devices, who wandered full many ways after he had sacked the sacred citadel of Troy.");
        welcomeTimeMsg.html(getCurrentTime());
        setTimeout(function() {
            $("#welcome-message").append(welcomeMsg);
            $("#welcome-timestamp").append(welcomeTimeMsg)
        }, 1000)
    };

    displaySessionDate();
    displayWelcomeMsg();
};

function runChat() {
    
    $("form").on("submit", 

        function executeChat(event) {    
            
            //Prevents the page from refreshing on submit  
            event.preventDefault();

            function getUserInput(element) {
                let $userInput = $(element).find("[id=user-input]");
                function escapeHtml(str) { //Escapes tags to avoid XSS. Attribution: https://www.codegrepper.com/code-examples/javascript/jquery+escape+html+string
                    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                };
                let userInput = escapeHtml($userInput.val()).trim();
                return userInput;
            }

            function displayUserMsg(element) {
                let newUserMsg = $("<div>")
                    .addClass("user-message")
                    .html(getUserInput(element));
                let newUserTime= $("<div>")
                    .addClass("user-timestamp")
                    .html(getCurrentTime());
                $("#end-of-messages-wrapper").before($(newUserMsg));
                $("#end-of-messages-wrapper").before($(newUserTime));
            };

            // Resets form input on submit
            function resetForm(element) {
                $(element).trigger("reset");
            };
            
            function displayComputerMsg() {

                function generateRandomSentence () { //Attribution: https://stackoverflow.com/questions/33160766/generate-random-sentences-from-an-array-javascript
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
                    ];
                    maxSentences = sentences.length;
                    let index = Math.floor(Math.random() * (maxSentences - 1));
                    return sentences[index];
                }
                let computerRandomText = generateRandomSentence();
                let newComputerMsg = $("<div>")
                    .addClass("computer-message")
                    .html(computerRandomText);
                let newComputerTime= $("<div>")
                    .addClass("computer-timestamp")
                    .html(getCurrentTime()); 
                $("#end-of-messages-wrapper").before($(newComputerMsg));
                $("#end-of-messages-wrapper").before($(newComputerTime));
            };
            
            
            function scrollToBottom() { //Attribution: https://stackoverflow.com/questions/2346011/how-do-i-scroll-to-an-element-within-an-overflowed-div
                $("#message-log").scrollTop($("#message-log").scrollTop() + $("#end-of-messages-wrapper").position().top);
            };
            
            if (getUserInput(this) !== "") {                
                displayUserMsg(this);
                resetForm(this);
                scrollToBottom();
                setTimeout(displayComputerMsg,1000);
                setTimeout(scrollToBottom,1000);
            };
                
        }
    );

};

displayWelcomePage();
runChat();

//General scroll function (in progress) --> scrollToMessageElement($messageElement)