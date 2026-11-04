
/* jshint esversion: 6 */
/* global $ */

// Quiz Logic - quiz.js
$(document).ready(function() {
    // Quiz state variables
    let quizData = null;
    let selectedQuestions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let category = '';
    let questionCount = 10;

    // Get URL parameters
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Initialize quiz
    function initQuiz() {
        // Get category from the question file name.
        category = getURLParameter('category');

        if (!category || !/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(category)) {
            alert('Invalid category. Redirecting to home.');
            window.location.href = 'index.html';
            return;
        }

        // Get question count from localStorage or default to 10.
        const storedCount = localStorage.getItem('questionCount');
        const parsedCount = parseInt(storedCount, 10);
        questionCount = parsedCount === 20 ? 20 : 10;
        const jsonFile = 'assets/questions/' + encodeURIComponent(category) + '.json';

        // Load questions from JSON
        $.getJSON(jsonFile)
            .done(function(data) {
                quizData = data;
                if (!isValidQuestionBank(data)) {
                    alert('This question file is not in the supported format. Please check the question bank.');
                    window.location.href = 'index.html';
                    return;
                }
                startQuiz();
            })
            .fail(function() {
                alert('Error loading quiz questions. Please try again.');
                window.location.href = 'index.html';
            });
    }

    function isValidQuestionBank(data) {
        return data && typeof data.category === 'string' &&
            Array.isArray(data.questions) && data.questions.length > 0 &&
            data.questions.every(function(question) {
                if (!question || typeof question.question !== 'string' ||
                    typeof question.explanation !== 'string') {
                    return false;
                }

                if (question.type === 'fill-in-blank') {
                    return typeof question.correctAnswer === 'string' ||
                        typeof question.correctAnswer === 'number';
                }

                if (!Array.isArray(question.options) || question.options.length < 2 ||
                    question.options.length > 26) {
                    return false;
                }

                if (question.type === 'multiple-select') {
                    return Array.isArray(question.correctAnswer) &&
                        question.correctAnswer.length > 0 &&
                        question.correctAnswer.every(function(answer) {
                            return Number.isInteger(answer) && answer >= 0 &&
                                answer < question.options.length;
                        });
                }

                return (question.type === 'multiple-choice' ||
                    question.type === 'true-false') &&
                    Number.isInteger(question.correctAnswer) &&
                    question.correctAnswer >= 0 &&
                    question.correctAnswer < question.options.length;
            });
    }

    // Start the quiz
    // This function randomizes questions and initializes the quiz state
    function startQuiz() {
        // Randomize and select questions
        const allQuestions = quizData.questions.slice();
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        questionCount = Math.min(questionCount, shuffled.length);
        selectedQuestions = shuffled.slice(0, questionCount);

        // Shuffle answer options only for multiple-choice questions
        selectedQuestions.forEach(question => {
            if (question.type === 'multiple-choice' || question.type === 'multiple-select') {
                // Create array of option objects with original index
                const optionsWithIndex = question.options.map((option, index) => ({
                    text: option,
                    isCorrect: Array.isArray(question.correctAnswer) ?
                        question.correctAnswer.includes(index) : index === question.correctAnswer
                }));

                // Shuffle the options
                const shuffledOptions = optionsWithIndex.sort(() => 0.5 - Math.random());

                // Update question with shuffled options and new correct answer index
                question.options = shuffledOptions.map(opt => opt.text);
                const correctAnswers = [];
                shuffledOptions.forEach((option, index) => {
                    if (option.isCorrect) {
                        correctAnswers.push(index);
                    }
                });
                question.correctAnswer = question.type === 'multiple-select' ?
                    correctAnswers : correctAnswers[0];
            }
            // true-false and fill-in-blank questions don't need shuffling
        });

        // Initialize user answers array
        userAnswers = new Array(questionCount).fill(null);

        // Update total questions display
        $('#total-questions').text(questionCount);

        // Display first question
        displayQuestion(0);

        // Set up event listeners
        setupEventListeners();
    }

    // Display a question
    function displayQuestion(index) {
        currentQuestionIndex = index;
        const question = selectedQuestions[index];

        // Hide validation error
        $('#validation-error').hide();

        // Update progress
        $('#current-question').text(index + 1);
        const progressPercent = ((index + 1) / questionCount) * 100;
        $('#progress-fill').css('width', progressPercent + '%');

        // Display question text
        $('#question-text').text(window.QuestionBank.displayText(question.question));

        // Clear and populate answer options
        const $answerOptions = $('#answer-options');
        $answerOptions.empty();

        if (question.type === 'multiple-choice' || question.type === 'multiple-select') {
            const labels = question.options.map((option, i) => String.fromCharCode(65 + i));
            if (question.type === 'multiple-select') {
                $('#question-instruction').text('Select all that apply.');
            } else {
                $('#question-instruction').empty();
            }
            question.options.forEach((option, i) => {
                const isSelected = question.type === 'multiple-select' ?
                    Array.isArray(userAnswers[index]) && userAnswers[index].includes(i) :
                    userAnswers[index] === i;
                const $button = $('<button>')
                    .addClass('answer-btn')
                    .attr('data-answer', i)
                    .attr('aria-pressed', isSelected ? 'true' : 'false');
                $button.append($('<span>').addClass('answer-label').text(labels[i]));
                $button.append($('<span>').addClass('answer-text')
                    .text(window.QuestionBank.displayText(option)));

                // Highlight if this answer was previously selected
                if (isSelected) {
                    $button.addClass('selected');
                }

                $answerOptions.append($button);
            });
        } else if (question.type === 'true-false') {
            $('#question-instruction').empty();
            // Display 2 buttons for true-false
            const labels = ['True', 'False'];
            question.options.forEach((option, i) => {
                const $button = $('<button>')
                    .addClass('answer-btn')
                    .attr('data-answer', i)
                    .attr('aria-pressed', userAnswers[index] === i ? 'true' : 'false')
                    .append($('<span>').addClass('answer-label').text(labels[i]));

                // Highlight if this answer was previously selected
                if (userAnswers[index] === i) {
                    $button.addClass('selected');
                }

                $answerOptions.append($button);
            });
        } else if (question.type === 'fill-in-blank') {
            $('#question-instruction').empty();
            // Display text input for fill-in-blank
            const $input = $('<input>')
                .attr('type', 'text')
                .attr('id', 'fill-in-input')
                .addClass('fill-in-input')
                .attr('placeholder', 'Type your answer here...')
                .val(userAnswers[index] || '');

            const $label = $('<label>')
                .attr('for', 'fill-in-input')
                .text('Your Answer:')
                .addClass('fill-in-label');

            $answerOptions.append($label);
            $answerOptions.append($input);

            // Focus the input
            setTimeout(() => $input.focus(), 100);
        }

        // Update navigation buttons
        updateNavigationButtons();
    }

    // Update navigation button states
    function updateNavigationButtons() {
        // Previous button
        if (currentQuestionIndex === 0) {
            $('#prev-btn').prop('disabled', true);
        } else {
            $('#prev-btn').prop('disabled', false);
        }

        if (currentQuestionIndex === questionCount - 1) {
            $('#next-btn').text('Submit Quiz');
        } else {
            $('#next-btn').text('Next →');
        }

        $('#next-btn').show().prop('disabled', false);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Answer button click
        $(document).on('click', '.answer-btn', function() {
            const selectedAnswer = parseInt($(this).attr('data-answer'));
            
            // Hide validation error
            $('#validation-error').hide();
            
            const question = selectedQuestions[currentQuestionIndex];
            if (question.type === 'multiple-select') {
                const selectedAnswers = Array.isArray(userAnswers[currentQuestionIndex]) ?
                    userAnswers[currentQuestionIndex].slice() : [];
                const selectedIndex = selectedAnswers.indexOf(selectedAnswer);
                if (selectedIndex === -1) {
                    selectedAnswers.push(selectedAnswer);
                } else {
                    selectedAnswers.splice(selectedIndex, 1);
                }
                userAnswers[currentQuestionIndex] = selectedAnswers.length ? selectedAnswers : null;
                $(this).toggleClass('selected', selectedIndex === -1)
                    .attr('aria-pressed', selectedIndex === -1 ? 'true' : 'false');
            } else {
                $('.answer-btn').removeClass('selected').attr('aria-pressed', 'false');
                $(this).addClass('selected').attr('aria-pressed', 'true');
                userAnswers[currentQuestionIndex] = selectedAnswer;
            }
            
            // Enable next button
            updateNavigationButtons();
            
        });

        // Fill-in-blank input handling
        $(document).on('input', '#fill-in-input', function() {
            const inputValue = $(this).val().trim();
            
            // Hide validation error
            $('#validation-error').hide();
            
            // Store answer
            userAnswers[currentQuestionIndex] = inputValue;
            
            // Enable next button
            updateNavigationButtons();
        });

        // Handle Enter key for fill-in-blank
        $(document).on('keypress', '#fill-in-input', function(e) {
            if (e.which === 13) { // Enter key
                e.preventDefault();
                
                $('#next-btn').click();
            }
        });

        // Previous button
        $('#prev-btn').click(function() {
            if (currentQuestionIndex > 0) {
                displayQuestion(currentQuestionIndex - 1);
            }
        });

        // Next button
        $('#next-btn').click(function() {
            // Check if answer is provided
            const answer = userAnswers[currentQuestionIndex];
            const isAnswered = answer !== null && answer !== undefined && answer !== '';
            
            if (!isAnswered) {
                // Show validation error
                $('#validation-error').show();
                return;
            }

            if (currentQuestionIndex === questionCount - 1) {
                if (window.confirm('Submit your quiz?')) {
                    submitQuiz();
                }
            } else {
                displayQuestion(currentQuestionIndex + 1);
            }
        });
    }

    // Submit quiz and calculate results
    function submitQuiz() {
        let correctCount = 0;

        // Calculate score
        selectedQuestions.forEach((question, index) => {
            if (question.type === 'fill-in-blank') {
                // Case-insensitive string comparison for fill-in-blank
                const userAnswer = (userAnswers[index] || '').toString().trim().toLowerCase();
                const correctAnswer = question.correctAnswer.toString().trim().toLowerCase();
                if (userAnswer === correctAnswer || userAnswer === '<' + correctAnswer + '>') {
                    correctCount++;
                }
            } else if (question.type === 'multiple-select') {
                const selectedAnswers = Array.isArray(userAnswers[index]) ?
                    userAnswers[index].slice().sort() : [];
                const correctAnswers = question.correctAnswer.slice().sort();
                if (selectedAnswers.length === correctAnswers.length &&
                    selectedAnswers.every((answer, answerIndex) => answer === correctAnswers[answerIndex])) {
                    correctCount++;
                }
            } else {
                // Direct comparison for multiple-choice and true-false
                if (userAnswers[index] === question.correctAnswer) {
                    correctCount++;
                }
            }
        });

        // Prepare results data
        const results = {
            category: quizData.category,
            totalQuestions: questionCount,
            correctAnswers: correctCount,
            percentage: Math.round((correctCount / questionCount) * 100),
            questions: selectedQuestions,
            userAnswers: userAnswers
        };

        // Store results in sessionStorage
        sessionStorage.setItem('quizResults', JSON.stringify(results));

        // Redirect to results page
        window.location.href = 'results.html';
    }

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

    // Initialize
    applyTheme();
    initQuiz();
});
