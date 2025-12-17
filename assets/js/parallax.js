export const initParallax = () => {
  const sections = document.querySelectorAll('[data-parallax]');
  if (!sections.length) return;

  const items = [];

  sections.forEach(section => {
    const startY = section.getBoundingClientRect().top + window.scrollY;

    let sectionHeight = section.offsetHeight;

    const children = section.querySelectorAll('[data-percent]');

    children.forEach(el => {
      const percent = parseFloat(el.dataset.percent) || 1;
      const speed = parseFloat(el.dataset.speed) || 1;

      items.push({
        el,
        startY,
        get limit() {
          return sectionHeight * percent;
        },
        speed,
        section,
        updateHeight() {
          sectionHeight = section.offsetHeight;
        },
      });
    });
  });

  const loop = () => {
    const scrollY = window.scrollY;

    items.forEach(item => {
      let translate = scrollY - item.startY;

      if (translate < 0) translate = 0;
      if (translate > item.limit) translate = item.limit;

      item.el.style.transform = `translateY(${translate / item.speed}px)`;
    });

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  window.addEventListener('resize', () => {
    items.forEach(item => item.updateHeight());
  });
};
