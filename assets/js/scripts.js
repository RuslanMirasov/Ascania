import { popup } from './popup.js';
import { hidePreloader, initNavigationMenu } from './helpers.js';
import { initSliders } from './sliders.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initInputMasks } from './inputMasks.js';
import { initYandexMap } from './yandex-map.js';
import { initTabs } from './tabs.js';

popup.init();
window.popup = popup;

initNavigationMenu();
initSliders();
initScrollToBlock();
initInputMasks();
//initYandexMap();
initTabs();

setTimeout(() => {
  hidePreloader();
}, 300);
