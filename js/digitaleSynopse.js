

// 2.4 Scrolling von TOC Eintrag
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

function changeCursorToHand(element) {
    // Change the cursor style to hand when mouse is over the element
    element.onmouseover = function() {
        element.style.cursor = 'pointer';
    };
}



// 2.6 Synch chapter up/down Elements
function synchWitnessesUpDown(currentElement, direction) {
    const openWitnesses = document.querySelectorAll('.ms');
    elementParent = currentElement.parentNode.firstChild;
    console.log(elementParent)
    let chapterNumber = elementParent.getAttribute('id').split('-')[2];
    console.log(chapterNumber)
    if (direction === 'up') {
        chapterNumber = parseInt(chapterNumber) -1;
    } else {
        chapterNumber = parseInt(chapterNumber) + 1;
    }
    chapterNumber = chapterNumber.toString();
    openWitnesses.forEach(i => {
        let idWitness = '#' + i.getAttribute('id') + '-chapter-' + chapterNumber;
        console.log(idWitness)
        const controlWitness = document.querySelector(idWitness);
        controlWitness.scrollIntoView({
            block: 'start', behavior: 'smooth'
        });
    });
}

/*function contextMenuChapter(currentElement) {
    if (document.getElementById('context-menu') === null) {
        var menuHTML = document.createElement('div');
        menuHTML.className = 'synch-menu-chapter-wrapper';
        menuHTML.setAttribute('id', 'context-menu');
        var menuHTMContent = '<div class="synch-menu-chapter">' +
        '<div class="synch-menu-chapter-item" onclick="synchWitnesses(this)">Synchronisieren</div>' +
        '<div class="synch-menu-chapter-item" onclick="synchWitnessesToc()">Anfang (Capitula)</div>' +
        '<div class="synch-menu-chapter-item" onclick="synchWitnessesStart()">Anfang (Inhalt)</div>' +
        '<div class="synch-menu-chapter-item">Eintrag (Capitula)</div>' +
        '<div class="synch-menu-chapter-item">Textus Constitutus (TODO)</div>' +
        '<div class="synch-menu-chapter-item" onclick="openMsInMirador(this)">MS hier in Mirador öffnen</div>' +
        '<div class="synch-menu-chapter-item" onclick="openMssInMirador(this)">MSS hier in Mirador öffnen</div>' +
        '<div class="synch-menu-chapter-item">Zitieren (TODO)</div>' +
        '<div class="synch-menu-chapter-item" onclick="highlightElement(\'tei_expan\', \'rgb(253, 234, 229)\')">Auflösungen hervorheben</div>' +
        '<div class="synch-menu-chapter-item" onclick="showElement(\'tei_abbr\');hideElement(\'tei_expan\')">Abkürzungen anzeigen</div>' +
        '<div class="synch-menu-chapter-item" onclick="showElement(\'tei_expan\');hideElement(\'tei_abbr\')">Auflösungen anzeigen</div>' +
        '<div class="synch-menu-chapter-item" onclick="showScribes()">Schreiber anzeigen</div>' +
        '<div class="synch-menu-chapter-item" onclick="hideScribes()">Schreiber ausblenden</div>' +
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
}*/



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


// 3. Steuerung der angezeigten Elemente



// 3.3 Ausblenden eines Elements (z.B. abbr)

function hideElement(className) {
    var all = document.getElementsByClassName(className);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}


//wrap text in Lesefassung
function toggleTextWrap() {
    var transcriptionDivs = document.querySelectorAll('.transcription-col');
    transcriptionDivs.forEach(function(div) {
        div.style.whiteSpace = 'normal';
    });
}




// 3.4 Einblenden eines Elements (z.B. abbr)

function showElement(className) {
    var all = document.getElementsByClassName(className);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'inline';
    }
}



// 4.1 Hervorheben von seg displaced Elementen bei hover auf korrespondierendes supplied Element
/*function highlightCorrespElement(currentID, correspID) {
    // highlight current element at hover
    let currentElement = document.getElementById(currentID);
    currentElement.style.backgroundColor = "LightGreen";
    // highlight chilNodes due to nested elements
    for (let i = 0; i < currentElement.children.length; i++) {
        currentElement.children[i].style.backgroundColor = "LightGreen";
    }
    
    // get corresponding element and highlight
    var correspElement = document.getElementById(correspID);
    correspElement.style.backgroundColor = "LightGreen";
    // highlight chilNodes due to nested elements
    for (let i = 0; i < correspElement.children.length; i++) {
        correspElement.children[i].style.backgroundColor = "LightGreen";
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
};*/

// 4.3 Generische Hervorhebung von Auszeichnungen mit Hintergrundfarbe
/*function highlightElement(className, color) {
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
}*/



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