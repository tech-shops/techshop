/* Accessible Shop - WCAG-minded demo (12 products, product details)
   + Arrow-key sequential focus navigation
   + Robust "Skip to main content" behavior & status announcements
*/
(function(){
  const $$ = (sel, root=document) => root.querySelector(sel);
  const $$$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // ----- Product data (12 items, each with description) -----
  const PRODUCTS = [
    { id: 'p1', name: 'SAMSUNG Galaxy Tab A9 4G LTE', price: 132, img: 'https://m.media-amazon.com/images/I/51+ziSm6cJL._AC_SX679_.jpg', alt: 'SAMSUNG Galaxy Tab A9 4G LTE', desc: 'SAMSUNG Galaxy Tab A9 4G LTE. 64GB Storage. 4GB Ram. Cellular). Size 8.7 Android Tablet. Octa-core (6nm). Dual Speakers' },
    { id: 'p2', name: 'SAMSUNG 990 PRO SSD 2TB',  price: 159.00, img: 'https://m.media-amazon.com/images/I/71OWtcxKgvL._AC_SX679_.jpg', alt: 'SAMSUNG 990 PRO SSD 2TB', desc: 'SAMSUNG 990 PRO SSD 2TB NVMe M.2 PCIe Gen4. M.2 2280 Internal Solid State Hard Drive. Seq Read Speeds Up to 7450 MBs for High End Computing' },
    { id: 'p3', name: 'Apple iMac 27-inch Retina 5K Desktop',   price: 590,  img: 'https://m.media-amazon.com/images/I/717q8QReNaL._AC_SX300_SY300_QL70_FMwebp_.jpg', alt: 'Apple iMac 27-inch Retina 5K Desktop', desc: 'Apple iMac 27-inch Retina 5K Desktop MK472LL/A - Intel Core i5 3.2GHz. 16GB RAM. 512GB SSD - Silver' },
    { id: 'p4', name: 'KAMRUI Mini PC. E3B 32GB RAM. AMD Ryzen 5 7430U',   price: 280, img: 'https://m.media-amazon.com/images/I/61EWNXRjYIL._AC_SX679_.jpg', alt: 'KAMRUI Mini PC. E3B 32GB RAM. AMD Ryzen 5 7430U', desc: 'KAMRUI Mini PC. E3B 32GB RAM. 512GB SSD. Mini Gaming Computers. AMD Ryzen 5 7430U. Micro Desktop Computer (Max 4.3GHz 6C/12T Beat 5650U) Small PC Support WiFi 6 BT5.2' },
    { id: 'p5', name: 'Lenovo Legion Pro 7i – Gaming Laptop',      price: 1800,  img: 'https://m.media-amazon.com/images/I/81vNDgwJ+VL._AC_SX679_.jpg', alt: 'Lenovo Legion Pro 7i – Gaming Laptop', desc: 'Lenovo Legion Pro 7i – Gaming Laptop - Intel® Core™ Ultra 9 275HX – 16" 2.5K WQXGA OLED Display – 240Hz Refresh Rate – GeForce RTX™ 5070 Ti GPU – 32 GB Memory – 1 TB Storage – 3-month PC GamePass' },
    { id: 'p6', name: 'Lenovo IdeaPad Slim 3X – 2025 Laptop',        price: 440.20, img: 'https://m.media-amazon.com/images/I/71nYpJKrGNL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad Slim 3X – 2025 Laptop', desc: 'Lenovo IdeaPad Slim 3X - 2025 - Everyday AI Laptop - Copilot+ PC - 15.3" WUXGA Display - 16 GB Memory - 512 GB Storage - Qualcomm® Snapdragon® X - Luna Grey' },
    { id: 'p7', name: 'LG 27GX700A-B 27-inch Gaming Monitor',   price: 510.99, img: 'https://m.media-amazon.com/images/I/81LyR0lHxYL._AC_SX679_.jpg', alt: 'LG 27GX700A-B 27-inch Gaming Monitor', desc: 'LG 27GX700A-B 27-inch Ultragear QHD (2560 x 1440) OLED Gaming Monitor. 280Hz. NVIDIA G-Sync. AMD FreeSync Premium Pro. VESA DisplayHDR TrueBlack500 with HDMI 2.1 Color Black' },
    { id: 'p8', name: 'Kasa Smart 2K QHD Security Camera',          price: 35, img: 'https://m.media-amazon.com/images/I/51PA7a-6JnL._AC_SX679_.jpg', alt: 'Kasa Smart 2K QHD Security Camera', desc: 'Kasa Smart 2K QHD Security Camera Outdoor Wired. IP65. Starlight Sensor & 98Ft Night Vision. Motion/Person Detection. 2 Way Audio w/Siren. Cloud/SD Card Storage' },
    { id: 'p9', name: 'AI Ultra Robot Vacuum Brand Shark',  price: 325.99, img: 'https://m.media-amazon.com/images/I/71m1NqgtcRL._AC_SX679_.jpg', alt: 'AI Ultra Robot Vacuum Brand Shark', desc: 'Shark AV2501S AI Ultra Robot Vacuum, with Matrix Clean, Home Mapping, 30-Day Capacity HEPA Bagless Self Empty Base, Perfect for Pet Hair, Wifi, Dark Grey' },
    { id: 'p10', name: 'Apple iPhone 16 Pro Max Color Titanium',           price: 890, img: 'https://m.media-amazon.com/images/I/51wv+uPzIDL._AC_SX679_.jpg', alt: 'Apple iPhone 16 Pro Max Color Titanium', desc: '1TB, 8GB RAM, Apple A18 Pro (3nm), Hexa-core (2x4.05 GHz + 4x2.42 GHz), Apple GPU 6-core, iOS 18, upgradable to iOS 18.3' },
    { id: 'p11', name: 'SAMSUNG Galaxy S25 Ultra Cell Phone 256GB',    price: 750, img: 'https://m.media-amazon.com/images/I/61n0lmxP5-L._AC_SX679_.jpg', alt: 'SAMSUNG Galaxy S25 Ultra Cell Phone 256GB', desc: '6.9"Screen with Storage 256GB, 12GB RAM, No SD Card Slot, Qualcomm Snapdragon 8 Elite (3nm), Octa-Core, Adreno 830 GPU, 5000mAh Battery' },
    { id: 'p12', name: 'SAMSUNG Galaxy S22 Ultra 5G 256GB',    price: 11.00, img: 'https://m.media-amazon.com/images/I/613Fp7fknhL._AC_SX679_.jpg', alt: 'SAMSUNG Galaxy S22 Ultra 5G 256GB', desc: '8K SUPER STEADY VIDEO: Shoot videos that rival how epic your life is with stunning 8K recording, the highest recording resolution available on a smartphone.Video captured is effortlessly smooth, thanks to Auto Focus Video Stabilization on Galaxy S22 Ultra' }
  ];

  // ----- Storage helpers -----
  const CART_KEY = 'accessible_shop_cart';

  const PREF_KEY_THEME = 'accessible_shop_theme';
  const PREF_KEY_FONT = 'accessible_shop_font_percent';
  const MIN_FONT_PERCENT = 90;
  const MAX_FONT_PERCENT = 200;
  const FONT_STEP = 10;
  const DEFAULT_FONT_PERCENT = 100;
  let currentFontPercent = DEFAULT_FONT_PERCENT;

  // ----- Accessibility preferences (theme + font size) -----
  function applyTheme(theme){
    const allowed = ['default', 'high-contrast'];
    if (!allowed.includes(theme)) theme = 'default';

    if (document.body) {
      document.body.setAttribute('data-theme', theme);
    }

    // Update pressed state on theme buttons
    $$$('[data-theme]').forEach(btn => {
      const val = btn.getAttribute('data-theme');
      btn.setAttribute('aria-pressed', val === theme ? 'true' : 'false');
    });

    // Announce change for screen reader users
    try {
      announce(theme === 'high-contrast'
        ? 'High contrast theme enabled.'
        : 'Default theme enabled.'
      );
    } catch(e){}
  }

  function setFontPercent(percent, shouldAnnounce){
    if (typeof percent !== 'number' || isNaN(percent)) {
      percent = DEFAULT_FONT_PERCENT;
    }
    percent = Math.max(MIN_FONT_PERCENT, Math.min(MAX_FONT_PERCENT, percent));
    currentFontPercent = percent;
    document.documentElement.style.fontSize = percent + '%';

    const valueEl = $$('.font-size-value');
    if (valueEl) {
      valueEl.textContent = percent + '%';
    }

    const widget = $$('.accessibility-widget');
    if (widget){
      const decBtn = $$('[data-font-action="decrease"]', widget);
      const incBtn = $$('[data-font-action="increase"]', widget);
      const atMin = percent <= MIN_FONT_PERCENT;
      const atMax = percent >= MAX_FONT_PERCENT;
      if (decBtn){
        decBtn.disabled = atMin;
        decBtn.setAttribute('aria-disabled', atMin ? 'true' : 'false');
      }
      if (incBtn){
        incBtn.disabled = atMax;
        incBtn.setAttribute('aria-disabled', atMax ? 'true' : 'false');
      }
    }

    try {
      localStorage.setItem(PREF_KEY_FONT, String(percent));
    } catch(e){}

    if (shouldAnnounce){
      try {
        announce('Font size set to ' + percent + ' percent.');
      } catch(e){}
    }
  }

  function changeFontPercent(delta){
    setFontPercent(currentFontPercent + delta, true);
  }

  function loadAccessibilityPrefs(){
    let theme = 'default';
    let font = DEFAULT_FONT_PERCENT;

    try {
      theme = localStorage.getItem(PREF_KEY_THEME) || theme;
      const stored = parseInt(localStorage.getItem(PREF_KEY_FONT), 10);
      if (!Number.isNaN(stored)) {
        font = stored;
      }
    } catch(e){}

    applyTheme(theme);
    setFontPercent(font, false);
  }

  function initAccessibilityPanel(){
    const widget = $$('.accessibility-widget');
    if (!widget) return;

    const toggle = widget.querySelector('.accessibility-toggle');
    const panel = widget.querySelector('#access-panel');
    if (!toggle || !panel) return;
    const closeBtn = widget.querySelector('.accessibility-close');

    function closePanel(returnFocus){
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (!expanded) return;
      toggle.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      if (returnFocus) {
        toggle.focus();
      }
    }

    function openPanel(){
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) return;
      toggle.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      panel.focus();
    }

    // Toggle open/close
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closePanel(false);
      } else {
        openPanel();
      }
    });

    // Close on Escape anywhere on the page when panel is open
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          e.stopPropagation();
          closePanel(true);
        }
      }
    });

    if (closeBtn){
      closeBtn.addEventListener('click', () => {
        closePanel(true);
      });
    }

    // Close when clicking outside the widget
    document.addEventListener('click', (e) => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (!expanded) return;
      if (!widget.contains(e.target)) {
        // User intentionally clicked elsewhere; do not steal focus
        closePanel(false);
      }
    });

    // Theme buttons
    $$$('[data-theme]', widget).forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-theme') || 'default';
        try { localStorage.setItem(PREF_KEY_THEME, value); } catch(e){}
        applyTheme(value);
      });
    });

    // Font-size +/- buttons
    const decBtn = $$('[data-font-action="decrease"]', widget);
    const incBtn = $$('[data-font-action="increase"]', widget);

    if (decBtn){
      decBtn.addEventListener('click', () => {
        changeFontPercent(-FONT_STEP);
      });
    }
    if (incBtn){
      incBtn.addEventListener('click', () => {
        changeFontPercent(FONT_STEP);
      });
    }

  }


  function readCart(){
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
    catch { return {}; }
  }
  function writeCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }
  function clearCart(){
    localStorage.removeItem(CART_KEY);
    updateCartCount();
  }
  function cartCount(){
    const cart = readCart();
    return Object.values(cart).reduce((a,b)=>a+b,0);
  }
  function cartTotal(){
    const cart = readCart();
    let total = 0;
    for(const [id, qty] of Object.entries(cart)){
      const p = PRODUCTS.find(x=>x.id===id);
      if(p) total += p.price * qty;
    }
    return total;
  }

  // ----- UI helpers -----
  function money(n){ const kd = n * 0.31; return `KD ${kd.toFixed(2)}`; }

  function announce(msg){
    const live = $$('#sr-announcer');
    if(!live) return;
    live.textContent = '';
    setTimeout(()=>{ live.textContent = msg; }, 30);
  }

  function updateCartCount(){
    const el = $$('#cart-count');
    if(el){
      el.textContent = String(cartCount());
    }
  }

  function setYear(){
    const y = $$('#year');
    if(y) y.textContent = new Date().getFullYear();
  }

  function enablePlaceOrderIfNeeded(){
    const btn = $$('#place-order');
    if(btn){
      btn.disabled = cartCount() === 0;
    }
  }

  // ======= Product count announcers (WCAG 2.1-friendly) =======
  function pluralize(n, singular, plural){
    return `${n} ${n===1 ? singular : (plural || singular + 's')}`;
  }
  function updateProductsCount(){
    const grid = $$('#product-grid');
    const summary = $$('#products-summary');
    if(!grid || !summary) return;
    // Count only "cards" that are currently visible in the grid
    const count = $$$(':scope > .card', grid).length;
    summary.textContent = count === 0 ? '0 products found' : pluralize(count, 'product') + ' found';
    // Also announce politely for AT users
    announce(summary.textContent);
  }
  function updateFeaturedCount(){
    const grid = $$('#featured-grid');
    const summary = $$('#featured-summary');
    if(!grid || !summary) return;
    const count = $$$(':scope > .card', grid).length;
    summary.textContent = pluralize(count, 'featured product');
  }

  // ======= Focusable utilities & Arrow-key navigation (WCAG 2.1-friendly) =======
  function isVisible(el){
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
  function getFocusable(){
    const selectors = [
      'a[href]','button','input','select','textarea','summary',
      '[tabindex]:not([tabindex="-1"])','[role="button"]'
    ].join(',');
    return $$$(`${selectors}:not([disabled]):not([inert])`).filter(isVisible);
  }
  function moveFocus(delta){
    const focusables = getFocusable();
    if(!focusables.length) return;
    const active = document.activeElement;
    let idx = Math.max(0, focusables.indexOf(active));
    idx = (idx + delta + focusables.length) % focusables.length;
    focusables[idx].focus();
  }
  function isTypingContext(el){
    if(!el) return false;
    const tag = el.tagName;
    const editable = el.getAttribute('contenteditable') === 'true';
    const role = el.getAttribute('role');
    return (
      editable ||
      /INPUT|TEXTAREA|SELECT/.test(tag) ||
      role === 'textbox' ||
      el.isContentEditable
    );
  }
  function bindArrowNavigation(){
    document.addEventListener('keydown', (e)=>{
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const k = e.key;
      const target = e.target;
      if (isTypingContext(target)) return; // do not override inside fields
      if (k === 'ArrowRight' || k === 'ArrowDown'){
        e.preventDefault();
        moveFocus(+1);
      } else if (k === 'ArrowLeft' || k === 'ArrowUp'){
        e.preventDefault();
        moveFocus(-1);
      } else if (k === 'Home'){
        e.preventDefault();
        const f = getFocusable();
        if (f.length){ f[0].focus(); }
      } else if (k === 'End'){
        e.preventDefault();
        const f = getFocusable();
        if (f.length){ f[f.length-1].focus(); }
      }
    }, true);
  }

  // ======= Robust "Skip to main content" handling & verification =======
  function ensureSkipLinkWorks(){
    const skip = $$('.skip-link');
    const main = $$('#main');
    if(!skip || !main) return;

    function focusMain(){
      // set hash for consistency
      if(location.hash !== '#main') history.replaceState(null,'', '#main');
      main.setAttribute('tabindex','-1'); // ensure focusable
      main.focus();
      announce('Skipped to main content.');
      sessionStorage.setItem('skip_used', 'true');
    }

    // If user activates the skip link by keyboard, focus main explicitly
    skip.addEventListener('click', (e)=>{
      e.preventDefault();
      focusMain();
    });
    skip.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        focusMain();
      }
    });

    // If page loaded with #main already in the URL (or after navigation), focus it
    if(location.hash === '#main'){
      setTimeout(()=>focusMain(), 0);
    }

    // Developer-friendly console check
    // (This aids auditing that the skip pattern is functioning.)
    if (sessionStorage.getItem('skip_used') === 'true') {
      // reset per page view to make it obvious during manual testing
      sessionStorage.removeItem('skip_used');
    }
  }

  // ----- Renderers -----
  function renderFeatured(){
    const wrap = $$('#featured-grid');
    if(!wrap) return;
    wrap.innerHTML = '';
    PRODUCTS.slice(0,3).forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('role', 'listitem');
      const nameId = `name-${p.id}`;
      const priceId = `price-${p.id}`;
      card.innerHTML = `
        <a class="image-link" href="product.html?id=${p.id}" aria-label="${p.name} — image link to product details">
          <img src="${p.img}" alt="${p.name}">
        </a>
        <h3 id="${nameId}"><a href="product.html?id=${p.id}" aria-labelledby="${nameId} ${priceId}">${p.name}</a></h3>
        <p class="price" id="${priceId}">${money(p.price)}</p>
        <div class="controls">
          <a class="btn-secondary" href="products.html">View all</a>
          <button type="button" class="btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to cart</button>
        </div>`;
      wrap.appendChild(card);
    });
    updateFeaturedCount();
  }

  function renderProducts(){
    const grid = $$('#product-grid');
    if(!grid) return;
    grid.setAttribute('aria-busy','true');
    grid.innerHTML = '';
    const q = ($$('#search')?.value || '').toLowerCase();

    PRODUCTS.filter(p => p.name.toLowerCase().includes(q)).forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('role', 'listitem');
      const nameId = `name-${p.id}`;
      const priceId = `price-${p.id}`;
      card.innerHTML = `
        <a class="image-link" href="product.html?id=${p.id}" aria-label="${p.name} — image link to product details">
          <img src="${p.img}" alt="${p.name}">
        </a>
        <h3 id="${nameId}"><a href="product.html?id=${p.id}" aria-labelledby="${nameId} ${priceId}">${p.name}</a></h3>
        <p class="price" id="${priceId}">${money(p.price)}</p>
        <div class="controls">
          <button type="button" class="btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to cart</button>
          <a class="btn-secondary" href="product.html?id=${p.id}">Details</a>
        </div>`;
      grid.appendChild(card);
    });

    updateProductsCount();

    if(grid.children.length === 0){
      const empty = document.createElement('p');
      empty.className = 'notice';
      empty.textContent = 'No products match your search.';
      grid.appendChild(empty);
    }
    grid.setAttribute('aria-busy','false');
  }

  function renderCartTable(){
    const tbody = $$('#cart-body');
    const empty = $$('#cart-empty');
    const area = $$('#cart-area');
    const totalCell = $$('#cart-total');
    const totalQtyCell = $$('#cart-total-qty');

    if(!tbody || !empty || !area || !totalCell) return;

    const cart = readCart();
    tbody.innerHTML = '';
    let any = false;

    for(const [id, qty] of Object.entries(cart)){
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) continue;
      any = true;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <th scope="row"><a href="product.html?id=${p.id}">${p.name}</a></th>
        <td id="unit-${id}" aria-label="Unit price ${money(p.price)}" tabindex="0">${money(p.price)}</td>
        <td>
          <label class="visually-hidden" for="qty-${id}">Quantity for ${p.name}</label>
          <input id="qty-${id}" type="number" min="1" value="${qty}" data-qty="${id}"
                 aria-label="Quantity for ${p.name}. Unit price ${money(p.price)}. Subtotal ${money(p.price*qty)}"
                 aria-describedby="subtot-${id}">
        </td>
        <td id="subtot-${id}" aria-label="Subtotal ${money(p.price*qty)}" tabindex="0">${money(p.price*qty)}</td>
        <td>
          <button type="button" class="btn-secondary" data-remove="${id}"
                  aria-label="Remove ${p.name}. Quantity ${qty}. Unit price ${money(p.price)}. Subtotal ${money(p.price*qty)}">Remove</button>
        </td>`;
      tbody.appendChild(tr);
    }

    if(!any){
      area.hidden = true;
      empty.hidden = false;

      const totalQty = 0;
      if (totalQtyCell) {
        totalQtyCell.innerHTML = `<strong>${totalQty}</strong>`;
        totalQtyCell.setAttribute('aria-label', `Total quantity ${totalQty} items`);
      }

      const total = 0;
      totalCell.innerHTML = `<strong>${money(total)}</strong>`;
      totalCell.dataset.total = '0';
      totalCell.setAttribute('aria-label', `Total price ${money(total)}`);
    }else{
      area.hidden = false;
      empty.hidden = true;

      const totalQty = cartCount();
      if (totalQtyCell) {
        totalQtyCell.innerHTML = `<strong>${totalQty}</strong>`;
        totalQtyCell.setAttribute('aria-label', `Total quantity ${totalQty} ${totalQty === 1 ? 'item' : 'items'}`);
      }

      const total = cartTotal();
      totalCell.innerHTML = `<strong>${money(total)}</strong>`;
      totalCell.dataset.total = String(total.toFixed(2));
      totalCell.setAttribute('aria-label', `Total price ${money(total)}`);
    }

    enablePlaceOrderIfNeeded();
  }

  function renderProductDetail(){
    const host = $$('#product-detail');
    if(!host) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const p = PRODUCTS.find(x=>x.id===id);
    const name = p ? p.name : 'Product not found';

    const crumb = $$('#crumb-name');
    if (crumb) crumb.textContent = name;

    if(!p){
      host.innerHTML = '<p role="alert">Sorry, this product does not exist.</p>';
      return;
    }

    host.innerHTML = `
      <a class="image-link" href="product.html?id=${p.id}" aria-labelledby="product-name price-${p.id}">
        <img src="${p.img}" alt="${p.name}">
      </a>
      <div class="meta">
        <h1 id="product-name">${p.name}</h1>
        <p class="price" tabindex="0" id="price-${p.id}" aria-label="Price ${money(p.price)}">${money(p.price)}</p>
        <p id="product-desc">${p.desc}</p>
        <div class="field">
          <label for="detail-qty" class="visually-hidden">Quantity</label>
          <input id="detail-qty" class="qty" type="number" min="1" value="1">
        </div>
        <div class="actions">
          <button type="button" class="btn" id="detail-add" data-id="${p.id}" aria-label="Add ${p.name} to cart">Add to cart</button>
          <a class="btn-secondary" href="products.html">Back to products</a>
        </div>
      </div>
    `;
  }

  // ----- Cart interaction -----
  function addToCart(id, qty=1){
    const cart = readCart();
    cart[id] = (cart[id] || 0) + qty;
    writeCart(cart);
    announce('Item added to cart.');
  }

  function removeFromCart(id){
    const cart = readCart();
    delete cart[id];
    writeCart(cart);
    announce('Item removed from cart.');
  }

  function setQty(id, qty){
    const q = Math.max(1, Number(qty)||1);
    const cart = readCart();
    if(cart[id] != null){
      cart[id] = q;
      writeCart(cart);
      announce('Quantity updated.');
    }
  }

  // ----- Checkout form validation -----
  function validateForm(form){
    let ok = true;
    $$$('input, textarea', form).forEach(el=>{
      const container = el.closest('.field') || el.parentElement;
      let msg = container?.querySelector('.error-msg');
      if(msg){ msg.remove(); }

      if(el.required && !el.value.trim()){
        ok = false;
        el.setAttribute('aria-invalid','true');
        const m = document.createElement('div');
        m.className = 'error-msg';
        m.textContent = 'This field is required.';
        m.setAttribute('role','alert');
        container.appendChild(m);
      }else if(el.type === 'email' && el.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)){
        ok = false;
        el.setAttribute('aria-invalid','true');
        const m = document.createElement('div');
        m.className = 'error-msg';
        m.textContent = 'Enter a valid email address.';
        m.setAttribute('role','alert');
        container.appendChild(m);
      }else if(el.id === 'card' && $$('#pay-card')?.checked){
        if(!/^[0-9 ]{12,19}$/.test(el.value.trim())){
          ok = false;
          el.setAttribute('aria-invalid','true');
          const m = document.createElement('div');
          m.className = 'error-msg';
          m.textContent = 'Enter a valid card number (demo check).';
          m.setAttribute('role','alert');
          container.appendChild(m);
        }else{
          el.removeAttribute('aria-invalid');
        }
      }else{
        el.removeAttribute('aria-invalid');
      }
    });
    return ok;
  }

  // ----- Event wiring per page -----
  document.addEventListener('DOMContentLoaded', () => {
    setYear();
    updateCartCount();

    loadAccessibilityPrefs();
    initAccessibilityPanel();

    ensureSkipLinkWorks();

    // bindArrowNavigation(); // disabled: allow default arrow-key behaviour for scrolling

    const main = $$('#main');
    if(main){
      const path = location.pathname || '';
      const skipPages = ['contact.html','about.html','checkout.html'];
      const isSkipPage = skipPages.some(name => path.endsWith('/' + name) || path.endsWith(name));
      if (!isSkipPage) {
        main.focus();
      }
    }

    // Global Add-to-Cart delegation (works on all pages)
    document.addEventListener('click', (e)=>{
      const btn = e.target.closest('[data-add]');
      if(btn){
        e.preventDefault();
        addToCart(btn.getAttribute('data-add'));
        updateCartCount();
        try{ btn.focus(); }catch{}
      }
    });

    // HOME
    if($$('#featured-grid')){
      renderFeatured();

    }

    // PRODUCTS
    if($$('#product-grid')){
      // If there's a ?search=query in the URL, populate the field.
      const params = new URLSearchParams(window.location.search);
      const initial = params.get('search');
      const search = $$('#search');
      if(search && initial){
        search.value = initial;
      }

      renderProducts();

      if(search){
        // Filter as the user types
        search.addEventListener('input', renderProducts);
      }

      const filtersForm = $$('#filters');
      if(filtersForm){
        // Prevent full page reload on Enter and just filter instead
        filtersForm.addEventListener('submit', (e)=>{
          e.preventDefault();
          renderProducts();
        });
      }
    }

    // PRODUCT DETAIL
    if($$('#product-detail')){
      renderProductDetail();
      document.body.addEventListener('click', (e)=>{
        const add = e.target.closest('#detail-add');
        if(add){
          const id = add.getAttribute('data-id');
          const qty = Math.max(1, Number($$('#detail-qty')?.value)||1);
          addToCart(id, qty);
          updateCartCount();
          add.focus();
        }
      });
    }

    // CHECKOUT
    if($$('#checkout-form')){
      renderCartTable();

      $$('#cart-area').addEventListener('input', (e)=>{
        const inp = e.target.closest('[data-qty]');
        if(inp){
          setQty(inp.getAttribute('data-qty'), inp.value);
          renderCartTable();
          updateCartCount();
        }
      });
      $$('#cart-area').addEventListener('click', (e)=>{
        const btn = e.target.closest('[data-remove]');
        if(btn){
          removeFromCart(btn.getAttribute('data-remove'));
          renderCartTable();
          updateCartCount();
        }
      });

      const payCard = $$('#pay-card');
      const payCOD = $$('#pay-cod');
      const cardFields = $$('#card-fields');
      function updatePay(){
        const cardInput = $$('#card');
        const cardLabel = document.querySelector('label[for="card"]');
        if(payCard.checked){
          if(cardFields) cardFields.style.display = '';
          if(cardInput){
            cardInput.setAttribute('required','');
            cardInput.setAttribute('aria-required','true');
          }
          if(cardLabel){
            cardLabel.classList.add('is-required');
          }
        }else{
          if(cardFields) cardFields.style.display = 'none';
          if(cardInput){
            cardInput.removeAttribute('required');
            cardInput.removeAttribute('aria-required');
            cardInput.removeAttribute('aria-invalid');
          }
          if(cardLabel){
            cardLabel.classList.remove('is-required');
          }
        }
      }
      if(payCard && payCOD){
        payCard.addEventListener('change', updatePay);
        payCOD.addEventListener('change', updatePay);
        updatePay();
      }

      const clearBtn = $$('#clear-cart');
      if(clearBtn){
        clearBtn.addEventListener('click', ()=>{
          clearCart();
          renderCartTable();
          announce('Cart cleared.');
        });
      }

      enablePlaceOrderIfNeeded();

      $$('#checkout-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        if(cartCount() === 0){
          announce('Your cart is empty.');
          $$('#form-message').textContent = 'Your cart is empty.';
          return;
        }
        const ok = validateForm(e.currentTarget);
        if(!ok){
          $$('#form-message').textContent = 'Please fix the errors above.';
          const firstErr = document.querySelector('[aria-invalid="true"]');
          if(firstErr) firstErr.focus();
          return;
        }
        const msg = $$('#form-message');
        if (msg) {
          msg.textContent = 'Order placed! (Demo only — no payment processed.)';
          msg.focus();
        }
        announce('Order placed successfully.');
        clearCart();
        renderCartTable();
      });
    }

    // CONTACT — accessible client-side handling
    if($$('#contact-form')){
      $$('#contact-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        const ids = ['c-name','c-email','c-subject','c-message'];
        let ok = true;

        ids.forEach(id=>{
          const el = document.getElementById(id);
          const container = el.closest('.field') || el.parentElement;
          let msg = container?.querySelector('.error-msg');
          if(msg) msg.remove();
          el.removeAttribute('aria-invalid');

          if(!el.value.trim()){
            ok = false;
            el.setAttribute('aria-invalid','true');
            const m = document.createElement('div');
            m.className = 'error-msg';
            m.textContent = 'This field is required.';
            m.setAttribute('role','alert');
            container.appendChild(m);
          }
          if(id==='c-email' && el.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)){
            ok = false;
            el.setAttribute('aria-invalid','true');
            const m = document.createElement('div');
            m.className = 'error-msg';
            m.textContent = 'Enter a valid email address.';
            m.setAttribute('role','alert');
            container.appendChild(m);
          }
        });

        const status = $$('#contact-message');
        if(!ok){
          status.textContent = 'Please fix the errors above.';
          const firstErr = document.querySelector('[aria-invalid="true"]');
          if(firstErr) firstErr.focus();
          return;
        }

        status.textContent = 'Thanks! Your message has been received (demo only).';
        status.focus();
        announce('Message sent.');
        e.currentTarget.reset();
      });
    }
  });
})();
/* === Strict: Focus starts at Skip and loops === */
(function(){
  if (window.__strict_skip_focus__) return;
  window.__strict_skip_focus__ = true;

  function getFocusableWithin(root){
    const selectors = [
      'a[href]','button','input','select','textarea','summary',
      '[tabindex]:not([tabindex="-1"])','[role="button"]'
    ].join(',');
    return Array.from(root.querySelectorAll(selectors))
      .filter(el => !el.disabled && !el.hasAttribute('inert') && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  function getEnds(){
    const body = document.body;
    if (!body) return { first: null, last: null };
    const focusables = getFocusableWithin(body);
    return { first: focusables[0] || null, last: focusables[focusables.length - 1] || null };
  }

  // Put initial focus on the skip link when the page loads, if present
  document.addEventListener('DOMContentLoaded', ()=>{
    const skip = document.querySelector('.skip-link');
    if (skip) {
      skip.focus();
    }
  });

  // Tab key uses the browser's default behavior; no custom loop is applied.

})();
