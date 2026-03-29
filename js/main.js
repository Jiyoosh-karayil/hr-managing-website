(function() {
  'use strict';

  const CTA = 'https://hms.hrmanaging.co.uk/company-request';

  /* ── Scroll reveal ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Nav scroll ── */
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 5);
  });

  /* ── Trust slider (homepage only) ── */
  const track = document.getElementById('trust-track');
  if (track) {
    const trustItems = ['40+ Companies Trust HR Managing','Home Office Compliant Records','UK Based Cloud Platform','14 Day Free Trial','Set Up in Under 5 Minutes','Secure Data Isolation','No Credit Card Required','Priority Email Support'];
    const allItems = [...trustItems, ...trustItems];
    track.innerHTML = allItems.map(t => `<div class="trust-item"><svg width="14" height="14"><use href="#i-check"/></svg><strong>${t}</strong></div>`).join('');
  }

  /* ── Problem items (homepage only) ── */
  const probList = document.getElementById('prob-list');
  if (probList) {
    const problems = [
      { t: 'Missing attendance records', d: 'Without daily logs, you cannot prove employees are working the hours required by their visa conditions.' },
      { t: 'Employees unorganised and missing documents', d: 'Right to work checks, employee contracts, and medical questionnaire forms scattered across email.' },
      { t: 'Missing records of employees leave and absences', d: 'When the Home Office or relevant department conduct a regulatory check you as an employer have to avail them on demand which most businesses cannot comply. HR Managing provide you a complete Home Office compliant robust HR managing system.' },
      { t: 'Manual processes that break down', d: 'Excel sheets get lost, paper forms get damaged, and nothing is connected. One missed record can trigger a compliance check and civil penalty.' },
    ];
    probList.innerHTML = problems.map((p, i) =>
      `<li class="prob-item reveal" style="transition-delay:${0.05 + i * 0.08}s"><div class="prob-ico"><svg width="20" height="20"><use href="#i-warn"/></svg></div><div class="prob-t"><h4>${p.t}</h4><p>${p.d}</p></div></li>`
    ).join('');
  }

  /* ── Pricing (homepage only) ── */
  const priceGrid = document.getElementById('price-grid');
  if (priceGrid) {
    const plans = [
      { name: 'Starter', desc: 'For small teams getting started', price: '10', range: '1 to 10 employees', features: ['Full dashboard access','Employee management','Attendance tracking','Holiday and absence management','Document storage','Company notice board','Email support'], ft: false },
      { name: 'Growth', desc: 'For growing businesses', price: '8', range: '11 to 50 employees', features: ['Everything in Starter','Volume discount applied','Annual review tracking','Medical questionnaires','New starter onboarding forms','Priority email support','Dedicated account setup'], ft: true },
      { name: 'Business', desc: 'For established teams', price: '6', range: '51 or more employees', features: ['Everything in Growth','Best per employee rate','Custom onboarding support','Compliance review assistance','All current and future features','Priority support channel','Bespoke setup assistance'], ft: false },
    ];
    priceGrid.innerHTML = plans.map((p, i) =>
      `<div class="pc${p.ft ? ' ft' : ''} reveal" style="transition-delay:${i * 0.08}s">${p.ft ? '<div class="pc-pop">Most Popular</div>' : ''}<h3>${p.name}</h3><div class="pc-desc">${p.desc}</div><div class="pc-amt"><span class="pc-curr">£</span><span class="pc-num">${p.price}</span></div><div class="pc-per">per employee / month · ${p.range}</div><ul class="pc-feat">${p.features.map(f => `<li><svg width="14" height="14"><use href="#i-check"/></svg> ${f}</li>`).join('')}</ul><a href="${CTA}" class="btn ${p.ft ? 'bp' : 'bo'}" target="_blank" rel="noopener">Start Free Trial</a></div>`
    ).join('');
  }

  /* ── FAQ accordion (contact page) ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
      // Toggle current
      if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
    });
  });

  /* ── Counter animation ── */
  function animateCounter(el) {
    const end = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2200;
    let start = null;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const val = Math.floor(easeOut(p) * end);
      el.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

  /* ── Re-observe dynamically added .reveal elements ── */
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }, 100);

})();
