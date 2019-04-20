$(document).ready(function () {
    //setting body heith
    $("body").height($(window).height());
    $("body").width($(window).width());

    var btnDisplay = $("#play").css("display");
    var countDown = 60;
    var interval;
    var theQuestions = [];
    var question = "";
    var options = [];
    var answer = "";
    var url = "";
    var questionCounter = 0;

    $("#btn-play").on("click", function () {
        changeContent();
    });

    function changeContent() {

        $("#play").css("display", "none");
        $("#questionary").html(`<h1>
                                Time remainding
                                <span id="counter"> </span> 
                                seconds left </h1>`);
        theQuestions = Object.keys(questions);
        interval = setInterval(timer, 1000);
        displayQuestions();
    }

    function timer() {
        countDown--;
        $("#counter").text(countDown);
        if (countDown === 0) {
            console.log("error");
            clearInterval(interval);
            $("#questionay").html("");
            $("#play").css("display", btnDisplay);
        }
    }

    function displayQuestions() {
        //retrieve the first question and its values
        question = Object.values(questions[theQuestions[questionCounter]]["question"]);
        options = Object.values(questions[theQuestions[questionCounter]]["options"]);
        answer = Object.values(questions[theQuestions[questionCounter]]["answer"]);
        url = Object.values(questions[theQuestions[questionCounter]]["url"]);

        $("#questionary").append(`<h3>${question.join("")}</h3>`);
        options.forEach(element => {
            $("#questionary").append(`<option class = "selection" value ="${element}">
            ${element}</option>`);
        });
    }
    // evaluating if answer wa right or wrong and adding to next question
    function nextQuestion(pushed) {
        questionCounter++;
        if (pushed === answer) {
            setTimeout(function () { $("#questionary").html(`<img src=${url} class = "image-responsive image">`); }, 3000);
            rigth++;
        } else {
            setTimeout(function () { $("#questionary").html(`<h1 class = "nope">NOOOOPPPEEE</h1>`); }, 3000);
            wrong++;
        }
        if (questionCounter <= theQuestions.length) {
            displayQuestions();
        }
    };


    $(".selection").on("click", function () {
        console.log($(this).text());
    });
    var questions = {
        q1: {
            question: "which state the Dukes of Hazard are from? ",
            options: ["Colorado", "Texas", "Nevada", "Atlanta"],
            answer: "Atlanta",
            url: "https://giphy.com/gifs/4uqOvaKHcdntC/html5"

        },
        q2: {
            question: "which movie Mel Gibson produce that won an Oscar",
            options: ["The Patriot", "Brave Heart", "Mad Max", "Master and Comander"],
            answer: "Brave Heart",
            url: "https://giphy.com/gifs/7bovEc0yoXlOE/html5"
        }
    }
    //resizing the container and the body
    $(window).resize(function () {
        $("body").height($(window).height());
        $("body").width($(window).width());
    });

}); // end main process