## 🇮🇳 Indian Tax Calculator (FY 2026-27) - Professional Suite
A high-performance, mobile-responsive tax engine built with Vanilla JS. This tool allows users to calculate liabilities under the New Tax Regime (Budget 2025/26) and compare them instantly with the Old Tax Regime (FY 2024-25).

## 🚀 Technical Highlights
1. Multi-Tab Comparison Engine (Blob URL Architecture)
To bypass mobile browser restrictions on nested pop-ups and ensure a seamless user experience, this app utilizes a Blob URL generator.

It dynamically creates virtual HTML files in the browser's memory.

This allows the Summary, Comparison, and Slab Details to open in isolated, clean browser tabs without requiring extra .html files in the repository.

2. Adaptive Dark Mode
Built-in Theme Toggle that supports both Light and Dark modes.

Dark mode features a high-end financial dashboard aesthetic using navy gradients and optimized text contrast.

3. Integrated Tax Logic
New Regime (2026-27): Implements the updated slabs with a ₹75,000 Standard Deduction and a tax-free threshold effectively up to ₹12,00,000.

Old Regime (2024-25): Implements the classic slabs with a ₹50,000 Standard Deduction and Section 87A rebate logic.

4. Smart Savings Banner
The engine performs a real-time differential analysis between both regimes.

It displays a color-coded banner (Green for Savings, Amber for Loss) to guide the user toward the more tax-efficient regime.

## 📊 Tax Slabs Implemented

| Income Slab (New Regime 26-27) | Tax Rate |
|--------------------------------|----------|
| Up to ₹4,00,000                | Nil      |
| ₹4,00,001 – ₹8,00,000          | 5%       |
| ₹8,00,001 – ₹12,00,000         | 10%      |
| ₹12,00,001 – ₹16,00,000        | 15%      |
| ₹16,00,001 – ₹20,00,000        | 20%      |
| ₹20,00,001 – ₹24,00,000        | 25%      |
| Above ₹24,00,000               | 30%      |

 ## 🛠️ Technical Stack
- **HTML5/CSS3:** Flexbox layout, and Dark Mode variables.
- **Vanilla JavaScript:** 
    - `Intl.NumberFormat` for Indian currency.
    - `Blob()` and `URL.createObjectURL` for secure multi-page navigation.
    - `window.print()` integration for generating physical tax reports.

## 📂 Project Structure
index.html: The input interface and entry point.

style.css: Core layout and responsive design.

script.js: The "Engine" containing calculations, UI templates, and multi-tab logic.
