export const initTabs = () => {
  const tabsList = document.querySelectorAll('[data-tabs]');

  if (!tabsList.length) return;

  tabsList.forEach(tabs => {
    const handleTabsClick = e => {
      const target = e.target.closest('[data-tab-link]');
      if (!target || !tabs.contains(target)) return;

      const activeButton = tabs.querySelector('.tab-button.active');
      if (!activeButton) {
        console.warn('Установите класс active на активную кнопку таба!');
        return;
      }

      if (target === activeButton) return;

      const number = target.dataset.tabLink;

      const activeTab = tabs.querySelector('[data-tab].active');
      if (!activeTab) {
        console.warn('Установите класс active на активный таб!');
        return;
      }

      const targetButton = tabs.querySelector(`[data-tab-link="${number}"]`);
      const targetTab = tabs.querySelector(`[data-tab="${number}"]`);

      if (!targetButton || !targetTab) return;

      activeButton.classList.remove('active');
      targetButton.classList.add('active');
      activeTab.style.opacity = '0';

      setTimeout(() => {
        activeTab.classList.remove('active');
        targetTab.classList.add('active');
      }, 500);

      setTimeout(() => {
        targetTab.style.opacity = '1';
      }, 550);
    };

    tabs.addEventListener('click', handleTabsClick);
  });
};
