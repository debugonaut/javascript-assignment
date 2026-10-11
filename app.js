/**
 * Student Expense Tracker - JavaScript Array & JSON Engine
 * Stepper Component (shadcn pattern) & Google Sans Typography
 * Author: Aadesh Khande (PRN: 202401100090, Div B, Batch B1)
 * Subject: Web Technology - Practical 2
 */

(function () {
  'use strict';

  // 1. Initial Benchmark Array with Sample Student Expenses
  const DEFAULT_EXPENSES = [
    { id: 1, title: "Campus Cafeteria Lunch", amount: 120, category: "Food", date: "2026-10-10" },
    { id: 2, title: "Semester Bus Pass", amount: 650, category: "Travel", date: "2026-10-09" },
    { id: 3, title: "Data Structures Reference Book", amount: 480, category: "Study", date: "2026-10-08" },
    { id: 4, title: "Lab Notebook & Stationery", amount: 150, category: "Study", date: "2026-10-07" },
    { id: 5, title: "Hostel WiFi Contribution", amount: 300, category: "Other", date: "2026-10-05" }
  ];

  const STORAGE_KEY = 'student_expenses_v1';
  let expenses = [];

  // Filter & Search State
  let searchQuery = '';
  let selectedCategory = 'ALL';

  // Load from LocalStorage or seed fallback
  function loadExpenses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          expenses = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('LocalStorage error, using default seed records:', e);
    }
    expenses = JSON.parse(JSON.stringify(DEFAULT_EXPENSES));
    saveExpenses();
  }

  function saveExpenses() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
    updateJsonBox();
  }

  // 2. Strict Input Validation Engine
  function validateExpense(data) {
    const errors = {};
    const summary = [];

    // Title Validation: Required, 3 to 30 chars, not numbers only
    const title = (data.title || '').trim();
    if (!title) {
      errors.title = "Title is required.";
      summary.push("Expense title is required.");
    } else if (title.length < 3) {
      errors.title = "Title must be at least 3 characters.";
      summary.push("Title must be at least 3 characters long.");
    } else if (title.length > 30) {
      errors.title = "Title cannot exceed 30 characters.";
      summary.push("Title cannot exceed 30 characters.");
    } else if (/^\d+$/.test(title)) {
      errors.title = "Title cannot consist of numbers only.";
      summary.push("Title cannot consist of numbers only.");
    }

    // Amount Validation: Required, number > 0 and <= 100,000
    const amtVal = data.amount;
    if (amtVal === '' || amtVal === null || isNaN(amtVal)) {
      errors.amount = "Amount is required.";
      summary.push("Amount is required.");
    } else {
      const num = Number(amtVal);
      if (num <= 0) {
        errors.amount = "Amount must be greater than 0.";
        summary.push("Amount must be greater than 0.");
      } else if (num > 100000) {
        errors.amount = "Amount cannot exceed ₹1,00,000.";
        summary.push("Amount cannot exceed ₹1,00,000.");
      }
    }

    // Category Validation: Must select one
    const allowedCategories = ["Food", "Travel", "Study", "Shopping", "Other"];
    if (!data.category || !allowedCategories.includes(data.category)) {
      errors.category = "Please select a category.";
      summary.push("Please select an expense category.");
    }

    // Date Validation: Required, cannot be in future
    if (!data.date) {
      errors.date = "Expense date is required.";
      summary.push("Expense date is required.");
    } else {
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        errors.date = "Date cannot be in the future.";
        summary.push("Date cannot be in the future.");
      }
    }

    // Duplicate Check: Same title, amount, and date in expenses array
    if (Object.keys(errors).length === 0) {
      const isDuplicate = expenses.some(exp => 
        exp.title.toLowerCase().trim() === title.toLowerCase() &&
        Number(exp.amount) === Number(amtVal) &&
        exp.date === data.date
      );

      if (isDuplicate) {
        errors.title = "Duplicate expense already exists.";
        summary.push("Duplicate check: An expense with the same title, amount, and date already exists.");
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      summary
    };
  }

  // DOM Elements
  const form = document.getElementById('expense-form');
  const titleInput = document.getElementById('title');
  const amountInput = document.getElementById('amount');
  const categorySelect = document.getElementById('category');
  const dateInput = document.getElementById('date');

  const errTitle = document.getElementById('err-title');
  const errAmount = document.getElementById('err-amount');
  const errCategory = document.getElementById('err-category');
  const errDate = document.getElementById('err-date');

  const diagnosticsBox = document.getElementById('diagnostics-card');
  const diagnosticsList = document.getElementById('diagnostics-list');
  const toastMsg = document.getElementById('toast-msg');

  // Stepper Elements
  let currentStep = 1;
  const stepNavItems = [
    document.getElementById('step-nav-1'),
    document.getElementById('step-nav-2'),
    document.getElementById('step-nav-3')
  ];
  const stepIndicators = [
    document.getElementById('step-ind-1'),
    document.getElementById('step-ind-2'),
    document.getElementById('step-ind-3')
  ];
  const stepSeparators = [
    document.getElementById('step-sep-1'),
    document.getElementById('step-sep-2')
  ];
  const stepPanels = [
    document.getElementById('step-panel-1'),
    document.getElementById('step-panel-2'),
    document.getElementById('step-panel-3')
  ];

  const btnNext1 = document.getElementById('btn-next-1');
  const btnPrev2 = document.getElementById('btn-prev-2');
  const btnNext2 = document.getElementById('btn-next-2');
  const btnPrev3 = document.getElementById('btn-prev-3');

  const reviewTitle = document.getElementById('review-title');
  const reviewCategory = document.getElementById('review-category');
  const reviewAmount = document.getElementById('review-amount');
  const reviewDate = document.getElementById('review-date');
  const reviewDupBadge = document.getElementById('review-dup-badge');
  const reviewDupIcon = document.getElementById('review-dup-icon');
  const reviewDupText = document.getElementById('review-dup-text');
  const reviewJsonCode = document.getElementById('review-json-code');

  function clearErrors() {
    diagnosticsBox.classList.add('hidden');
    diagnosticsList.innerHTML = '';
    [titleInput, amountInput, categorySelect, dateInput].forEach(el => {
      if (el) el.classList.remove('is-invalid');
    });
    [errTitle, errAmount, errCategory, errDate].forEach(el => {
      if (el) {
        el.textContent = '';
        el.classList.add('hidden');
      }
    });
  }

  function showErrors(errors, summary) {
    diagnosticsBox.classList.remove('hidden');
    diagnosticsList.innerHTML = summary
      .map(msg => `<li>${escapeHtml(msg)}</li>`)
      .join('');

    for (const [field, msg] of Object.entries(errors)) {
      const inputEl = document.getElementById(field);
      const errEl = document.getElementById('err-' + field);
      if (inputEl) inputEl.classList.add('is-invalid');
      if (errEl) {
        errEl.textContent = msg;
        errEl.classList.remove('hidden');
      }
    }

    showToast("Validation failed. Please correct highlighted errors.", "error");
  }

  function getFormData() {
    return {
      title: titleInput.value.trim(),
      amount: amountInput.value.trim(),
      category: categorySelect.value,
      date: dateInput.value
    };
  }

  // Live input validation on typing / changing
  [titleInput, amountInput, categorySelect, dateInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      const data = getFormData();
      const res = validateExpense(data);
      const fieldName = input.id;
      const errEl = document.getElementById('err-' + fieldName);

      if (res.errors[fieldName]) {
        input.classList.add('is-invalid');
        if (errEl) {
          errEl.textContent = res.errors[fieldName];
          errEl.classList.remove('hidden');
        }
      } else {
        input.classList.remove('is-invalid');
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.add('hidden');
        }
      }
    });
  });

  // Stepper Navigation Management
  function goToStep(step) {
    currentStep = step;

    // Update Step Panels
    stepPanels.forEach((panel, idx) => {
      if (panel) {
        if (idx + 1 === step) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      }
    });

    // Update Stepper Navigation Indicators
    stepNavItems.forEach((nav, idx) => {
      if (!nav) return;
      const stepNum = idx + 1;
      nav.classList.remove('active', 'completed');
      if (stepNum === step) {
        nav.classList.add('active');
        if (stepIndicators[idx]) stepIndicators[idx].textContent = stepNum;
      } else if (stepNum < step) {
        nav.classList.add('completed');
        if (stepIndicators[idx]) stepIndicators[idx].textContent = '✓';
      } else {
        if (stepIndicators[idx]) stepIndicators[idx].textContent = stepNum;
      }
    });

    // Update Separator lines
    stepSeparators.forEach((sep, idx) => {
      if (!sep) return;
      if (idx + 1 < step) {
        sep.classList.add('completed');
      } else {
        sep.classList.remove('completed');
      }
    });

    // If entering Step 3 (Review), render confirmation values & candidate JSON
    if (step === 3) {
      const data = getFormData();
      if (reviewTitle) reviewTitle.textContent = data.title || '-';
      if (reviewCategory) reviewCategory.textContent = data.category || '-';
      if (reviewAmount) reviewAmount.textContent = data.amount ? '₹' + Number(data.amount).toLocaleString('en-IN') : '-';
      if (reviewDate) reviewDate.textContent = data.date || '-';

      // Duplicate Check against array
      const isDuplicate = expenses.some(exp => 
        exp.title.toLowerCase().trim() === data.title.toLowerCase().trim() &&
        Number(exp.amount) === Number(data.amount) &&
        exp.date === data.date
      );

      if (reviewDupBadge) {
        if (isDuplicate) {
          reviewDupBadge.className = 'review-duplicate-badge is-duplicate';
          if (reviewDupIcon) reviewDupIcon.textContent = '⚠';
          if (reviewDupText) reviewDupText.textContent = 'Duplicate: An identical expense already exists in array!';
        } else {
          reviewDupBadge.className = 'review-duplicate-badge is-ok';
          if (reviewDupIcon) reviewDupIcon.textContent = '✓';
          if (reviewDupText) reviewDupText.textContent = 'Unique entry (No duplicate found in array)';
        }
      }

      const nextId = expenses.reduce((max, exp) => exp.id > max ? exp.id : max, 0) + 1;
      const candidate = {
        id: nextId,
        title: data.title,
        amount: Number(data.amount) || 0,
        category: data.category,
        date: data.date
      };
      if (reviewJsonCode) {
        reviewJsonCode.textContent = JSON.stringify(candidate, null, 2);
      }
    }
  }

  // Validation for Step 1 (Title & Category)
  function validateStep1() {
    clearErrors();
    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const errors = {};
    const summary = [];

    if (!title) {
      errors.title = "Title is required.";
      summary.push("Expense title is required.");
    } else if (title.length < 3) {
      errors.title = "Title must be at least 3 characters.";
      summary.push("Title must be at least 3 characters long.");
    } else if (title.length > 30) {
      errors.title = "Title cannot exceed 30 characters.";
      summary.push("Title cannot exceed 30 characters.");
    } else if (/^\d+$/.test(title)) {
      errors.title = "Title cannot consist of numbers only.";
      summary.push("Title cannot consist of numbers only.");
    }

    const allowedCategories = ["Food", "Travel", "Study", "Shopping", "Other"];
    if (!category || !allowedCategories.includes(category)) {
      errors.category = "Please select a category.";
      summary.push("Please select an expense category.");
    }

    if (Object.keys(errors).length > 0) {
      showErrors(errors, summary);
      return false;
    }
    return true;
  }

  // Validation for Step 2 (Amount & Date)
  function validateStep2() {
    clearErrors();
    const amtVal = amountInput.value.trim();
    const dateVal = dateInput.value;
    const errors = {};
    const summary = [];

    if (amtVal === '' || amtVal === null || isNaN(amtVal)) {
      errors.amount = "Amount is required.";
      summary.push("Amount is required.");
    } else {
      const num = Number(amtVal);
      if (num <= 0) {
        errors.amount = "Amount must be greater than 0.";
        summary.push("Amount must be greater than 0.");
      } else if (num > 100000) {
        errors.amount = "Amount cannot exceed ₹1,00,000.";
        summary.push("Amount cannot exceed ₹1,00,000.");
      }
    }

    if (!dateVal) {
      errors.date = "Expense date is required.";
      summary.push("Expense date is required.");
    } else {
      const selectedDate = new Date(dateVal);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        errors.date = "Date cannot be in the future.";
        summary.push("Date cannot be in the future.");
      }
    }

    if (Object.keys(errors).length > 0) {
      showErrors(errors, summary);
      return false;
    }
    return true;
  }

  // Wire Stepper Buttons
  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      if (validateStep1()) {
        goToStep(2);
      }
    });
  }

  if (btnPrev2) {
    btnPrev2.addEventListener('click', () => {
      clearErrors();
      goToStep(1);
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      if (validateStep2()) {
        goToStep(3);
      }
    });
  }

  if (btnPrev3) {
    btnPrev3.addEventListener('click', () => {
      clearErrors();
      goToStep(2);
    });
  }

  // Stepper Header Direct Click Navigation
  stepNavItems.forEach((nav, idx) => {
    if (!nav) return;
    nav.addEventListener('click', () => {
      const targetStep = idx + 1;
      if (targetStep === 1) {
        clearErrors();
        goToStep(1);
      } else if (targetStep === 2) {
        if (validateStep1()) {
          goToStep(2);
        }
      } else if (targetStep === 3) {
        if (validateStep1() && validateStep2()) {
          goToStep(3);
        }
      }
    });
  });

  // 3. Form Submit Handler (Final Confirmation on Step 3)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    if (!validateStep1()) {
      goToStep(1);
      return;
    }
    if (!validateStep2()) {
      goToStep(2);
      return;
    }

    const data = getFormData();
    const result = validateExpense(data);

    if (!result.isValid) {
      showErrors(result.errors, result.summary);
      return;
    }

    // Generate new unique ID
    const nextId = expenses.reduce((max, exp) => exp.id > max ? exp.id : max, 0) + 1;

    const newExpense = {
      id: nextId,
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      date: data.date
    };

    // Save to in-memory Array via unshift()
    expenses.unshift(newExpense);
    saveExpenses();
    render();

    form.reset();
    clearErrors();
    setDefaultDate();
    goToStep(1);
    showToast(`Added ₹${newExpense.amount} for "${newExpense.title}"`, "success");
  });

  function setDefaultDate() {
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.value = todayStr;
  }

  // 4. Test Presets
  document.getElementById('btn-preset-valid').addEventListener('click', () => {
    clearErrors();
    titleInput.value = "College Textbook";
    amountInput.value = "450";
    categorySelect.value = "Study";
    setDefaultDate();
    goToStep(3);
    showToast("Filled valid expense preset (Review Step)", "success");
  });

  document.getElementById('btn-preset-invalid').addEventListener('click', () => {
    clearErrors();
    goToStep(1);
    titleInput.value = "123"; // numbers only violation
    amountInput.value = "-50"; // negative amount violation
    categorySelect.value = ""; // missing category violation
    dateInput.value = ""; // missing date
    validateStep1();
  });

  document.getElementById('btn-preset-future').addEventListener('click', () => {
    clearErrors();
    titleInput.value = "Future Concert Ticket";
    categorySelect.value = "Shopping";
    amountInput.value = "1200";
    // Future Date: tomorrow + 5 days
    const future = new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0];
    dateInput.value = future;
    goToStep(2);
    validateStep2();
  });

  document.getElementById('btn-preset-duplicate').addEventListener('click', () => {
    clearErrors();
    if (expenses.length > 0) {
      const top = expenses[0];
      titleInput.value = top.title;
      amountInput.value = top.amount;
      categorySelect.value = top.category;
      dateInput.value = top.date;
    } else {
      titleInput.value = "Campus Cafeteria Lunch";
      amountInput.value = "120";
      categorySelect.value = "Food";
      dateInput.value = "2026-10-10";
    }
    goToStep(3);
    showToast("Duplicate scenario loaded in Step 3", "error");
  });

  document.getElementById('btn-preset-clear').addEventListener('click', () => {
    form.reset();
    clearErrors();
    setDefaultDate();
    goToStep(1);
    showToast("Form cleared", "success");
  });

  // 5. Array Operations: Search, Filter, Sort & Render
  function getFilteredExpenses() {
    return expenses
      // Array.filter() by Search Query
      .filter(exp => {
        if (!searchQuery) return true;
        return exp.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
      // Array.filter() by Category
      .filter(exp => {
        if (selectedCategory === 'ALL') return true;
        return exp.category === selectedCategory;
      });
  }

  function updateKPIs() {
    const totalCount = expenses.length;
    // Array.reduce() for total sum
    const totalSpent = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);

    // Array operations to find Top Category
    const categoryCounts = {};
    expenses.forEach(exp => {
      categoryCounts[exp.category] = (categoryCounts[exp.category] || 0) + Number(exp.amount);
    });
    let topCat = "-";
    let topVal = 0;
    for (const [cat, val] of Object.entries(categoryCounts)) {
      if (val > topVal) {
        topVal = val;
        topCat = cat;
      }
    }

    document.getElementById('total-amount').textContent = '₹' + totalSpent.toLocaleString('en-IN');
    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('top-category').textContent = topCat;
    document.getElementById('ledger-count').textContent = `${expenses.length} items`;
    document.getElementById('json-array-count').textContent = expenses.length;
  }

  function renderTable() {
    const tbody = document.getElementById('expense-tbody');
    const emptyState = document.getElementById('empty-ledger');
    const list = getFilteredExpenses();

    if (list.length === 0) {
      tbody.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    tbody.innerHTML = list.map(exp => `
      <tr data-id="${exp.id}">
        <td class="td-title">
          <span class="expense-title-text">${escapeHtml(exp.title)}</span>
        </td>
        <td>
          <span class="cat-pill cat-${exp.category.toLowerCase()}">${escapeHtml(exp.category)}</span>
        </td>
        <td class="tabular-nums td-date">
          ${escapeHtml(exp.date)}
        </td>
        <td class="tabular-nums td-amount">
          ₹${Number(exp.amount).toLocaleString('en-IN')}
        </td>
        <td class="td-action">
          <button type="button" class="btn-delete" data-id="${exp.id}" title="Delete expense">
            Delete
          </button>
        </td>
      </tr>
    `).join('');

    // Attach delete listeners
    tbody.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = Number(this.getAttribute('data-id'));
        deleteExpense(id);
      });
    });
  }

  function deleteExpense(id) {
    const target = expenses.find(e => e.id === id);
    const title = target ? target.title : 'Expense';
    // Array.filter() to remove item
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    render();
    showToast(`Deleted "${title}"`, "success");
  }

  // 6. JSON Stored Data View Synchronization
  function updateJsonBox() {
    const codeEl = document.getElementById('json-content');
    if (codeEl) {
      // Array serialization into formatted JSON string
      codeEl.textContent = JSON.stringify(expenses, null, 2);
    }
  }

  function render() {
    updateKPIs();
    renderTable();
    updateJsonBox();
  }

  // Search & Filter Events
  document.getElementById('search-input').addEventListener('input', function () {
    searchQuery = this.value.trim();
    renderTable();
  });

  document.getElementById('filter-category').addEventListener('change', function () {
    selectedCategory = this.value;
    renderTable();
  });

  // JSON Box Buttons
  document.getElementById('btn-copy-json').addEventListener('click', function () {
    navigator.clipboard.writeText(JSON.stringify(expenses, null, 2)).then(() => {
      showToast("JSON copied to clipboard", "success");
    });
  });

  document.getElementById('btn-download-json').addEventListener('click', function () {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expenses, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "student_expenses.json");
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    showToast("Downloaded student_expenses.json", "success");
  });

  document.getElementById('btn-reset-demo').addEventListener('click', function () {
    if (confirm("Reset expenses array to sample data?")) {
      expenses = JSON.parse(JSON.stringify(DEFAULT_EXPENSES));
      saveExpenses();
      render();
      clearErrors();
      form.reset();
      setDefaultDate();
      goToStep(1);
      showToast("Restored default sample data", "success");
    }
  });

  // Toast Helper
  function showToast(msg, type = "success") {
    toastMsg.textContent = msg;
    toastMsg.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
    toastMsg.classList.remove('hidden');
    setTimeout(() => {
      toastMsg.classList.add('hidden');
    }, 2400);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 7. Initialization
  loadExpenses();
  setDefaultDate();
  goToStep(1);
  render();

  // URL state parameter for automated screenshot testing
  const urlParams = new URLSearchParams(window.location.search);
  const state = urlParams.get('state');
  if (state === 'invalid') {
    document.getElementById('btn-preset-invalid').click();
  } else if (state === 'valid') {
    document.getElementById('btn-preset-valid').click();
  } else if (state === 'future') {
    document.getElementById('btn-preset-future').click();
  } else if (state === 'duplicate') {
    document.getElementById('btn-preset-duplicate').click();
  }

  const stepParam = urlParams.get('step');
  if (stepParam) {
    goToStep(Number(stepParam));
  }

  const scrollTarget = urlParams.get('scroll');
  if (scrollTarget === 'ledger') {
    window.scrollTo(0, 480);
  } else if (scrollTarget === 'json') {
    window.scrollTo(0, 720);
  }
})();
