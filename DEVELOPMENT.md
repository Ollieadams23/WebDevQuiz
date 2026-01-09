# Development Log - Online Quiz Project

## Project Information
- **Developer:** Ollie Adams
- **Start Date:** January 6, 2026
- **Project Type:** Interactive Web Application
- **Technologies:** HTML5, CSS3, JavaScript, jQuery, Bootstrap 5.3.7

---

## Development Timeline

### Phase 1: Planning & Setup
**Date Started:**  January 6, 2026
**Date Completed:**

#### Quiz Theme Decision
**Chosen Theme:** Web Development Fundamentals (Multi-Category Quiz)

**Four Categories:**
1. **JavaScript Fundamentals** - Variables, functions, loops, and core JavaScript concepts
2. **UI/UX Design** - Design principles, accessibility, and user experience
3. **HTML & CSS Basics** - HTML tags, CSS selectors, properties, and structure
4. **Git & GitHub** - Version control concepts, commands, and workflows

**Reasoning:** These categories cover the essential skills I'm learning in web development. Creating quiz questions will reinforce my knowledge while building a practical project. The multi-category approach demonstrates versatility and allows users to test different aspects of web development.

#### Initial Setup
- Git repository initialized: [6/1/2026]
- Directory structure created: [6/1/2026]
- Initial commit: [7/1/2026]

#### Key Decisions:
- Design wireframes on Figma (4 pages: home, how-to, quiz, results)
- Deploy using GitHub Pages
- Use jQuery 3.7.1 for DOM manipulation and enhanced interactivity
- Use Bootstrap 5.3.8 for responsive framework and UI components
- Implement 4 quiz categories with random question selection
- Options for 10 or 20 questions total (mixed from all categories)
- Category-based color coding for visual organization (within 3-color limit)
- Light and dark themes with toggle functionality
- URL parameters for category and question count (visible, bookmarkable)
- sessionStorage for quiz answers/progress (temporary, clears after session)
- localStorage only for user preferences like dark mode
- home and how to page will be seperate html but the quiz page will be SPA

#### Wireframes:
- Tool: Figma
- Pages designed: Home, How-To, Quiz, Results
- Wireframes location: `assets/images/wireframes/`
- Status: ✅ **Completed - January 6, 2026**
- Files:
  - `homepage.png` - Landing page with quiz start options
  - `howto.png` - Instructions and how to use the quiz
  - `questionpage.png` - Quiz interface with questions and navigation
  - `results.png` - Results page with score and answer review

**Wireframe Preview:**

![Homepage Wireframe](assets/images/wireframes/homepage.png)
*Homepage design showing landing page with quiz start options*

![How-To Wireframe](assets/images/wireframes/howto.png)
*How-To page design with step-by-step instructions*

![Question Page Wireframe](assets/images/wireframes/questionpage.png)
*Quiz interface showing question display and navigation*

![Results Wireframe](assets/images/wireframes/results.png)
*Results page design with score display and answer review*

#### User Flow Defined:
1. User lands on home page
2. User clicks reads How-To instructions (optional)
3. User selects number of questions (10 or 20)
4. User selects category (JavaScript, UI/UX, HTML/CSS, or Git/GitHub)
5. User answers questions one by one with Next/Previous navigation
6. User clicks Submit when complete
7. User views results page with score and detailed answer review
8. User can retake quiz or return home

#### How-To Instructions Created:
- Content drafted: January 6, 2026
- Location: `HOW_TO_CONTENT.md`
- Will be implemented in `how-to.html` during Phase 3

#### Color Scheme Decision:
- **Selected:** GitHub Inspired with Dark Theme Toggle
- **Date:** January 6, 2026
- **Details:** `COLOR_SCHEME.md`

**Light Theme:**
- Primary: #0D1117 (Dark Slate)
- Secondary: #238636 (GitHub Green)
- Accent: #DA3633 (GitHub Red)
- All colors WCAG AAA compliant ✅

**Dark Theme:**
- Primary: #58A6FF (GitHub Blue)
- Secondary: #3FB950 (Bright Green)
- Accent: #F85149 (Bright Red)
- All colors WCAG AAA compliant ✅

**Features:**
- Theme toggle button for user preference
- LocalStorage to remember user choice
- Smooth transitions between themes
- 3 colors per theme (within requirement)

**JavaScript Implementation:** January 7, 2026
- jQuery-based theme toggle functionality
- Page load checks localStorage for saved theme preference
- Click handler toggles between light and dark themes
- Theme state persisted across page reloads
---

### Phase 2: HTML Development
**Date Started:**  
**Date Completed:**

#### Structure Decisions:
- Number of pages: 4 (index, how-to, quiz, results)
- Navigation approach:
- Question display method: multiple choice, true/false, fill-in-blank

#### Accessibility Considerations:
- Semantic elements used: header, main, section, article, footer
- ARIA labels added: aria-label, aria-labelledby
- Heading hierarchy: h1, h2, h3

#### Challenges & Solutions:
**Challenge:** How to use multiple choice question display
**Solution:** Use radio buttons for multiple choice questions
**Date Resolved:**

**Challenge:** how to maintain data across views
**Solution:** use localStorage to store data

---

### Phase 3: CSS Development
**Date Started:** January 7, 2026
**Date Completed:** January 7, 2026

#### Design Decisions:
**Color Scheme:** GitHub Inspired with Dark Theme Toggle

**Theme Toggle Implementation:** January 7, 2026
- CSS variables implemented for light/dark themes
- `[data-theme="dark"]` selector controls dark mode
- localStorage preserves user theme preference
- Smooth transitions between themes

**Typography:**
- Font Family: Inter
- Base Font Size: 16px
- Heading Sizes: h1: 36px, h2: 24px, h3: 18px

**Layout Approach:**
- Mobile-first: Yes
- Grid/Flexbox:

#### Responsive Design Breakpoints:
- Mobile: 320px - 767px (Bootstrap 5.3.7)
- Tablet: 768px - 1023px
- Desktop: 1024px+

#### Challenges & Solutions:
**Challenge:** How to use multiple choice question display
**Solution:** Use radio buttons for multiple choice questions
**Date Resolved:**

---

### Phase 4: JavaScript Development
**Date Started:** January 7, 2026
**Date Completed:** January 8, 2026

#### jQuery Implementation:
- jQuery Version: 3.7.1
- CDN Source: https://code.jquery.com/jquery-3.7.1.min.js
- Date Added: January 7, 2026
- Used for: DOM manipulation, event handling, AJAX for JSON loading, dynamic content updates

#### Quiz Structure:
- Total questions created: 120 (30 per category)
- Question types included: Multiple choice (4 options)
- Randomization approach: Array shuffling using sort() with random comparison
- Data format: JSON files stored in assets/questions/
- Question selection: Random 10 or 20 from 30 available per category

#### Quiz Logic Implementation: January 8, 2026
**File:** `assets/js/quiz.js`

**Key Features:**

1. **Initialization & Data Loading:**
   - Gets category from URL parameter (`?category=javascript`)
   - Retrieves question count from localStorage (10 or 20)
   - Loads appropriate JSON file using $.getJSON()
   - Maps category names to JSON file paths
   - Error handling with fallback to homepage

2. **Question Management:**
   - Randomizes all 30 questions using array shuffle
   - Selects requested number (10 or 20 questions)
   - Single Page Application (SPA) behavior - no page reloads
   - Displays one question at a time
   - Dynamically generates answer buttons (A, B, C, D)

3. **User Interaction:**
   - Click answer buttons to select (visual feedback with 'selected' class)
   - Previous/Next navigation buttons
   - Tracks all answers in array
   - Disables Next button until answer selected
   - Shows/hides Submit button on last question

4. **Progress Tracking:**
   - Progress bar showing completion percentage
   - Question counter (e.g., "Question 3 of 10")
   - Visual progress fill animation
   - Maintains user answers when navigating back/forward

5. **Submit Modal:**
   - Confirmation dialog before submitting
   - Counts and displays unanswered questions
   - Warning message for incomplete quizzes
   - Cancel option to return to quiz

6. **Results Calculation:**
   - Compares user answers to correct answers
   - Calculates score and percentage
   - Stores complete results in sessionStorage
   - Includes questions, user answers, correct answers, explanations
   - Redirects to results page

7. **Dark Mode Integration:**
   - Applies saved theme on page load
   - Toggle button works independently
   - Theme persists across navigation

#### Core Functions Implemented:
1. **Function Name:** `initQuiz()`
   - **Purpose:** Initialize quiz, get parameters, load JSON data
   - **Date Implemented:** January 8, 2026

2. **Function Name:** `startQuiz()`
   - **Purpose:** Randomize and select questions, initialize answers array
   - **Date Implemented:** January 8, 2026

3. **Function Name:** `displayQuestion(index)`
   - **Purpose:** Show current question with options and progress
   - **Date Implemented:** January 8, 2026

4. **Function Name:** `updateNavigationButtons()`
   - **Purpose:** Enable/disable navigation based on state
   - **Date Implemented:** January 8, 2026

5. **Function Name:** `submitQuiz()`
   - **Purpose:** Calculate score and pass results to results page
   - **Date Implemented:**

4. **Function Name:** `calculateScore()`
   - **Purpose:** Calculate final score
   - **Date Implemented:**

5. **Function Name:** `displayResults()`
   - **Purpose:** Show quiz results with explanations
   - **Date Implemented:**

#### Features Implemented:
- [ ] Question randomization
- [ ] Answer selection feedback
- [ ] Progress tracking
- [ ] Score calculation
- [ ] Results display with explanations
- [ ] Quiz restart functionality

#### Challenges & Solutions:
**Challenge:**  
**Solution:**  
**Date Resolved:**

---

### Phase 5: Testing & Debugging
**Date Started:**  
**Date Completed:**

#### Validation Results:
- HTML Validation: [Pass/Fail] - Date:
- CSS Validation: [Pass/Fail] - Date:
- JavaScript Validation: [Pass/Fail] - Date:

#### Major Bugs Found:
1. **Bug Description:** HTML tags in JSON files displaying as actual HTML elements causing answer options to disappear
   - **Impact:** Quiz questions with HTML code examples (like `<h1>`, `<div>`, `<a>`) were rendering as HTML instead of text, making answer options invisible or incomplete. Affected 70+ instances across htmlcss.json and 2 in gitgithub.json.
   - **Fix:** Escaped all HTML tags in JSON files by replacing `<` with `&lt;` and `>` with `&gt;`. Used Python script to bulk process htmlcss.json (16 questions affected), and manually fixed 2 command placeholders in gitgithub.json (git clone &lt;url&gt; and git remote add &lt;name&gt; &lt;url&gt;). This ensures HTML tags display as text when inserted into DOM via jQuery.
   - **Date Fixed:** January 9, 2026

2. **Bug Description:** CSS file loaded with incorrect HTML tag
   - **Impact:** quizstyle.css was being loaded with `<script>` tag instead of `<link rel="stylesheet">` tag, causing quiz-specific styles not to apply.
   - **Fix:** Changed `<script src="assets/css/quizstyle.css">` to `<link rel="stylesheet" href="assets/css/quizstyle.css">` in quiz.html.
   - **Date Fixed:** January 9, 2026

3. **Bug Description:** Dark mode toggle not working on quiz page
   - **Impact:** Clicking the dark mode toggle button on quiz.html had no effect due to duplicate script.js loading causing event handler conflicts.
   - **Fix:** Removed duplicate script.js reference from quiz.html, kept only quiz.js which has its own dark mode toggle implementation.
   - **Date Fixed:** January 9, 2026

4. **Bug Description:** Answer button labels not staying on left side
   - **Impact:** Answer labels (A, B, C, D) were wrapping or not aligning properly with answer text, making the quiz interface look inconsistent.
   - **Fix:** Implemented flexbox layout with `.answer-label` set to `flex-shrink: 0` (prevents shrinking) and `.answer-text` set to `flex: 1` (fills remaining space), ensuring labels stay fixed on the left.
   - **Date Fixed:** January 9, 2026

5. **Bug Description:** CSS selected class not applying to answer buttons
   - **Impact:** When users clicked answer buttons, the selected state styling wasn't visible, making it unclear which answer was chosen.
   - **Fix:** Changed CSS selector from `.answer-btn .selected` (child element) to `.answer-btn.selected` (same element with both classes) to properly target selected buttons.
   - **Date Fixed:** January 9, 2026

6. **Bug Description:** Topic links calling undefined function
   - **Impact:** Clicking topic links on homepage threw JavaScript error "setURLParameter is not defined", preventing navigation to quiz page.
   - **Fix:** Replaced non-existent setURLParameter() function calls with direct `window.location.href` assignment using URL parameters (e.g., `quiz.html?category=javascript`).
   - **Date Fixed:** January 9, 2026

7. **Bug Description:** Responsive media query not overriding answer options width
   - **Impact:** On mobile devices, answer options remained at 500px width instead of responsive 300px, causing horizontal scrolling.
   - **Fix:** Moved media query from styles.css to quizstyle.css which loads later, ensuring proper CSS cascade and override of `.answer-options` width.
   - **Date Fixed:** January 9, 2026

#### Browser Testing Results:
- Chrome: [Status]
- Firefox: [Status]
- Edge: [Status]
- Safari: [Status]

---

### Phase 6: Deployment
**Date Started:**  
**Date Completed:**

#### Deployment Steps:
1. Final local testing completed: [Date]
2. All files committed to GitHub: [Date]
3. GitHub Pages enabled: [Date]
4. Live site tested: [Date]
5. Issues found and fixed: [Date]

**Live Site URL:**

---

## External Resources & Attribution

### Code Sources
1. **Source:**
   - **URL:**
   - **What was used:**
   - **Location in project:**
   - **Date added:**

2. **Source:**
   - **URL:**
   - **What was used:**
   - **Location in project:**
   - **Date added:**

### Libraries/Frameworks (if any)
1. **Name:** jQuery
   - **Version:** 3.7.1
   - **Purpose:** DOM manipulation, event handling, AJAX for JSON loading
   - **URL:** https://jquery.com/

2. **Name:** Bootstrap
   - **Version:** 5.3.8
   - **Purpose:** Responsive design framework and UI components
   - **URL:** https://getbootstrap.com/

### Tutorials Referenced
1. **Tutorial:** HTML5 Semantic Elements
   - **URL:** https://www.w3schools.com/html/html5_semantic_elements.asp
   - **What was learned:** Semantic tags and proper heading hierarchy
   - **Date referenced:** January 6-7, 2026

2. **Tutorial:** URLSearchParams API
   - **URL:** https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
   - **What was learned:** URLSearchParams for passing category parameter to quiz page
   - **Date referenced:** January 8, 2026

3. **Tutorial:** jQuery $.getJSON()
   - **URL:** https://api.jquery.com/jquery.getjson/
   - **What was learned:** Loading and parsing JSON question files with AJAX
   - **Date referenced:** January 8, 2026

4. **Tutorial:** CSS Variables (Custom Properties)
   - **URL:** https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
   - **What was learned:** Implementing theme variables for light/dark mode
   - **Date referenced:** January 7, 2026

5. **Tutorial:** localStorage and sessionStorage
   - **URL:** https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   - **What was learned:** Persisting user preferences (dark mode, question count) and passing quiz results
   - **Date referenced:** January 7-8, 2026

6. **Tutorial:** Array.sort() for Randomization
   - **URL:** https://www.w3schools.com/js/js_array_sort.asp
   - **What was learned:** Shuffling array elements for random question selection
   - **Date referenced:** January 8, 2026

7. **Tutorial:** Flexbox Layout
   - **URL:** https://css-tricks.com/snippets/css/a-guide-to-flexbox/
   - **What was learned:** Creating responsive layouts and aligning answer buttons
   - **Date referenced:** January 9, 2026

8. **Tutorial:** WCAG Color Contrast Guidelines
   - **URL:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
   - **What was learned:** Ensuring AAA compliance for accessibility
   - **Date referenced:** January 6, 2026
   

### Images/Assets
1. **Asset:**
   - **Source:**
   - **License:**
   - **URL:**

---

## Git Commit History Notes

### Important Commits:
- Initial commit: [hash] - [7/1/2026]
- HTML structure complete: [hash] - [date]
- CSS styling complete: [hash] - [date]
- JavaScript functionality complete: [hash] - [date]
- Testing complete: [hash] - [date]
- Deployment: [hash] - [date]

---

## Lessons Learned

### What Went Well:


### Challenges Faced:


### What Would I Do Differently:


### Skills Developed:


---

## Project Statistics

- **Total Development Time:**
- **Total Lines of Code:**
  - HTML:
  - CSS:
  - JavaScript:
- **Total Commits:**
- **Total Questions Created:**
- **Files Created:**

---

## Future Enhancements (Optional)

Ideas for future versions:
1. 
2. 
3. 

---

**Development log maintained by:** Ollie Adams  

**Last updated:** [Date]
