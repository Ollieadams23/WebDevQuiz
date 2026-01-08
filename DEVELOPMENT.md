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
**Date Started:**  
**Date Completed:**

#### jQuery Implementation:
- jQuery Version:
- CDN Source:
- Date Added:
- Used for: (DOM manipulation, event handling, animations, etc.)

#### Quiz Structure:
- Total questions created:
- Question types included:
- Randomization approach:

#### Core Functions Implemented:
1. **Function Name:** `shuffleQuestions()`
   - **Purpose:** Randomize question order
   - **Date Implemented:**

2. **Function Name:** `displayQuestion()`
   - **Purpose:** Show current question and options
   - **Date Implemented:**

3. **Function Name:** `checkAnswer()`
   - **Purpose:** Validate user answer
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
1. **Bug Description:**
   - **Impact:**
   - **Fix:**
   - **Date Fixed:**

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
1. **Name:**
   - **Version:**
   - **Purpose:**
   - **URL:**

### Tutorials Referenced
1. **Tutorial:** 
   - **URL:** https://www.w3schools.com/html/html5_semantic_elements.asp
   - **What was learned:** semantic tags and headings
   

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
