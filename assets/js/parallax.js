export const initParallax = () => {
  const sections = document.querySelectorAll('[data-parallax]');
  if (!sections.length) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = [];

  sections.forEach(section => {
    const sectionItems = section.querySelectorAll('[data-parallax-item]');
    if (!sectionItems.length) return;

    sectionItems.forEach(el => {
      el.style.setProperty('--speed', el.dataset.speed || 1);

      items.push({
        el,
        section,
        percent: parseFloat(el.dataset.percent) || 1,
        start: 0,
        limit: 0,
      });
    });
  });

  const recalc = () => {
    items.forEach(item => {
      const rect = item.section.getBoundingClientRect();
      item.start = rect.top + window.scrollY;
      item.limit = item.section.offsetHeight * item.percent;
    });
  };

  recalc();

  let scrollY = window.scrollY;
  let ticking = false;

  const update = () => {
    items.forEach(item => {
      let offset = scrollY - item.start;

      if (offset < 0) offset = 0;
      if (offset > item.limit) offset = item.limit;

      item.el.style.setProperty('--offset', `${offset}px`);
    });

    ticking = false;
  };

  const onScroll = () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', recalc);
};
