
/* jshint esversion: 6 */
/* global $ */

$(document).ready(function() {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'dark') {
        $('html').attr('data-theme', 'dark');
    }
    // Check if there's a stored question count
    let storedCount = localStorage.getItem('questionCount');
    
    if (storedCount === '10') {
        $('#amount10').addClass('active');
        $('#amount20').removeClass('active');
    } else if (storedCount === '20') {
        $('#amount20').addClass('active');
        $('#amount10').removeClass('active');
    }
    // If nothing stored, no button is selected (default state)

    if ($('#topic-links').length) {
        loadQuestionTopics();
    }
});

// Question Amount make buttons active
$('#amount10').click(function() {
    $('#amount10').addClass('active');
    $('#amount20').removeClass('active');
    localStorage.setItem('questionCount', 10);
    
});

$('#amount20').click(function() {
    $('#amount20').addClass('active');
    $('#amount10').removeClass('active');
    localStorage.setItem('questionCount', 20);
    
});

// Dark Mode Toggle
$('.darktoggle').click(function() {
    let currentTheme = $('html').attr('data-theme');
    
    if (currentTheme === 'dark') {
        // Switch to light
        $('html').removeAttr('data-theme');
        localStorage.setItem('darkMode', 'light');
    } else {
        // Switch to dark
        $('html').attr('data-theme', 'dark');
        localStorage.setItem('darkMode', 'dark');
    }
});


function loadQuestionTopics() {
    const $topicLinks = $('#topic-links');

    window.QuestionBank.getQuestionFiles()
        .then(function(files) {
            $topicLinks.empty();

            if (!files.length) {
                $topicLinks.append($('<li>').text('No quiz topics were found.'));
                return;
            }

            files.forEach(function(file) {
                const $link = $('<a>')
                    .attr('href', 'quiz.html?category=' + encodeURIComponent(file))
                    .text(window.QuestionBank.getCategoryLabel(file));
                $topicLinks.append($('<li>').append($link));
            });
        })
        .catch(function(error) {
            console.error('Unable to load quiz topics:', error);
            $topicLinks.empty().append(
                $('<li>').text('Quiz topics could not be loaded: ' + error.message)
            );
        });
}
