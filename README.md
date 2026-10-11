# Student Expense Tracker 💸

A clean, minimalist Single Page Application (SPA) demonstrating core client-side JavaScript capabilities: in-memory Array pipelines, JSON serialization, multi-step input validation using a **shadcn Stepper Component**, and **Google Sans** typography.

Designed for Web Technology Practical 2 by **Aadesh Khande** (PRN: `202401100090`, Div B, Batch B1).

---

## 🌟 Key Features

1. **shadcn Stepper Component (3 Progressive Steps):**
   - **Step 1: Details** — Expense Title (3–30 characters, non-numeric validation) and Category selection.
   - **Step 2: Financials & Date** — Amount (₹1 to ₹1,00,000) and Non-Future Date picker.
   - **Step 3: Review & Confirmation** — Overview card, duplicate check status against existing array records, and live candidate JSON preview.
2. **Strict Validation Engine:**
   - Validates user input before committing to array state.
   - Highlights invalid inputs with red borders and displays inline error messages beneath each input field.
3. **In-Memory Array Operations:**
   - `expenses = []` maintains state with `localStorage` persistence.
   - Uses `push()`/`unshift()` for insertion, `reduce()` for live total calculations, `filter()` for search, category filtering, and item deletion, and `some()` for duplicate checking.
4. **JSON Serialization & Export:**
   - Live JSON box formatted via `JSON.stringify(expenses, null, 2)`.
   - Download `.json` file and Copy to Clipboard buttons.
5. **Modern Design System:**
   - Dark zinc palette (`#09090b` canvas, `#121215` card) adhering to Impeccable UI standards.
   - **Google Sans** applied for all labels, headings, and numerical values.

---

## 🚀 Deployment to Vercel

This repository is pre-configured with `vercel.json` for immediate zero-config deployment.

### Option 1: Deploy with Vercel CLI

1. Open your terminal in this folder:
   ```bash
   cd "/Users/aadeshkhande/Documents/Professional/College/WEB Tech/Aadesh"
   ```
2. Log in to Vercel (first time only):
   ```bash
   vercel login
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub (Recommended for CI/CD)

1. Create a new repository on [GitHub](https://github.com/new) named `student-expense-tracker`.
2. Push this local directory to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: student expense tracker with shadcn stepper and google sans"
   git branch -M main
   git remote add origin https://github.com/<your-username>/student-expense-tracker.git
   git push -u origin main
   ```
3. Go to [Vercel Dashboard](https://vercel.com/new).
4. Click **Import Repository**, select `student-expense-tracker`, and click **Deploy**.
5. Vercel will instantly build and deploy your site with a live URL (e.g., `https://student-expense-tracker.vercel.app`).

---

## 💻 Running Locally

### Using Python:
```bash
python3 -m http.server 4200
```
Open [http://localhost:4200](http://localhost:4200) in your browser.

### Using Node.js / npx:
```bash
npm start
# or
npx serve .
```

---

## 📁 File Structure

```
Aadesh/
├── index.html                  # Semantic layout with shadcn Stepper & Google Sans
├── styles.css                  # Modern dark zinc CSS styling
├── script.js                   # JavaScript array & validation engine
├── app.js                      # Mirror script for module compatibility
├── vercel.json                 # Vercel deployment configuration
├── package.json                # Project metadata & scripts
├── .gitignore                  # Git ignore rules
├── practical2_writeup.md       # College practical documentation
├── generate_pdf_report.py      # WeasyPrint PDF report compiler (exact 6 pages)
└── 202401100090_WT_practical2.pdf # Final academic PDF report
```

---

## 📝 License
MIT License · Developed for Academic Evaluation (Web Technology Practical 2).
