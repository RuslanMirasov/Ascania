export const initYandexMap = () => {
  const mapEl = document.getElementById('map');
  if (!mapEl || !window.ymaps3) return;

  const mq = window.matchMedia('(max-width: 767px)');
  const portrait = window.matchMedia('(orientation: portrait)');
  const isMobileLike = () => mq.matches || portrait.matches;

  let mapInstance = null;

  ymaps3.ready.then(async () => {
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', ['@yandex/ymaps3-default-ui-theme@0.0', '@yandex/ymaps3-controls@0.0.1']);

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = ymaps3;
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    const center = isMobileLike() ? [43.145454, 42.6] : [41.0, 44.0];
    const coords = [43.145454, 44.181241];

    mapInstance = new YMap(mapEl, {
      location: {
        center,
        zoom: 7,
      },
      zoomRange: { min: 3, max: 19 },
    });

    mapInstance.addChild(new YMapDefaultSchemeLayer());
    mapInstance.addChild(new YMapDefaultFeaturesLayer());
    mapInstance.addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));

    const img = document.createElement('img');
    img.src = './assets/img/pin.svg';
    img.style.width = '90px';
    img.style.height = '77px';
    img.style.transform = 'translate(-50%, -100%)';

    const marker = new YMapMarker({ coordinates: coords }, img);

    mapInstance.addChild(marker);

    const updateMapView = () => {
      const center = isMobileLike() ? [43.145454, 42.8] : [41.0, 44.0];

      mapInstance.setLocation({
        center,
        zoom: 7,
        duration: 300,
      });
    };

    mq.addEventListener('change', updateMapView);
    portrait.addEventListener('change', updateMapView);
  });
};
