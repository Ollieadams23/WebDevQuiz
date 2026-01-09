"""
HTML Tag Escape Script
Used to fix JSON question files where HTML tags were displaying as actual HTML instead of text.
Date: January 9, 2026
Purpose: Escape < and > characters in htmlcss.json to display code examples correctly in quiz
"""

import json

# Read the JSON file
with open('c:/Users/Ollie/Documents/projects/project1/assets/questions/htmlcss.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Function to escape HTML tags
def escape_html(text):
    if not isinstance(text, str):
        return text
    # Replace < and > that are part of HTML tags (not already escaped)
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')
    return text

# Process each question
for question in data['questions']:
    # Skip question 11 (already escaped)
    if question['id'] == 11:
        continue
    
    # Escape HTML in options
    if 'options' in question:
        question['options'] = [escape_html(opt) for opt in question['options']]
    
    # Escape HTML in explanation
    if 'explanation' in question:
        question['explanation'] = escape_html(question['explanation'])

# Write back to file
with open('c:/Users/Ollie/Documents/projects/project1/assets/questions/htmlcss.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print('√ Fixed all HTML tags in htmlcss.json')
