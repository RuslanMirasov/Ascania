import { popup } from './popup.js';
import { hidePreloader, initNavigationMenu } from './helpers.js';
import { initSliders, onHeroSlideChange } from './sliders.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initInputMasks } from './inputMasks.js';
import { initYandexMap } from './yandex-map.js';
import { initGeography } from './geography.js';
import { initTabs } from './tabs.js';
import { initParallax } from './parallax.js';

popup.init();
window.popup = popup;

initNavigationMenu();
initSliders();
initScrollToBlock();
initInputMasks();
initYandexMap();
initGeography();
initTabs();

setTimeout(() => {
  hidePreloader();
  initParallax();
}, 300);

document.addEventListener('DOMContentLoaded', () => {
  const heroSlider = window.swipers?.['hero'];
  if (!heroSlider) return;

  heroSlider.on('slideChange', () => {
    const index = heroSlider.activeIndex;
    const slideEl = heroSlider.slides[index];
    const number = slideEl?.dataset?.number;
    if (number) {
      onHeroSlideChange(Number(number));
    }
  });
});
