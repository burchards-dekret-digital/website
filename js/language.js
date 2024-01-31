


    function changeLanguage(language) {
        // It remembers the selected language in the local storage
        localStorage.setItem('selectedLanguage', language);

        // Hide all elements with class "de"
        var deElements = document.querySelectorAll('.de');
        deElements.forEach(function(element) {
            element.style.display = 'none';
        });

        // Hide all elements with class "en"
        var enElements = document.querySelectorAll('.en');
        enElements.forEach(function(element) {
            element.style.display = 'none';
        });

        // Display elements in the selected language
        if (language === 'de') {
            deElements.forEach(function(element) {
            element.style.display = 'initial';
            });
        } else if (language === 'en') {
            enElements.forEach(function(element) {
            element.style.display = 'initial';
            });
        }
    }

    // Verifica se c'è una lingua memorizzata nello storage locale al caricamento della pagina
    document.addEventListener('DOMContentLoaded', function() {
        var storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            // Se la lingua è memorizzata, imposta la lingua
            changeLanguage(storedLanguage);
        }
    })


    /*function changeLanguage(language) {
    localStorage.setItem('selectedLanguage', language);
    
    var deElements = document.querySelectorAll('.de');
    var enElements = document.querySelectorAll('.en');
    
    deElements.forEach(function(element) {
        element.style.display = language === 'de' ? 'initial' : 'none';
    });
    
    enElements.forEach(function(element) {
        element.style.display = language === 'en' ? 'initial' : 'none';
    });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
    var storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
        changeLanguage(storedLanguage);
    }
    });*/
      