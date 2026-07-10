// js/services.js

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

  /* ---------- Service config: drives dynamic briefing fields ---------- */
  const serviceConfig = {
    general: {
      title: "Tell us what you need",
      sub: "Select a service above, or start with a general enquiry — the fields will adjust automatically.",
      fieldsHtml: `<p class="field--empty">Pick a service above to see specific questions, or just fill in your details on the right and describe your request in the notes field.</p>`
    },
    typing: {
      title: "Typing &amp; Formatting Brief",
      sub: "Give us the details of the document you need typed or formatted.",
      fieldsHtml: `
        <label class="field">
          <span>Document Type</span>
          <select name="docType">
            <option>Assignment</option>
            <option>Project / Thesis</option>
            <option>CV / Resume</option>
            <option>Other</option>
          </select>
        </label>
        <label class="field">
          <span>Estimated Page Count</span>
          <input type="number" name="pageCount" min="1" placeholder="e.g. 12">
        </label>
        <label class="field">
          <span>Formatting Style</span>
          <select name="formatStyle">
            <option>APA</option>
            <option>MLA</option>
            <option>University Template</option>
            <option>Other / Not sure</option>
          </select>
        </label>
        <label class="field">
          <span>Reference File (optional)</span>
          <input type="file" name="referenceFile">
        </label>
      `
    },
    graphics: {
      title: "Graphic Design Brief",
      sub: "Tell us what you're designing and how it'll be used.",
      fieldsHtml: `
        <label class="field">
          <span>Design Type</span>
          <select name="designType">
            <option>Flyer / Poster</option>
            <option>Logo</option>
            <option>Social Media Post</option>
            <option>Other</option>
          </select>
        </label>
        <label class="field">
          <span>Platform / Dimensions</span>
          <input type="text" name="dimensions" placeholder="e.g. A4 print, or Instagram post">
        </label>
        <label class="field">
          <span>Color / Style Preference</span>
          <input type="text" name="colorPref" placeholder="e.g. navy & gold, minimal style">
        </label>
        <label class="field">
          <span>Reference Image (optional)</span>
          <input type="file" name="referenceFile">
        </label>
      `
    },
    uiux: {
      title: "UI/UX Design Brief",
      sub: "Help us understand the product you're designing for.",
      fieldsHtml: `
        <label class="field">
          <span>Project Type</span>
          <select name="projectType">
            <option>Mobile App</option>
            <option>Website</option>
            <option>Dashboard / Admin Panel</option>
            <option>Other</option>
          </select>
        </label>
        <label class="field">
          <span>Estimated Number of Screens</span>
          <input type="number" name="screenCount" min="1" placeholder="e.g. 6">
        </label>
        <label class="field">
          <span>Design Tool Preference</span>
          <select name="tool">
            <option>Figma</option>
            <option>Adobe XD</option>
            <option>No preference</option>
          </select>
        </label>
        <label class="field">
          <span>Reference Links (optional)</span>
          <input type="text" name="referenceLinks" placeholder="Links to apps/sites you like">
        </label>
      `
    },
    webdev: {
      title: "Web Development Brief",
      sub: "Describe the site or app you need built.",
      fieldsHtml: `
        <label class="field">
          <span>Project Type</span>
          <select name="webProjectType">
            <option>Portfolio Site</option>
            <option>Business Site</option>
            <option>Web App</option>
            <option>E-commerce Store</option>
          </select>
        </label>
        <label class="field">
          <span>Estimated Number of Pages</span>
          <input type="number" name="webPageCount" min="1" placeholder="e.g. 5">
        </label>
        <fieldset class="field field--checkgroup">
          <legend>Features Needed</legend>
          <label class="checkbox-row"><input type="checkbox" name="feature" value="Contact Form"> Contact Form</label>
          <label class="checkbox-row"><input type="checkbox" name="feature" value="Payment Integration"> Payment Integration</label>
          <label class="checkbox-row"><input type="checkbox" name="feature" value="CMS"> Content Management (CMS)</label>
          <label class="checkbox-row"><input type="checkbox" name="feature" value="Admin Dashboard"> Admin Dashboard</label>
        </fieldset>
      `
    }
  };

  /* ---------- Wire up cards + buttons to update the form ---------- */
  const serviceCards = document.querySelectorAll('.svc-card');
  const dynamicFields = document.getElementById('dynamicFields');
  const briefingTitle = document.getElementById('briefingTitle');
  const briefingSub = document.getElementById('briefingSub');
  const serviceTypeInput = document.getElementById('serviceTypeInput');
  const briefingSection = document.getElementById('briefing');

  function setActiveService(serviceKey) {
    const config = serviceConfig[serviceKey] || serviceConfig.general;

    briefingTitle.innerHTML = config.title;
    briefingSub.textContent = config.sub;
    dynamicFields.innerHTML = config.fieldsHtml;
    serviceTypeInput.value = serviceKey;

    serviceCards.forEach(card => {
      card.classList.toggle('is-active', card.dataset.service === serviceKey);
    });
  }

  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Avoid double-firing when the inner button is clicked directly
      if (e.target.closest('.svc-card__cta')) return;
      setActiveService(card.dataset.service);
      briefingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        setActiveService(card.dataset.service);
        briefingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('.svc-card__cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveService(btn.dataset.service);
      briefingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Initialize with the general enquiry state
  setActiveService('general');

  /* ---------- Form submit (placeholder — wire to backend later) ---------- */
  const briefingForm = document.getElementById('briefingForm');
  const briefingConfirm = document.getElementById('briefingConfirm');

  briefingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: replace with real API call once backend is in place.
    const formData = new FormData(briefingForm);
    console.log('Briefing submitted:', Object.fromEntries(formData.entries()));

    briefingConfirm.textContent = "Request received — we'll reach out on WhatsApp shortly.";
    briefingForm.reset();
    setActiveService('general');
  });

});