function changeLanguage(language) {
    // It remembers the selected language in the local storage
    localStorage.setItem('selectedLanguage', language);

    // Hide all elements with class "de"
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
            element.style.display = 'inline';
        });
    } else if (language === 'en') {
        enElements.forEach(function(element) {
            element.style.display = 'inline';
        });
    }


    // Set the active class on the corresponding button
    var deButton = document.getElementById('btn-de');
    var enButton = document.getElementById('btn-en');
    if (language === 'de' && deButton && enButton) {
        deButton.classList.add('active-language');
        enButton.classList.remove('active-language');
    } else if (language === 'en' && deButton && enButton) {
        enButton.classList.add('active-language');
        deButton.classList.remove('active-language');
    }
}

// Checks whether there is a language stored in the local storage when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    var deElements = document.querySelectorAll('[lang="de"]:not(.mirador-viewer)');
    var enElements = document.querySelectorAll('[lang="en"]:not(.mirador-viewer)');
    enElements.forEach(function(element) {
        element.style.display = 'none';
    });
    var storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
        // If the language is stored, set the language
        changeLanguage(storedLanguage);
    } else {
        // Default language is English
        changeLanguage('en');
    }
});

function checkLanguage() {
    var deElements = document.querySelectorAll('[lang="de"]:not(.mirador-viewer)');
    var enElements = document.querySelectorAll('[lang="en"]:not(.mirador-viewer)');
    enElements.forEach(function(element) {
        element.style.display = 'none';
    });
    var storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
        // If the language is stored, set the language
        changeLanguage(storedLanguage);
    }
}