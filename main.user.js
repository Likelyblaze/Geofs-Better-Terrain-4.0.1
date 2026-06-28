// ==UserScript==
// @name                 Better Terrain for GeoFs 4.0
// @namespace            http://tampermonkey.net/
// @version              4.0.1
// @description          Better Imagery for GeoFS 4.0
// @author               Likelyblaze
// @match                https://www.geo-fs.com/geofs.php?v=*
// @match                https://beta.geo-fs.com/*
// @grant                none
// @updateURL            https://raw.githubusercontent.com/Likelyblaze/Geofs-Better-Terrain-4.0.1/main/main.user.js
// @downloadURL          https://raw.githubusercontent.com/Likelyblaze/Geofs-Better-Terrain-4.0.1/main/main.user.js
// ==/UserScript==
(function() {
    "use strict";

    const providerType = "google";

    async function injectImagery() {
        const Cesium = window.Cesium;
        const viewer = window.geofs.api.viewer;

        if (!viewer || !Cesium) return;

        let provider;

        try {
            if (providerType === "google") {
                provider = new Cesium.UrlTemplateImageryProvider({
                    url: "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                    subdomains: ["mt0", "mt1", "mt2", "mt3"],
                    maximumLevel: 21
                });
            } else if (providerType === "bing") {
                if (!BING_API_KEY || BING_API_KEY === "YOUR_BING_API_KEY_HERE") {
                    console.error("GeoFS Script: Bing Maps key is missing!");
                    return;
                }
                provider = await Cesium.BingMapsImageryProvider.fromUrl("https://dev.virtualearth.net", {
                    key: BING_API_KEY,
                    mapStyle: Cesium.BingMapsStyle.AERIAL
                });
            }

            if (provider) {
                const layers = viewer.imageryLayers;
                
                const newLayer = await Cesium.ImageryLayer.fromProviderAsync(provider);
                layers.add(newLayer);
                layers.lowerToBottom(newLayer);

                setTimeout(() => {
                    while (layers.length > 1) {
                        layers.remove(layers.get(1));
                    }
                }, 2000);
            }
        } catch (e) {
            console.error("GeoFS Resolution Script Error: ", e);
        }
    }

    const checkReady = setInterval(() => {
        if (window.geofs && window.geofs.api && window.geofs.api.viewer && window.Cesium) {
            clearInterval(checkReady);
            injectImagery();

            Cesium.CesiumTerrainProvider.fromUrl("https://data.geo-fs.com/srtm/", {
                requestWaterMask: false,
                requestVertexNormals: true
            }).then(tp => {
                window.geofs.api.viewer.terrainProvider = tp;
            });
        }
    }, 1000);

    // Remove Ads
    setInterval(() => {
        const ads = document.querySelectorAll('.geofs-adbanner, .geofs-adsense-container, [id^="google_ads"]');
        ads.forEach(ad => ad.style.display = 'none');
    }, 3000);

})();
