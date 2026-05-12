function quickFill(num) {
    const input = document.getElementById('incomeInput');
    input.value = num.toLocaleString('en-IN');
    formatIndianCurrency(input);
}

function formatIndianCurrency(input) {
    let val = input.value.replace(/,/g, '');
    if (val === '') return;
    let x = parseFloat(val);
    if (!isNaN(x)) input.value = x.toLocaleString('en-IN');
}

function calcOldRegime(income) {
    const taxableAmount = Math.max(0, income - 50000);
    let basicTax = 0;
    if (taxableAmount > 1000000)     basicTax = (taxableAmount - 1000000) * 0.30 + 112500;
    else if (taxableAmount > 500000) basicTax = (taxableAmount - 500000)  * 0.20 + 12500;
    else if (taxableAmount > 250000) basicTax = (taxableAmount - 250000)  * 0.05;
    if (taxableAmount <= 500000) basicTax = 0;
    const cess      = basicTax * 0.04;
    const totalTax  = basicTax + cess;
    const netSalary = income - totalTax;
    return { taxableAmount, basicTax, cess, totalTax, netSalary };
}

/* Helper — creates a Blob URL (avoids nested document.write) */
function blobURL(html) {
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    return URL.createObjectURL(blob);
}

/* ── Toggle switch HTML (same on every page) ───────────────────────────── */
var TOGGLE_HTML = [
    '<div class="toggle-wrap">',
    '  <span class="toggle-label" id="tlabel">\u2600\uFE0F Light</span>',
    '  <label class="switch">',
    '    <input type="checkbox" id="darkToggle" onchange="toggleDark(this)">',
    '    <span class="slider"></span>',
    '  </label>',
    '</div>'
].join('');

var TOGGLE_JS = [
    '<script>',
    'function toggleDark(cb) {',
    '    document.body.classList.toggle("dark", cb.checked);',
    '    document.getElementById("tlabel").textContent = cb.checked ? "\uD83C\uDF19 Dark" : "\u2600\uFE0F Light";',
    '}',
    '<\/script>'
].join('\n');

/* ── Toggle CSS (shared) ───────────────────────────────────────────────── */
var TOGGLE_CSS = [
    '.toggle-wrap { display:flex; justify-content:flex-end; align-items:center; gap:8px; margin-bottom:16px; }',
    '.toggle-label { font-size:13px; color:#64748b; font-weight:600; transition:color 0.3s; }',
    '.switch { position:relative; display:inline-block; width:46px; height:25px; }',
    '.switch input { opacity:0; width:0; height:0; }',
    '.slider { position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0;',
    '          background:#cbd5e1; border-radius:25px; transition:0.3s; }',
    '.slider:before { position:absolute; content:""; height:19px; width:19px; left:3px; bottom:3px;',
    '                 background:white; border-radius:50%; transition:0.3s; box-shadow:0 1px 4px rgba(0,0,0,0.2); }',
    'input:checked + .slider { background:#4338ca; }',
    'input:checked + .slider:before { transform:translateX(21px); }'
].join('\n');

/* ── Card dark mode CSS ────────────────────────────────────────────────── */
var CARD_DARK_CSS = [
    'body.dark { background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%); }',
    'body.dark .card {',
    '    background: rgba(15, 23, 42, 0.72);',
    '    backdrop-filter: blur(16px);',
    '    -webkit-backdrop-filter: blur(16px);',
    '    border: 1px solid rgba(255,255,255,0.08);',
    '    color: #e2e8f0;',
    '}',
    'body.dark h2 { color: #93c5fd; border-bottom-color: rgba(255,255,255,0.1); }',
    'body.dark .label { color: #94a3b8; }',
    'body.dark .value { color: #e2e8f0; }',
    'body.dark .divider { border-color: rgba(255,255,255,0.1); }',
    'body.dark .highlight-green { color: #34d399; }',
    'body.dark .highlight-red   { color: #fb7185; }',
    'body.dark .footer-text { color: #64748b; }',
    'body.dark .savings-banner {',
    '    background: rgba(16, 185, 129, 0.1);',
    '    border-color: rgba(16, 185, 129, 0.25);',
    '}',
    'body.dark .btn-primary { background: #3730a3; color: #e0e7ff; }',
    'body.dark .btn-amber  { background: rgba(245,158,11,0.08); border-color: #f59e0b; color: #fbbf24; }',
    'body.dark .btn-indigo { background: rgba(99,102,241,0.08); border-color: #818cf8; color: #a5b4fc; }',
    'body.dark .toggle-label { color: #94a3b8; }'
].join('\n');

/* ── Slab dark mode CSS ────────────────────────────────────────────────── */
var SLAB_DARK_CSS = [
    'body.dark { background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%); }',
    'body.dark .card {',
    '    background: rgba(15, 23, 42, 0.72);',
    '    backdrop-filter: blur(16px);',
    '    -webkit-backdrop-filter: blur(16px);',
    '    border: 1px solid rgba(255,255,255,0.08);',
    '    color: #e2e8f0;',
    '}',
    'body.dark h2 { color: #93c5fd; border-bottom-color: rgba(255,255,255,0.1); }',
    'body.dark table thead tr { background: #1e3a8a; }',
    'body.dark tbody tr { background: transparent; }',
    'body.dark tbody tr:nth-child(even) { background: rgba(255,255,255,0.04); }',
    'body.dark tbody td { border-color: rgba(255,255,255,0.08); color: #e2e8f0; }',
    'body.dark .rate     { color: #fb7185; }',
    'body.dark .rate-nil { color: #34d399; }',
    'body.dark .note-box {',
    '    background: rgba(99,102,241,0.08);',
    '    border-color: rgba(165,180,252,0.2);',
    '    color: #a5b4fc;',
    '}',
    'body.dark .note-box strong { color: #93c5fd; }',
    'body.dark .toggle-label { color: #94a3b8; }'
].join('\n');

/* ── Shared base CSS ───────────────────────────────────────────────────── */
var CARD_CSS = [
    '* { box-sizing: border-box; }',
    'body {',
    '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;',
    '    background-color: #f0f2f5;',
    '    display: flex; justify-content: center; align-items: flex-start;',
    '    padding: 15px; margin: 0; min-height: 100vh; transition: background 0.4s;',
    '}',
    '.card { background: white; width: 100%; max-width: 400px; padding: 24px;',
    '        border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); color: #1e293b;',
    '        transition: background 0.4s, border 0.4s, color 0.4s; }',
    'h2 { color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;',
    '     margin: 0 0 20px 0; font-size: 20px; text-align: center; transition: color 0.4s; }',
    '.row { display: flex; justify-content: space-between; margin: 12px 0; font-size: 15px; }',
    '.label { color: #64748b; transition: color 0.3s; }',
    '.value { font-weight: 600; color: #1e293b; transition: color 0.3s; }',
    '.divider { border-top: 1px solid #e2e8f0; margin: 18px 0; transition: border-color 0.3s; }',
    '.highlight-red   { color: #be123c; font-weight: 700; transition: color 0.3s; }',
    '.highlight-green { color: #059669; font-weight: 700; font-size: 19px; transition: color 0.3s; }',
    '.footer-text { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; line-height: 1.4; transition: color 0.3s; }',
    '.savings-banner { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px;',
    '    padding: 10px 14px; margin-top: 16px; text-align: center; font-size: 13px; font-weight: 600;',
    '    transition: background 0.4s, border-color 0.4s; }',
    '.btn { width: 100%; padding: 15px; border-radius: 12px; margin-top: 10px; cursor: pointer;',
    '       font-weight: 700; font-size: 15px; -webkit-tap-highlight-color: transparent; border: none;',
    '       transition: background 0.3s, color 0.3s, border-color 0.3s; }',
    '.btn-primary { background: #1e3a8a; color: white; }',
    '.btn-amber  { background: white; color: #b45309; border: 2px solid #f59e0b; }',
    '.btn-amber:hover  { background: #fffbeb; }',
    '.btn-indigo { background: white; color: #4338ca; border: 2px solid #818cf8; }',
    '.btn-indigo:hover { background: #eef2ff; }',
    '@media print { .btn { display: none; } .savings-banner { display: none; } .toggle-wrap { display: none; } body { background: white; padding: 0; } }'
].join('\n');

var SLAB_CSS = [
    '* { box-sizing: border-box; }',
    'body {',
    '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;',
    '    background-color: #f0f2f5;',
    '    display: flex; justify-content: center; align-items: flex-start;',
    '    padding: 15px; margin: 0; min-height: 100vh; transition: background 0.4s;',
    '}',
    '.card { background: white; width: 100%; max-width: 400px; padding: 24px;',
    '        border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); color: #1e293b;',
    '        transition: background 0.4s, border 0.4s, color 0.4s; }',
    'h2 { color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;',
    '     margin: 0 0 20px 0; font-size: 20px; text-align: center; transition: color 0.4s; }',
    'table { width: 100%; border-collapse: collapse; font-size: 14px; }',
    'thead tr { background: #1e3a8a; color: white; }',
    'thead th { padding: 10px 12px; text-align: left; font-weight: 600; }',
    'tbody tr:nth-child(even) { background: #f8fafc; transition: background 0.3s; }',
    'tbody td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b; transition: color 0.3s, border-color 0.3s; }',
    '.rate     { font-weight: 700; color: #be123c; transition: color 0.3s; }',
    '.rate-nil { font-weight: 700; color: #059669; transition: color 0.3s; }',
    '.note-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;',
    '    padding: 12px 14px; margin-top: 18px; font-size: 12px; color: #1e40af; line-height: 1.8;',
    '    transition: background 0.4s, border-color 0.4s, color 0.4s; }',
    '.note-box strong { display: block; margin-bottom: 4px; font-size: 13px; color: #1e3a8a; transition: color 0.3s; }',
    '@media print { .toggle-wrap { display: none; } body { background: white; padding: 0; } }'
].join('\n');

/* ── Static slab pages ─────────────────────────────────────────────────── */
function newRegimeSlabsHTML() {
    return '<!DOCTYPE html><html><head>'
        + '<meta charset="UTF-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">'
        + '<title>Tax Slabs FY 2026-27</title>'
        + '<style>' + SLAB_CSS + TOGGLE_CSS + SLAB_DARK_CSS + '</style>'
        + '</head><body><div class="card">'
        + TOGGLE_HTML
        + '<h2>Tax Slabs (FY 2026-27)</h2>'
        + '<table><thead><tr><th>Income Slab</th><th>Tax Rate</th></tr></thead><tbody>'
        + '<tr><td>Up to \u20B94,00,000</td><td class="rate-nil">Nil</td></tr>'
        + '<tr><td>\u20B94,00,001 \u2013 \u20B98,00,000</td><td class="rate">5%</td></tr>'
        + '<tr><td>\u20B98,00,001 \u2013 \u20B912,00,000</td><td class="rate">10%</td></tr>'
        + '<tr><td>\u20B912,00,001 \u2013 \u20B916,00,000</td><td class="rate">15%</td></tr>'
        + '<tr><td>\u20B916,00,001 \u2013 \u20B920,00,000</td><td class="rate">20%</td></tr>'
        + '<tr><td>\u20B920,00,001 \u2013 \u20B924,00,000</td><td class="rate">25%</td></tr>'
        + '<tr><td>Above \u20B924,00,000</td><td class="rate">30%</td></tr>'
        + '</tbody></table>'
        + '<div class="note-box"><strong>Key Notes</strong>'
        + '\u2022 Standard deduction of \u20B975,000 applies.<br>'
        + '\u2022 Full rebate u/s 87A: 0 tax if taxable income \u2264 \u20B912,00,000.<br>'
        + '\u2022 4% Health &amp; Education Cess on income tax.<br>'
        + '\u2022 Surcharge applicable for income above \u20B950 Lakh.</div>'
        + '</div>'
        + TOGGLE_JS
        + '</body></html>';
}

function oldRegimeSlabsHTML() {
    return '<!DOCTYPE html><html><head>'
        + '<meta charset="UTF-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">'
        + '<title>Tax Slabs FY 2024-25</title>'
        + '<style>' + SLAB_CSS + TOGGLE_CSS + SLAB_DARK_CSS + '</style>'
        + '</head><body><div class="card">'
        + TOGGLE_HTML
        + '<h2>Tax Slabs (FY 2024-25)</h2>'
        + '<table><thead><tr><th>Income Slab</th><th>Tax Rate</th></tr></thead><tbody>'
        + '<tr><td>Up to \u20B92,50,000</td><td class="rate-nil">Nil</td></tr>'
        + '<tr><td>\u20B92,50,001 \u2013 \u20B95,00,000</td><td class="rate">5%</td></tr>'
        + '<tr><td>\u20B95,00,001 \u2013 \u20B910,00,000</td><td class="rate">20%</td></tr>'
        + '<tr><td>Above \u20B910,00,000</td><td class="rate">30%</td></tr>'
        + '</tbody></table>'
        + '<div class="note-box"><strong>Key Notes</strong>'
        + '\u2022 Standard deduction of \u20B950,000 applies.<br>'
        + '\u2022 87A Rebate: 0 tax if taxable income \u2264 \u20B95,00,000.<br>'
        + '\u2022 4% Health &amp; Education Cess on income tax.<br>'
        + '\u2022 Deductions like 80C, HRA, LTA not included here.</div>'
        + '</div>'
        + TOGGLE_JS
        + '</body></html>';
}

/* ── Old Regime result page ────────────────────────────────────────────── */
function oldRegimeResultHTML(income, savingsText, savingsColor) {
    var d = calcOldRegime(income);
    var oldSlabsUrl = blobURL(oldRegimeSlabsHTML());

    return '<!DOCTYPE html><html><head>'
        + '<meta charset="UTF-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">'
        + '<title>Tax Summary FY 2024-25</title>'
        + '<style>' + CARD_CSS + TOGGLE_CSS + CARD_DARK_CSS
        + ' .savings-banner { color: ' + savingsColor + '; }'
        + ' body.dark .savings-banner { color: ' + (savingsColor === '#166534' ? '#34d399' : savingsColor === '#92400e' ? '#fbbf24' : '#93c5fd') + '; }'
        + '</style>'
        + '</head><body><div class="card">'
        + TOGGLE_HTML
        + '<h2>Tax Summary (FY 2024-25)</h2>'
        + '<div class="row"><span class="label">Gross Income</span><span class="value">\u20B9' + income.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Std. Deduction</span><span class="value">- \u20B950,000</span></div>'
        + '<div class="row"><span class="label">Taxable Amount</span><span class="value">\u20B9' + d.taxableAmount.toLocaleString('en-IN') + '</span></div>'
        + '<div class="divider"></div>'
        + '<div class="row"><span class="label">Basic Income Tax</span><span class="highlight-red">\u20B9' + d.basicTax.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Cess (4%)</span><span class="value">\u20B9' + d.cess.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row" style="margin-top:15px;">'
        +   '<span class="label" style="font-weight:700;color:#1e293b;">Total Tax</span>'
        +   '<span class="value" style="font-size:17px;">\u20B9' + d.totalTax.toLocaleString('en-IN') + '</span>'
        + '</div>'
        + '<div class="divider"></div>'
        + '<div class="row">'
        +   '<span class="label" style="color:#059669;font-weight:700;">Annual Net Salary</span>'
        +   '<span class="highlight-green">\u20B9' + d.netSalary.toLocaleString('en-IN') + '</span>'
        + '</div>'
        + '<div class="savings-banner">' + savingsText + '</div>'
        + '<p class="footer-text">Calculated under Old Tax Regime for FY 2024-25.<br>Deductions like 80C, HRA, LTA not included.</p>'
        + '<button class="btn btn-indigo" onclick="window.open(\'' + oldSlabsUrl + '\',\'_blank\')">&#128203; View Tax Slabs (FY 2024-25)</button>'
        + '<button class="btn btn-primary" onclick="window.print()">PRINT SUMMARY</button>'
        + '</div>'
        + TOGGLE_JS
        + '</body></html>';
}

/* ── Main Calculate ────────────────────────────────────────────────────── */
function calculateInNewTab() {
    var rawValue = document.getElementById('incomeInput').value.replace(/,/g, '');
    var income   = parseFloat(rawValue);

    if (!income || income <= 0) {
        alert('Please enter a valid salary amount');
        return;
    }

    // New Regime calculation
    var taxableAmount = Math.max(0, income - 75000);
    var basicTax = 0;

    if (taxableAmount > 2400000)      basicTax = (taxableAmount - 2400000) * 0.30 + 300000;
    else if (taxableAmount > 2000000) basicTax = (taxableAmount - 2000000) * 0.25 + 200000;
    else if (taxableAmount > 1600000) basicTax = (taxableAmount - 1600000) * 0.20 + 120000;
    else if (taxableAmount > 1200000) basicTax = (taxableAmount - 1200000) * 0.15 + 60000;
    else if (taxableAmount > 800000)  basicTax = (taxableAmount - 800000)  * 0.10 + 20000;
    else if (taxableAmount > 400000)  basicTax = (taxableAmount - 400000)  * 0.05;
    if (taxableAmount <= 1200000) basicTax = 0;

    var cess      = basicTax * 0.04;
    var totalTax  = basicTax + cess;
    var netSalary = income - totalTax;

    // Savings comparison
    var old  = calcOldRegime(income);
    var diff = old.totalTax - totalTax;
    var savingsText, savingsColor;
    if (diff > 0) {
        savingsText  = '\uD83D\uDCA1 New Regime saves you \u20B9' + Math.round(diff).toLocaleString('en-IN') + ' vs Old Regime';
        savingsColor = '#166534';
    } else if (diff < 0) {
        savingsText  = '\uD83D\uDCA1 Old Regime saves you \u20B9' + Math.round(Math.abs(diff)).toLocaleString('en-IN') + ' vs New Regime';
        savingsColor = '#92400e';
    } else {
        savingsText  = '\uD83D\uDCA1 Both regimes result in the same tax';
        savingsColor = '#1e40af';
    }

    // Pre-build all child Blob URLs
    var newSlabsUrl  = blobURL(newRegimeSlabsHTML());
    var oldResultUrl = blobURL(oldRegimeResultHTML(income, savingsText, savingsColor));

    var win = window.open('', '_blank');
    win.document.write(
        '<!DOCTYPE html><html><head>'
        + '<meta charset="UTF-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">'
        + '<title>Tax Summary FY 2026-27</title>'
        + '<style>' + CARD_CSS + TOGGLE_CSS + CARD_DARK_CSS + '</style>'
        + '</head><body><div class="card">'
        + TOGGLE_HTML
        + '<h2>Tax Summary (FY 2026-27)</h2>'
        + '<div class="row"><span class="label">Gross Income</span><span class="value">\u20B9' + income.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Std. Deduction</span><span class="value">- \u20B975,000</span></div>'
        + '<div class="row"><span class="label">Taxable Amount</span><span class="value">\u20B9' + taxableAmount.toLocaleString('en-IN') + '</span></div>'
        + '<div class="divider"></div>'
        + '<div class="row"><span class="label">Basic Income Tax</span><span class="highlight-red">\u20B9' + basicTax.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Cess (4%)</span><span class="value">\u20B9' + cess.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row" style="margin-top:15px;">'
        +   '<span class="label" style="font-weight:700;color:#1e293b;">Total Tax</span>'
        +   '<span class="value" style="font-size:17px;">\u20B9' + totalTax.toLocaleString('en-IN') + '</span>'
        + '</div>'
        + '<div class="divider"></div>'
        + '<div class="row">'
        +   '<span class="label" style="color:#059669;font-weight:700;">Annual Net Salary</span>'
        +   '<span class="highlight-green">\u20B9' + netSalary.toLocaleString('en-IN') + '</span>'
        + '</div>'
        + '<p class="footer-text">Calculated under New Tax Regime rules for FY 2026-27.</p>'
        + '<button class="btn btn-amber"  onclick="window.open(\'' + oldResultUrl + '\',\'_blank\')">&#9878;&#65039; Compare with Old Regime</button>'
        + '<button class="btn btn-indigo" onclick="window.open(\'' + newSlabsUrl  + '\',\'_blank\')">&#128203; View Tax Slabs (FY 2026-27)</button>'
        + '<button class="btn btn-primary" onclick="window.print()">PRINT SUMMARY</button>'
        + '</div>'
        + TOGGLE_JS
        + '</body></html>'
    );
    win.document.close();
    win.focus();
}
