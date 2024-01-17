/*  Projekt Burchards Dekret Digital
 Javascriptfunktionen der digitalen Synopse
 Stand: 05.08.2022
 Autor: Michael Schonhardt (m.schonhardt@uni-kassel.de)
 */


// 1. Steuerung der Anzeige

// 1.1 Prüfen, ob ms geladen wurde
function waitForElement(querySelector, timeout) {
    return new Promise((resolve, reject) => {
        var timer = false;
        if (document.querySelectorAll(querySelector).length) return resolve();
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(querySelector).length) {
                observer.disconnect();
                if (timer !== false) clearTimeout(timer);
                return resolve();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        if (timeout) timer = setTimeout(() => {
            observer.disconnect();
            reject();
        },
        timeout);
    });
}

// 1.2 TODO Digitale Synopse Panel öffnen

/* element = document.getElementById('1');
element.addEventListener("click", openDigitalSynopsis);

function openDigitalSynopsis() {
    document.getElementById("digital-synopsis").classList.add('active', 'show');
    document.getElementById("digital-synopsis-tab").classList.add('active');
    document.getElementById("digital-synopsis-tab").ariaSelected = "true";
    document.getElementById("textus-constitutus").classList.remove('active', 'show');
    document.getElementById("textus-constitutus-tab").classList.remove('active');
    document.getElementById("textus-constitutus-tab").ariaSelected = "false";
    
    var fId = '#frankfurt-ub-b-50-01-chapter-162';
    var bId = '#bamberg-sb-c-6-01-chapter-162';
    var vId = '#vatican-bav-pal-585-01-chapter-162';
    const f = document.querySelector(fId);
    const v = document.querySelector(vId);
    const b = document.querySelector(bId);
    f.scrollIntoView({
        block: 'start', behavior: 'smooth'
    });
    v.scrollIntoView({
        block: 'start', behavior: 'smooth'
    });
    b.scrollIntoView({
        block: 'start', behavior: 'smooth'
    });
} */

// 1.3 TODO Mirador Panel Öffnen

var miradorTab = null;
function openMiradorInTab() {
    miradorTab = window.open("mirador.html", 'mirador-tab');
}


function goToPageInMirador(sigla, canvas) {
    
    if (miradorTab != null) {
        
        miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvas));
    } else {
        miradorTab = window.open("mirador.html", 'mirador-tab');
        miradorTab.onload = function () {
            miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvas));
        }
    }
}


function openMiradorAtElement(Canvas) {
    var action = Mirador.actions.setCanvas('F', Canvas)
    mirador.store.dispatch(action);
}

// 2. Steuerung der Textzeugen

// 2.1 Hinzufügen von Textzeugen

function bddAddMss(msID) {
    
    const mssID = document.querySelector('.ms');
    let bookNumber = mssID.getAttribute('id').slice(-2);
    
    $.ajax({
        url: 'https://burchard.adwmainz.net/exist/rest/db/apps/bdd/modules/addMs.xql?ms=' + msID + '&book=' + bookNumber,
        dataType: 'html',
        type: 'GET',
        success: (data) => {
            $('#ms_canvas').append(data);
        },
        
        error: (jqHXR, errorMessage, error) => {
        }
    });
}

// 2.2 Entfernen von Textzeugen

function bddRemoveMs(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

// 2.3 Synchronisation der Textzeugen

/* function synchDigitalSynopsis(suffixId) {
    // window.scrollTo(0,0);
    document.getElementById('frankfurt-ub-b-50-' + suffixId).scrollIntoView();
    document.getElementById('bamberg-sb-c-6-' + suffixId).scrollIntoView();
    try {
        document.getElementById('vatican-bav-pal-lat-585-' + suffixId).scrollIntoView();
    }
    catch (err) {
        document.getElementById('vatican-bav-pal-lat-586-' + suffixId).scrollIntoView();
    }
    document.getElementById('koeln-edd-c-119-' + suffixId).scrollIntoView();
} */

// 2.4 Synchronisation der Kapitel nach Klick auf Menu Item von Hyperlink Symbol

/* function synchWitnesses(currentElement) {
    elementParent = currentElement.parentNode.parentNode.parentNode;
    let chapterNumber = elementParent.getAttribute('id').split('-')[2];
    const openWitnesses = document.querySelectorAll('.ms');
    openWitnesses.forEach(i => {
        let idWitness = '#' + i.getAttribute('id') + '-chapter-' + chapterNumber;
        const controlWitness = document.querySelector(idWitness);
        controlWitness.scrollIntoView({
            block: 'start', behavior: 'smooth'
        });
    });
} */

// 2.4 Scrolling von TOC Eintrag
// TODO funktioniert bislang nur statisch, wenn alle Kapitel gleich sind
function linkTocToChapter(currentElement) {
    let chapterNumber = currentElement.getAttribute('id').replace('toc', 'chapter');
    chapterNumber = '#' + chapterNumber;
    console.log(chapterNumber);
    const controlWitness = document.querySelector(chapterNumber);
    console.log(controlWitness);
    controlWitness.scrollIntoView({
        block: 'start', behavior: 'smooth'
    });
}

// 2.5 TODO Synch TOC Elements
function synchWitnessesToc() {
    const openWitnesses = document.querySelectorAll('.ms');
    openWitnesses.forEach(i => {
        let idWitness = '#' + i.getAttribute('id') + '-chapter-0';
        const controlWitness = document.querySelector(idWitness);
        controlWitness.scrollIntoView({
            block: 'start', behavior: 'smooth'
        });
    });
}


// 2.5 TODO Synch Beginning Content Elements
function synchWitnessesStart() {
    const openWitnesses = document.querySelectorAll('.ms');
    openWitnesses.forEach(i => {
        let idWitness = '#' + i.getAttribute('id') + '-chapter-1';
        const controlWitness = document.querySelector(idWitness);
        controlWitness.scrollIntoView({
            block: 'start', behavior: 'smooth'
        });
    });
}

// 2.6 Synch chapter up/down Elements
function synchWitnessesUpDown(currentElement, direction) {
    const openWitnesses = document.querySelectorAll('.ms');
    elementParent = currentElement.parentNode.firstChild;
    //console.log(elementParent)
    let chapterNumber = elementParent.getAttribute('id').split('-')[2];
    //console.log(chapterNumber)
    if (direction === 'up') {
        chapterNumber = parseInt(chapterNumber) -1;
    } else {
        chapterNumber = parseInt(chapterNumber) + 1;
    }
    chapterNumber = chapterNumber.toString();
    openWitnesses.forEach(i => {
        let idWitness = '#' + i.getAttribute('id') + '-chapter-' + chapterNumber;
        //console.log(idWitness)
        const controlWitness = document.querySelector(idWitness);
        controlWitness.scrollIntoView({
            block: 'start', behavior: 'smooth'
        });
    });
}

function contextMenuChapter(currentElement) {
    if (document.getElementById('context-menu') === null) {
        var menuHTML = document.createElement('div');
        menuHTML.className = 'synch-menu-chapter-wrapper';
        menuHTML.setAttribute('id', 'context-menu');
        var menuHTMContent = '<div class="synch-menu-chapter">' +
        
        '<div class="synch-menu-chapter-item" onclick="synchWitnessesToc()">Anfang (Capitula)</div>' +
        '<div class="synch-menu-chapter-item" onclick="synchWitnessesStart()">Anfang (Inhalt)</div>' +
        '<div class="synch-menu-chapter-item">Eintrag (Capitula)</div>' +
        
        '<div class="synch-menu-chapter-item" onclick="openMsInMirador(this)">MS hier in Mirador öffnen</div>' +
        
        
        '<div class="synch-menu-chapter-item" onclick="highlightElement(\'tei_expan\', \'rgb(253, 234, 229)\')">Auflösungen hervorheben</div>' +
        '<div class="synch-menu-chapter-item" onclick="showElement(\'tei_abbr\');hideElement(\'tei_expan\')">Abkürzungen anzeigen</div>' +
        '<div class="synch-menu-chapter-item" onclick="showElement(\'tei_expan\');hideElement(\'tei_abbr\')">Auflösungen anzeigen</div>' +
        
        '</div>';
        menuHTML.innerHTML = menuHTMContent;
        currentElement.appendChild(menuHTML);
        const scope = document.querySelector("body");
        scope.addEventListener("click", (e) => {
            var element = document.getElementById("context-menu");
            element.parentNode.removeChild(element);
        });
    } else {
    }
}

function openMsInMirador(currentElement) {
    elementParent = currentElement.parentNode.parentNode.parentNode.parentNode;
    let sigla = elementParent.getAttribute('id').split('-')[0];
    sigla = sigla.charAt(0).toUpperCase();
    console.log(sigla)
    let canvas = elementParent.getAttribute('data-canvas');
    console.log(canvas)
    
    if (miradorTab != null) {
        miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvas));
    } else {
        miradorTab = window.open("mirador.html", 'mirador-tab');
        miradorTab.onload = function () {
            miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvas));
        }
    }
}


function openMssInMirador(currentElement) {
    
    elementParent = currentElement.parentNode.parentNode.parentNode;
    let chapterNumber = elementParent.getAttribute('id').split('-')[2];
    console.log('Chapter number ' + chapterNumber);
    const openWitnesses = document.querySelectorAll('.ms');
    
    
    openWitnesses.forEach(i => {
    
    
    
        let idWitness = i.getAttribute('id') + '-chapter-' + chapterNumber;
        let sigla = idWitness.split('-')[0];
        sigla = sigla.charAt(0).toUpperCase();
        let targetId = document.getElementById(idWitness).getAttribute('data-canvas');
        let canvasId = targetId.split('#')[0];
        let annoText = "Kapitel " + chapterNumber
        
        let annoId = "https://burchard.adwmainz.net/annotations/annopage/" + idWitness
        let itemId = "https://burchard.adwmainz.net/annotations/annoitem/" + idWitness
        const annoPage = {id: annoId, type: "AnnotationPage", items: [{"id": itemId,"type": "Annotation","motivation": "commenting","body": {"type": "TextualBody","language": "de","value": annoText},"target": targetId}]}


        if (miradorTab != null) {
            miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvasId));
            miradorTab.mirador.store.dispatch(Mirador.actions.receiveAnnotation(canvasId,annoId,annoPage));

        } else {
            miradorTab = window.open("mirador.html", 'mirador-tab');
            miradorTab.onload = function () {
                miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvasId));
                miradorTab.mirador.store.dispatch(Mirador.actions.receiveAnnotation(canvasId,annoId,annoPage));

            }
        miradorTab.mirador.store.dispatch(Mirador.actions.toggleAnnotationDisplay(sigla));
        

        }
    });
}

function openHandShiftInMirador(targetId, sigla) {
    let canvasId = targetId.split('#')[0];
    sigla = sigla.charAt(1).toUpperCase();
    let annoText = "Handwechsel"
    
    let annoId = "https://burchard.adwmainz.net/annotations/annopage/handshift"
    let itemId = "https://burchard.adwmainz.net/annotations/annoitem/handshift"
    const annoPage = {id: annoId, type: "AnnotationPage", items: [{"id": itemId,"type": "Annotation","motivation": "commenting","body": {"type": "TextualBody","language": "de","value": annoText},"target": targetId}]}

        if (miradorTab != null) {
            miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvasId));
            miradorTab.mirador.store.dispatch(Mirador.actions.receiveAnnotation(canvasId,annoId,annoPage));

        } else {
            miradorTab = window.open("mirador.html", 'mirador-tab');
            miradorTab.onload = function () {
                miradorTab.mirador.store.dispatch(Mirador.actions.setCanvas(sigla, canvasId));
                miradorTab.mirador.store.dispatch(Mirador.actions.receiveAnnotation(canvasId,annoId,annoPage));

            }
        miradorTab.mirador.store.dispatch(Mirador.actions.toggleAnnotationDisplay(sigla));
        }
}

function openAnnotationInMirador() {
    
    const annoPage = {id: "https://example.org/iiif/foo/bar/annopage/", type: "AnnotationPage", items: [{"id": "https://sammlungen.ub.uni-frankfurt.de/msma/i3f/v20/2035614/canvas/2035688/a1","type": "Annotation","motivation": "commenting","body": {"type": "TextualBody","language": "en","value": "I love this!"},"target": "https://sammlungen.ub.uni-frankfurt.de/msma/i3f/v20/2035614/canvas/2035688#xywh=2000,500,2000,2000"}]}
    miradorTab.mirador.store.dispatch(Mirador.actions.receiveAnnotation('https://sammlungen.ub.uni-frankfurt.de/msma/i3f/v20/2035614/canvas/2035688','https://example.org/iiif/foo/bar/annopage/',annoPage));
}


// TODO: highlight all 



// 3. Steuerung der angezeigten Elemente

// 3.1 Anzeige der originalen Zeilenumbrüche

$('#diplomatic').on('click', function () {
    $('li').css('display', 'inline');
});

// 3.2 Anzeige eines Fließtextes

$('#flowing').on('click', function () {
    $('li').css('display', 'block');
});

// 3.3 Ausblenden eines Elements (z.B. abbr)

function hideElement(className) {
    var all = document.getElementsByClassName(className);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}

// 3.4 Einblenden eines Elements (z.B. abbr)

function showElement(className) {
    var all = document.getElementsByClassName(className);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'inline';
    }
}

/*
 // TODO Anzeige von Popups bei hover

 // display popups on hover
 //var e = document.getElementById('tei_handShift-wrapper');
 //e.onmouseover =

 //function() {
 //  document.getElementById('popup').style.display = 'block';
 //}
 //e.onmouseout = function() {
 //  document.getElementById('popup').style.display = 'none';
 //}
 */

// 4. Steuerung der Hervorhebungen

// 4.1 Hervorheben von seg displaced Elementen bei hover auf korrespondierendes supplied Element
function highlightCorrespElement(currentID, correspID) {
    // highlight current element at hover
    let currentElement = document.getElementById(currentID);
    currentElement.style.backgroundColor = "DarkSalmon";
    // highlight chilNodes due to nested elements
    for (let i = 0; i < currentElement.children.length; i++) {
        currentElement.children[i].style.backgroundColor = "DarkSalmon";
    }
    
    // get corresponding element and highlight
    var correspElement = document.getElementById(correspID);
    correspElement.style.backgroundColor = "DarkSalmon";
    // highlight chilNodes due to nested elements
    for (let i = 0; i < correspElement.children.length; i++) {
        correspElement.children[i].style.backgroundColor = "DarkSalmon";
    }
};

// 4.2 Ausschalten von seg displaced Elementen bei hover auf korrespondierendes supplied Element
function endHighlightCorrespElement(currentID, correspID) {
    // highlight current element at hover
    let currentElement = document.getElementById(currentID);
    currentElement.style.backgroundColor = "";
    // highlight chilNodes due to nested elements
    for (let i = 0; i < currentElement.children.length; i++) {
        currentElement.children[i].style.backgroundColor = "";
    }
    
    // get corresponding element and highlight
    var correspElement = document.getElementById(correspID);
    correspElement.style.backgroundColor = "";
    // highlight chilNodes due to nested elements
    for (let i = 0; i < correspElement.children.length; i++) {
        correspElement.children[i].style.backgroundColor = "";
    }
};

// 4.3 Generische Hervorhebung von Auszeichnungen mit Hintergrundfarbe
function highlightElement(className, color) {
    stl = document.getElementsByClassName(className)[0];
    if (stl.style.backgroundColor !== color) {
        var all = document.getElementsByClassName(className);
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = color;
        }
    } else {
        var all = document.getElementsByClassName(className);
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = 'white';
        }
    }
}

// 4.4 Anzeige der Schreiber durch Farben
function showScribes() {
    
    var dictScribes = {
        "WoSscribe01": "#A52A2A",
        "WoSscribe02": "#FFFF00",
        "WoSscribe03": "#1CE6FF",
        "WoSscribe04": "#FF34FF",
        "WoSscribe05": "#FF4A46",
        "WoSscribe06": "#008941",
        "WoSscribe07": "#006FA6",
        "WoSscribe08": "#A30059",
        "WoSscribe09": "#FFDBE5",
        "WoSscribe10": "#7A4900",
        "WoSscribe11": "#0000A6",
        "WoSscribe12": "#63FFAC",
        "WoSscribe13": "#B79762",
        "WoSscribe14": "#004D43",
        "WoSscribe15": "#8FB0FF",
        "WoSscribe16": "#997D87",
        "WoSscribe17": "#5A0007",
        "WoSscribe18": "#809693",
        "WoSscribe19": "#FEFFE6",
        "WoSscribe20": "#1B4400",
        "WoSscribe21": "#4FC601",
        "WoSscribe22": "#3B5DFF",
        "WoSscribe23": "#4A3B53",
        "WoSscribe24": "#FF2F80",
        "WoSscribe25": "#61615A",
        "WoSscribe26": "#BA0900",
        "WoSscribe27": "#6B7900",
        "WoSscribe28": "#00C2A0",
        "WoSscribe29": "#FFAA92",
        "WoSscribe30": "#FF90C9",
        "WoSscribe31": "#B903AA",
        "WoSscribe32": "#D16100",
        "WoSscribe33": "#DDEFFF",
        "WoSscribe34": "#000035",
        "WoSscribe35": "#7B4F4B",
        "WoSscribe36": "#A1C299",
        "WoSscribe37": "#300018",
        "WoSscribe38": "#0AA6D8",
        "WoSscribe39": "#013349",
        "WoSscribe40": "#00846F",
        "WoSscribe41": "#372101",
        "WoSscribe42": "#FFB500",
        "WoSscribe43": "#C2FFED",
        "WoSscribe44": "#A079BF",
        "WoSscribe45": "#CC0744",
        "WoSscribe46": "#C0B9B2",
        "WoSscribe47": "#C2FF99",
        "WoSscribe48": "#001E09",
        "WoSscribe49": "#00489C",
        "WoSscribe50": "#6F0062",
        "WoSscribe51": "#0CBD66",
        "WoSscribe52": "#EEC3FF",
        "WoSscribe53": "#456D75",
        "WoSscribe54": "#B77B68",
        "WoSscribe55": "#7A87A1",
        "WoSscribe56": "#788D66",
        "WoSscribe57": "#885578",
        "WoSscribe58": "#FAD09F",
        "WoSscribe59": "#FF8A9A",
        "WoSscribe60": "#D157A0",
        "WoSscribe61": "#BEC459"
    };
    
    for (var i = 1; i < 62; i++) {
        i = i.toString().padStart(2, '0');
        name = 'WoSscribe' + i;
        className = 'ms_scribe-' + name;
        var allScribes = document.getElementsByClassName(className);
        for (var e = 0; e < allScribes.length; e++) {
            // thicknes in textDecoration might be depreciated in the future
            allScribes[e].style.textDecoration = 'underline 3px';
            allScribes[e].style.textDecorationColor = dictScribes[name];
        }
    }
}

// 4.5 Ausblenden der Schreiber
function hideScribes() {
    for (var i = 1; i < 62; i++) {
        i = i.toString().padStart(2, '0');
        name = 'WoSscribe' + i;
        className = 'ms_scribe-' + name;
        var allScribes = document.getElementsByClassName(className);
        for (var e = 0; e < allScribes.length; e++) {
            allScribes[e].style.textDecoration = 'none';
        }
    }
}

// 5. Manipulation des Quelltextes

// 5.1 <em> und <ins> Element um Schreiberhände und delSpan einzufassen


waitForElement(".ms", 3000).then(function () {
    $('.ms').each(function () {
        
        // Schreiberwechsel als <em>
        //this.innerHTML = this.innerHTML.replaceAll(/<span class="tei_handShift-wrapper (.*?)">/g, '<em class="tei_handShift-color $1"><span class="tei_handShift-wrapper">');
        //this.innerHTML += '</em>'
        
        
        //delSpan als <ins>
        this.innerHTML = this.innerHTML.replaceAll('<ins class="tei_delSpan-start-written-on-erased"></ins>', '<ins class="tei_delSpan-written-on-erased">');
        this.innerHTML = this.innerHTML.replaceAll('<ins class="tei_delSpan-start-strikethrough"></ins>', '<ins class="tei_delSpan-strikethrough">');
        
        // replace anchor of delSpan
        try {
            let listOfAnchors = document.getElementsByClassName('tei_delSpan-written-on-erased-end');
            for (var i = 0; i < listOfAnchors.length; i++) {
                // anchor kann in paragraph sein, dann title und inskription berücksichtigen
                if (listOfAnchors[i].parentNode.parentNode.classList.contains('tei_')) {
                    var title = listOfAnchors[i].parentNode.parentNode.querySelector('.tei_chapter-title');
                    var inskription = listOfAnchors[i].parentNode.parentNode.querySelector('.tei_note-inscription');
                    listOfAnchors[i].parentNode.innerHTML = listOfAnchors[i].parentNode.innerHTML.replaceAll(/(.*?)<ins class="tei_delSpan-written-on-erased-end"><\/ins>/g, '<ins class="tei_delSpan-written-on-erased">$1<\/ins>');
                    title.innerHTML = '<ins class="tei_delSpan-written-on-erased">' + title.innerHTML + '<\/ins>';
                    inskription.innerHTML = '<ins class="tei_delSpan-written-on-erased">' + inskription.innerHTML + '<\/ins>';
                } else if (listOfAnchors[i].parentNode.parentNode.classList.contains('tei_chapter-title')) {
                    var title = listOfAnchors[i].parentNode.parentNode;
                    title.innerHTML = title.innerHTML.replaceAll(/(.*?)<ins class="tei_delSpan-written-on-erased-end"><\/ins>/g, '<ins class="tei_delSpan-written-on-erased">$1<\/ins><span class="tei_hi-color-red">');
                } else {
                }
            }
        }
        catch (err) {
        }
        
        try {
            let listOfAnchors = document.getElementsByClassName('tei_delSpan-strikethrough-end');
            for (var i = 0; i < listOfAnchors.length; i++) {
                // oder im im Titel
                if (listOfAnchors[i].parentNode.classList.contains('tei_')) {
                    var title = listOfAnchors[i].parentNode.parentNode.querySelector('.tei_chapter-title');
                    var inskription = listOfAnchors[i].parentNode.parentNode.querySelector('.tei_note-inscription');
                    listOfAnchors[i].parentNode.innerHTML = listOfAnchors[i].parentNode.innerHTML.replaceAll(/(.*?)<ins class="tei_delSpan-strikethrough-end"><\/ins>/g, '<ins class="tei_delSpan-strikethrough">$1<\/ins><span class="tei_hi-color-red">');
                    title.innerHTML = '<ins class="tei_delSpan-strikethrough">' + title.innerHTML + '<\/ins>';
                    inskription.innerHTML = '<ins class="tei_delSpan-strikethrough">' + inskription.innerHTML + '<\/ins>';
                } else if (listOfAnchors[i].parentNode.parentNode.classList.contains('tei_chapter-title')) {
                    var title = listOfAnchors[i].parentNode.parentNode;
                    title.innerHTML = title.innerHTML.replaceAll(/(.*?)<ins class="tei_delSpan-strikethrough-end"><\/ins>/g, '<ins class="tei_delSpan-strikethrough">$1<\/ins>');
                } else {
                }
            }
        }
        catch (err) {
        }
    })
}). catch (() => {
});