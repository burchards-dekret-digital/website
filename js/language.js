    function changeLanguage(language) {
        // It remembers the selected language in the local storage
        localStorage.setItem('selectedLanguage', language);

    

        var deElements = document.querySelectorAll('[lang="de"]:not(.mirador-viewer), [lang="ger"]:not(.mirador-viewer)');
deElements.forEach(function(element) {
    element.style.display = 'none';
});


        // Hide all elements with class "en"
        var enElements = document.querySelectorAll('[lang="en"]:not(.mirador-viewer)');
        enElements.forEach(function(element) {
            element.style.display = 'none';
        });

        // Display elements in the selected language
        if (language === 'de') {
            deElements.forEach(function(element) {
            element.style.display = 'block';
            });
        } else if (language === 'en') {
            enElements.forEach(function(element) {
            element.style.display = 'block';
            });
        }
    }

    // Checks whether there is a language stored in the local storage when the page is loaded
    document.addEventListener('DOMContentLoaded', function() {
        var deElements = document.querySelectorAll('[lang="en"]:not(.mirador-viewer)');
        deElements.forEach(function(element) {
            element.style.display = 'none';
        });
        var storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            // If the language is stored, set the language
            changeLanguage(storedLanguage);
        }
    })


    function checkLanguage() {
        var deElements = document.querySelectorAll('[lang="en"]:not(.mirador-viewer)');
        deElements.forEach(function(element) {
            element.style.display = 'none';
        });
        var storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            // If the language is stored, set the language
            changeLanguage(storedLanguage);
        }
    }

