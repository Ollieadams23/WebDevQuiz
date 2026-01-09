


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
        // Get category from URL parameter
        category = getURLParameter('category');
        
        // Get question count from localStorage or default to 10
        const storedCount = localStorage.getItem('questionCount');
        questionCount = storedCount ? parseInt(storedCount) : 10;

        // Map category to JSON file
        const categoryFiles = {
            'javascript': 'assets/questions/javascript.json',
            'uiux': 'assets/questions/uiux.json',
            'htmlcss': 'assets/questions/htmlcss.json',
            'gitgithub': 'assets/questions/gitgithub.json'
        };

        const jsonFile = categoryFiles[category];

        if (!jsonFile) {
            alert('Invalid category. Redirecting to home.');
            window.location.href = 'index.html';
            return;
        }

        // Load questions from JSON
        $.getJSON(jsonFile)
            .done(function(data) {
                quizData = data;
                startQuiz();
            })
            .fail(function() {
                alert('Error loading quiz questions. Please try again.');
                window.location.href = 'index.html';
            });
    }

    // Start the quiz
    function startQuiz() {
        // Randomize and select questions
        const allQuestions = quizData.questions;
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, questionCount);

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

        // Update progress
        $('#current-question').text(index + 1);
        const progressPercent = ((index + 1) / questionCount) * 100;
        $('#progress-fill').css('width', progressPercent + '%');

        // Display question text
        $('#question-text').text(question.question);

        // Clear and populate answer options
        const $answerOptions = $('#answer-options');
        $answerOptions.empty();

        const labels = ['A', 'B', 'C', 'D'];
        question.options.forEach((option, i) => {
            const $button = $('<button>')
                .addClass('answer-btn')
                .attr('data-answer', i)
                .html(`
                    <span class="answer-label">${labels[i]}</span>
                    <span class="answer-text">${option}</span>
                `);

            // Highlight if this answer was previously selected
            if (userAnswers[index] === i) {
                $button.addClass('selected');
            }

            $answerOptions.append($button);
        });

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

        // Next/Submit buttons
        if (currentQuestionIndex === questionCount - 1) {
            $('#next-btn').hide();
            $('#submit-btn').show();
        } else {
            $('#next-btn').show();
            $('#submit-btn').hide();
        }

        // Enable next button only if current question is answered
        if (userAnswers[currentQuestionIndex] !== null) {
            $('#next-btn').prop('disabled', false);
        } else {
            $('#next-btn').prop('disabled', true);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Answer button click
        $(document).on('click', '.answer-btn', function() {
            const selectedAnswer = parseInt($(this).attr('data-answer'));
            
            // Remove previous selection
            $('.answer-btn').removeClass('selected');
            
            // Add selection to clicked button
            $(this).addClass('selected');
            
            // Store answer
            userAnswers[currentQuestionIndex] = selectedAnswer;
            
            // Enable next button
            updateNavigationButtons();
        });

        // Previous button
        $('#prev-btn').click(function() {
            if (currentQuestionIndex > 0) {
                displayQuestion(currentQuestionIndex - 1);
            }
        });

        // Next button
        $('#next-btn').click(function() {
            if (currentQuestionIndex < questionCount - 1) {
                displayQuestion(currentQuestionIndex + 1);
            }
        });

        // Submit button
        $('#submit-btn').click(function() {
            showSubmitModal();
        });

        // Modal buttons
        $('#confirm-submit').click(function() {
            submitQuiz();
        });

        $('#cancel-submit').click(function() {
            hideSubmitModal();
        });
    }

    // Show submit confirmation modal
    function showSubmitModal() {
        const unansweredCount = userAnswers.filter(answer => answer === null).length;
        
        if (unansweredCount > 0) {
            $('#unanswered-count').text(unansweredCount);
            $('#unanswered-warning').show();
        } else {
            $('#unanswered-warning').hide();
        }

        $('#submit-modal').fadeIn();
    }

    // Hide submit modal
    function hideSubmitModal() {
        $('#submit-modal').fadeOut();
    }

    // Submit quiz and calculate results
    function submitQuiz() {
        let correctCount = 0;

        // Calculate score
        selectedQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                correctCount++;
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
