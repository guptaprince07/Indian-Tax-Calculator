// 1. QUICK FILL BUTTONS: This makes the 12L, 15L, etc. buttons work
function quickFill(num) {
    const input = document.getElementById('incomeInput');
    input.value = num.toLocaleString('en-IN');
    formatIndianCurrency(input); // Formats with commas immediately
}

// 2. CURRENCY FORMATTING: Adds commas as the user types
function formatIndianCurrency(input) {
    let val = input.value.replace(/,/g, '');
    if (val === "") return;
    let x = parseFloat(val);
    if (!isNaN(x)) input.value = x.toLocaleString('en-IN');
}

// 3. CALCULATION & RESPONSIVE SUMMARY CARD:
function calculateInNewTab() {
    const rawValue = document.getElementById('incomeInput').value.replace(/,/g, '');
    const income = parseFloat(rawValue);
    
    if (!income || income <= 0) {
        alert("Please enter a valid salary amount");
        return;
    }

    const stdDeduction = 75000;
    const taxableAmount = Math.max(0, income - stdDeduction);
    let basicTax = 0;

    // 2026 Slabs Logic
    if (taxableAmount > 2400000) basicTax = (taxableAmount - 2400000) * 0.3 + 300000;
    else if (taxableAmount > 2000000) basicTax = (taxableAmount - 2000000) * 0.25 + 200000;
    else if (taxableAmount > 1600000) basicTax = (taxableAmount - 1600000) * 0.2 + 120000;
    else if (taxableAmount > 1200000) basicTax = (taxableAmount - 1200000) * 0.15 + 60000;
    else if (taxableAmount > 800000) basicTax = (taxableAmount - 800000) * 0.1 + 20000;
    else if (taxableAmount > 400000) basicTax = (taxableAmount - 400000) * 0.05;

    // 87A Rebate (Zero tax up to 12L taxable)
    if (taxableAmount <= 1200000) basicTax = 0;

    const cess = basicTax * 0.04;
    const totalTax = basicTax + cess;
    const netSalary = income - totalTax;

    const win = window.open("", "_blank");
    
    win.document.write(`
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>Tax Summary FY 2026-27</title>
            <style>
                * { box-sizing: border-box; }
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
                    background-color: #f0f2f5; 
                    display: flex; 
                    justify-content: center; 
                    align-items: flex-start; /* Better for mobile scrolling */
                    padding: 15px; 
                    margin: 0; 
                    min-height: 100vh;
                }
                .card {
                    background: white;
                    width: 100%; /* Makes it use full width on mobile */
                    max-width: 400px; /* Keeps it from getting too wide on desktop */
                    padding: 24px;
                    border-radius: 16px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                    color: #1e293b;
                }
                h2 { color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin: 0 0 20px 0; font-size: 20px; text-align: center; }
                .row { display: flex; justify-content: space-between; margin: 12px 0; font-size: 15px; }
                .label { color: #64748b; }
                .value { font-weight: 600; color: #1e293b; }
                .divider { border-top: 1px solid #e2e8f0; margin: 18px 0; }
                .highlight-red { color: #be123c; font-weight: 700; }
                .highlight-green { color: #059669; font-weight: 700; font-size: 19px; }
                .footer-text { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; line-height: 1.4; }
                .print-btn { 
                    width: 100%; 
                    padding: 16px; 
                    background: #1e3a8a; 
                    color: white; 
                    border: none; 
                    border-radius: 12px;
                    margin-top: 20px; 
                    cursor: pointer; 
                    font-weight: 700;
                    font-size: 16px;
                    -webkit-tap-highlight-color: transparent;
                }
                @media print { .print-btn { display: none; } body { background: white; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>Tax Summary (FY 2026-27)</h2>
                <div class="row"><span class="label">Gross Income</span> <span class="value">₹${income.toLocaleString('en-IN')}</span></div>
                <div class="row"><span class="label">Std. Deduction</span> <span class="value">- ₹75,000</span></div>
                <div class="row"><span class="label">Taxable Amount</span> <span class="value">₹${taxableAmount.toLocaleString('en-IN')}</span></div>
                <div class="divider"></div>
                <div class="row"><span class="label">Basic Income Tax</span> <span class="highlight-red">₹${basicTax.toLocaleString('en-IN')}</span></div>
                <div class="row"><span class="label">Cess (4%)</span> <span class="value">₹${cess.toLocaleString('en-IN')}</span></div>
                <div class="row" style="margin-top:15px;"><span class="label" style="font-weight:700; color:#1e293b;">Total Tax</span> <span class="value" style="font-size:17px;">₹${totalTax.toLocaleString('en-IN')}</span></div>
                <div class="divider"></div>
                <div class="row"><span class="label" style="color:#059669; font-weight:700;">Annual Net Salary</span> <span class="highlight-green">₹${netSalary.toLocaleString('en-IN')}</span></div>
                <p class="footer-text">Calculated under New Tax Regime rules for 2026.</p>
                <button class="print-btn" onclick="window.print()">PRINT SUMMARY</button>
            </div>
        </body>
        </html>
    `);
    win.document.close();
    win.onload = function() {
        win.setTimeout(function() {
            win.document.body.style.display = 'none';
            // Accessing offsetHeight forces the browser to recalculate the layout immediately
            win.document.body.offsetHeight; 
            win.document.body.style.display = 'flex';           
            // Dispatch the resize event as a final nudge
            win.dispatchEvent(new Event('resize'));
        }, 150);
    };
    win.focus();
}




