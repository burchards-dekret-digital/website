var mirador = Mirador.viewer({
            id: "mirador-singleMS",
            language: 'de',
            window: { //global window defaults
                allowClose: true, // Configure if windows can be closed or not
                defaultView: 'single',  // Configure which viewing mode (e.g. single, book, gallery) for windows to be opened in
                highlightAllAnnotations: true, // Configure whether to display annotations on the canvas by default
                panels: { // Configure which panels are visible in WindowSideBarButtons
                    info: true,
                    attribution: true,
                    canvas: true,
                    annotations: true,
                    search: true,
                    layers: true
                },
                views: [
                    { key: 'single', behaviors: ['individuals'] },
                    { key: 'book', behaviors: ['paged'] }
                    
               ] },
            windows: [{
                id: 'known-window-id',
                manifestId: 'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00140701/manifest',

                /* loadedManifest: <div data-template="app:iiif-manifest"/>,
                canvasId: <div data-template="app:iiif-canvas-id-dekret"/> 
                 *  highlightAllAnnotations: true // Configure whether to display annotations on the canvas by default*/
              }],
              
              thumbnails: {
                    preferredFormats: ['jpg', 'png', 'webp', 'tif']
                    },
            thumbnailNavigation: {
                defaultPosition: 'far-bottom', // Which position for the thumbnail navigation to be be displayed. Other possible values are "far-bottom" or "far-right"
                displaySettings: true // Display the settings for this in WindowTopMenu
                },
            catalog: [
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/frankfurt-ub-b-50-manifest.json' },
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/vatican-bav-pl-585-manifest.json' },
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/vatican-bav-pl-586-manifest.json'},
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/bamberg-sb-c-6.json'},
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/koeln-edd-119-manifest.json'}
            ]
        });

    
 
/*    <!-- changing page in Mirador-viewer after click on folia --> */
    
        function changecanvas(canvasid, manifest) {
        var mirador = Mirador.viewer({
            id: "mirador-singleMS",
            windows: [{
                loadedManifest: manifest,
                canvasId: canvasid,
                thumbnailNavigationPosition: "far-bottom"
              }],
            catalog: [
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/frankfurt-ub-b-50-manifest.json' },
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/vatican-bav-pl-585-manifest.json' },
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/vatican-bav-pl-586-manifest.json'},
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/bamberg-sb-c-6.json'},
                { manifestId: 'https://burchard.adwmainz.net/exist/rest/db/collections/bdd/data/manifests/koeln-edd-119-manifest.json'}
            ]
          });}
          

    