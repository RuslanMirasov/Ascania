import { popup } from './popup.js';
import { hidePreloader, initNavigationMenu } from './helpers.js';
import { initSliders } from './sliders.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initInputMasks } from './inputMasks.js';
import { initYandexMap } from './yandex-map.js';

popup.init();
window.popup = popup;

initNavigationMenu();
initSliders();
initScrollToBlock();
initInputMasks();
initYandexMap();

setTimeout(() => {
  hidePreloader();
}, 300);
