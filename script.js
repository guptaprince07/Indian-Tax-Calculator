// Function to format the input field as Indian Currency (1,00,000)
function formatIndianCurrency(input) {
    // Remove all non-numeric characters except the decimal point
    let value = input.value.replace(/,/g, '');
    if (value === "") return;

    // Convert to number and back to string with Indian locale formatting
    let x = parseFloat(value);
    if (!isNaN(x)) {
        input.value = x.toLocaleString('en-IN');
    }
}

// Function to fill the input field when a quick-select button is clicked
function quickFill(value) {
    const input = document.getElementById('incomeInput');
    input.value = value.toLocaleString('en-IN');
}

function calculateInNewTab() {
    // Clean the commas before doing math
    const rawValue = document.getElementById('incomeInput').value.replace(/,/g, '');
    const grossIncome = parseFloat(rawValue);
    
    if (isNaN(grossIncome) || grossIncome <= 0) {
        alert("Please enter a valid salary amount.");
        return;
    }

    // --- 2026 TAX LOGIC ---
    const stdDeduction = 75000;
    let taxableIncome = Math.max(0, grossIncome - stdDeduction);

    let tax = 0;
    // Slabs: 0-4L(0%), 4-8L(5%), 8-12L(10%), 12-16L(15%), 16-20L(20%), 20-24L(25%), >24L(30%)
    if (taxableIncome > 2400000) tax = (taxableIncome - 2400000) * 0.30 + 300000;
    else if (taxableIncome > 2000000) tax = (taxableIncome - 2000000) * 0.25 + 200000;
    else if (taxableIncome > 1600000) tax = (taxableIncome - 1600000) * 0.20 + 120000;
    else if (taxableIncome > 1200000) tax = (taxableIncome - 1200000) * 0.15 + 60000;
    else if (taxableIncome > 800000) tax = (taxableIncome - 800000) * 0.10 + 20000;
    else if (taxableIncome > 400000) tax = (taxableIncome - 400000) * 0.05;

    // Section 87A Rebate: Full tax rebate if taxable income is <= ₹12 Lakh
    if (taxableIncome <= 1200000) {
        tax = 0;
    }

    let cess = tax * 0.04;
    let totalTax = tax + cess;
    let takeHome = grossIncome - totalTax;

    // Open Results Page
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(`
        <html>
        <head>
            <title>Tax Result - India 2026</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; padding: 40px; background: #e9ecef; }
                .report-box { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 450px; }
                h2 { color: #1e3c72; border-bottom: 3px solid #f1f1f1; padding-bottom: 10px; margin-top: 0; }
                .data-row { display: flex; justify-content: space-between; margin: 18px 0; font-size: 1.1rem; color: #444; }
                .highlight { font-weight: bold; color: #d9534f; border-top: 2px solid #eee; padding-top: 15px; font-size: 1.2rem; }
                .success { color: #28a745; font-weight: bold; font-size: 1.4rem; }
                .footer-text { font-size: 0.8rem; color: #999; margin-top: 40px; text-align: center; line-height: 1.4; }
            </style>
        </head>
        <body>
            <div class="report-box">
                <h2>Tax Summary (FY 2026-27)</h2>
                <div class="data-row"><span>Gross Income:</span> <span>₹${grossIncome.toLocaleString('en-IN')}</span></div>
                <div class="data-row"><span>Standard Deduction:</span> <span>- ₹75,000</span></div>
                <div class="data-row"><span>Taxable Amount:</span> <span>₹${taxableIncome.toLocaleString('en-IN')}</span></div>
                <div class="data-row highlight"><span>Basic Income Tax:</span> <span>₹${tax.toLocaleString('en-IN')}</span></div>
                <div class="data-row"><span>Health & Edu Cess (4%):</span> <span>₹${cess.toLocaleString('en-IN')}</span></div>
                <div class="data-row" style="border-top: 1px solid #eee; padding-top: 10px;">
                    <span>Total Tax Outflow:</span> <strong>₹${totalTax.toLocaleString('en-IN')}</strong>
                </div>
                <div class="data-row success">
                    <span>Annual Net Salary:</span> <span>₹${takeHome.toLocaleString('en-IN')}</span>
                </div>
                <p class="footer-text">Results calculated under the New Tax Regime (Default) as per 2026 rules.</p>
            </div>
        </body>
        </html>
    `);
}