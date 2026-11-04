
/* jshint esversion: 6 */
/* global $ */
// Results Page Logic - results.js
$(document).ready(function() {
    // Apply dark mode if active
    function applyTheme() {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'dark') {
            $('html').attr('data-theme', 'dark');
        }
    }

    // Dark mode toggle
    $('.darktoggle').click(function() {
        let currentTheme = $('html').attr('data-theme');
        
        if (currentTheme === 'dark') {
            $('html').removeAttr('data-theme');
            localStorage.setItem('darkMode', 'light');
        } else {
            $('html').attr('data-theme', 'dark');
            localStorage.setItem('darkMode', 'dark');
        }
    });

    // Load and display results
    function displayResults() {
        // Get results from sessionStorage
        const resultsJSON = sessionStorage.getItem('quizResults');
        
        if (!resultsJSON) {
            // No results found, redirect to home
            alert('No quiz results found. Please take a quiz first.');
            window.location.href = 'index.html';
            return;
        }

        const results = JSON.parse(resultsJSON);

        // Display score summary
        $('#score-percentage').text(results.percentage + '%');
        $('#correct-count').text(results.correctAnswers);
        $('#total-count').text(results.totalQuestions);
        $('#category-name').text(results.category);

        // Display performance message
        displayPerformanceMessage(results.percentage);

        // Display answer review
        displayAnswerReview(results);
    }

    // Display performance message based on score
    function displayPerformanceMessage(percentage) {
        let message = '';
        
        if (percentage >= 90) {
            message = '🎉 Excellent! You\'re a master!';
        } else if (percentage >= 70) {
            message = '👍 Great job! Well done!';
        } else if (percentage >= 50) {
            message = '👌 Good effort! Keep practicing!';
        } else {
            message = '📚 Keep learning! You\'ll do better next time!';
        }

        $('#performance-message p').text(message);
    }

    // Display answer review
    function displayAnswerReview(results) {
        const $reviewList = $('#review-list');
        $reviewList.empty();

        results.questions.forEach((question, index) => {
            const userAnswer = results.userAnswers[index];
            const correctAnswer = question.correctAnswer;
            let isCorrect = false;

            // Determine if answer is correct based on question type
            if (question.type === 'fill-in-blank') {
                const userAns = (userAnswer || '').toString().trim().toLowerCase();
                const correctAns = correctAnswer.toString().trim().toLowerCase();
                isCorrect = userAns === correctAns || userAns === '<' + correctAns + '>';
            } else if (question.type === 'multiple-select') {
                const userAnswersSorted = Array.isArray(userAnswer) ? userAnswer.slice().sort() : [];
                const correctAnswersSorted = correctAnswer.slice().sort();
                isCorrect = userAnswersSorted.length === correctAnswersSorted.length &&
                    userAnswersSorted.every((answer, answerIndex) =>
                        answer === correctAnswersSorted[answerIndex]);
            } else {
                isCorrect = userAnswer === correctAnswer;
            }

            // Create review item
            const $reviewItem = $('<div>')
                .addClass('review-item')
                .addClass(isCorrect ? 'correct' : 'incorrect');

            // Review header
            const $header = $('<div>').addClass('review-header')
                .append($('<span>').addClass('question-number').text('Question ' + (index + 1)))
                .append($('<span>').addClass('result-icon').text(isCorrect ? '✓' : '✗'));

            // Question text
            const $questionText = $('<p>')
                .addClass('review-question')
                .text(window.QuestionBank.displayText(question.question));

            // Answer details
            const $answersDiv = $('<div>').addClass('review-answers');

            if (question.type === 'multiple-choice' || question.type === 'multiple-select') {
                const labels = question.options.map((option, optionIndex) =>
                    String.fromCharCode(65 + optionIndex));
                const selectedIndices = question.type === 'multiple-select' ?
                    (Array.isArray(userAnswer) ? userAnswer : []) :
                    (userAnswer === null || userAnswer === undefined ? [] : [userAnswer]);
                const correctIndices = question.type === 'multiple-select' ?
                    correctAnswer : [correctAnswer];

                appendAnswerLine($answersDiv, 'user-answer', 'Your answer: ',
                    formatOptionAnswers(selectedIndices, labels, question.options));
                if (!isCorrect) {
                    appendAnswerLine($answersDiv, 'correct-answer', 'Correct answer: ',
                        formatOptionAnswers(correctIndices, labels, question.options));
                }
            } else if (question.type === 'true-false') {
                const userText = userAnswer !== null && userAnswer !== undefined ?
                    window.QuestionBank.displayText(question.options[userAnswer]) : 'Not answered';
                appendAnswerLine($answersDiv, 'user-answer', 'Your answer: ', userText);
                if (!isCorrect) {
                    appendAnswerLine($answersDiv, 'correct-answer', 'Correct answer: ',
                        window.QuestionBank.displayText(question.options[correctAnswer]));
                }
            } else if (question.type === 'fill-in-blank') {
                const userText = userAnswer !== null && userAnswer !== undefined && userAnswer !== '' ?
                    userAnswer : 'Not answered';
                appendAnswerLine($answersDiv, 'user-answer', 'Your answer: ', userText);
                if (!isCorrect) {
                    appendAnswerLine($answersDiv, 'correct-answer', 'Correct answer: ', correctAnswer);
                }
            }

            // Explanation
            const $explanation = $('<p>')
                .addClass('explanation')
                .text('Explanation: ' + window.QuestionBank.displayText(question.explanation));

            // Append all elements
            $reviewItem.append($header);
            $reviewItem.append($questionText);
            $reviewItem.append($answersDiv);
            $reviewItem.append($explanation);

            $reviewList.append($reviewItem);
        });
    }

    function appendAnswerLine($target, className, label, answer) {
        $target.append($('<p>').addClass(className).text(label + (answer || 'Not answered')));
    }

    function formatOptionAnswers(indices, labels, options) {
        if (!indices.length) {
            return 'Not answered';
        }
        return indices.map(index =>
            labels[index] + ' - ' + window.QuestionBank.displayText(options[index])
        ).join(', ');
    }

    // Initialize
    applyTheme();
    displayResults();
});
