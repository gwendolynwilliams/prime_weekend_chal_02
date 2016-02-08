$(document).ready(function(){
    getData();
});

var currentlySelectedPerson = 0;
//var id;
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


    function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            console.log(data);
            findNumberOfPeople(data);
            showEachPerson(data.people, currentlySelectedPerson);

            // Forward button
            $('#goForward').on('click', function() {
                if(currentlySelectedPerson >= data.people.length - 1) {
                    //console.log('CurrentlySelectedPerson: ' + currentlySelectedPerson);
                    return;
                } else {
                    currentlySelectedPerson += 1;
                }

                showEachPerson(data.people, currentlySelectedPerson);
                stopTimer();
                startTimer(data);
            });

            // Back button
            $('#goBack').on('click', function() {
                if(currentlySelectedPerson == 0) {
                    return;
                }
                currentlySelectedPerson -= 1;
                showEachPerson(data.people, currentlySelectedPerson);
                stopTimer();
                startTimer(data);
            });

            // Make person number button clickable
            $('.personNumber').on('click', function() {
                currentlySelectedPerson = parseInt(this.id);
                showEachPerson(data.people, currentlySelectedPerson);
                stopTimer();
                startTimer(data);
            });

            startTimer(data);

        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}

// Finds the number of people in the people array from the JSON file
// Creates number buttons
function findNumberOfPeople(data) {
    var numPeople = data.people.length;
    for(var i = 0; i < numPeople; i++) {
        var displayNumber = parseInt(i) + 1;
        $('.numberButtons').append('<button class="personNumber" id="' + i + '">' + displayNumber + '</button>');
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
    if( personIndex == currentlySelectedPerson) {
        $('.personNumber').removeClass('selected');
        $('#' + currentlySelectedPerson).addClass('selected');
    }
}

// PRO MODE: timer to advance to the next person if no button has been clicked
function startTimer(data) {
    intervalId = setInterval(function() {
        if(currentlySelectedPerson >= data.people.length - 1) {
            console.log('intervalId: ' + intervalId);
            return;
        } else {
            console.log('intervalId: ' + intervalId);
            currentlySelectedPerson += 1;
        }
        showEachPerson(data.people, currentlySelectedPerson);
    }, 10000);
}

function stopTimer() {
    clearInterval(intervalId);
    console.log('stop intervalId: ' + intervalId);
}
