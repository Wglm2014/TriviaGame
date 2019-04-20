$(document).ready(function () {
    var questions = {
        q1: {
            question: "which state the Dukes of Hazard are from? ",
            options: ["Colorado", "Texas", "Nevada", "Atlanta"],
            answer: "Atlanta",
            url: "./assets/images/thedukes.jpg"

        },
        q2: {
            question: "which movie Mel Gibson produce that won an Oscar",
            options: ["The Patriot", "Brave Heart", "Mad Max", "Master and Comander"],
            answer: "Brave Heart",
            url: "./assets/images/melgiveson.jpg"
        },
        q3: {
            question: "What country is Charlize Theron originary from",
            options: ["Canada", "England", "Australia", "Sudafrica"],
            answer: "Sudafrica",
            url: "./assets/images/charlize.jpg"
        },
        q4: {
            question: "Who is the main actres in the movie El Zorro",
            options: ["Salma Hayek", "Catherine Z Jones", "Charlize Theron", "Penelope Cruz"],
            answer: "Catherine Z Jones",
            url: "./assets/images/catherine.jpg"
        }
    }
    var interval;
    var theQuestions = [];
    var theQuestion = "";
    var question = "";
    var options = [];
    var answer = "";
    var url = "";
    var questionCounter = 0;
    var wrong = 0;
    var rigth = 0;
    var countDown;
    //setting body heith
    $("body").height($(window).height());
    $("body").width($(window).width());

    $("#btn-play").on("click", function () {
        changeContent();
    });

    function changeContent() {
        //hide the button
        $("#play").hide();
        //display the counter
        $("#counter").html(`<h1>
                                Time remainding
                                <span id="counterSpan"> </span> 
                                seconds left </h1>`);
        //loads the questions to iterate
        theQuestions = Object.keys(questions);
        theQuestion = theQuestions[questionCounter];
        displayQuestions();
    }

    function timer() {
        countDown--;
        $("#counterSpan").text(countDown);
        if (countDown === 0) {
            nextQuestion();
        }
    }
    function endGame() {
        clearInterval(interval);
        $("#counter").html("");
        $("#questionary").html("");
        $("#play").show();
        questionCounter = 0;
    }
    function displayQuestions() {
        //retrieve the first question and its values
        question = questions[theQuestion]["question"];
        options = questions[theQuestion]["options"];
        answer = questions[theQuestion]["answer"];
        url = questions[theQuestion]["url"];
        $("#questionary").html("");
        $("#questionary").append(`<h3>${question}</h3>`);
        options.forEach(element => {
            $("#questionary").append(`<option class = "selection" value ="${element}">
            ${element}</option>`);
        });
        countDown = 20;
        interval = setInterval(timer, 1000);
    }
    // evaluating if answer wa right or wrong and adding to next question
    function nextQuestion(pushed) {
        questionCounter++;
        theQuestion = theQuestions[questionCounter];
        var t;
        //determines the wright or wrong answer
        var result = "";
        if (pushed === answer) {
            console.log(url);
            result = `<h1>Yesss</h1>`;
            rigth++;
        } else {
            result = `<h1> NOOOOPPPEEE</h1>`;
            wrong++;
        }
        result += ` <img src = "${url}" class = "image-responsive image" alt = "YESSSS SCORE" >`;
        $("#questionary").html(result);
        // starts timer to give enough time to see the pictures before the next question
        var endTimer = 1;
        var t = setInterval(function () {
            endTimer--;
            if (endTimer === 0) {
                if (questionCounter < theQuestions.length) {
                    clearInterval(interval); // clear the last interval before starting a new one
                    displayQuestions();
                } else {
                    endGame();
                }
                clearInterval(t);
            }
        }
            , 1000);
    }

    //$(staticAncestors).on(eventName, dynamicChild, function() {});

    $("#questionary").on("click", ".selection", function () {
        nextQuestion($(this).attr("value"));
    });

    //resizing the container and the body
    $(window).resize(function () {
        $("body").height($(window).height());
        $("body").width($(window).width());
    });

}); // end main process