// app.js

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ---------- Sponsored ad carousel ---------- */
  // Placeholder data — replace with real ad records from backend later.
  const adData = [
    { name: "Zee's Bead Co.", desc: "Handmade beaded jewelry, made-to-order. DM for bulk hostel prices." },
    { name: "Tega's Print Hub", desc: "Fast lamination & spiral binding, walk-in friendly." },
    { name: "Naija Nails by Ivie", desc: "Gel & acrylic sets, book your slot on WhatsApp." },
    { name: "Campus Cakes", desc: "Custom birthday cakes, 24hr notice needed." },
  ];

  const adTrack = document.getElementById('adTrack');

  function renderAds() {
    adTrack.innerHTML = adData.map(ad => `
      <article class="ad-card">
        <span class="ad-card__badge">Sponsored</span>
        <h3>${ad.name}</h3>
        <p>${ad.desc}</p>
        <a href="/classifieds.html" class="ad-card__link">View listing →</a>
      </article>
    `).join('');
  }
  renderAds();

  const adPrev = document.getElementById('adPrev');
  const adNext = document.getElementById('adNext');
  const scrollAmount = 280;

  adNext.addEventListener('click', () => {
    adTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  adPrev.addEventListener('click', () => {
    adTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  /* ---------- Location live status ---------- */
  // Placeholder logic — replace with real vendor open/close data from backend.
  const locationHours = {
    ultramodern: { open: 8, close: 20 },
    postoffice: { open: 9, close: 18 },
  };

  function getStatus(key) {
    const now = new Date();
    const hour = now.getHours();
    const hours = locationHours[key];
    if (!hours) return { state: 'closed', label: 'Closed' };

    if (hour >= hours.open && hour < hours.close - 1) {
      return { state: 'open', label: 'Open' };
    } else if (hour >= hours.close - 1 && hour < hours.close) {
      return { state: 'busy', label: 'Closing Soon' };
    }
    return { state: 'closed', label: 'Closed' };
  }

  document.querySelectorAll('.status-pill').forEach(pill => {
    const key = pill.dataset.status;
    const status = getStatus(key);
    pill.textContent = status.label;
    pill.dataset.live = status.state;
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});

// js/main.js

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sponsored banner data ---------- */
  // Placeholder — replace with real paid listings from backend (weekly/monthly tier).
  const sponsoredData = [
    { name: "Zee's Bead Co.", tier: "Monthly", desc: "Handmade beaded jewelry, made-to-order. DM for bulk hostel prices." },
    { name: "Tega's Print Hub", tier: "Weekly", desc: "Fast lamination & spiral binding, walk-in friendly, near Ultramodern." },
    { name: "Naija Nails by Ivie", tier: "Monthly", desc: "Gel & acrylic sets, book your slot on WhatsApp." },
    { name: "Campus Cakes", tier: "Weekly", desc: "Custom birthday cakes, 24hr notice needed." },
  ];

  const sponsorTrack = document.getElementById('sponsorTrack');
  if (sponsorTrack) {
    sponsorTrack.innerHTML = sponsoredData.map(ad => `
      <article class="sponsor-card">
        <span class="sponsor-card__badge">Sponsored</span>
        <span class="sponsor-card__tier">${ad.tier} plan</span>
        <h3>${ad.name}</h3>
        <p>${ad.desc}</p>
        <a href="/classifieds.html" class="sponsor-card__link">View listing →</a>
      </article>
    `).join('');
  }

  /* ---------- Vendor directory data ---------- */
  // Placeholder — replace with real vendor records from backend.
  const vendorData = [
    {
      name: "Ultramodern Print Point",
      location: "ultramodern",
      locationLabel: "Ultramodern Market",
      category: "printing",
      categoryLabel: "Printing",
      desc: "Same-day printing, spiral binding, and photocopying at the market cluster."
    },
    {
      name: "Mama Bisi's Snack Corner",
      location: "ultramodern",
      locationLabel: "Ultramodern Market",
      category: "snacks",
      categoryLabel: "Snacks",
      desc: "Meat pies, puff-puff, and cold drinks, pre-order for pickup between classes."
    },
    {
      name: "Post Office Copy Shop",
      location: "postoffice",
      locationLabel: "Post Office",
      category: "printing",
      categoryLabel: "Printing",
      desc: "Fast printing and lamination for students on the Post Office end of campus."
    },
    {
      name: "Amaka's Ankara Bags",
      location: "postoffice",
      locationLabel: "Post Office",
      category: "handmade",
      categoryLabel: "Handmade Goods",
      desc: "Custom ankara tote bags and pouches, made to order."
    },
    {
      name: "Blessing's Braids",
      location: "ultramodern",
      locationLabel: "Ultramodern Market",
      category: "beauty",
      categoryLabel: "Beauty & Grooming",
      desc: "Affordable braiding and hair styling, weekend slots available."
    },
    {
      name: "Tunde's Barbershop (Hostel Run)",
      location: "postoffice",
      locationLabel: "Post Office",
      category: "beauty",
      categoryLabel: "Beauty & Grooming",
      desc: "Home-service haircuts, hostel-friendly rates, booked via WhatsApp."
    },
    {
      name: "Fresh Bites Snacks",
      location: "postoffice",
      locationLabel: "Post Office",
      category: "snacks",
      categoryLabel: "Snacks",
      desc: "Homemade meat pies & chin-chin, pre-order for pickup."
    },
    {
      name: "Kemi's Thrift & Threads",
      location: "ultramodern",
      locationLabel: "Ultramodern Market",
      category: "fashion",
      categoryLabel: "Fashion",
      desc: "Curated thrift pieces and custom alterations, new stock weekly."
    },
  ];

  const vendorGrid = document.getElementById('vendorGrid');
  const emptyState = document.getElementById('emptyState');
  const locationFilters = document.getElementById('locationFilters');
  const categoryFilter = document.getElementById('categoryFilter');

  let activeLocation = 'all';
  let activeCategory = 'all';

  function renderVendors() {
    const filtered = vendorData.filter(v => {
      const locationMatch = activeLocation === 'all' || v.location === activeLocation;
      const categoryMatch = activeCategory === 'all' || v.category === activeCategory;
      return locationMatch && categoryMatch;
    });

    if (filtered.length === 0) {
      vendorGrid.innerHTML = '';
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    vendorGrid.innerHTML = filtered.map(v => `
      <article class="vendor-card">
        <div class="vendor-card__top">
          <h3>${v.name}</h3>
        </div>
        <div class="vendor-card__tags">
          <span class="tag tag--location">${v.locationLabel}</span>
          <span class="tag tag--category">${v.categoryLabel}</span>
        </div>
        <p class="vendor-card__desc">${v.desc}</p>
        <a href="/shop.html?vendor=${encodeURIComponent(v.name)}" class="btn btn--outline-dark btn--sm vendor-card__cta">View Menu / Order</a>
      </article>
    `).join('');
  }

  /* ---------- Location filter pills ---------- */
  locationFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;

    activeLocation = btn.dataset.location;

    locationFilters.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('is-active', pill === btn);
    });

    renderVendors();
  });

  /* ---------- Category filter dropdown ---------- */
  categoryFilter.addEventListener('change', (e) => {
    activeCategory = e.target.value;
    renderVendors();
  });

  // Initial render
  renderVendors();

});
