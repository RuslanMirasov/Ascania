// export const initMountainParallax = () => {
//   const mountain = document.querySelector('[data-mountain]');
//   if (!mountain) return;

//   const area = mountain.querySelector('.fix-area');
//   if (!area) return;

//   const startY = mountain.getBoundingClientRect().top + window.scrollY;
//   const percent = 2; // 200%
//   const speed = 2.5;

//   let sectionHeight = mountain.offsetHeight;
//   let limit = sectionHeight * percent;

//   let ticking = false;

//   const onScroll = () => {
//     if (ticking) return;
//     ticking = true;

//     requestAnimationFrame(() => {
//       const scrollY = window.scrollY;
//       let translate = scrollY - startY;

//       if (translate < 0) translate = 0;
//       if (translate > limit) translate = limit;

//       area.style.transform = `translateY(${translate / speed}px)`;

//       ticking = false;
//     });
//   };

//   window.addEventListener('scroll', onScroll, { passive: true });
//   window.addEventListener('resize', () => {
//     sectionHeight = mountain.offsetHeight;
//     limit = sectionHeight * percent;
//   });
// };

// export const initParallaxDescription = () => {
//   const block = document.querySelector('[data-parallax-description]');
//   if (!block) return;

//   const area = block.querySelector('.fix-area');
//   if (!area) return;

//   const startY = block.getBoundingClientRect().top + window.scrollY;

//   const percent = 0.41; // 41%
//   const speed = 1.5;

//    const sectionHeight = block.offsetHeight;
//       const limit = sectionHeight * percent;

//   let ticking = false;

//   const onScroll = () => {
//     if (ticking) return;
//     ticking = true;

//     requestAnimationFrame(() => {
//       const scrollY = window.scrollY;
//       let translate = scrollY - startY;

//       if (translate < 0) translate = 0;
//       if (translate > limit) translate = limit;

//       area.style.transform = `translateY(${translate / speed}px)`;

//       ticking = false;
//     });
//   };

//   window.addEventListener('scroll', onScroll, { passive: true });
// };

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
