function quickFill(num) {
    var input = document.getElementById('incomeInput');
    input.value = num.toLocaleString('en-IN');
    formatIndianCurrency(input);
}

function formatIndianCurrency(input) {
    var val = input.value.replace(/,/g, '');
    if (val === '') return;
    var x = parseFloat(val);
    if (!isNaN(x)) input.value = x.toLocaleString('en-IN');
}

function calcOldRegime(income) {
    var taxableAmount = Math.max(0, income - 50000);
    var basicTax = 0;
    if      (taxableAmount > 1000000) basicTax = (taxableAmount - 1000000) * 0.30 + 112500;
    else if (taxableAmount > 500000)  basicTax = (taxableAmount - 500000)  * 0.20 + 12500;
    else if (taxableAmount > 250000)  basicTax = (taxableAmount - 250000)  * 0.05;
    if (taxableAmount <= 500000) basicTax = 0;
    var cess      = basicTax * 0.04;
    var totalTax  = basicTax + cess;
    var netSalary = income - totalTax;
    return { taxableAmount: taxableAmount, basicTax: basicTax, cess: cess, totalTax: totalTax, netSalary: netSalary };
}

function blobURL(html) {
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    return URL.createObjectURL(blob);
}

/* ══════════════════════════════════════════════════════════════════════
   SHARED INLINE STRINGS — embedded into every output tab
══════════════════════════════════════════════════════════════════════ */

/* ── Toggle HTML widget ─────────────────────────────────────────────── */
var TOGGLE_HTML = '<div class="toggle-wrap">'
    + '<span class="toggle-label" id="tlabel">\u2600\uFE0F Light</span>'
    + '<label class="switch">'
    + '<input type="checkbox" id="darkToggle" onchange="toggleDark(this)">'
    + '<span class="slider"></span>'
    + '</label></div>';

/* ── Dark-mode toggle + localStorage persistence ────────────────────── */
var TOGGLE_JS = '<script>'
    + 'function toggleDark(cb){'
    + '  document.body.classList.toggle("dark",cb.checked);'
    + '  document.getElementById("tlabel").textContent=cb.checked?"\uD83C\uDF19 Dark":"\u2600\uFE0F Light";'
    + '  try{localStorage.setItem("taxDarkMode",cb.checked?"1":"0");}catch(e){}'
    + '}'
    + '(function(){'                                      // auto-apply saved pref
    + '  try{'
    + '    if(localStorage.getItem("taxDarkMode")==="1"){'
    + '      document.body.classList.add("dark");'
    + '      var t=document.getElementById("darkToggle");'
    + '      var l=document.getElementById("tlabel");'
    + '      if(t)t.checked=true;'
    + '      if(l)l.textContent="\uD83C\uDF19 Dark";'
    + '    }'
    + '  }catch(e){}'
    + '})();'
    + '<\/script>';

/* ── Waves animation — embedded in every output tab ────────────────────
   Canvas is created entirely in JS (no HTML element needed).
   pointer-events:none + z-index:-9999 ensure zero click interference.
──────────────────────────────────────────────────────────────────────── */
var WAVES_JS = '<script>'
    + '(function(){'
    + 'try{'

    /* ── create canvas ── */
    + 'var cv=document.createElement("canvas");'
    + 'cv.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-9999;pointer-events:none;touch-action:none;display:block";'
    + 'document.body.insertBefore(cv,document.body.firstChild);'
    + 'var cx=cv.getContext("2d");'

    /* ── Grad ── */
    + 'function G(x,y,z){this.x=x;this.y=y;this.z=z;}'
    + 'G.prototype.d=function(x,y){return this.x*x+this.y*y;};'

    /* ── Noise ── */
    + 'function N(seed){'
    + 'this.g=[new G(1,1,0),new G(-1,1,0),new G(1,-1,0),new G(-1,-1,0),'
    + 'new G(1,0,1),new G(-1,0,1),new G(1,0,-1),new G(-1,0,-1),'
    + 'new G(0,1,1),new G(0,-1,1),new G(0,1,-1),new G(0,-1,-1)];'
    + 'this.p=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,'
    + '21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,'
    + '237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,'
    + '111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,'
    + '80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,'
    + '3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,'
    + '17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,'
    + '129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,'
    + '238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,'
    + '184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,'
    + '195,78,66,215,61,156,180];'
    + 'this.pm=new Array(512);this.gp=new Array(512);this.seed(seed||0);}'
    + 'N.prototype.seed=function(s){'
    + 'if(s>0&&s<1)s*=65536;s=Math.floor(s);if(s<256)s|=s<<8;'
    + 'for(var i=0;i<256;i++){var v=(i&1)?this.p[i]^(s&255):this.p[i]^((s>>8)&255);'
    + 'this.pm[i]=this.pm[i+256]=v;this.gp[i]=this.gp[i+256]=this.g[v%12];}};'
    + 'N.prototype.fade=function(t){return t*t*t*(t*(t*6-15)+10);};'
    + 'N.prototype.lerp=function(a,b,t){return(1-t)*a+t*b;};'
    + 'N.prototype.p2=function(x,y){'
    + 'var X=Math.floor(x),Y=Math.floor(y);x-=X;y-=Y;X&=255;Y&=255;'
    + 'var n00=this.gp[X+this.pm[Y]].d(x,y),n01=this.gp[X+this.pm[Y+1]].d(x,y-1),'
    + 'n10=this.gp[X+1+this.pm[Y]].d(x-1,y),n11=this.gp[X+1+this.pm[Y+1]].d(x-1,y-1),'
    + 'u=this.fade(x);return this.lerp(this.lerp(n00,n10,u),this.lerp(n01,n11,u),this.fade(y));};'

    /* ── state ── */
    + 'var ns=new N(Math.random()),lines=[],'
    + 'W=window.innerWidth,H=window.innerHeight,'
    + 'mo={x:-10,y:0,lx:0,ly:0,sx:0,sy:0,v:0,vs:0,a:0,set:false},'
    + 'cfg={lc:"rgba(255,255,255,0.42)",sx:0.0125,sy:0.01,ax:40,ay:20,fr:0.9,tn:0.01,mc:120,xg:12,yg:36};'

    /* ── resize ── */
    + 'function rsz(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;bld();}'

    /* ── build grid ── */
    + 'function bld(){'
    + 'lines=[];var tl=Math.ceil((W+200)/cfg.xg),tp=Math.ceil((H+30)/cfg.yg),'
    + 'xs=(W-cfg.xg*tl)/2,ys=(H-cfg.yg*tp)/2;'
    + 'for(var i=0;i<=tl;i++){var pts=[];'
    + 'for(var j=0;j<=tp;j++)pts.push({x:xs+cfg.xg*i,y:ys+cfg.yg*j,w:{x:0,y:0},c:{x:0,y:0,vx:0,vy:0}});'
    + 'lines.push(pts);}}'

    /* ── move points ── */
    + 'function mvp(t){'
    + 'lines.forEach(function(pts){pts.forEach(function(p){'
    + 'var mv=ns.p2((p.x+t*cfg.sx)*0.002,(p.y+t*cfg.sy)*0.0015)*12;'
    + 'p.w.x=Math.cos(mv)*cfg.ax;p.w.y=Math.sin(mv)*cfg.ay;'
    + 'var dx=p.x-mo.sx,dy=p.y-mo.sy,dist=Math.hypot(dx,dy),l=Math.max(175,mo.vs);'
    + 'if(dist<l){var s=1-dist/l,f=Math.cos(dist*0.001)*s;'
    + 'p.c.vx+=Math.cos(mo.a)*f*l*mo.vs*0.00065;p.c.vy+=Math.sin(mo.a)*f*l*mo.vs*0.00065;}'
    + 'p.c.vx+=(0-p.c.x)*cfg.tn;p.c.vy+=(0-p.c.y)*cfg.tn;'
    + 'p.c.vx*=cfg.fr;p.c.vy*=cfg.fr;p.c.x+=p.c.vx*2;p.c.y+=p.c.vy*2;'
    + 'p.c.x=Math.min(cfg.mc,Math.max(-cfg.mc,p.c.x));p.c.y=Math.min(cfg.mc,Math.max(-cfg.mc,p.c.y));'
    + '});});}'

    /* ── draw ── */
    + 'function mv(p,wc){return{x:Math.round((p.x+p.w.x+(wc?p.c.x:0))*10)/10,y:Math.round((p.y+p.w.y+(wc?p.c.y:0))*10)/10};}'
    + 'function drw(){'
    + 'cx.clearRect(0,0,W,H);cx.beginPath();cx.strokeStyle=cfg.lc;cx.lineWidth=1;'
    + 'lines.forEach(function(pts){'
    + 'var p1=mv(pts[0],false);cx.moveTo(p1.x,p1.y);'
    + 'pts.forEach(function(p,i){var il=i===pts.length-1;p1=mv(p,!il);'
    + 'var p2=mv(pts[i+1]||pts[pts.length-1],!il);cx.lineTo(p1.x,p1.y);if(il)cx.moveTo(p2.x,p2.y);});'
    + '});cx.stroke();}'

    /* ── tick ── */
    + 'function tick(t){'
    + 'mo.sx+=(mo.x-mo.sx)*0.1;mo.sy+=(mo.y-mo.sy)*0.1;'
    + 'var dx=mo.x-mo.lx,dy=mo.y-mo.ly,d=Math.hypot(dx,dy);'
    + 'mo.vs+=(d-mo.vs)*0.1;mo.vs=Math.min(100,mo.vs);mo.lx=mo.x;mo.ly=mo.y;mo.a=Math.atan2(dy,dx);'
    + 'mvp(t);drw();requestAnimationFrame(tick);}'

    /* ── events ── */
    + 'window.addEventListener("resize",rsz);'
    + 'window.addEventListener("mousemove",function(e){mo.x=e.clientX;mo.y=e.clientY;'
    + 'if(!mo.set){mo.sx=mo.x;mo.sy=mo.y;mo.lx=mo.x;mo.ly=mo.y;mo.set=true;}});'
    + 'window.addEventListener("touchmove",function(e){'
    + 'var t=e.touches[0];mo.x=t.clientX;mo.y=t.clientY;'
    + 'if(!mo.set){mo.sx=mo.x;mo.sy=mo.y;mo.lx=mo.x;mo.ly=mo.y;mo.set=true;}'
    + '},{passive:true});'

    /* ── start ── */
    + 'rsz();requestAnimationFrame(tick);'
    + '}catch(e){console.warn("Waves:",e);}'
    + '})();'
    + '<\/script>';

/* ══════════════════════════════════════════════════════════════════════
   SHARED CSS BLOCKS
══════════════════════════════════════════════════════════════════════ */
var TOGGLE_CSS = [
    '.toggle-wrap{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-bottom:16px;}',
    '.toggle-label{font-size:13px;color:#64748b;font-weight:600;transition:color 0.3s;}',
    '.switch{position:relative;display:inline-block;width:46px;height:25px;}',
    '.switch input{opacity:0;width:0;height:0;}',
    '.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#cbd5e1;border-radius:25px;transition:0.3s;}',
    '.slider:before{position:absolute;content:"";height:19px;width:19px;left:3px;bottom:3px;background:white;border-radius:50%;transition:0.3s;box-shadow:0 1px 4px rgba(0,0,0,0.2);}',
    'input:checked+.slider{background:#4338ca;}',
    'input:checked+.slider:before{transform:translateX(21px);}'
].join('');

var CARD_CSS = [
    '*{box-sizing:border-box;}',
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;',
    'background-color:#f0f2f5;display:flex;justify-content:center;align-items:flex-start;',
    'padding:15px;margin:0;min-height:100vh;transition:background 0.4s;}',
    '.card{background:white;width:100%;max-width:400px;padding:24px;border-radius:16px;',
    'box-shadow:0 8px 30px rgba(0,0,0,0.12);color:#1e293b;transition:background 0.4s,border 0.4s,color 0.4s;}',
    'h2{color:#1e3a8a;border-bottom:2px solid #f1f5f9;padding-bottom:15px;margin:0 0 20px 0;font-size:20px;text-align:center;transition:color 0.4s;}',
    '.row{display:flex;justify-content:space-between;margin:12px 0;font-size:15px;}',
    '.label{color:#64748b;transition:color 0.3s;}',
    '.value{font-weight:600;color:#1e293b;transition:color 0.3s;}',
    '.divider{border-top:1px solid #e2e8f0;margin:18px 0;transition:border-color 0.3s;}',
    '.highlight-red{color:#be123c;font-weight:700;transition:color 0.3s;}',
    '.highlight-green{color:#059669;font-weight:700;font-size:19px;transition:color 0.3s;}',
    '.footer-text{text-align:center;font-size:11px;color:#94a3b8;margin-top:20px;line-height:1.4;transition:color 0.3s;}',
    '.savings-banner{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;',
    'padding:10px 14px;margin-top:16px;text-align:center;font-size:13px;font-weight:600;',
    'transition:background 0.4s,border-color 0.4s;}',
    '.btn{width:100%;padding:15px;border-radius:12px;margin-top:10px;cursor:pointer;',
    'font-weight:700;font-size:15px;-webkit-tap-highlight-color:transparent;border:none;',
    'transition:background 0.3s,color 0.3s,border-color 0.3s;}',
    '.btn-primary{background:#1e3a8a;color:white;}',
    '.btn-amber{background:white;color:#b45309;border:2px solid #f59e0b;}',
    '.btn-amber:hover{background:#fffbeb;}',
    '.btn-indigo{background:white;color:#4338ca;border:2px solid #818cf8;}',
    '.btn-indigo:hover{background:#eef2ff;}',
    '@media print{.btn,.toggle-wrap,.savings-banner{display:none;}body{background:white;padding:0;}}'
].join('');

var SLAB_CSS = [
    '*{box-sizing:border-box;}',
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;',
    'background-color:#f0f2f5;display:flex;justify-content:center;align-items:flex-start;',
    'padding:15px;margin:0;min-height:100vh;transition:background 0.4s;}',
    '.card{background:white;width:100%;max-width:400px;padding:24px;border-radius:16px;',
    'box-shadow:0 8px 30px rgba(0,0,0,0.12);color:#1e293b;transition:background 0.4s,border 0.4s,color 0.4s;}',
    'h2{color:#1e3a8a;border-bottom:2px solid #f1f5f9;padding-bottom:15px;margin:0 0 20px 0;font-size:20px;text-align:center;transition:color 0.4s;}',
    'table{width:100%;border-collapse:collapse;font-size:14px;}',
    'thead tr{background:#1e3a8a;color:white;}',
    'thead th{padding:10px 12px;text-align:left;font-weight:600;}',
    'tbody tr:nth-child(even){background:#f8fafc;transition:background 0.3s;}',
    'tbody td{padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;transition:color 0.3s,border-color 0.3s;}',
    '.rate{font-weight:700;color:#be123c;transition:color 0.3s;}',
    '.rate-nil{font-weight:700;color:#059669;transition:color 0.3s;}',
    '.note-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;',
    'padding:12px 14px;margin-top:18px;font-size:12px;color:#1e40af;line-height:1.8;',
    'transition:background 0.4s,border-color 0.4s,color 0.4s;}',
    '.note-box strong{display:block;margin-bottom:4px;font-size:13px;color:#1e3a8a;transition:color 0.3s;}',
    '@media print{.toggle-wrap{display:none;}body{background:white;padding:0;}}'
].join('');

var CARD_DARK = [
    'body.dark{background:linear-gradient(135deg,#0a0f1e 0%,#0f172a 100%);}',
    'body.dark .card{background:rgba(15,23,42,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);color:#e2e8f0;}',
    'body.dark h2{color:#93c5fd;border-bottom-color:rgba(255,255,255,0.1);}',
    'body.dark .label{color:#94a3b8;}',
    'body.dark .value{color:#e2e8f0;}',
    'body.dark .divider{border-color:rgba(255,255,255,0.1);}',
    'body.dark .highlight-green{color:#34d399;}',
    'body.dark .highlight-red{color:#fb7185;}',
    'body.dark .footer-text{color:#64748b;}',
    'body.dark .savings-banner{background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.25);}',
    'body.dark .btn-primary{background:#3730a3;color:#e0e7ff;}',
    'body.dark .btn-amber{background:rgba(245,158,11,0.08);border-color:#f59e0b;color:#fbbf24;}',
    'body.dark .btn-indigo{background:rgba(99,102,241,0.08);border-color:#818cf8;color:#a5b4fc;}',
    'body.dark .toggle-label{color:#94a3b8;}'
].join('');

var SLAB_DARK = [
    'body.dark{background:linear-gradient(135deg,#0a0f1e 0%,#0f172a 100%);}',
    'body.dark .card{background:rgba(15,23,42,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);color:#e2e8f0;}',
    'body.dark h2{color:#93c5fd;border-bottom-color:rgba(255,255,255,0.1);}',
    'body.dark table thead tr{background:#1e3a8a;}',
    'body.dark tbody tr{background:transparent;}',
    'body.dark tbody tr:nth-child(even){background:rgba(255,255,255,0.04);}',
    'body.dark tbody td{border-color:rgba(255,255,255,0.08);color:#e2e8f0;}',
    'body.dark .rate{color:#fb7185;}',
    'body.dark .rate-nil{color:#34d399;}',
    'body.dark .note-box{background:rgba(99,102,241,0.08);border-color:rgba(165,180,252,0.2);color:#a5b4fc;}',
    'body.dark .note-box strong{color:#93c5fd;}',
    'body.dark .toggle-label{color:#94a3b8;}'
].join('');

/* ══════════════════════════════════════════════════════════════════════
   HTML PAGE GENERATORS
══════════════════════════════════════════════════════════════════════ */
function head(title, css) {
    return '<!DOCTYPE html><html><head>'
        + '<meta charset="UTF-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">'
        + '<title>' + title + '</title>'
        + '<style>' + css + TOGGLE_CSS + '</style>'
        + '</head><body>';
}

function foot() {
    return TOGGLE_JS + WAVES_JS + '</body></html>';
}

/* ── New regime slab page ───────────────────────────────────────────── */
function newRegimeSlabsHTML() {
    return head('Tax Slabs FY 2026-27', SLAB_CSS + SLAB_DARK)
        + '<div class="card">'
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
        + '</div>' + foot();
}

/* ── Old regime slab page ───────────────────────────────────────────── */
function oldRegimeSlabsHTML() {
    return head('Tax Slabs FY 2024-25', SLAB_CSS + SLAB_DARK)
        + '<div class="card">'
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
        + '</div>' + foot();
}

/* ── Old regime result page ─────────────────────────────────────────── */
function oldRegimeResultHTML(income, savingsText, savingsColor) {
    var d = calcOldRegime(income);
    var darkSavingsColor = savingsColor === '#166534' ? '#34d399' : savingsColor === '#92400e' ? '#fbbf24' : '#93c5fd';
    var oldSlabsUrl = blobURL(oldRegimeSlabsHTML());

    return head('Tax Summary FY 2024-25',
            CARD_CSS + CARD_DARK
            + '.savings-banner{color:' + savingsColor + ';}'
            + 'body.dark .savings-banner{color:' + darkSavingsColor + ';}')
        + '<div class="card">'
        + TOGGLE_HTML
        + '<h2>Tax Summary (FY 2024-25)</h2>'
        + '<div class="row"><span class="label">Gross Income</span><span class="value">\u20B9' + income.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Std. Deduction</span><span class="value">- \u20B950,000</span></div>'
        + '<div class="row"><span class="label">Taxable Amount</span><span class="value">\u20B9' + d.taxableAmount.toLocaleString('en-IN') + '</span></div>'
        + '<div class="divider"></div>'
        + '<div class="row"><span class="label">Basic Income Tax</span><span class="highlight-red">\u20B9' + d.basicTax.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Cess (4%)</span><span class="value">\u20B9' + d.cess.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row" style="margin-top:15px;">'
        + '<span class="label" style="font-weight:700;color:#1e293b;">Total Tax</span>'
        + '<span class="value" style="font-size:17px;">\u20B9' + d.totalTax.toLocaleString('en-IN') + '</span></div>'
        + '<div class="divider"></div>'
        + '<div class="row">'
        + '<span class="label" style="color:#059669;font-weight:700;">Annual Net Salary</span>'
        + '<span class="highlight-green">\u20B9' + d.netSalary.toLocaleString('en-IN') + '</span></div>'
        + '<div class="savings-banner">' + savingsText + '</div>'
        + '<p class="footer-text">Calculated under Old Tax Regime for FY 2024-25.<br>Deductions like 80C, HRA, LTA not included.</p>'
        + '<button class="btn btn-indigo" onclick="window.open(\'' + oldSlabsUrl + '\',\'_blank\')">&#128203; View Tax Slabs (FY 2024-25)</button>'
        + '<button class="btn btn-primary" onclick="window.print()">PRINT SUMMARY</button>'
        + '</div>' + foot();
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN CALCULATE FUNCTION
══════════════════════════════════════════════════════════════════════ */
function calculateInNewTab() {
    var rawValue = document.getElementById('incomeInput').value.replace(/,/g, '');
    var income   = parseFloat(rawValue);

    if (!income || income <= 0) {
        alert('Please enter a valid salary amount');
        return;
    }

    /* New Regime */
    var taxableAmount = Math.max(0, income - 75000);
    var basicTax = 0;
    if      (taxableAmount > 2400000) basicTax = (taxableAmount - 2400000) * 0.30 + 300000;
    else if (taxableAmount > 2000000) basicTax = (taxableAmount - 2000000) * 0.25 + 200000;
    else if (taxableAmount > 1600000) basicTax = (taxableAmount - 1600000) * 0.20 + 120000;
    else if (taxableAmount > 1200000) basicTax = (taxableAmount - 1200000) * 0.15 + 60000;
    else if (taxableAmount > 800000)  basicTax = (taxableAmount - 800000)  * 0.10 + 20000;
    else if (taxableAmount > 400000)  basicTax = (taxableAmount - 400000)  * 0.05;
    if (taxableAmount <= 1200000) basicTax = 0;

    var cess      = basicTax * 0.04;
    var totalTax  = basicTax + cess;
    var netSalary = income - totalTax;

    /* Savings comparison */
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
    var darkSavingsColor = savingsColor === '#166534' ? '#34d399' : savingsColor === '#92400e' ? '#fbbf24' : '#93c5fd';

    /* Pre-build all child Blob URLs */
    var newSlabsUrl  = blobURL(newRegimeSlabsHTML());
    var oldResultUrl = blobURL(oldRegimeResultHTML(income, savingsText, savingsColor));

    /* Write new regime result tab */
    var win = window.open('', '_blank');
    win.document.write(
        head('Tax Summary FY 2026-27',
            CARD_CSS + CARD_DARK
            + '.savings-banner{color:' + savingsColor + ';}'
            + 'body.dark .savings-banner{color:' + darkSavingsColor + ';}')
        + '<div class="card">'
        + TOGGLE_HTML
        + '<h2>Tax Summary (FY 2026-27)</h2>'
        + '<div class="row"><span class="label">Gross Income</span><span class="value">\u20B9' + income.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Std. Deduction</span><span class="value">- \u20B975,000</span></div>'
        + '<div class="row"><span class="label">Taxable Amount</span><span class="value">\u20B9' + taxableAmount.toLocaleString('en-IN') + '</span></div>'
        + '<div class="divider"></div>'
        + '<div class="row"><span class="label">Basic Income Tax</span><span class="highlight-red">\u20B9' + basicTax.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row"><span class="label">Cess (4%)</span><span class="value">\u20B9' + cess.toLocaleString('en-IN') + '</span></div>'
        + '<div class="row" style="margin-top:15px;">'
        + '<span class="label" style="font-weight:700;color:#1e293b;">Total Tax</span>'
        + '<span class="value" style="font-size:17px;">\u20B9' + totalTax.toLocaleString('en-IN') + '</span></div>'
        + '<div class="divider"></div>'
        + '<div class="row">'
        + '<span class="label" style="color:#059669;font-weight:700;">Annual Net Salary</span>'
        + '<span class="highlight-green">\u20B9' + netSalary.toLocaleString('en-IN') + '</span></div>'
        + '<p class="footer-text">Calculated under New Tax Regime rules for FY 2026-27.</p>'
        + '<button class="btn btn-amber"  onclick="window.open(\'' + oldResultUrl + '\',\'_blank\')">&#9878;&#65039; Compare with Old Regime</button>'
        + '<button class="btn btn-indigo" onclick="window.open(\'' + newSlabsUrl  + '\',\'_blank\')">&#128203; View Tax Slabs (FY 2026-27)</button>'
        + '<button class="btn btn-primary" onclick="window.print()">PRINT SUMMARY</button>'
        + '</div>' + foot()
    );
    win.document.close();
    win.focus();
}
window.addEventListener('DOMContentLoaded', function () {
  try {

    /* ── Create and inject canvas ────────────────────────────────────────
       We create the canvas in JS so it NEVER relies on HTML or CSS z-index.
       All positioning is set inline — the canvas is the very first child of
       body and is locked behind everything with z-index: -9999.
    ─────────────────────────────────────────────────────────────────────── */
    var canvas = document.createElement('canvas');
    canvas.id  = 'wavesCanvas';

    /* Inline styles — highest specificity, no external CSS needed */
    canvas.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'width: 100%',
      'height: 100%',
      'z-index: -9999',          /* behind literally everything */
      'pointer-events: none',    /* never intercept clicks / touches */
      'touch-action: none',      /* belt-and-braces for touch */
      'display: block'
    ].join(';');

    /* Insert as first child so it renders behind the calculator card */
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');

    /* ── Perlin Noise ──────────────────────────────────────────────────── */
    function Grad(x, y, z) { this.x = x; this.y = y; this.z = z; }
    Grad.prototype.dot2 = function (x, y) { return this.x * x + this.y * y; };

    function Noise(seed) {
      this.grad3 = [
        new Grad(1,1,0),  new Grad(-1,1,0),  new Grad(1,-1,0),  new Grad(-1,-1,0),
        new Grad(1,0,1),  new Grad(-1,0,1),  new Grad(1,0,-1),  new Grad(-1,0,-1),
        new Grad(0,1,1),  new Grad(0,-1,1),  new Grad(0,1,-1),  new Grad(0,-1,-1)
      ];
      this.p = [
        151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,
        21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,
        237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,
        111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,
        80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,
        3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,
        17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
        129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,
        238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,
        184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,
        195,78,66,215,61,156,180
      ];
      this.perm  = new Array(512);
      this.gradP = new Array(512);
      this.seed(seed || 0);
    }
    Noise.prototype.seed = function (seed) {
      if (seed > 0 && seed < 1) seed *= 65536;
      seed = Math.floor(seed);
      if (seed < 256) seed |= seed << 8;
      for (var i = 0; i < 256; i++) {
        var v = (i & 1) ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
        this.perm[i]  = this.perm[i + 256]  = v;
        this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
      }
    };
    Noise.prototype.fade = function (t) { return t * t * t * (t * (t * 6 - 15) + 10); };
    Noise.prototype.lerp = function (a, b, t) { return (1 - t) * a + t * b; };
    Noise.prototype.perlin2 = function (x, y) {
      var X = Math.floor(x), Y = Math.floor(y);
      x -= X; y -= Y; X &= 255; Y &= 255;
      var n00 = this.gradP[X     + this.perm[Y    ]].dot2(x,     y    );
      var n01 = this.gradP[X     + this.perm[Y + 1]].dot2(x,     y - 1);
      var n10 = this.gradP[X + 1 + this.perm[Y    ]].dot2(x - 1, y    );
      var n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
      var u   = this.fade(x);
      return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));
    };

    /* ── Config ────────────────────────────────────────────────────────── */
    var cfg = {
      lineColor    : 'rgba(255,255,255,0.45)',
      waveSpeedX   : 0.0125,
      waveSpeedY   : 0.01,
      waveAmpX     : 40,
      waveAmpY     : 20,
      friction     : 0.9,
      tension      : 0.01,
      maxCursorMove: 120,
      xGap         : 12,
      yGap         : 36
    };

    /* ── State ─────────────────────────────────────────────────────────── */
    var noise  = new Noise(Math.random());
    var lines  = [];
    var W      = window.innerWidth;
    var H      = window.innerHeight;
    var mouse  = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false };

    /* ── Resize ────────────────────────────────────────────────────────── */
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildLines();
    }

    /* ── Build grid ────────────────────────────────────────────────────── */
    function buildLines() {
      lines = [];
      var oW = W + 200, oH = H + 30;
      var totalLines  = Math.ceil(oW / cfg.xGap);
      var totalPoints = Math.ceil(oH / cfg.yGap);
      var xStart = (W - cfg.xGap * totalLines)  / 2;
      var yStart = (H - cfg.yGap * totalPoints) / 2;
      for (var i = 0; i <= totalLines; i++) {
        var pts = [];
        for (var j = 0; j <= totalPoints; j++) {
          pts.push({
            x: xStart + cfg.xGap * i,
            y: yStart + cfg.yGap * j,
            wave:   { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        lines.push(pts);
      }
    }

    /* ── Animation ─────────────────────────────────────────────────────── */
    function movePoints(t) {
      lines.forEach(function (pts) {
        pts.forEach(function (p) {
          var move = noise.perlin2(
            (p.x + t * cfg.waveSpeedX) * 0.002,
            (p.y + t * cfg.waveSpeedY) * 0.0015
          ) * 12;
          p.wave.x = Math.cos(move) * cfg.waveAmpX;
          p.wave.y = Math.sin(move) * cfg.waveAmpY;

          var dx   = p.x - mouse.sx, dy = p.y - mouse.sy;
          var dist = Math.hypot(dx, dy);
          var l    = Math.max(175, mouse.vs);
          if (dist < l) {
            var s = 1 - dist / l;
            var f = Math.cos(dist * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }
          p.cursor.vx += (0 - p.cursor.x) * cfg.tension;
          p.cursor.vy += (0 - p.cursor.y) * cfg.tension;
          p.cursor.vx *= cfg.friction;
          p.cursor.vy *= cfg.friction;
          p.cursor.x  += p.cursor.vx * 2;
          p.cursor.y  += p.cursor.vy * 2;
          p.cursor.x   = Math.min(cfg.maxCursorMove, Math.max(-cfg.maxCursorMove, p.cursor.x));
          p.cursor.y   = Math.min(cfg.maxCursorMove, Math.max(-cfg.maxCursorMove, p.cursor.y));
        });
      });
    }

    function moved(p, withCursor) {
      return {
        x: Math.round((p.x + p.wave.x + (withCursor ? p.cursor.x : 0)) * 10) / 10,
        y: Math.round((p.y + p.wave.y + (withCursor ? p.cursor.y : 0)) * 10) / 10
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.strokeStyle = cfg.lineColor;
      ctx.lineWidth   = 1;
      lines.forEach(function (points) {
        var p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);
        points.forEach(function (p, idx) {
          var isLast = idx === points.length - 1;
          p1 = moved(p, !isLast);
          var p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);
          ctx.lineTo(p1.x, p1.y);
          if (isLast) ctx.moveTo(p2.x, p2.y);
        });
      });
      ctx.stroke();
    }

    function tick(t) {
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      var dx = mouse.x - mouse.lx, dy = mouse.y - mouse.ly;
      var d  = Math.hypot(dx, dy);
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs  = Math.min(100, mouse.vs);
      mouse.lx  = mouse.x; mouse.ly = mouse.y;
      mouse.a   = Math.atan2(dy, dx);
      movePoints(t);
      draw();
      requestAnimationFrame(tick);
    }

    /* ── Input — listen on window so canvas never touches events ─────── */
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (!mouse.set) {
        mouse.sx = mouse.x; mouse.sy = mouse.y;
        mouse.lx = mouse.x; mouse.ly = mouse.y;
        mouse.set = true;
      }
    });

    window.addEventListener('touchmove', function (e) {
      /* Do NOT call preventDefault here — let touch events reach buttons */
      var t = e.touches[0];
      mouse.x = t.clientX; mouse.y = t.clientY;
      if (!mouse.set) {
        mouse.sx = mouse.x; mouse.sy = mouse.y;
        mouse.lx = mouse.x; mouse.ly = mouse.y;
        mouse.set = true;
      }
    }, { passive: true });   /* passive: true — never blocks touch events */

    /* ── Start ─────────────────────────────────────────────────────────── */
    resize();
    requestAnimationFrame(tick);

  } catch (e) {
    /* If anything goes wrong in the animation, silently ignore it —
       the calculator keeps working perfectly. */
    console.warn('Waves init failed:', e);
  }
});
