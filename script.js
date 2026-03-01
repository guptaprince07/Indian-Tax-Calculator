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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tax Summary FY 2026-27</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    background-color: #f8f9fa; 
                    display: flex; 
                    justify-content: center; 
                    padding: 20px; 
                    margin: 0; 
                }
                .card {
                    background: white;
                    width: 100%;
                    max-width: 450px;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    color: #333;
                }
                h2 { color: #1e3a8a; border-bottom: 2px solid #eef2ff; padding-bottom: 15px; margin-top: 0; font-size: 22px; }
                .row { display: flex; justify-content: space-between; margin: 15px 0; font-size: 16px; align-items: center; }
                .label { color: #64748b; }
                .value { font-weight: 500; color: #1e293b; }
                
                .highlight-red { color: #dc2626; font-weight: bold; }
                .highlight-green { color: #059669; font-weight: bold; font-size: 20px; }
                
                .divider { border-top: 1px solid #e2e8f0; margin: 20px 0; }
                
                .footer-text { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 25px; line-height: 1.5; }
                
                .print-btn { 
                    width: 100%; 
                    padding: 14px; 
                    background: #1e3a8a; 
                    color: white; 
                    border: none; 
                    border-radius: 8px;
                    margin-top: 20px; 
                    cursor: pointer; 
                    font-weight: bold;
                    font-size: 16px;
                }
                @media print { .print-btn { display: none; } body { background: white; padding: 0; } .card { box-shadow: none; border: none; } }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>Tax Summary (FY 2026-27)</h2>
                
                <div class="row"><span class="label">Gross Income:</span> <span class="value">₹${income.toLocaleString('en-IN')}</span></div>
                <div class="row"><span class="label">Standard Deduction:</span> <span class="value">- ₹${stdDeduction.toLocaleString('en-IN')}</span></div>
                <div class="row"><span class="label">Taxable Amount:</span> <span class="value">₹${taxableAmount.toLocaleString('en-IN')}</span></div>
                
                <div class="divider"></div>
                
                <div class="row"><span class="label" style="color:#dc2626;">Basic Income Tax:</span> <span class="highlight-red">₹${basicTax.toLocaleString('en-IN')}</span></div>
                <div class="row"><span class="label">Health & Edu Cess (4%):</span> <span class="value">₹${cess.toLocaleString('en-IN')}</span></div>
                <div class="row" style="font-weight:bold;"><span class="label" style="color:#1e293b;">Total Tax Outflow:</span> <span class="value">₹${totalTax.toLocaleString('en-IN')}</span></div>
                
                <div class="row" style="margin-top:25px;">
                    <span class="label" style="color:#059669; font-weight:bold;">Annual Net Salary:</span> 
                    <span class="highlight-green">₹${netSalary.toLocaleString('en-IN')}</span>
                </div>
                
                <p class="footer-text">Results calculated under the New Tax Regime (Default) as per 2026 rules.</p>
                
                <button class="print-btn" onclick="window.print()">PRINT SUMMARY</button>
            </div>
        </body>
        </html>
    `);
    win.document.close();
}
