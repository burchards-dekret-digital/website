

// 2.4 Scrolling von TOC Eintrag
function linkTocToChapter(currentElement) {
    let chapterNumber = currentElement.getAttribute('id').replace('toc', 'chapter');
    chapterNumber = '#' + chapterNumber;
    const controlWitness = document.querySelector(chapterNumber);
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
    "bdd-unin-loss": "Unintentional Loss of Chapters: Chapters are lost due to a leaf or quire that has been lost unintentionally.",
    "bdd-delib-loss": "Deliberate Loss of Chapters: Chapters are lost due to a deliberate loss of leaf or quire, for instance, by cutting out.",
    
    "bdd-marked-with-cross": "Marked with a cross: Chapters have been marked by a cross, possibly for deletion.",
    "bdd-strikethrough": "Strikethrough: Chapters have been struck through.",
    "bdd-permanent-deletion": "Permanent Deletion: Chapters have been deleted permanently.",
    "bdd-red-line-spacing": "Reduced line spacing: The typeface is crowded due to reduced line spacing.",
    "bdd-cut-out": "Cut out item: Item, such as leaf or canons, has been cut out.", 
    "bdd-erased": "Erased item: Item, such as leaf or chapters, has been erased.",
    "bdd-traces-red-initial": "Traces of red erased Initial: Remains of red erased Initial.",
    "bdd-traces-black-versalie": "Traces of black erased Versalie: Remains of black erased Versal.",

    "bdd-same-scribe-add": "Same Scribe Addition: Chapters have been added by the same scribe.",
    "bdd-other-scribe-add": "Other Scribe Addition: Chapter have been added by another scribe.",

    "bdd-relocation": "Relocation: Chapters have been relocated within the text.",
    "bdd-order-change": "Order Change: The order of chapters have been altered.",
    
    "bdd-inc-chap-num": "Inconsistent Chapter Numbering: The given chapter number is inconsistent.",
    "bdd-change-chap-num-cor": "Change in Chapter Numbering due to Correction: Change in Chapter Numbering is due to Correction.",
    "bdd-change-chap-num-add": "Change in Chapter Numbering due to Addition of Chapters: Change in Chapter Numbering is due to Addition of Chapters.",
    "bdd-change-chap-num-del": "Change in Chapter Numbering due to Deletion of Chapters: Change in Chapter Numbering is due to Deletion of Chapters.",
    "bdd-chap-num-miss": "Chapter Number Missing: No chapter number has been given.",
    
    "bdd-no-ins": "Chapter without inscription: The given chapter has no inscription in all main witnesses.",
    
    "bdd-sub-int": ". Subsequent Interventions: Interventions by later users in the manuscripts.",
    
    "bdd-ed-rec": "Reconstruction: Chapter has been lost, but can be reconstructed and supplied.",
    "bdd-not-on-erasure": "Not written on erasure: Elements such as inscriptions, titles or lines of text have been added on an erased column, but they are not on erasure, but on leaf areas that have not been erased.",

    "bdd-ref-lost": "Reference lost: ....."
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
    tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }


// Function to underline matching tei_delSpan and tei_anchor elements
function underlineDelSpanAndAnchor(panel) {
    const delSpanElements = panel.querySelectorAll('[delSpan_target]');
  
    for (let dse of delSpanElements) {
      const dse_target_id = dse.getAttribute('delSpan_target');
      const dse_target = panel.querySelector("#" + dse_target_id);
      
      if (dse_target) {
        let applyStyle = false; // Flag to indicate when to start underlining text
  
        function traverseAndWrap(node) {
          if (node.id === dse_target_id) {
            // Stop when reaching the target element
            applyStyle = false;
          }
  
          if (applyStyle) {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
              // If it's a text node and we are past the starting point
              let span = document.createElement("span");
              span.style.textDecoration = "underline";
              span.style.textDecorationStyle = "wavy";
              span.style.textDecorationColor = "#000";
              span.textContent = node.nodeValue;
              node.parentNode.replaceChild(span, node); // Replace text node with span
            }
          }
  
          // This is where we need to check for the first valid range start
          if (!applyStyle && node === dse) {
            applyStyle = true;
          }
  
  
          // Process child nodes recursively
          Array.from(node.childNodes).forEach(traverseAndWrap);
        }
  
        traverseAndWrap(panel); // Start processing from the panel
      } 
    }
  }

// Function to underline matching tei_delSpan and tei_anchor elements
function addSpanAndAnchor(panel) {
    const addSpanElements = panel.querySelectorAll('[addSpan_target]');
  
    for (let ase of addSpanElements) {
      const ase_target_id = ase.getAttribute('addSpan_target');
      const ase_target = panel.querySelector("#" + ase_target_id);
      
      if (ase_target) {
        let applyStyle = false; // Flag to indicate when to start underlining text
  
        function traverseAndWrap(node) {
          if (node.id === ase_target_id) {
            // Stop when reaching the target element
            applyStyle = false;
          }
  
          if (applyStyle) {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
              // If it's a text node and we are past the starting point
              let span = document.createElement("span");
              span.style.backgroundColor = "#e0ebeb";
              
              span.textContent = node.nodeValue;
              node.parentNode.replaceChild(span, node); // Replace text node with span
            }
          }
  
          // This is where we need to check for the first valid range start
          if (!applyStyle && node === ase) {
            applyStyle = true;
          }
  
  
          // Process child nodes recursively
          Array.from(node.childNodes).forEach(traverseAndWrap);
        }
  
        traverseAndWrap(panel); // Start processing from the panel
      } 
    }
  }
  