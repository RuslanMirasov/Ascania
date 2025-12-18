export const initTabs = () => {
  const tabsList = document.querySelectorAll('[data-tabs]');
  if (!tabsList.length) return;

  tabsList.forEach(tabs => {
    let isAnimating = false;
    let timers = [];

    const clearTimers = () => {
      timers.forEach(t => clearTimeout(t));
      timers = [];
    };

    const handleTabsClick = e => {
      if (isAnimating) return;

      const target = e.target.closest('[data-tab-link]');
      if (!target || !tabs.contains(target)) return;

      const activeButton = tabs.querySelector('[data-tab-link].active');
      if (!activeButton || target === activeButton) return;

      const number = target.dataset.tabLink;

      const targetButtons = tabs.querySelectorAll(`[data-tab-link="${number}"]`);
      const activeTabs = tabs.querySelectorAll('[data-tab].active');
      const targetTabs = tabs.querySelectorAll(`[data-tab="${number}"]`);

      if (!targetTabs.length) return;

      isAnimating = true;
      clearTimers();

      /* кнопки */
      activeButton.classList.remove('active');
      targetButtons.forEach(btn => btn.classList.add('active'));

      /* закрываем все активные табы */
      activeTabs.forEach(tab => {
        tab.style.opacity = '0';
      });

      timers.push(
        setTimeout(() => {
          activeTabs.forEach(tab => tab.classList.remove('active'));
          targetTabs.forEach(tab => tab.classList.add('active'));
        }, 500)
      );

      timers.push(
        setTimeout(() => {
          targetTabs.forEach(tab => {
            tab.style.opacity = '1';
          });
          isAnimating = false;
        }, 550)
      );
    };

    tabs.addEventListener('click', handleTabsClick);
  });
};
