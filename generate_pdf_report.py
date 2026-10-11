import os
import weasyprint
import pypdf
import base64

current_dir = os.path.dirname(os.path.abspath(__file__))

def get_base64_img(filename):
    path = os.path.join(current_dir, filename)
    with open(path, "rb") as f:
        return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"

img1 = get_base64_img("screenshot_1_overview.png")
img2 = get_base64_img("screenshot_2_invalid.png")
img3 = get_base64_img("screenshot_3_stepper_review.png")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Practical 2: JavaScript Capabilities, JSON & Array State Validation</title>
  <style>
    @page {{
      size: letter;
      margin: 0.55in 0.7in 0.55in 0.7in;
    }}

    body {{
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
      color: #0f172a;
      margin: 0;
      padding: 0;
    }}

    .header-meta {{
      margin-bottom: 10pt;
      font-size: 10pt;
      line-height: 1.3;
    }}

    .practical-title {{
      font-size: 11.5pt;
      font-weight: bold;
      text-decoration: underline;
      margin-top: 4pt;
      margin-bottom: 10pt;
      line-height: 1.3;
    }}

    .links {{
      margin-bottom: 10pt;
      font-size: 9.5pt;
    }}

    .links a {{
      color: #2563eb;
      text-decoration: underline;
    }}

    .section-title {{
      font-weight: bold;
      font-size: 10.5pt;
      margin-top: 8pt;
      margin-bottom: 4pt;
    }}

    .aim {{
      margin-bottom: 8pt;
      text-align: justify;
    }}

    ul {{
      margin-top: 2pt;
      margin-bottom: 6pt;
      padding-left: 16pt;
    }}

    li {{
      margin-bottom: 3pt;
      text-align: justify;
    }}

    .sub-theory {{
      margin-top: 6pt;
      margin-bottom: 5pt;
    }}

    .sub-theory-title {{
      font-weight: bold;
      margin-bottom: 2pt;
    }}

    .page-break {{
      page-break-before: always;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      margin-top: 4pt;
      margin-bottom: 6pt;
      font-size: 7.8pt;
      background-color: #ffffff;
    }}

    th {{
      background-color: #1e293b;
      color: #f8fafc;
      font-weight: bold;
      text-align: left;
      padding: 3.5pt 5pt;
      border: 1px solid #334155;
    }}

    td {{
      padding: 3pt 5pt;
      border: 1px solid #cbd5e1;
      vertical-align: top;
      line-height: 1.25;
    }}

    tr:nth-child(even) td {{
      background-color: #f8fafc;
    }}

    .badge-code {{
      font-family: "Courier New", Courier, monospace;
      font-size: 7pt;
      background: #e2e8f0;
      padding: 0.5pt 2.5pt;
      border-radius: 2pt;
      color: #0f172a;
    }}

    .screenshot-card {{
      margin-bottom: 12pt;
      text-align: center;
    }}

    .screenshot-caption {{
      font-size: 8.5pt;
      font-weight: bold;
      color: #334155;
      margin-top: 4pt;
    }}

    .screenshot-img {{
      width: 100%;
      height: 220pt;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 4pt;
      background-color: #09090b;
    }}

    .steps-list {{
      padding-left: 15pt;
      margin-top: 3pt;
      margin-bottom: 5pt;
    }}

    .steps-list > li {{
      font-weight: bold;
      margin-top: 5pt;
      margin-bottom: 2pt;
    }}

    .steps-list > li > ul {{
      font-weight: normal;
      margin-top: 2pt;
      margin-bottom: 3pt;
    }}
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="header-meta">
    Name: Aadesh Khande<br>
    PRN: 202401100090<br>
    Div: B Batch B1
  </div>

  <div class="practical-title">
    Practical 2: Design and develop any suitable web application to demonstrate the capabilities of Javascript. Use JSON and Array for storing the data, before saving the data, validate it and show proper error messages.
  </div>

  <div class="links">
    Deployed / Application Link: <a href="http://localhost:4200/">student-expense-tracker</a><br>
    Github Repository for code: <a href="https://github.com/debugonaut/javascript-assignment">Codes</a>
  </div>

  <div class="aim">
    <strong>Aim:</strong> To design and develop an interactive, clean, and responsive web application (Student Expense Tracker) 
    using HTML5, CSS3, and Vanilla JavaScript (ES6+) incorporating a <strong>shadcn Stepper Component</strong> and <strong>Google Sans</strong> typography, 
    to demonstrate client-side JavaScript capabilities, in-memory structured data management using JavaScript Arrays and JSON objects, 
    step-wise input validation before saving with instant error messages, and dynamic DOM event handling.
  </div>

  <div class="section-title">Objectives:</div>
  <ul>
    <li>Each student must develop an individual interactive web application.</li>
    <li>Use HTML, CSS and JavaScript.</li>
    <li>Use Arrays and JSON for storing application data.</li>
    <li>Validate the user input before saving the data.</li>
    <li>Display proper error/validation messages for invalid input.</li>
    <li>The application must be interactive and respond to user actions/events.</li>
  </ul>

  <div class="section-title">Theory</div>
  
  <div class="sub-theory">
    <div class="sub-theory-title">1. JavaScript Dynamic Capabilities & Event-Driven DOM Manipulation:</div>
    <p style="margin: 0; text-align: justify;">
      JavaScript is an asynchronous, event-driven scripting language executed within the browser's JavaScript engine (e.g., V8). 
      Through the Document Object Model (DOM) API, JavaScript interacts dynamically with HTML elements in response to user actions 
      (clicks, keyboard input, change events). Modern ES6+ language features such as arrow functions, template literals, destructuring, 
      and <code>addEventListener</code> enable responsive multi-step wizard user interfaces without page reloads.
    </p>
  </div>

  <!-- PAGE 2 -->
  <div class="page-break"></div>

  <div class="sub-theory">
    <div class="sub-theory-title">2. In-Memory Data Structures: JavaScript Arrays & Functional Pipelines:</div>
    <p style="margin: 0 0 3pt 0; text-align: justify;">
      Arrays in JavaScript are dynamic, ordered collections that provide built-in methods for data processing:
    </p>
    <ul>
      <li><strong>push() / unshift():</strong> Appends newly validated expense objects to the in-memory array.</li>
      <li><strong>reduce():</strong> Aggregates array elements in a single functional pass to compute the cumulative sum of expenses: <code>expenses.reduce((sum, e) =&gt; sum + e.amount, 0)</code>.</li>
      <li><strong>filter():</strong> Produces filtered subsets of the array matching search keywords and category dropdown selections without mutating the source array, as well as filtering out deleted records.</li>
      <li><strong>some():</strong> Performs an efficient O(n) check across the array to determine if an identical expense (same title, amount, and date) already exists, preventing duplicate records.</li>
      <li><strong>splice() & findIndex():</strong> Locates and removes specific entries by unique ID upon deletion.</li>
    </ul>
  </div>

  <div class="sub-theory">
    <div class="sub-theory-title">3. JSON (JavaScript Object Notation): Serialization & Storage:</div>
    <ul>
      <li><strong>JSON.stringify():</strong> Serializes in-memory JavaScript Arrays and candidate objects into formatted JSON strings, enabling live data inspection and file export.</li>
      <li><strong>JSON.parse():</strong> Deserializes JSON strings back into live JavaScript objects, enabling seamless data restoration from the browser's <code>localStorage</code>.</li>
    </ul>
  </div>

  <div class="sub-theory">
    <div class="sub-theory-title">4. shadcn Stepper Component & Client-Side Validation Architecture:</div>
    <ul>
      <li><strong>Step-Wise Progression:</strong> Enforces validation barriers at each step before allowing progression: Step 1 validates Title and Category; Step 2 validates Amount and Date; Step 3 presents review confirmation and duplicate check.</li>
      <li><strong>Title Validation:</strong> Required, 3 to 30 characters, must not be numbers only (verified via <code>/^\\d+$/</code> regex test).</li>
      <li><strong>Amount Validation:</strong> Required, numeric, strictly &gt; 0 and &le; 1,00,000.</li>
      <li><strong>Date Validation:</strong> Required, format verified, and strictly prevented from being set to any date in the future.</li>
      <li><strong>Duplicate Prevention:</strong> Scans the array using <code>expenses.some()</code> to display a warning badge prior to final commit.</li>
    </ul>
  </div>

  <div class="section-title">JavaScript Features & UI Components Used:</div>
  <table>
    <thead>
      <tr>
        <th style="width: 28%;">Component / Feature</th>
        <th>Purpose & Implementation in Student Expense Tracker</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>shadcn Stepper Component</strong><br><span class="badge-code">Multi-Step UI</span></td>
        <td>Progressive 3-step wizard with active step numbers, completed checkmarks, and progress lines.</td>
      </tr>
      <tr>
        <td><strong>Google Sans Typography</strong><br><span class="badge-code">Google Sans</span></td>
        <td>Clean, modern font family applied throughout layout, form controls, and ledger table.</td>
      </tr>
      <tr>
        <td><strong>Master Array Store</strong><br><span class="badge-code">expenses = [...]</span></td>
        <td>In-memory array storing structured JSON expense objects; primary source of truth.</td>
      </tr>
      <tr>
        <td><strong>Live Total Aggregator</strong><br><span class="badge-code">Array.reduce()</span></td>
        <td>Dynamically calculates the cumulative expense sum in real-time.</td>
      </tr>
      <tr>
        <td><strong>Category Filter & Search</strong><br><span class="badge-code">Array.filter()</span></td>
        <td>Filters ledger entries on-the-fly by category and search keyword.</td>
      </tr>
      <tr>
        <td><strong>Row Deletion</strong><br><span class="badge-code">Array.filter()</span></td>
        <td>Removes individual expenses by ID when the delete button is clicked.</td>
      </tr>
      <tr>
        <td><strong>JSON Serialization</strong><br><span class="badge-code">JSON.stringify()</span></td>
        <td>Formats in-memory records into indented JSON for live inspection and file export.</td>
      </tr>
      <tr>
        <td><strong>Step-Wise Validation Engine</strong><br><span class="badge-code">Pure JavaScript</span></td>
        <td>Validates title length, numbers-only check, numeric bounds, category, and date at each step.</td>
      </tr>
      <tr>
        <td><strong>Duplicate Record Check</strong><br><span class="badge-code">Array.some()</span></td>
        <td>Verifies uniqueness before appending entries to prevent duplicate costs.</td>
      </tr>
      <tr>
        <td><strong>Inline Visual Error Messages</strong><br><span class="badge-code">DOM manipulation</span></td>
        <td>Contextual red error text dynamically displayed beneath fields via DOM manipulation.</td>
      </tr>
    </tbody>
  </table>

  <!-- PAGE 3 -->
  <div class="page-break"></div>

  <div class="section-title">Procedure / Implementation Steps:</div>
  <ol class="steps-list">
    <li><strong>Project Setup & Layout Structure:</strong>
      <ul>
        <li>Create <code>index.html</code> with semantic header, telemetry KPI cards, shadcn Stepper form container, test scenario pills, ledger table, and live JSON data console.</li>
        <li>Configure modern fonts (<em>Google Sans</em> and <em>JetBrains Mono</em>) for clean typography and tabular numbers.</li>
      </ul>
    </li>
    <li><strong>Styling with Impeccable CSS & shadcn Stepper Architecture:</strong>
      <ul>
        <li>Define CSS variables for dark zinc surfaces (<code>#09090b</code> canvas, <code>#121215</code> card), borders (<code>#27272a</code>), text contrast (&ge; 4.5:1), and red error highlights (<code>#f87171</code>) in <code>styles.css</code>.</li>
        <li>Implement shadcn stepper navigation with <code>.step-item</code>, <code>.step-indicator</code> (active circle with white background, completed circle with green checkmark ✓), and <code>.stepper-separator</code>.</li>
      </ul>
    </li>
    <li><strong>In-Memory Array & LocalStorage State Management:</strong>
      <ul>
        <li>Declare <code>expenses = []</code> in <code>script.js</code> initialized with 5 benchmark student expenses (Lunch, Bus Pass, Reference Book, Stationery, WiFi).</li>
        <li>Implement <code>loadExpenses()</code> and <code>saveExpenses()</code> to persist records to <code>localStorage</code> under key <code>student_expenses_v1</code>.</li>
      </ul>
    </li>
    <li><strong>Implementing the Stepper Logic & Step-Wise Validation Engine:</strong>
      <ul>
        <li>Code <code>goToStep(step)</code> to toggle panels, update stepper badges, and populate the review card on Step 3.</li>
        <li>Implement <code>validateStep1()</code> for Title (3–30 chars, no numbers-only) and Category.</li>
        <li>Implement <code>validateStep2()</code> for Amount (₹1 to ₹1,00,000) and non-future Date.</li>
        <li>Implement duplicate detection scanning <code>expenses.some()</code> for matching title, amount, and date displayed dynamically on Step 3.</li>
      </ul>
    </li>
    <li><strong>Building the Array Processing Pipeline & Table Rendering:</strong>
      <ul>
        <li>Implement <code>renderTable()</code> using <code>filter()</code> to support search keywords and category dropdown filtering.</li>
        <li>Implement <code>updateKPIs()</code> using <code>reduce()</code> to update total amount spent, total count, and most frequent category.</li>
        <li>Generate dynamic <code>&lt;tr&gt;</code> elements with formatted amounts (₹), category badges, and delete action triggers.</li>
      </ul>
    </li>
  </ol>

  <!-- PAGE 4 -->
  <div class="page-break"></div>

  <div style="font-weight: bold; margin-top: 4pt; margin-bottom: 2pt; padding-left: 15pt;">
    6. Interactive Actions, Candidate JSON Preview, and Export:
  </div>
  <ul style="padding-left: 30pt; margin-top: 2pt; margin-bottom: 6pt;">
    <li>Display candidate JSON payload on Step 3 prior to final submission.</li>
    <li>Render live master JSON output via <code>JSON.stringify(expenses, null, 2)</code> inside a dedicated <code>&lt;pre&gt;</code> box.</li>
    <li>Provide copy-to-clipboard and <code>.json</code> file download capabilities.</li>
  </ul>

  <div class="section-title">Validation Test Matrix & Verification Results:</div>
  <table>
    <thead>
      <tr>
        <th style="width: 10%;">Test #</th>
        <th style="width: 22%;">Field / Constraint</th>
        <th style="width: 28%;">Test Input Scenario</th>
        <th style="width: 14%;">Validation Result</th>
        <th>Application Behavior</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>TC-01</strong></td>
        <td>All Fields (Valid)</td>
        <td>Title: <code>"College Textbook"</code>, Amount: <code>450</code>, Cat: <code>Study</code>, Date: Valid</td>
        <td><strong style="color: #16a34a;">PASS (Accepted)</strong></td>
        <td>Stepper advances to Step 3; review confirmed; appended to array.</td>
      </tr>
      <tr>
        <td><strong>TC-02</strong></td>
        <td>Title Too Short</td>
        <td>Title: <code>"AB"</code> (&lt; 3 characters) on Step 1</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 1 halted; red border; error: <em>"Title must be at least 3 characters."</em></td>
      </tr>
      <tr>
        <td><strong>TC-03</strong></td>
        <td>Title Numbers Only</td>
        <td>Title: <code>"123"</code> (numbers only) on Step 1</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 1 halted; red border; error: <em>"Title cannot consist of numbers only."</em></td>
      </tr>
      <tr>
        <td><strong>TC-04</strong></td>
        <td>Amount Zero / Negative</td>
        <td>Amount: <code>-50</code> on Step 2</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 2 halted; red border; error: <em>"Amount must be greater than 0."</em></td>
      </tr>
      <tr>
        <td><strong>TC-05</strong></td>
        <td>Amount Exceeds Max</td>
        <td>Amount: <code>150000</code> (&gt; ₹1,00,000) on Step 2</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 2 halted; red border; error: <em>"Amount cannot exceed ₹1,00,000."</em></td>
      </tr>
      <tr>
        <td><strong>TC-06</strong></td>
        <td>Category Unselected</td>
        <td>Category: <code>""</code> on Step 1</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 1 halted; red border; error: <em>"Please select a category."</em></td>
      </tr>
      <tr>
        <td><strong>TC-07</strong></td>
        <td>Future Date</td>
        <td>Date: <code>2029-10-15</code> on Step 2</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 2 halted; red border; error: <em>"Date cannot be in the future."</em></td>
      </tr>
      <tr>
        <td><strong>TC-08</strong></td>
        <td>Date Missing</td>
        <td>Date: <code>""</code> on Step 2</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 2 halted; red border; error: <em>"Expense date is required."</em></td>
      </tr>
      <tr>
        <td><strong>TC-09</strong></td>
        <td>Duplicate Check</td>
        <td>Same title, amount, and date on Step 3</td>
        <td><strong style="color: #d97706;">PASS (Rejected)</strong></td>
        <td>Step 3 displays warning badge: <em>"Duplicate: An identical expense already exists!"</em></td>
      </tr>
    </tbody>
  </table>

  <div class="section-title" style="margin-top: 10pt;">Output Screenshot:</div>

  <!-- PAGE 5 -->
  <div class="page-break"></div>

  <div class="screenshot-card">
    <img src="{img1}" class="screenshot-img" style="height: 230pt;" alt="Student Expense Tracker Core Overview with shadcn Stepper Component">
    <div class="screenshot-caption">Figure 1: Student Expense Tracker Core Overview with shadcn Stepper Component (Step 1: Details & Google Sans Typography)</div>
  </div>

  <div class="screenshot-card" style="margin-top: 12pt;">
    <img src="{img2}" class="screenshot-img" style="height: 230pt;" alt="Input Validation Failure State on Stepper">
    <div class="screenshot-caption">Figure 2: Real-Time Stepper Input Validation Failure State (Red Field Borders, Inline Warning Messages, and Diagnostics Card)</div>
  </div>

  <!-- PAGE 6 -->
  <div class="page-break"></div>

  <div class="screenshot-card">
    <img src="{img3}" class="screenshot-img" style="height: 280pt;" alt="Stepper Step 3 Review Confirmation & Candidate JSON View">
    <div class="screenshot-caption">Figure 3: Stepper Step 3 Review Confirmation, Duplicate Prevention Check & Candidate JSON Payload Inspection</div>
  </div>

  <div class="section-title" style="margin-top: 10pt;">Conclusion & Practical Verification:</div>
  <p style="text-align: justify; margin-top: 4pt; margin-bottom: 6pt; font-size: 9pt; line-height: 1.35;">
    Practical 2 successfully demonstrates the dynamic capabilities of JavaScript, in-memory Array data processing pipelines, and JSON serialization. 
    Incorporating a <strong>shadcn-inspired Stepper Component</strong> and <strong>Google Sans</strong> typography, the <strong>Student Expense Tracker</strong> 
    provides an intuitive multi-step workflow. Before committing any new expense, the client-side validation engine strictly validates inputs at each step 
    against string length, numbers-only pattern, numerical range bounds, category selections, non-future dates, and duplicate records, displaying clear red inline 
    feedback upon invalid input. All practical requirements are fulfilled with an elegant, modern, and accessible user interface.
  </p>

  <table style="margin-top: 6pt;">
    <tbody>
      <tr>
        <td style="width: 35%; font-weight: bold; background-color: #f1f5f9;">Validation Test Suite Status</td>
        <td style="color: #16a34a; font-weight: bold;">✔ All Test Scenarios Passed (100% Assertion Success Rate)</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #f1f5f9;">In-Memory State Engine</td>
        <td>JavaScript Array with JSON Object Persistence & LocalStorage Synchronization</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #f1f5f9;">Interactive Capabilities</td>
        <td>shadcn Stepper Component, Google Sans Typography, Array Pipelines (filter, reduce, push, some), Live Search, JSON Inspector</td>
      </tr>
    </tbody>
  </table>

</body>
</html>
"""

output_pdf = os.path.join(current_dir, "202401100090_WT_practical2.pdf")
print("Compiling PDF with WeasyPrint...")
weasyprint.HTML(string=html_content).write_pdf(output_pdf)

reader = pypdf.PdfReader(output_pdf)
print(f"Successfully generated: {output_pdf} (Total Pages: {len(reader.pages)})")
