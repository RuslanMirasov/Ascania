import { popup } from './popup.js';
import { fixHeaderOnScroll, hidePreloader, initNavigationMenu } from './helpers.js';
import { initSliders } from './sliders.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initAccordeons } from './accordeon.js';
import { initStadion } from './stadion.js';
import { initCountdown } from './countdown.js';
import { initInputMasks } from './inputMasks.js';

popup.init();
window.popup = popup;
initNavigationMenu();
initSliders();
fixHeaderOnScroll();
initScrollToBlock();
initAccordeons();
initStadion();
initInputMasks();
initCountdown('29 сентября 2025', '12:00');

setTimeout(() => {
  hidePreloader();
}, 300);
