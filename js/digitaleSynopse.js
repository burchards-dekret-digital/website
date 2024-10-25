

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

    // Helper function to extract the WoSscribe[number] part from the class list
    function extractScribeClass(classList) {
        for (let className of classList) {
          if (className.includes('WoSscribe')) {
            return className;
          }
        }
        return null;
      }

    // Helper function to check if there are any text nodes recursively in the node or its descendants
    function hasNonTextDescendants(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return false; // If it's a text node, return false because we want to ensure no text nodes are present
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively check all child nodes
            return Array.from(node.childNodes).every((child) => hasNonTextDescendants(child));
        }

        return true; // Non-text and non-element nodes (e.g., comments) are considered fine
    }

      // Get all elements that have the scribe classes
      const allScribes = document.querySelectorAll('[class*="WoSscribe"]'); //list of elements that have the string WoSscribe in the class

      // Loop through all elements that match the scribe pattern
      allScribes.forEach((scribe) => {
        let  handShift = scribe.querySelector('.tei_handShift-wrapper'); // Find the hand shift
        const scribeClass = extractScribeClass(scribe.classList);

        if (scribeClass) {
          // Extract the number part of the WoSscribe[number]
          const scribeNumber = scribeClass.match(/WoSscribe(\d+)/);
          
          if (scribeNumber) {
            const number = parseInt(scribeNumber[1]); //transform string number in integer
            
            if (handShift) {
                //same process for handshift
                const handShiftClass = extractScribeClass(handShift.classList);
                const handShiftNumber = handShiftClass.match(/WoSscribe(\d+)/);
                const handShiftN = parseInt(handShiftNumber[1]);

                let foundHandShift = false; // Flag to track if hand shift has been found

                // Recursive function to traverse and style each node
                function styleNode(node) {
                    if (node.nodeName.toUpperCase() === 'INS') {
                        // Continue processing the children of the <ins> tag
                        node.childNodes.forEach((child) => styleNode(child));
                    }
                    // If the hand shift is found, update the flag
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('tei_handShift-wrapper')) {
                        foundHandShift = true;
                    }
                    //Handle text nodes
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                        // Create a wrapper span for the text node and apply appropriate styles
                        const textWrapper = document.createElement('span');
                        textWrapper.textContent = node.textContent;

                        if (!foundHandShift) {
                            //if handshift is not found, apply scribe-bg
                            textWrapper.classList.add(`scribe${number.toString().padStart(2, '0')}-bg`); // Before hand shift
                        } else {
                            //else apply bg of the handshift
                            textWrapper.classList.add(`scribe${handShiftN.toString().padStart(2, '0')}-bg`); // After hand shift
                        }

                        // Replace the text node with the wrapper span
                        node.replaceWith(textWrapper);
                    }

                    // Select html elements that have children
                    else if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the node contains only text nodes (no element children)
                        const hasOnlyTextChildren = Array.from(node.childNodes).every((child) => child.nodeType === Node.TEXT_NODE); //i.e. span with text
                        const hasOnlyNonTextChildren = hasNonTextDescendants(node) //i.e. nested elements without text (like handshift)
                        const hasNoBRChildren = Array.from(node.childNodes).every((child) => child.nodeName !== 'BR'); //i.e. line break

                        const isButton = node.nodeName === 'BUTTON';

                        if (isButton) {
                            // Ignore if it's a button
                            return;
                        }
                        else if ((hasOnlyTextChildren && hasNoBRChildren) || hasOnlyNonTextChildren) {
                            // Apply the style to leaf elements only (no element children)
                            if (!foundHandShift) {
                                node.classList.add(`scribe${number.toString().padStart(2, '0')}-bg`); // Style for content before hand shift
                            } else {
                                node.classList.add(`scribe${handShiftN.toString().padStart(2, '0')}-bg`); // Style for content after hand shift
                            }
                        }
                        else {
                            // Recursively process all child nodes
                            node.childNodes.forEach((child) => styleNode(child));
                        }
                    }
                }

                // Start processing all child nodes of scribe instead of the whole block
                scribe.childNodes.forEach((child) => styleNode(child));
            }
            else {
                // Recursive function to traverse and style each node
                function styleNode(node) {
                    if (node.nodeName.toUpperCase() === 'INS') {
                        // Continue processing the children of the <ins> tag
                        node.childNodes.forEach((child) => styleNode(child));
                    }
                    // Handle text nodes
                    else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                        // Create a wrapper span for the text node and apply appropriate styles
                        const textWrapper = document.createElement('span');
                        textWrapper.textContent = node.textContent;
                        textWrapper.classList.add(`scribe${number.toString().padStart(2, '0')}-bg`); // Before hand shift
                        // Replace the text node with the wrapper span
                        node.replaceWith(textWrapper);
                    }
                    // Handle element nodes that are "leaf" nodes (contain no child elements except text nodes)
                    else if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the node contains only text nodes (no element children)
                        const hasOnlyTextChildren = Array.from(node.childNodes).every((child) => child.nodeType === Node.TEXT_NODE);
                        const hasOnlyNonTextChildren = hasNonTextDescendants(node) //i.e. nested elements without text (like handshift)
                        const hasNoBRChildren = Array.from(node.childNodes).every((child) => child.nodeName !== 'BR');

                        const isButton = node.nodeName === 'BUTTON';

                        if (isButton) {
                            // Ignore if it's a button
                            return;
                        }
                        else if ((hasOnlyTextChildren && hasNoBRChildren) || hasOnlyNonTextChildren) {
                            // Apply the style to leaf elements only (no element children)
                            node.classList.add(`scribe${number.toString().padStart(2, '0')}-bg`); // Style for content before hand shift
                        }
                        else {
                            // Recursively process all child nodes
                            node.childNodes.forEach((child) => styleNode(child));
                        }
                    }
                }

                // Start processing all child nodes of scribe
                scribe.childNodes.forEach((child) => styleNode(child));

                // Apply specific colors based on the scribe number
                //scribe.classList.add(`scribe${number.toString().padStart(2, '0')}-bg`);
            }
          }
        }
      });
}

// 4.5 Ausblenden der Schreiber
function hideScribes() {

    document.querySelectorAll("[class*='scribe'][class*='-bg']").forEach(element => {
        // Remove all classes matching the pattern scribe<number>-bg
        element.classList.forEach(className => {
            if (/^scribe\d+-bg$/.test(className)) {
                element.classList.remove(className);
            }
        });
    });
}
