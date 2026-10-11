# Practical 2: Design and develop any suitable web application to demonstrate the capabilities of Javascript. Use JSON and Array for storing the data, before saving the data, validate it and show proper error messages.

**Name:** Aadesh Khande  
**PRN:** 202401100090  
**Div:** B **Batch:** B1  

**Application Name:** Student Expense Tracker (with shadcn Stepper Component & Google Sans)  
**Deployed Link:** [Student Expense Tracker](http://localhost:4200/)  
**Github Repository for code:** [Codes](https://github.com/debugonaut/javascript-assignment)  

---

## Aim
To design and develop an interactive, clean, and responsive web application (**Student Expense Tracker**) using HTML5, CSS3, and Vanilla JavaScript (ES6+) incorporating a modern **shadcn-inspired Stepper Component** and **Google Sans** typography, to demonstrate client-side JavaScript capabilities, in-memory structured data management using JavaScript Arrays and JSON objects, rigorous multi-step input validation before saving with instant error messages, and dynamic DOM event handling.

---

## Objectives
- Each student must develop an individual interactive web application.
- Use HTML, CSS and JavaScript.
- Use Arrays and JSON for storing application data.
- Validate the user input before saving the data.
- Display proper error/validation messages for invalid input.
- The application must be interactive and respond to user actions/events.

---

## Theory

### 1. JavaScript Dynamic Capabilities & Event-Driven DOM Manipulation
JavaScript is an asynchronous, event-driven scripting language executed in the browser. Through the Document Object Model (DOM) API, JavaScript interacts dynamically with HTML elements in response to user actions (form submissions, button clicks, keystrokes, and selection changes). Modern ES6+ features—such as arrow functions, `const`/`let` lexical scoping, template literals, and `addEventListener`—enable a reactive multi-step wizard without server-side page refreshes.

### 2. shadcn Stepper Component Architecture & Multi-Step Flow Control
The user interface implements the **shadcn Stepper design pattern**, dividing form input into logical progressive steps:
- **State Navigation:** Tracks `currentStep` (1, 2, or 3) and dynamically manages step indicator badges (active number, completed checkmark `✓`, and connecting progress lines).
- **Step Validation Barrier:** Transition from Step 1 to Step 2 requires valid title and category inputs; transition from Step 2 to Step 3 requires valid amount and date.
- **Review & Inspection (Step 3):** Displays a summarized confirmation card, performs an array duplicate check, and previews the candidate JSON payload prior to state persistence.

### 3. In-Memory Data Structures: JavaScript Arrays & Functional Pipelines
Arrays in JavaScript are dynamic, ordered collections that provide powerful higher-order methods:
- **`unshift()` / `push()`:** Appends newly validated expense objects to the in-memory array.
- **`reduce()`:** Iterates over the array in a single functional pass to calculate the cumulative sum of amounts spent:
  ```javascript
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  ```
- **`filter()`:** Produces filtered subsets of the array matching search keywords and category dropdown selections without mutating the source array, as well as filtering out deleted records.
- **`some()`:** Efficiently inspects the array to detect identical duplicate entries (same title, amount, and date) before saving.
- **`splice()` / `findIndex()`:** Locates and removes specific entries by unique ID.

### 4. JSON (JavaScript Object Notation): Serialization & Persistence
JSON is a lightweight, human-readable data-interchange format:
- **`JSON.stringify(expenses, null, 2)`:** Serializes the active in-memory array into an indented JSON string displayed in a live preview console and exported as a `.json` file.
- **`JSON.parse()`:** Deserializes JSON strings back into live JavaScript objects when loading state from `localStorage`.

### 5. Client-Side Input Validation Architecture & Error Communication
Validating data prior to persistence prevents corrupted or invalid records from entering the state:
- **Title Validation:** Required, 3 to 30 characters, must not be numbers-only (`/^\d+$/` test).
- **Amount Validation:** Required, numeric, strictly $> 0$ and $\le 1,00,000$.
- **Category Validation:** Must match one of the predefined options (Food, Travel, Study, Shopping, Other).
- **Date Validation:** Required, must be in `YYYY-MM-DD` format and cannot be greater than the current local date.
- **Duplicate Prevention:** Compares candidate title, amount, and date against all existing records in `expenses`.
- **Immediate Error Feedback:** Attaches error classes to invalid inputs, revealing red helper messages under corresponding fields.

---

## JavaScript Features & UI Components Used

| Component / Feature | Purpose & Implementation in Student Expense Tracker |
| :--- | :--- |
| **shadcn Stepper Component** | Multi-step wizard with active step badges, completed checkmarks, and separator lines. |
| **Google Sans Typography** | Clean, modern font family applied throughout layout and data tables. |
| **Master Array Store** (`expenses = []`) | In-memory array storing structured JSON expense objects; primary source of truth. |
| **Live Total Aggregator** (`reduce()`) | Dynamically calculates the cumulative expense sum in real-time. |
| **Category Filter & Search** (`filter()`) | Filters ledger entries on-the-fly by category and search keyword. |
| **Row Deletion** (`filter()`) | Removes individual expenses by ID when the delete button is clicked. |
| **JSON Serialization** (`JSON.stringify`) | Formats in-memory records into indented JSON for live inspection and file export. |
| **JSON Deserialization** (`JSON.parse`) | Reconstitutes structured expense objects from `localStorage`. |
| **Step-Wise Validation Engine** | Validates title, numeric bounds, category, date, and duplicate entries at each step. |
| **Duplicate Record Check** (`some()`) | Verifies uniqueness before appending entries to prevent duplicate costs. |
| **Inline Visual Error Messages** | Contextual red error text dynamically displayed beneath fields via DOM manipulation. |
| **Test Presets Bar** | Quick-fill buttons (`Valid`, `Invalid Bounds`, `Future Date`, `Duplicate`, `Clear`) for viva demo. |

---

## Procedure / Implementation Steps

1. **Project Setup & Semantic HTML5 Structure:**
   - Create `index.html` with semantic tags: header with student credentials, metric cards for key totals, shadcn Stepper form container, quick test scenarios bar, ledger table, and live JSON data console.
   - Link **Google Sans** typography and JetBrains Mono for monospace data representations.

2. **Styling with Impeccable CSS & shadcn Stepper Architecture:**
   - Define CSS custom properties for dark zinc surfaces (`#09090b` canvas, `#121215` card), borders (`#27272a`), high-contrast text ($\ge 4.5:1$), and red error highlights (`#f87171`) in `styles.css`.
   - Implement shadcn stepper navigation with `.step-item`, `.step-indicator` (active circle with white background, completed circle with green checkmark `✓`), and `.stepper-separator`.

3. **In-Memory Array & LocalStorage State Management:**
   - Declare `expenses = []` in `script.js` initialized with 5 benchmark student expenses (Lunch, Bus Pass, Reference Book, Stationery, WiFi).
   - Implement `loadExpenses()` and `saveExpenses()` to persist records to `localStorage` under key `student_expenses_v1`.

4. **Implementing the Stepper Logic & Step-Wise Validation Engine:**
   - Code `goToStep(step)` to toggle panels, update stepper badges, and populate the review card on Step 3.
   - Implement `validateStep1()` for Title (3–30 chars, no numbers-only) and Category.
   - Implement `validateStep2()` for Amount ($₹1$ to $₹1,00,000$) and non-future Date.
   - Implement duplicate detection scanning `expenses.some()` for matching title, amount, and date displayed dynamically on Step 3.

5. **Building the Array Processing Pipeline & Table Rendering:**
   - Implement `renderTable()` using `filter()` to support search keywords and category dropdown filtering.
   - Implement `updateKPIs()` using `reduce()` to update total amount spent, total count, and most frequent category.
   - Generate dynamic `<tr>` elements with formatted amounts (`₹`), category badges, and delete action triggers.

6. **Interactive Actions, Candidate JSON Preview, and Export:**
   - Display candidate JSON payload on Step 3 prior to final submission.
   - Render live master JSON output via `JSON.stringify(expenses, null, 2)` inside a dedicated `<pre>` box.
   - Provide copy-to-clipboard and `.json` file download capabilities.

---

## Validation Test Matrix & Verification Results

| Test # | Field / Constraint | Test Input Scenario | Validation Result | Application Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | All Fields (Valid) | Title: `"College Textbook"`, Amount: `450`, Cat: `Study`, Date: Valid | **PASS (Accepted)** | Stepper advances to Step 3; review confirmed; appended to array. |
| **TC-02** | Title Too Short | Title: `"AB"` (< 3 characters) on Step 1 | **PASS (Rejected)** | Step 1 halted; red border; error: *"Title must be at least 3 characters."* |
| **TC-03** | Title Numbers Only | Title: `"123"` (numbers only) on Step 1 | **PASS (Rejected)** | Step 1 halted; red border; error: *"Title cannot consist of numbers only."* |
| **TC-04** | Amount Zero or Negative | Amount: `-50` on Step 2 | **PASS (Rejected)** | Step 2 halted; red border; error: *"Amount must be greater than 0."* |
| **TC-05** | Amount Exceeds Max | Amount: `150000` (> ₹1,00,000) on Step 2 | **PASS (Rejected)** | Step 2 halted; red border; error: *"Amount cannot exceed ₹1,00,000."* |
| **TC-06** | Category Unselected | Category: `""` on Step 1 | **PASS (Rejected)** | Step 1 halted; red border; error: *"Please select a category."* |
| **TC-07** | Future Date | Date: `2029-10-15` on Step 2 | **PASS (Rejected)** | Step 2 halted; red border; error: *"Date cannot be in the future."* |
| **TC-08** | Date Missing | Date: `""` on Step 2 | **PASS (Rejected)** | Step 2 halted; red border; error: *"Expense date is required."* |
| **TC-09** | Duplicate Check | Same title, amount, and date on Step 3 | **PASS (Rejected)** | Step 3 displays warning badge: *"Duplicate: An identical expense already exists!"* |

---

## Output Screenshots

- **Figure 1:** Student Expense Tracker Core Overview with shadcn Stepper Component (Step 1: Details & Google Sans Typography)
- **Figure 2:** Real-Time Stepper Input Validation Failure State (Red Field Borders, Inline Warning Messages, and Diagnostics Card)
- **Figure 3:** Stepper Step 3 Review Confirmation, Duplicate Prevention Check & Candidate JSON Payload Inspection

---

## Conclusion & Practical Verification
Practical 2 successfully demonstrates the dynamic capabilities of JavaScript, in-memory Array data processing pipelines, and JSON serialization. Incorporating a **shadcn-inspired Stepper Component** and **Google Sans** typography, the **Student Expense Tracker** provides an intuitive multi-step workflow. Before committing any new expense, the client-side validation engine strictly validates inputs at each step against string length, numbers-only pattern, numerical range bounds, category selections, non-future dates, and duplicate records, displaying clear red inline feedback upon invalid input. All practical requirements are fulfilled with an elegant, modern, and accessible user interface.
