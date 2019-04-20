$(document).ready(function () {
    var questions = {
        q1: {
            question: "which state the Dukes of Hazard are from? ",
            options: ["Colorado", "Texas", "Nevada", "Atlanta"],
            answer: "Atlanta",
            url: "../images/thedukes"

        },
        q2: {
            question: "which movie Mel Gibson produce that won an Oscar",
            options: ["The Patriot", "Brave Heart", "Mad Max", "Master and Comander"],
            answer: "Brave Heart",
            url: "../images/melgiveson"
        }
    }
    var btnDisplay = $("#play").css("display");
    var countDown = 60;
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

    //setting body heith
    $("body").height($(window).height());
    $("body").width($(window).width());

    $("#btn-play").on("click", function () {
        changeContent();
    });

    function changeContent() {
        //hide the button
        $("#play").css("display", "none");
        //display the counter
        $("#counter").html(`<h1>
                                Time remainding
                                <span id="counterSpan"> </span> 
                                seconds left </h1>`);
        //loads the questions to iterate
        theQuestions = Object.keys(questions);
        theQuestion = theQuestions[questionCounter];
        interval = setInterval(timer, 1000);
        displayQuestions();
    }

    function timer() {
        countDown--;
        $("#counterSpan").text(countDown);
        if (countDown === 0) {
            clearInterval(interval);
            $("#counter").html("");
            $("#questionay").html("");
            $("#play").css("display", btnDisplay);
        }
    }

    function displayQuestions() {
        //retrieve the first question and its values
        console.log(question + " " + questionCounter);
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
    }
    // evaluating if answer wa right or wrong and adding to next question
    function nextQuestion(pushed) {
        questionCounter++;
        theQuestion = theQuestions[questionCounter];
        if (pushed === answer) {
            var t = setTimeout(function () { $("#questionary").html(`<img src="${url}" class ="image-responsive image"`) }, 500);
            clearTimeout(t);
            rigth++;
            console.log(rigth);
        } else {
            setTimeout(function () { $("#questionary").html(`<h1 class = "nope">NOOOOPPPEEE</h1>`) }, 500);
            wrong++;
            console.log(wrong);
        }
        if (questionCounter < theQuestions.length) {
            setTimeout(displayQuestions(), 1000);
        }
    };

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