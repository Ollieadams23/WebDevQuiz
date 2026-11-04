/* global window, document, fetch, DOMParser, URL */
(function(global) {
    const questionsDirectory = 'assets/questions/';
    const githubRepository = document.querySelector('meta[name="github-repository"]');

    const categoryLabels = {
        javascript: 'JavaScript Fundamentals',
        uiux: 'UI/UX Design',
        htmlcss: 'HTML & CSS Basics',
        gitgithub: 'Git & GitHub',
        sql: 'SQL Fundamentals',
        django: 'Django Fundamentals',
        aws: 'AWS'
    };

    const wordLabels = {
        api: 'API',
        aws: 'AWS',
        css: 'CSS',
        django: 'Django',
        git: 'Git',
        github: 'GitHub',
        html: 'HTML',
        javascript: 'JavaScript',
        sql: 'SQL',
        ui: 'UI',
        ux: 'UX'
    };

    function normalizeFileNames(names) {
        return names
            .filter(name => /^[a-z0-9]+(?:[-_][a-z0-9]+)*\.json$/i.test(name))
            .map(name => name.replace(/\.json$/i, ''))
            .filter((name, index, list) => list.indexOf(name) === index)
            .sort((left, right) => left.localeCompare(right));
    }

    function listFromDirectoryPage() {
        if (global.location.protocol === 'file:') {
            return Promise.reject(new Error('Open the app through a local web server to load quiz topics.'));
        }

        return fetch(questionsDirectory)
            .then(response => {
                if (!response.ok) {
                    throw new Error('The local server could not list the questions directory.');
                }
                return response.text();
            })
            .then(html => {
                const directoryUrl = new URL(questionsDirectory, global.location.href);
                const listing = new DOMParser().parseFromString(html, 'text/html');
                const names = Array.from(listing.querySelectorAll('a[href]'))
                    .map(link => new URL(link.getAttribute('href'), directoryUrl))
                    .filter(url => url.pathname.startsWith(directoryUrl.pathname))
                    .map(url => url.pathname.slice(directoryUrl.pathname.length))
                    .filter(name => name && !name.includes('/'));
                const files = normalizeFileNames(names.map(name => decodeURIComponent(name)));

                if (!files.length) {
                    throw new Error('The local server did not provide a listing for the questions directory.');
                }
                return files;
            });
    }

    function listFromGitHub() {
        if (!githubRepository || !/^[\w.-]+\/[\w.-]+$/.test(githubRepository.content)) {
            return Promise.reject(new Error('The GitHub repository is not configured for question discovery.'));
        }

        const apiUrl = 'https://api.github.com/repos/' + githubRepository.content +
            '/contents/assets/questions';

        return fetch(apiUrl, {
            headers: { Accept: 'application/vnd.github+json' }
        }).then(response => {
            if (!response.ok) {
                throw new Error('GitHub question discovery failed with HTTP ' + response.status + '.');
            }
            return response.json();
        }).then(entries => {
            if (!Array.isArray(entries)) {
                throw new Error('GitHub returned an invalid questions directory listing.');
            }
            return normalizeFileNames(entries
                .filter(entry => entry.type === 'file')
                .map(entry => entry.name));
        });
    }

    function getQuestionFiles() {
        const isLocalServer = global.location.hostname === 'localhost' ||
            global.location.hostname === '127.0.0.1' ||
            global.location.hostname === '[::1]';

        return isLocalServer ? listFromDirectoryPage() : listFromGitHub();
    }

    function getCategoryLabel(slug) {
        if (categoryLabels[slug.toLowerCase()]) {
            return categoryLabels[slug.toLowerCase()];
        }

        return slug.split(/[-_]/).map(word => {
            const lowerCaseWord = word.toLowerCase();
            return wordLabels[lowerCaseWord] ||
                lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
        }).join(' ');
    }

    function displayText(value) {
        const entities = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#39;': "'"
        };
        return String(value).replace(/&(lt|gt|amp|quot|#39);/g, entity => entities[entity]);
    }

    global.QuestionBank = {
        getQuestionFiles: getQuestionFiles,
        getCategoryLabel: getCategoryLabel,
        displayText: displayText
    };
}(window));
