
// 2.4 Scrolling von TOC Eintrag
/*function linkTocToChapter(currentElement) {
    let chapterNumber = currentElement.getAttribute('id').replace('toc', 'chapter');
    chapterNumber = '#' + chapterNumber;
    const controlWitness = document.querySelector(chapterNumber);
    controlWitness.scrollIntoView({
        block: 'start', behavior: 'smooth'
    });
}*/

// Scroll from TOC item to corresponding chapter using data-sameas
function linkTocToChapter(currentElement) {
    const targetId = currentElement.getAttribute('data-sameas');
    if (!targetId) return; 
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    }
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
//functio from website in gitHub
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

  // Handle unidentified scribes — override any previously applied styles
  const unidentifiedScribes = document.querySelectorAll('.ms_scribe-WoSunidentified');
  unidentifiedScribes.forEach((el) => {
    el.querySelectorAll('*').forEach((child) => {
      // Remove any scribe[n]-bg classes
      [...child.classList].forEach((cls) => {
        if (/^scribe\d+-bg$/.test(cls)) {
          child.classList.remove(cls);
        }
      });
      // Add the unidentified background class
      child.classList.add('scribe-unidentified-bg');
    });
  });

  function removeScribeBgClasses(selectors) {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        [...el.classList].forEach((cls) => {
          if (/^scribe\d+-bg$/.test(cls)) {
            el.classList.remove(cls);
          }
        });
      });
    });
  }
  
  removeScribeBgClasses([
    '.taxonomy-icon',
    '.tei_note-editorial-comment-mirador-icon',
    '.tei_note-editorial-comment-icon',
    '.tei_pb',
    '.tei_cb'
  ]);

  

  
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
    document.querySelectorAll('.scribe-unidentified-bg').forEach(el => el.classList.remove('scribe-unidentified-bg'));
}





/*  function showTaxonomies() {
    const taxonomyWrappers = document.querySelectorAll('.tei_ana-taxonomy-wrapper');
    taxonomyWrappers.forEach(function(taxonomyWrapper) {
      taxonomyWrapper.style.display = 'inline';
    });
  }

  function hideTaxonomies() {
    const taxonomyWrappers = document.querySelectorAll('.tei_ana-taxonomy-wrapper');
    taxonomyWrappers.forEach(function(taxonomyWrapper) {
      taxonomyWrapper.style.display = 'none';
    });
  }
*/


/*TAXONOMY VISUALISATION*/
const bddDescriptions = {
    "bdd-unin-loss": "<span lang=\"de\">Blattverlust: Kapitelverlust durch den unbeabsichtigten Verlust eines oder mehrerer Blätter.</span><span lang=\"en\">Unintentional Loss of Chapters: Chapters lost due to the accidental loss of one or more leaves.</span>",
    
    "bdd-delib-loss": "<span lang=\"de\">Blattentfernung: Eintrag des Inhaltsverzeichnisses verweist auf mittlerweile verlorenes Kapitel.</span><span lang=\"en\">Deliberate Loss of Chapters: The entry in the table of contents refers to a chapter that is now lost.</span>",
    
    "bdd-ref-lost": "<span lang=\"de\">Verlorenes Bezugskapitel: Eintrag des Inhaltsverzeichnisses verweist auf mittlerweile verlorenes Kapitel.</span><span lang=\"en\">Reference to Lost Chapter: The entry in the table of contents refers to a chapter that is now lost.</span>",
    
    "bdd-marked-with-cross": "<span lang=\"de\">Kreuzmarkierung: Kapitel wurden mit einem Kreuz markiert, möglicherweise als Hinweise zur anstehenden Löschung.</span><span lang=\"en\">Marked with a cross: Chapters have been marked by a cross, possibly for deletion.</span>",
    
    "bdd-strikethrough": "<span lang=\"de\">Gestrichen:	Kapitel wurden (durch)gestrichen.</span><span lang=\"en\">Strikethrough: Chapters have been struck through.</span>",
    
    "bdd-permanent-deletion": "<span lang=\"de\">Entfernt: Kapitel wurden endgültig entfernt.</span><span lang=\"en\">Permanent Deletion: Chapters have been deleted permanently.</span>",
    
    "bdd-red-line-spacing": "<span lang=\"de\">Verringerter Zeilenabstand: Das Schriftbild ist aufgrund des geringen Zeilenabstands sehr gedrängt.</span><span lang=\"en\">Reduced line spacing: The script is densely packed as a result of narrowed line spacing.</span>",
    
    "bdd-cut-out": "<span lang=\"de\">Ausgeschnitten: Element, wie Blatt oder Kapitel, wurde rausgeschnitten.</span><span lang=\"en\">Cut out item: Item, such as leaf or canons, has been cut out.</span>", 
    
    "bdd-erased": "<span lang=\"de\">Rasur: Ein ganzes Blatt oder ein Kapitel wurde radiert.</span><span lang=\"en\">Erased item: Item, such as leaf or chapters, has been erased.</span>",
    
    "bdd-traces-red-initial": "<span lang=\"de\">Radierte Initiale: Spuren einer ausradierten roten Initiale.</span><span lang=\"en\">Traces of red erased Initial: Remains of red erased Initial.</span>",
    
    "bdd-traces-black-versalie": "<span lang=\"de\">Radierte Versalie: Überreste von schwarzer redierter Versalie.</span><span lang=\"en\">Traces of black erased Versalie: Remains of black erased Versal.</span>",


    "bdd-same-scribe-add": "<span lang=\"de\">Hinzugefügt durch denselben Schreiber: Text wurde vom selben Schreiber hinzugefügt.</span><span lang=\"en\">Same Scribe Addition: Chapters have been added by the same scribe.</span>",
    
    "bdd-other-scribe-add": "<span lang=\"de\">Hinzugefügt durch anderen Schreiber: Text wurde von einem anderen Schreiber hinzugefügt.</span><span lang=\"en\">Other Scribe Addition: Chapter have been added by another scribe.</span>",


    "bdd-relocation": "<span lang=\"de\">Verschoben: Kapitel wurde innerhalb des Textes umgestellt.</span><span lang=\"en\">Relocation: Chapters have been relocated within the text.</span>",
    
    "bdd-order-change": "<span lang=\"de\">Kapitelreihenfolge geändert: Die Reihenfolge von Kapiteln wurde geändert.</span><span lang=\"en\">Order Change: The order of chapters have been altered.</span>",
    

    "bdd-inc-chap-num": "<span lang=\"de\">Unstimmige Kapitelnummerierung: Es wurde eine unstimmige Nummerierung vergeben.</span><span lang=\"en\">Inconsistent Chapter Numbering: The given chapter number is inconsistent.</span>",
    
    "bdd-change-chap-num-cor": "<span lang=\"de\">Änderung der Kapitelnummerierung wegen Korrektur: Die Änderung der Kapitelnummerierung ist auf eine Korrektur zurückzuführen.</span><span lang=\"en\">Change in Chapter Numbering due to Correction: The change in chapter numbering is due to a correction.</span>",
    
    "bdd-change-chap-num-add": "<span lang=\"de\">Änderung der Kapitelnummerierung wegen Hinzufügung von Kapiteln: Die Änderung der Kapitelnummerierung ist auf die Hinzufügung von Kapiteln zurückzuführen.</span><span lang=\"en\">Change in Chapter Numbering due to Addition of Chapters: The change in chapter numbering is due to the addition of chapters.</span>",
    
    "bdd-change-chap-num-del": "<span lang=\"de\">Änderung der Kapitelnummerierung wegen Streichung von Kapiteln: Die Änderung der Kapitelnummerierung ist auf die Streichung von Kapiteln zurückzuführen.</span><span lang=\"en\">Change in Chapter Numbering due to Deletion of Chapters: The change in chapter numbering is due to the deletion of chapters.</span>",
    
    "bdd-chap-num-miss": "<span lang=\"de\">Keine Kapitelnummer vergeben: Es wurde keine Kapitelnummer vergeben.</span><span lang=\"en\">Chapter Number Missing: No chapter number has been given.</span>",
    

    "bdd-no-ins": "<span lang=\"de\">Kapitel ohne Inskription: Das Kapitel weist in den wichtigsten Textzeuge keine Inskription auf.</span><span lang=\"en\">Chapter without inscription: The given chapter has no inscription in all main witnesses.</span>",
    

    "bdd-sub-int": "<span lang=\"de\">Spätere Eingriffe: Interventions by later users in the manuscripts, which may affect both the text and the layout of the codex, such as corrections or changes to the binding.</span><span lang=\"en\">Subsequent Interventions: Interventions by later users in the manuscripts.</span>",
    

    "bdd-ed-rec": "<span lang=\"de\">Kapitel rekonstruiert: Ein verlorenes Kapitel wurde editorisch rekonstruiert.</span><span lang=\"en\">Reconstruction: Chapter has been lost and was reconstructed by the editors.</span>",
    
    "bdd-not-on-erasure": "<span lang=\"de\">Nicht auf Rasur: Titel oder Textzeilen wurden auf einer zuvor radierten Spalte ergänzt, befinden sich jedoch nicht direkt auf der Rasur, sondern auf nicht radierten Bereichen des Blattes.</span><span lang=\"en\">Not written on erasure: Elements such as inscriptions, titles, or lines of text have been added on a previously erased column, but they are not written on the erasure itself, rather on parts of the leaf that were not erased.</span>",

    "bdd-add-chap": "<span lang=\"de\">Hinzufügungen späterer Redaktionsstufen: Hinzufügungen von Kapiteln oder Elementen, die einer späteren Redaktionsstufe zuzuordnen sind.</span><span lang=\"en\">Additions from a Later Redactional Stage: Additions of chapters or elements made in later stages of redaction.</span>",
  };


  // Function to add icons and tooltips
  function addTaxonomyIcon(column_element) {
    const elements = column_element.querySelectorAll('[class*="bdd-"]');

    elements.forEach(el => {
      // Filter the class list to find BDD-related classes
      const classList = Array.from(el.classList);
      const bddClasses = classList.filter(cls => cls.startsWith('bdd-'));

      if (bddClasses.length > 0) {
        // Create the icon
        const icon = document.createElement('span');
        icon.className = 'taxonomy-icon';
        icon.innerHTML = '<i class="fa-solid fa-tag fa-lg"></i>'; //style="color: #74C0FC;"
        icon.setAttribute("data-bs-toggle", "tooltip");
        icon.setAttribute("data-bs-html", "true");
        icon.setAttribute("data-bs-title", "<ul><li>" + bddClasses.map(cls => bddDescriptions[cls] || cls).join('</li><li>') + "</li></ul>")

        icon.addEventListener('mouseover', () => {
            el.style.transition = "background-color"; // Smooth transition
            el.style.backgroundColor = "#bfe2fe"; // Highlight color
        });
      
        icon.addEventListener('mouseout', () => {
            el.style.backgroundColor = ""; // Remove highlight
        });
        

        if (el.tagName === 'DIV') {
            el.querySelector(':scope > h5').insertAdjacentElement('beforeend', icon);
        }
        else if (el.tagName === 'BR'){
            el.insertAdjacentElement('beforebegin', icon);
        }
        else{        
            el.insertAdjacentElement('beforeend', icon);
        }
      }
    });
    tooltipTriggerList = column_element.querySelectorAll('[data-bs-toggle="tooltip"]')
    //tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
          html: true
        });
        
        tooltipTriggerEl.addEventListener('show.bs.tooltip', () => {
            const raw = tooltipTriggerEl.getAttribute('data-bs-title');
            currentLang = localStorage.getItem('selectedLanguage')
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = raw;
        
            // Hide all spans not matching currentLang
            const spans = tempContainer.querySelectorAll('span[lang]');
            spans.forEach(span => {
                if (span.getAttribute('lang') !== currentLang) {
                    span.remove();
                }
            });
            thistooltip = bootstrap.Tooltip.getInstance(tooltipTriggerEl)
            thistooltip.setContent({'.tooltip-inner':  tempContainer.innerHTML })
        });
    })
  }





  function underlineDelSpanAndAnchor(panel) {
    const delSpanElements = panel.querySelectorAll('[delSpan_target]');
  
    for (let dse of delSpanElements) {
      const dse_target_id = dse.getAttribute('delSpan_target');
      const dse_target = panel.querySelector("#" + dse_target_id);
  
      if (dse_target) {
        let applyStyle = false;
        const classes = dse.classList;
  
        // Determine style rules
        let style = {};
        if (classes.contains('strikethrough')) {
          style = {
            textDecoration: 'line-through',
            textDecorationThickness: '1px',  
          };
        } else if (classes.contains('loss') || classes.contains('cut-out')) {
          style = {
            textDecoration: 'none',
          };
        } else if (classes.contains('erased')) {
          // Check if there's a matching tei_addSpan
          const matchingAddSpan = panel.querySelector(`[addSpan_target="${dse_target_id}"]`);
          if (matchingAddSpan) {
            style = {
              textDecoration: 'underline',
              textDecorationStyle: 'wavy',
              textDecorationColor: '#5ac5fa',
            };
          } else {
            style = {
              textDecoration: 'underline',
              textDecorationStyle: 'wavy',
              textDecorationColor: '#b3b3b3',
            };
          }
        } else {
          // Default tei_delSpan
          style = {
            textDecoration: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: '#b3b3b3',
          };
        }
  
        function traverseAndWrap(node) {
          if (node.id === dse_target_id) {
            applyStyle = false;
          }
  
          if (applyStyle && node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            let span = document.createElement("span");
            Object.assign(span.style, style);
            span.textContent = node.nodeValue;
            node.parentNode.replaceChild(span, node);
          }
  
          if (!applyStyle && node === dse) {
            applyStyle = true;
          }
  
          Array.from(node.childNodes).forEach(traverseAndWrap);
        }
  
        traverseAndWrap(panel);
      }
    }
  }

  
  function addSpanAndAnchor(panel) {
    const addSpanElements = panel.querySelectorAll('[addSpan_target]');
  
    for (let ase of addSpanElements) {
      const ase_target_id = ase.getAttribute('addSpan_target');
      const ase_target = panel.querySelector("#" + ase_target_id);
  
      if (ase_target) {
        let applyStyle = false;
  
        const style = {
          textDecoration: 'underline',
          textDecorationStyle: 'wavy',
          textDecorationColor: '#5ac5fa',
        };
  
        function traverseAndWrap(node) {
          if (node.id === ase_target_id) {
            applyStyle = false;
          }
  
          if (applyStyle && node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            let span = document.createElement("span");
            Object.assign(span.style, style);
            span.textContent = node.nodeValue;
            node.parentNode.replaceChild(span, node);
          }
  
          if (!applyStyle && node === ase) {
            applyStyle = true;
          }
  
          Array.from(node.childNodes).forEach(traverseAndWrap);
        }
  
        traverseAndWrap(panel);
      }
    }
  }
  

  