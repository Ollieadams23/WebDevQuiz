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

        const labels = ['A', 'B', 'C', 'D'];

        results.questions.forEach((question, index) => {
            const userAnswer = results.userAnswers[index];
            const correctAnswer = question.correctAnswer;
            const isCorrect = userAnswer === correctAnswer;

            // Create review item
            const $reviewItem = $('<div>')
                .addClass('review-item')
                .addClass(isCorrect ? 'correct' : 'incorrect');

            // Review header
            const $header = $('<div>')
                .addClass('review-header')
                .html(`
                    <span class="question-number">Question ${index + 1}</span>
                    <span class="result-icon">${isCorrect ? '✓' : '✗'}</span>
                `);

            // Question text
            const $questionText = $('<p>')
                .addClass('review-question')
                .text(question.question);

            // Answer details
            const $answersDiv = $('<div>').addClass('review-answers');

            if (userAnswer !== null) {
                const $userAnswerP = $('<p>')
                    .addClass('user-answer')
                    .html(`Your answer: <strong>${labels[userAnswer]}</strong> - ${question.options[userAnswer]}`);
                $answersDiv.append($userAnswerP);
            } else {
                const $userAnswerP = $('<p>')
                    .addClass('user-answer')
                    .html(`Your answer: <strong>Not answered</strong>`);
                $answersDiv.append($userAnswerP);
            }

            if (!isCorrect) {
                const $correctAnswerP = $('<p>')
                    .addClass('correct-answer')
                    .html(`Correct answer: <strong>${labels[correctAnswer]}</strong> - ${question.options[correctAnswer]}`);
                $answersDiv.append($correctAnswerP);
            }

            // Explanation
            const $explanation = $('<p>')
                .addClass('explanation')
                .html(`<strong>Explanation:</strong> ${question.explanation}`);

            // Append all elements
            $reviewItem.append($header);
            $reviewItem.append($questionText);
            $reviewItem.append($answersDiv);
            $reviewItem.append($explanation);

            $reviewList.append($reviewItem);
        });
    }

    // Initialize
    applyTheme();
    displayResults();
});
