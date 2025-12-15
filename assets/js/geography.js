// export const initGeography = () => {
//   if (!window.ymaps3) {
//     console.warn('Yandex Maps API not loaded');
//     return;
//   }

//   ymaps3.ready.then(async () => {
//     const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

//     const map = new YMap(document.getElementById('geography'), {
//       location: {
//         center: [79.442692, 57.570922],
//         zoom: 4,
//       },
//       zoomRange: { min: 3, max: 19 },
//     });

//     // Базовые слои карты
//     map.addChild(new YMapDefaultSchemeLayer());
//     map.addChild(new YMapDefaultFeaturesLayer());

//     // Загружаем маркеры
//     const markersData = await fetch('./../assets/json/markers.json').then(r => r.json());

//     markersData.points.forEach(point => {
//       const container = document.createElement('div');

//       const img = document.createElement('img');
//       img.src = './../assets/img/pin.svg';
//       img.style.width = '90px';
//       img.style.height = '77px';
//       img.style.transform = 'translate(-50%, -100%)';

//       container.appendChild(img);

//       const marker = new YMapMarker({ coordinates: point.coordinates }, container);

//       map.addChild(marker);
//     });
//   });
// };

export const initGeography = () => {
  if (!window.ymaps3) {
    console.warn('Yandex Maps API not loaded');
    return;
  }

  ymaps3.ready.then(async () => {
    // регистрируем CDN (обязательно для controls)
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', ['@yandex/ymaps3-controls@0.0.1']);

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = ymaps3;
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    const map = new YMap(document.getElementById('geography'), {
      location: {
        center: [79.442692, 57.570922],
        zoom: 4,
      },
      zoomRange: { min: 3, max: 19 },
    });

    // базовые слои
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());
    map.addChild(new YMapControls({ position: 'left bottom' }).addChild(new YMapZoomControl({})));

    // маркеры
    const markersData = await fetch('./../assets/json/markers.json').then(r => r.json());

    markersData.points.forEach(point => {
      const container = document.createElement('div');

      const img = document.createElement('img');
      img.src = './../assets/img/pin.svg';
      img.style.width = '90px';
      img.style.height = '77px';
      img.style.transform = 'translate(-50%, -100%)';

      container.appendChild(img);

      const marker = new YMapMarker({ coordinates: point.coordinates }, container);

      map.addChild(marker);
    });
  });
};
