export const initGeography = () => {
  if (!window.ymaps3) {
    console.warn('Yandex Maps API not loaded');
    return;
  }

  ymaps3.ready.then(async () => {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const map = new YMap(document.getElementById('geography'), {
      location: {
        center: [57.588144, 55.733842],
        zoom: 4,
      },
      zoomRange: { min: 3, max: 19 },
    });

    // Базовые слои карты
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    // Загружаем маркеры
    const markersData = await fetch('./../assets/json/markers.json').then(r => r.json());

    markersData.points.forEach(point => {
      const container = document.createElement('div');

      const img = document.createElement('img');
      img.src = './../assets/img/pin.svg';
      img.style.width = '71px';
      img.style.height = '89px';
      img.style.transform = 'translate(-50%, -100%)';

      container.appendChild(img);

      const marker = new YMapMarker({ coordinates: point.coordinates }, container);

      map.addChild(marker);
    });
  });
};
