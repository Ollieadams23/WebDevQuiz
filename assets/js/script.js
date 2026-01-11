
/* jshint esversion: 6 */

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


//topic links
$('#jsfund').click(function() {
    window.location.href = 'quiz.html?category=javascript';
});

$('#uiux').click(function() {
    window.location.href = 'quiz.html?category=uiux';
});

$('#htmlcss').click(function() {
    window.location.href = 'quiz.html?category=htmlcss';
});

$('#gitgithub').click(function() {
    window.location.href = 'quiz.html?category=gitgithub';
});
