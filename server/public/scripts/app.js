$(document).ready(function(){
    getData();

    // Forward button
    $('#goForwardButton').on('click', goForward);

    // Back button
    $('#goBackButton').on('click', goBack);

});

var people = [];
var currentlySelectedPerson = 0;
var intervalId;

// What I would like to see on the DOM, is one person represented.
// A series of 22 (or the number of people in the cohort) index points with the
// first person's index highlighted or called out in style differently than the others. ' +
// Also on the DOM should be a 'next' and 'prev' button. ' +
// Clicking on the next button should navigate to the next person, ' +
// clicking on the prev button should navigate to the previous person. ' +
// The highlighted index point should update also as you click next and prev.
//
// When a person is displayed, show their name, their favorite movies, and favorite song.
// Only one person should be showcased at any given time.

// second commit: refactored code to pull out functions from success area
// moved event listeners to document ready section


    function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            console.log(data);

            people = data.people;

            //create number buttons
            findNumberOfPeople();

            //show first person
            showEachPerson(people, currentlySelectedPerson);

            // Make person number button clickable
            $('.personNumberButton').on('click', personNumber);

            startTimer();

        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}

// Create number buttons
// Finds the number of people in the people array from the JSON file
function findNumberOfPeople() {
    var numPeople = people.length;
    for(var i = 0; i < numPeople; i++) {
        // display number = i + 1 so you start with button 1, not 0
        var displayNumber = i + 1;
        $('.numberButtons').append('<button class="personNumberButton" id="' + i + '">' + displayNumber + '</button>');
    }
}

// displays each Person and their name, favorite Movies and Song to the DOM
function showEachPerson(peopleArray, personIndex) {
    var person = peopleArray[personIndex];
    var personHtml = '<img src="' + person.image + '"><h2>' + person.name + '</h2><p>' + person.favoriteMovie1 + '</p><p>' + person.favoriteMovie2 + '</p><p>' + person.favoriteSong + '</p>';

    // fade out current person, change to new person, then fade back in
    $('.person').fadeOut(400, function() {
        $('.person').html(personHtml);
        $('.person').fadeIn(400);
    });


    // displays currently selected person button with bold formatting
    if(personIndex == currentlySelectedPerson) {
        $('.personNumberButton').removeClass('selected');
        $('#' + currentlySelectedPerson).addClass('selected');
    }
}

function goForward() {
    if(currentlySelectedPerson >= people.length - 1) {
        currentlySelectedPerson = 0;
    } else {
        currentlySelectedPerson += 1
    }

    showEachPerson(people, currentlySelectedPerson);
    stopTimer();
    startTimer();
}

function goBack() {
    if(currentlySelectedPerson == 0) {
        currentlySelectedPerson = people.length;
    }
    currentlySelectedPerson -= 1;
    showEachPerson(people, currentlySelectedPerson);
    stopTimer();
    startTimer();
}

function personNumber() {
    currentlySelectedPerson = parseInt(this.id);
    showEachPerson(people, currentlySelectedPerson);
    stopTimer();
    startTimer();
}

// PRO MODE: timer to advance to the next person if no button has been clicked
function startTimer() {
    intervalId = setInterval(function() {
        if(currentlySelectedPerson >= people.length - 1) {
            console.log('intervalId: ' + intervalId);
            return;
        } else {
            console.log('intervalId: ' + intervalId);
            currentlySelectedPerson += 1;
        }
        showEachPerson(people, currentlySelectedPerson);
    }, 10000);
}

function stopTimer() {
    clearInterval(intervalId);
    console.log('stop intervalId: ' + intervalId);
}
