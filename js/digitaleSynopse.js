
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
function showScribes() {
  // Helper to extract the WoSscribe[number] from classList
  function extractScribeClass(classList) {
    for (let className of classList) {
      if (className.includes('WoSscribe')) return className;
    }
    return null;
  }

  // Helper to check if node has only element children (no text)
  function hasOnlyElementDescendants(node) {
    if (node.nodeType === Node.TEXT_NODE) return false;
    if (node.nodeType === Node.ELEMENT_NODE) {
      return Array.from(node.childNodes).every((child) => hasOnlyElementDescendants(child));
    }
    return true;
  }

  // Helper to format background class
  function formatScribeNumber(n) {
    return `scribe${n.toString().padStart(2, '0')}-bg`;
  }

  // Process all scribe blocks
  const allScribes = document.querySelectorAll('[class*="WoSscribe"]');

  allScribes.forEach((scribe) => {
    const scribeClass = extractScribeClass(scribe.classList);
    if (!scribeClass) return;

    const scribeNumberMatch = scribeClass.match(/WoSscribe(\d+)/);
    if (!scribeNumberMatch) return;

    let currentScribeNumber = parseInt(scribeNumberMatch[1]);

    // Single recursive function that updates currentScribeNumber dynamically
    function styleNode(node) {
      if (node.nodeName.toUpperCase() === 'INS') {
        node.childNodes.forEach((child) => styleNode(child));
        return;
      }

      // Detect hand shift wrapper and update scribe number
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('tei_handShift-wrapper')) {
        const newClass = extractScribeClass(node.classList);
        const match = newClass && newClass.match(/WoSscribe(\d+)/);
        if (match) {
          currentScribeNumber = parseInt(match[1]);
        }
      }

      // Handle text node
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        const wrapper = document.createElement('span');
        wrapper.textContent = node.textContent;
        wrapper.classList.add(formatScribeNumber(currentScribeNumber));
        node.replaceWith(wrapper);
        return;
      }

      // Handle element node
      if (node.nodeType === Node.ELEMENT_NODE) {
        const hasOnlyTextChildren = Array.from(node.childNodes).every(
          (child) => child.nodeType === Node.TEXT_NODE
        );
        const hasNoBRChildren = Array.from(node.childNodes).every(
          (child) => child.nodeName !== 'BR'
        );
        const isButton = node.nodeName === 'BUTTON';

        if (isButton) return;

        if ((hasOnlyTextChildren && hasNoBRChildren) || hasOnlyElementDescendants(node)) {
          node.classList.add(formatScribeNumber(currentScribeNumber));
        } else {
          node.childNodes.forEach((child) => styleNode(child));
        }
      }
    }

    // Start styling this scribe's children
    scribe.childNodes.forEach((child) => styleNode(child));
  });

  // Override styles for unidentified scribes
  const unidentifiedScribes = document.querySelectorAll('.ms_scribe-WoSunidentified');
  unidentifiedScribes.forEach((el) => {
    el.querySelectorAll('*').forEach((child) => {
      [...child.classList].forEach((cls) => {
        if (/^scribe\d+-bg$/.test(cls)) child.classList.remove(cls);
      });
      child.classList.add('scribe-unidentified-bg');
    });
  });

  // Clean up UI elements that shouldn't have scribe background classes
  function removeScribeBgClasses(selectors) {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        [...el.classList].forEach((cls) => {
          if (/^scribe\d+-bg$/.test(cls)) el.classList.remove(cls);
        });
      });
    });
  }

  removeScribeBgClasses([
    '.taxonomy-icon',
    '.tei_note-editorial-comment-mirador-icon',
    '.tei_note-editorial-comment-icon',
    '.tei_pb',
    '.tei_cb',
    '.tei_handShift-wrapper',
    '.ms_hand-name'
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
    

     "bdd-no-ins-all": "<span lang=\"de\">Kapitel ohne Inskription in allen Textzeugen: Das Kapitel hat keine Inskription in allen Textzeugen.</span><span lang=\"en\">Chapter without inscription in all textual witnesses: The chapter has no inscription in any of the textual witnesses.</span>",

    "bdd-no-ins-single": "<span lang=\"de\">Kapitel ohne Inskription in einem oder mehreren der Textzeugen: Das Kapitel hat keine Inskription in einem oder mehreren Textzeugen.</span><span lang=\"en\">Chapter without inscription in one or more textual witnesses: The chapter has no inscription in one or more textual witnesses.</span>",

    "bdd-no-rubs-all": "<span lang=\"de\">Kapitel ohne Rubrik in allen Textzeugen: Das Kapitel hat keine Rubrik in allen Textzeugen.</span><span lang=\"en\">Chapter without rubric in all textual witnesses: The chapter has no rubric in any of the textual witnesses.</span>",

    "bdd-no-rubs-single": "<span lang=\"de\">Kapitel ohne Rubrik in einem oder mehreren der Textzeugen: Das Kapitel hat keine Rubrik in einem oder mehreren Textzeugen.</span><span lang=\"en\">Chapter without rubric in one or more textual witnesses: The chapter has no rubric in one or more textual witnesses.</span>",
    
    "bdd-sub-int": "<span lang=\"de\">Spätere Eingriffe: Interventions by later users in the manuscripts, which may affect both the text and the layout of the codex, such as corrections or changes to the binding.</span><span lang=\"en\">Subsequent Interventions: Interventions by later users in the manuscripts.</span>",
    

    "bdd-ed-rec": "<span lang=\"de\">Kapitel rekonstruiert: Ein verlorenes Kapitel wurde editorisch rekonstruiert.</span><span lang=\"en\">Reconstruction: Chapter has been lost and was reconstructed by the editors.</span>",
    
    "bdd-not-on-erasure": "<span lang=\"de\">Nicht auf Rasur: Titel oder Textzeilen wurden auf einer zuvor radierten Spalte ergänzt, befinden sich jedoch nicht direkt auf der Rasur, sondern auf nicht radierten Bereichen des Blattes.</span><span lang=\"en\">Not written on erasure: Elements such as inscriptions, titles, or lines of text have been added on a previously erased column, but they are not written on the erasure itself, rather on parts of the leaf that were not erased.</span>",

    "bdd-add-chap": "<span lang=\"de\">Hinzufügungen späterer Redaktionsstufen: Hinzufügungen von Kapiteln oder Elementen, die einer späteren Redaktionsstufe zuzuordnen sind.</span><span lang=\"en\">Additions from a Later Redactional Stage: Additions of chapters or elements made in later stages of redaction.</span>",

    "bdd-ann": "<span lang=\"de\">Annotation: Hinweiszeichen am Rand.</span><span lang=\"en\">Annotation: Note sign on the edge.</span>",
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
  

  