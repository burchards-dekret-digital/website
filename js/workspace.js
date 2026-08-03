
// ========================================================
// WORKSPACE INITIALIZATION
// ========================================================

//Initial page load handling
document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      document.getElementById('contents').style.visibility = "hidden";
    } else if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('load').style.display = "none";
        document.getElementById('contents').style.visibility = "visible";
      }, 1000); //Optional delay
    }
};

//Shows the workspace loader while the selected resources are being added
/*document.getElementById('confirmSelectionBtn').addEventListener('click', function () {
    //Show loader
    document.getElementById('load').style.display = "flex";
    document.getElementById('contents').style.visibility = "hidden";

    setTimeout(function () {
      //Hide loader again
      document.getElementById('load').style.display = "none";
      document.getElementById('contents').style.visibility = "visible";
    }, 2000); //Simulated delay
});*/

//On page load, check for citation hash
window.addEventListener('load', async function () {
    const params = new URLSearchParams(window.location.search);
    const addBook = params.get('add');
    const hash = decodeURIComponent(window.location.hash.replace('#', '').trim());

    if (addBook) {
      await loadResourceState();   
      await appendSelectedBookToDesktop(addBook);

      updateWelcomeMessageVisibility();
      toggleTranscriptionButtonVisibility();

      if (hash) {
        setTimeout(() => {
          const chapter = document.getElementById(hash);
          const column = chapter?.closest('.transcription-col');

          if (chapter && column) {
            column.scrollTo({
              top: chapter.offsetTop - 180,
              behavior: 'smooth'
            });
          }
        }, 500);
      }
    } else if (hash) {
      let container = document.getElementById('resourcePanel');
      container.innerHTML = '';
      let selectedViews = [true, false, true, false, false];
      await initializeMirador(container, hash, selectedViews);

      updateWelcomeMessageVisibility();
      toggleTranscriptionButtonVisibility();

    } else {
      await loadResourceState();
    }
});

//Receives a book-selection message from ms-item
window.addEventListener("message", receiveMessage, false); //CHECK THIS
async function receiveMessage(event) {
  if (event.origin !== window.location.origin) {
    return;
  }
  if (!event.data) {
    return;
  }
  const selectedBook = event.data;
  await appendSelectedBookToDesktop(selectedBook);
}




// ========================================================
// SHARED HELPERS
// ========================================================

//Escapes special HTML characters before inserting dynamic values into generated markup
function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

//Keeps only the language spans matching the currently selected interface language
function filterLangSpans(html, lang) {
    if (!html) return html;

    // normalize language codes
    const norm = (l) => {
        l = (l || "").toLowerCase();
        if (l === "ger" || l === "deu" || l === "de-de") return "de";
        if (l === "eng" || l === "en-us" || l === "en-gb") return "en";
        return l;
    };

    const want = norm(lang);

    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    tmp.querySelectorAll('span[lang]').forEach(span => {
        const have = norm(span.getAttribute('lang'));
        if (have !== want) span.remove();
    });

    return tmp.innerHTML;
}



// ========================================================
// RESOURCE SELECTION
// ========================================================

//Builds the manuscript-and-book selection accordion from the BDD_MSS configuration
function buildWorkspaceAccordion() {
  const acc = document.getElementById("accordionManuscripts");
  if (!acc) return;

  const list = (window.BDD_MSS || [])
    .filter(m => m.kind === "core")
    .filter(m => Array.isArray(m.books) && m.books.length);

  //Sort: by uiGroup/citationLabel
  list.sort((a, b) => (a.uiGroup || a.sigle).localeCompare(b.uiGroup || b.sigle, "de"));

  acc.innerHTML = list.map(ms => {
    const headerId = `accHead_${ms.sigle}`;
    const collapseId = `accCol_${ms.sigle}`;

    const title = ms.citationLabel || ms.uiGroup || ms.sigle;
    const safeTitle = escapeHtml(title);

    //Build checkboxes only for actually available books
    const books = ms.books
      .slice()
      .sort((x, y) => String(x).localeCompare(String(y), "en", { numeric: true }));

    //Two columns layout
    const half = Math.ceil(books.length / 2);
    const colA = books.slice(0, half);
    const colB = books.slice(half);

    function bookCheckbox(bookN) {
      const b = String(bookN).padStart(2, "0");
      const msName = (ms.uiGroup || ms.sigle).replaceAll("_", "-");
      const value = `${msName}_${ms.sigle}_${b}`;
      const id = `cb_${ms.sigle}_${b}`;

      return `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${escapeHtml(value)}" id="${escapeHtml(id)}">
          <label class="form-check-label" for="${escapeHtml(id)}">
            <span lang="de">Buch</span><span lang="en">Book</span> ${escapeHtml(b)}
          </label>
        </div>
      `;
    }

    const colHtmlA = colA.map(bookCheckbox).join("");
    const colHtmlB = colB.map(bookCheckbox).join("");

    return `
      <div class="accordion-item">
        <h2 class="accordion-header" id="${escapeHtml(headerId)}">
          <button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#${escapeHtml(collapseId)}"
                  aria-expanded="false" aria-controls="${escapeHtml(collapseId)}">
            ${safeTitle} (${escapeHtml(ms.sigle)})
          </button>
        </h2>
        <div id="${escapeHtml(collapseId)}" class="accordion-collapse collapse"
             aria-labelledby="${escapeHtml(headerId)}" data-bs-parent="#accordionManuscripts">
          <div class="accordion-body">
            <div class="row">
              <div class="col-md-6">${colHtmlA}</div>
              <div class="col-md-6">${colHtmlB}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

//Builds the manuscript selection accordion when the initial HTML document is ready
document.addEventListener("DOMContentLoaded", () => {
    buildWorkspaceAccordion();
});

//Adds all books selected in the resource modal to the workspace
async function displaySelectedResources() {
    const resourcePanel = document.getElementById("resourcePanel");

    //Select all checked checkboxes inside the accordion
    const selectedBooks = document.querySelectorAll(
      "#accordionManuscripts input[type='checkbox']:checked"
    );
    await appendBooks(resourcePanel, selectedBooks);
    adjustPanelWidth();
    updateWelcomeMessageVisibility();
    toggleTranscriptionButtonVisibility();
}

//Adds selected books while preventing duplicate workspace panels
async function appendBooks(container, books) {
    for (let book of books) {
      //Check if this book is already on the workspace
      const existing = container.querySelector(`[data-ms='${book.value}']`);
      
      if (existing) {
        alert(`"${book.value}" is already displayed on your workspace.`);
        continue; //Skip if already added
      }

      let selectedViews = [true, false, true, false, false];
      await initializeMirador(container, book.value, selectedViews);
    }
}

//Adds a book received from a direct link or another BDD page to the workspace
/*async function appendSelectedBookToDesktop(selectedBook) {
    const msAbbr = selectedBook.split('-')[0];
    const bookN = selectedBook.split('-')[1];

    const ms = (typeof getMsBySigle === "function") ? getMsBySigle(msAbbr) : null;
    if (!ms) {
    console.warn("Unknown manuscript sigle:", msAbbr);
    return;
    }

    const msName = ms.uiGroup || ms.sigle;
    const book = [msName, msAbbr, bookN].join('_');

    const container = document.getElementById('resourcePanel');

    const existing = container.querySelector(`[data-ms='${book}']`);
    if (existing) {
    return;
    }

    const selectedViews = [true, false, true, false, false];
    await initializeMirador(container, book, selectedViews);

    updateWelcomeMessageVisibility();
    toggleTranscriptionButtonVisibility();
}*/
//Adds a book received from a direct link or another BDD page to the workspace
async function appendSelectedBookToDesktop(selectedBook) {
  let book;

  //Direct workspace link: msName_sigle_bookN
  if (selectedBook.includes('_')) {
    book = selectedBook;
  } else {
    //Message from another BDD page: sigle-bookN
    const [msAbbr, bookN] = selectedBook.split('-');

    const ms =
      typeof getMsBySigle === 'function'
        ? getMsBySigle(msAbbr)
        : null;

    if (!ms || !bookN) {
      console.warn('Invalid selected book:', selectedBook);
      return;
    }

    const msName = ms.uiGroup || ms.sigle;
    book = `${msName}_${msAbbr}_${bookN}`;
  }

  const container = document.getElementById('resourcePanel');
  if (!container) return;

  const existing = container.querySelector(
    `[data-ms="${CSS.escape(book)}"]`
  );

  if (existing) return;

  const selectedViews = [true, false, true, false, false];

  await initializeMirador(
    container,
    book,
    selectedViews
  );

  updateWelcomeMessageVisibility();
  toggleTranscriptionButtonVisibility();
}

//open the modal to select books  
document.getElementById('addResourceBtn').addEventListener('click', function() {
    $('#resourceModal').modal('show');

    // Deselect all checkboxes
    let checkboxes = document.querySelectorAll('#resourceModal input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
});

//Closes the resource modal and adds all currently selected books to the workspace
/*document.getElementById('confirmSelectionBtn').addEventListener('click', async function(e) {
    e.preventDefault();
    $('#resourceModal').modal('hide');
    await displaySelectedResources();
});*/

//Adds the selected books while displaying the workspace loader
document.getElementById('confirmSelectionBtn').addEventListener('click', async function (event) {
  event.preventDefault();

  const loader = document.getElementById('load');
  const contents = document.getElementById('contents');

  $('#resourceModal').modal('hide');

  loader.style.display = 'flex';
  contents.style.visibility = 'hidden';

  try {
    await displaySelectedResources();
  } finally {
    loader.style.display = 'none';
    contents.style.visibility = 'visible';
  }
});




// ========================================================
// RESOURCE STATE
// ========================================================

//Stores the currently open resources and active views in localStorage
function saveResourceState() {
    let resourcePanels = document.querySelectorAll('.resource-panel-item');
    let resourceState = [];
    resourcePanels.forEach(panel => {
      let bookId = panel.getAttribute("data-ms");
      let view = {
        transcription: panel.querySelector('.add-transcription-btn').classList.contains('btn-primary'),
        structure: panel.querySelector('.add-structure-btn').classList.contains('btn-primary'),
        mirador: panel.querySelector('.mirador-btn').classList.contains('btn-primary'),
        scribe: panel.querySelector('.scribe-btn').classList.contains('btn-primary')
        
      };
      resourceState.push({ bookId, view });
    });

    localStorage.setItem('resourceState', JSON.stringify(resourceState));
    adjustPanelWidth();
    updateWelcomeMessageVisibility();
    toggleTranscriptionButtonVisibility();
}

//Restores the saved workspace resources and views from localStorage
async function loadResourceState() {
    const resourceState = JSON.parse(localStorage.getItem('resourceState'));
    if (resourceState) {
      await displayResourcesFromJson(resourceState)
    }
    adjustPanelWidth();
    updateWelcomeMessageVisibility();
    toggleTranscriptionButtonVisibility();
}

//Adds all books selected in the resource-selection modal to the workspace
async function displayResourcesFromJson(jsonData) {
    let container = document.getElementById('resourcePanel');
    container.innerHTML = '';
    for (let resource of jsonData) {
        let selectedViews = [false, false, false, false, false]
        if (resource.view.transcription) {
        selectedViews[0] = true
        }
        if (resource.view.structure) {
        selectedViews[1] = true
        }
        if (resource.view.mirador) {
        selectedViews[2] = true
        }
        if (resource.view.scribe) { 
        selectedViews[3] = true 
        }
        
        await initializeMirador(container, resource.bookId, selectedViews)
    }
    updateWelcomeMessageVisibility();
    toggleTranscriptionButtonVisibility();
}

//Downloads the current workspace state as a JSON file
function downloadJson(data) {
    const filename = 'resources.json';
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

//Requests confirmation before clearing all workspace content
function confirmDelete() {
    return confirm("Are you sure you want to delete all content?");
}

//Clear all button
document.getElementById('clearAll').addEventListener('click', function () {
    if (!confirmDelete()) {
      return;
    }
    document.querySelectorAll('.modal[data-resource-panel]').forEach(modal => {
        modal.remove();
    });
    document.getElementById('resourcePanel').innerHTML = '';
    document.getElementById('resourcesUnorderedList').innerHTML = '';
    document.getElementById('transcription-view-button').style.display = 'none';
    localStorage.removeItem('resourceState');

    saveResourceState();
    updateWelcomeMessageVisibility();
    adjustPanelWidth();
});



//Reads an uploaded workspace JSON file and restores the resources described in it
/*document.getElementById('jsonFileInput').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = async function(event) {
      const jsonData = JSON.parse(event.target.result);
      await displayResourcesFromJson(jsonData);
      saveResourceState(); // Save resource panel status after uploading data from Json
    };
    reader.readAsText(file);
});*/
//Reads an uploaded workspace JSON file and restores the resources described in it
document.getElementById('jsonFileInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function (event) {
    try {
      const jsonData = JSON.parse(event.target.result);

      await displayResourcesFromJson(jsonData);
      saveResourceState();
    } catch (error) {
      console.error('Could not load workspace JSON:', error);
    }
  };

  reader.readAsText(file);
});



// ========================================================
// RESOURCE LOADING
// ========================================================

//Loads a combined book HTML file, creates its resource panel, and initializes Mirador (TODO: rename function)
async function initializeMirador(container, book, selectedViews) {
return new Promise(async resolve => {
    let [msName, msAbbr, bookN] = book.split('_');

    //Lookup ms object (BDD_MSS)
    const ms = (typeof getMsBySigle === "function") ? getMsBySigle(msAbbr) : null;
    if (!ms || !window.BDD_PATHS) {
    console.error("BDD_PATHS/ms lookup not available.");
    return resolve();
    }

    const prefer = "canonical";

    //ONE single combined HTML file
    let folderPath = window.BDD_PATHS.bookHtml(ms, bookN, { prefer });

    let response = await fetch(folderPath);

    if (response.ok) {
    let htmlContent = await response.text();

    //Parse combined HTML
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    //Extract the different sections from the combined file
    let transcriptionHtml = tempDiv.querySelector('.bdd-view.transcription')?.innerHTML || '';
    let structureHtml = tempDiv.querySelector('.bdd-view.structure')?.innerHTML || '';
    let scribeHtml = tempDiv.querySelector('.bdd-view.scribe')?.innerHTML || '';
    let editorHtml = tempDiv.querySelector('.bdd-view.info')?.innerHTML || '';

    let msViews = [];
    msViews.push(transcriptionHtml); // 0 transcription
    msViews.push(structureHtml);     // 1 structure
    msViews.push("<div class='mirDesktop' id='" + "mirador" + msAbbr + bookN + "'></div>"); // 2 mirador
    msViews.push(scribeHtml);        // 3 scribe
    msViews.push(editorHtml);        // 4 editorial info (for modal only)

    //Find first element with data-canvas INSIDE transcription
    let transcriptionTemp = document.createElement('div');
    transcriptionTemp.innerHTML = transcriptionHtml;

    let firstCanvasEl = transcriptionTemp.querySelector('[data-canvas]');

    let initialCanvasId = null;
    if (firstCanvasEl) {
        initialCanvasId = firstCanvasEl
        .getAttribute('data-canvas')
        .split('#')[0];
    }

    let mirID = "mirador" + msAbbr + bookN;
    const catalog = (window.BDD_MSS || [])
        .filter(m => m.manifestId)
        .map(m => ({ sigle: m.sigle, manifestId: m.manifestId }));

    const manifestId = ms.manifestId || "";

    let panel = createResourcePanel(book, msViews, selectedViews);
    
    container.appendChild(panel);
    checkLanguage();

    panel.querySelectorAll('.move-left').forEach(function (element) {
        element.addEventListener('click', function () {
        let card = $(this).closest('.card').parent();
        card.insertBefore(card.prev());
        saveResourceState();
        });
    });

    panel.querySelectorAll('.move-right').forEach(function (element) {
        element.addEventListener('click', function () {
        let card = $(this).closest('.card').parent();
        card.insertAfter(card.next());
        saveResourceState();
        });
    });

    //Delay execution to ensure Mirador can properly initialize
    setTimeout(() => {
        let windowsID = mirID + crypto.randomUUID();
        let miradorInstance = Mirador.viewer({
        id: mirID,
        language: 'de',
        window: {
            allowClose: false,
            defaultView: 'single',
            highlightAllAnnotations: true,
            panels: {
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
            ]
        },
        windows: [{
            id: windowsID,
            manifestId: manifestId,
            canvasId: initialCanvasId
        }],
        thumbnails: {
            enabled: false
        },
        catalog: catalog
        });

        //Eye icon: Opens the Digital Copy view when necessary and displays the canvas associated with the selected TEI section
        panel.querySelectorAll('.icon-chapter-mirador').forEach(icon => {
            icon.addEventListener('click', function () {
                const canvasSource = icon.closest('[data-canvas]');
                if (!canvasSource) return;

                const canvasValue = canvasSource.getAttribute('data-canvas');
                if (!canvasValue) return;

                const canvasId = canvasValue.split('#')[0];

                const resourcePanel = icon.closest('.resource-panel-item');
                if (!resourcePanel) return;

                const miradorCol = resourcePanel.querySelector('.mirador-col');
                const miradorButton = resourcePanel.querySelector('.mirador-btn');
                const miradorWindow = resourcePanel.querySelector('.mirador-window');

                if (!miradorCol || !miradorWindow) return;

                //Open the Digital Copy view if it is currently hidden
                if (miradorCol.classList.contains('d-none') && miradorButton) {
                miradorButton.click();
                }

                const windowId = miradorWindow.id;
                if (!windowId) return;

                const action = Mirador.actions.setCanvas(
                windowId,
                canvasId
                );

                miradorInstance.store.dispatch(action);

                //Allow Mirador to recalculate its dimensions after becoming visible
                setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                }, 100);
            });
        });

        //Force Mirador to recalculate layout after init
        setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        }, 100);

        saveResourceState();
        adjustPanelWidth();
        resolve();
    }, 400);

    } else {
    console.warn("Combined resource file could not be loaded for", book, folderPath);
    resolve();
    }
});
}



// ========================================================
// RESOURCE PANEL CREATION
// ========================================================

//Creates a complete workspace panel and binds all controls associated with the resource
function createResourcePanel(idVal, views, selectedViews) {

    const panel = document.createElement('div');
    panel.classList.add('resource-panel-item');
    panel.setAttribute('data-ms', idVal);

    let [msName, msAbbr, bookN] = idVal.split('_');

    //Lookup from BDD_MSS
    const ms = (typeof getMsBySigle === "function") ? getMsBySigle(msAbbr) : null;

    //Use citationLabel if available, otherwise fallback
    let displayName = (ms && ms.citationLabel) ? ms.citationLabel : msName;

    //Link to manuscript page
    let msItemUrl = `ms-item.html?document=${encodeURIComponent(msAbbr)}`;

    //Header title HTML
    let headerTitleHtml = `
      <a href="${msItemUrl}" target="_blank" class="text-decoration-none">
        ${displayName}
      </a> - ${bookN}
    `;

    //create the list of resources open on the desktop
    $("#resourcesUnorderedList").append(
      "<li for='"+idVal+"'>" +
      displayName + " - " + bookN +
      " <button class='btn btn-sm btn-light' onclick='removeListItem(\"" + idVal + "\")'><i class='fa-solid fa-xmark' style='color: #636363;'></i></button></li>"
    )
    

    const panelContent = `
      <div class="card panel-card">
        
        <!-- ROW 1 -->
        <div class="panel-close-row">
          <div class="panel-title">${headerTitleHtml}</div>
          <button type="button" class="btn-close panel-close-btn" aria-label="Close"></button>
        </div>
        
        <div class="card-header fw-bold">    
          <!-- ROW 2 -->
          <div class="d-flex justify-content-center gap-2 view-buttons">
            <button type="button" class="btn btn-primary btn-sm view-btn add-transcription-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Transkriptionspanel anzeigen</span><span lang='en'>Display transcription panel</span>" aria-label="Transcription">
              <i class="bi bi-fonts"></i>
              <span class="view-label"><span lang='de'>Transkription</span><span lang='en'>Transcription</span></span>
            </button>

            <button type="button" class="btn btn-outline-primary btn-sm view-btn add-structure-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Strukturpanel anzeigen</span><span lang='en'>Display structure panel</span>" aria-label="Structure">
              <i class="bi bi-list-ul"></i>
              <span class="view-label"><span lang='de'>Struktur</span><span lang='en'>Structure</span></span>
            </button>

            <button type="button" class="btn btn-outline-primary btn-sm view-btn mirador-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Digitalisat anzeigen</span><span lang='en'>Display digital copy panel</span>" aria-label="Digital copy">
              <i class="bi bi-image"></i>
              <span class="view-label"><span lang='de'>Digitalisat</span><span lang='en'>Digital copy</span></span>
            </button>

            <button type="button" class="btn btn-outline-primary btn-sm view-btn scribe-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Schreiberpanel anzeigen</span><span lang='en'>Display scribe panel</span>" aria-label="Scribe">
              <i class="bi bi-person"></i>
              <span class="view-label"><span lang='de'>Schreiber</span><span lang='en'>Scribe</span></span>
            </button>
          </div>

          <!-- ROW 3 -->
          <div class="d-flex justify-content-center mt-2">
            <div class="d-flex align-items-center gap-2 panel-actions">
              <button type="button" class="btn btn-light btn-sm move-left" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Panel nach links verschieben</span><span lang='en'>Move panel left</span>">
                <i class="bi bi-chevron-double-left"></i>
              </button>

              <button type="button"class="btn btn-light btn-sm move-right" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Panel nach rechts verschieben</span><span lang='en'>Move panel right</span>">
                <i class="bi bi-chevron-double-right"></i>
              </button>

              <button type="button" class="btn btn-light btn-sm expand-panel-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Panel vergrößern</span><span lang='en'>Expand panel</span>">
                <i class="bi bi-arrows-fullscreen"></i>
              </button>

              <div class="dropdown kebab-tooltip-wrapper" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<span lang='de'>Weitere Optionen</span><span lang='en'>More options</span>">
                <button type="button" style="padding: .25rem .4rem;" class="btn btn-light kebab-btn" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item open-all-witnesses" href="#">
                      <span lang="de">Buch <span class="book-n-label"></span> in allen Zeugen öffnen</span>
                      <span lang="en">Open book <span class="book-n-label"></span> in all witnesses</span>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item open-legend-modal" href="#">
                      <span lang="de">Legende zur Transkription</span>
                      <span lang="en">Transcription legend</span>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item open-editorial-modal" href="#">
                      <span lang="de">Redaktionelle Informationen</span>
                      <span lang="en">Editorial information</span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item open-cite-modal" href="#">
                      <span lang="de">Zitiervorschlag</span>
                      <span lang="en">How to cite</span>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item download-book-xml" href="#">
                      <i class="fa-solid fa-download me-1"></i> 
                      <span lang="de">XML-Transkription herunterladen</span><span lang="en">Download XML transcription</span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item download-msdesc-xml" href="#">
                      <i class="fa-solid fa-download me-1"></i> 
                      <span lang="de">XML-Handschriftenbeschreibung herunterladen</span><span lang="en">Download XML manuscript description</span>
                    </a>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>

        <div class="card-body row">
          <div class="col border m-1 transcription-col d-none" style="overflow-y: scroll; max-height: 600px; white-space: nowrap"></div>
          <div class="col border m-1 structure-col d-none" style="overflow-y: scroll; max-height: 600px; text-wrap: nowrap; padding-left:0;"></div>
          <div class="col m-1 mirador-col d-none" style="max-height: 600px;"></div>
          <div class="col border m-1 scribe-col d-none" style="overflow-y: scroll; max-height: 600px; text-wrap: wrap"></div>
          <div class="border m-1 editor-col d-none" style="overflow-y: scroll; max-height: 600px; text-wrap: wrap"></div>
        </div>
      </div>
    `
    panel.innerHTML = panelContent;

    //Auto-close kebab dropdown after any item is clicked
    const kebabMenu = panel.querySelector('.dropdown-menu-end');
    const kebabBtn = panel.querySelector('.kebab-btn');

    kebabMenu.addEventListener('click', function(e) {
      const item = e.target.closest('.dropdown-item');
      if (!item) return;
      bootstrap.Dropdown.getOrCreateInstance(kebabBtn).hide();
    });

    //Initializes tooltips inside the panel, excluding the dropdown toggle
    panel.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(el => initTooltip(el));

  
    function triggerDownload(url) {
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", ""); // hint browser to download
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    const bookXmlLink = panel.querySelector(".download-book-xml");
    if (bookXmlLink) {
      bookXmlLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (!ms || !window.BDD_PATHS) return;

        const url = window.BDD_PATHS.bookXml(ms, bookN);
        triggerDownload(url);
      });
    }

    const msdescXmlLink = panel.querySelector(".download-msdesc-xml");
    if (msdescXmlLink) {
      msdescXmlLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (!ms || !window.BDD_PATHS) return;

        const url = window.BDD_PATHS.msdesc(ms);
        triggerDownload(url);
      });
    }


    panel.querySelector('.transcription-col').innerHTML = views[0];
    panel.querySelector('.structure-col').innerHTML = views[1];
    panel.querySelector('.mirador-col').innerHTML = views[2];
    panel.querySelector('.scribe-col').innerHTML = views[3];
    panel.querySelector('.editor-col').innerHTML = views[4];

    initializeTeiUI(panel);



    let citationUrl = "https://burchards-dekret-digital.de/html/workspace.html#" + idVal; //CHANGE URL
    let citationText = `Burchards Dekret Digital, Akademie der Wissenschaften und der Literatur Mainz, 2025. ${displayName}, Transkription Buch ${bookN} (${citationUrl})`;
    let citationBlock = `
      <p>
        Burchards Dekret Digital, Akademie der Wissenschaften und der Literatur Mainz, 2025.
        <i>${displayName},</i> <span lang="de">Transkription</span><span lang="en">Transcription</span> <a href="${citationUrl}" target="_blank"><span lang="de">Buch</span><span lang="en">Book</span> ${bookN}</a>.       
      </p>
      <button class="btn btn-sm btn-outline-secondary mt-2 mb-3 copy-citation-btn" data-citation="${citationText}">
        <span lang="de">Zitat kopieren</span><span lang="en">Copy citation</span>
      </button>
      <button class="btn btn-sm btn-outline-secondary mt-2 mb-3 copy-link-btn" data-citation="${citationUrl}">
        <span lang="de">Link kopieren</span><span lang="en">Copy link</span>
      </button>
    `;


    //Open legend modal
    const legendTrigger = panel.querySelector('.open-legend-modal');
    if (legendTrigger) {
      legendTrigger.addEventListener('click', (e) => {
        e.preventDefault();

        const modal = new bootstrap.Modal(document.getElementById('legendModal'));
        modal.show();
      });
    }
    


    //Open Editorial information modal
    const editorialTrigger = panel.querySelector('.open-editorial-modal');
    if (editorialTrigger) {
      editorialTrigger.addEventListener('click', (e) => {
        e.preventDefault();

        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        const raw = panel.querySelector('.editor-col')?.innerHTML || '';

        const html = (typeof filterLangSpans === "function")
          ? filterLangSpans(raw, currentLang)
          : raw;

        document.getElementById('editorialModalBody').innerHTML = html;

        const modal = new bootstrap.Modal(document.getElementById('editorialModal'));
        modal.show();
      });
    }

    //Open How to cite modal
    const citeTrigger = panel.querySelector(".open-cite-modal");
    if (citeTrigger) {
      citeTrigger.addEventListener("click", (e) => {
        e.preventDefault();

        const currentLang = localStorage.getItem("selectedLanguage") || "en";
        let html = citationBlock;

        if (typeof filterLangSpans === "function") {
          html = filterLangSpans(html, currentLang);
        }

        const body = document.getElementById("citeModalBody");
        body.innerHTML = html;

        
        //Copies citation data and temporarily updates the visible button label
        const bindCopy = selector => {
        const btn = body.querySelector(selector);
        if (!btn) return;

        btn.addEventListener('click', async function () {
            const text = this.getAttribute('data-citation');
            if (!text) return;

            const visibleLabel = this.querySelector('[lang]');
            if (!visibleLabel) return;

            const originalText = visibleLabel.textContent;
            const currentLang =
            localStorage.getItem('selectedLanguage') || 'en';

            try {
            await navigator.clipboard.writeText(text);

            visibleLabel.textContent =
                currentLang === 'de' ? 'Kopiert!' : 'Copied!';

            setTimeout(() => {
                visibleLabel.textContent = originalText;
            }, 2000);
            } catch (error) {
            console.error('Could not copy text:', error);
            }
        });
        };

        bindCopy('.copy-citation-btn');
        bindCopy('.copy-link-btn');

        new bootstrap.Modal(document.getElementById("citeModal")).show();
      });
    }

  
    panel.querySelector('.panel-close-btn').addEventListener('click', function () {
        const thisDataMS = panel.getAttribute('data-ms');

        $("#resourcesUnorderedList li[for='" + thisDataMS + "']").remove();

        document.querySelectorAll(`.modal[data-resource-panel="${CSS.escape(thisDataMS)}"]`)
        .forEach(modal => {
            modal.remove();
        });

        panel.remove();

        updateWelcomeMessageVisibility();
        adjustPanelWidth();
        saveResourceState();
    });


    //Expand/restore panel
    const expandBtn = panel.querySelector('.expand-panel-btn');

    expandBtn.addEventListener('click', function () {
      
      const icon = expandBtn.querySelector('i');

      if (!panel.classList.contains('panel-expanded')) {

        panel.classList.remove(
          'quarter-width',
          'half-width',
          'three-quarter-width',
          'full-width'
        );

        //expand
        panel.classList.add('panel-expanded');

        icon.classList.remove('bi-arrows-fullscreen');
        icon.classList.add('bi-fullscreen-exit');

        expandBtn.setAttribute(
          "data-bs-title",
          "<span lang='de'>Panel verkleinern</span><span lang='en'>Restore panel</span>"
        );

      } else {

        //restore normal
        panel.classList.remove('panel-expanded');

        icon.classList.remove('bi-fullscreen-exit');
        icon.classList.add('bi-arrows-fullscreen');

        expandBtn.setAttribute(
          "data-bs-title",
          "<span lang='de'>Panel vergrößern</span><span lang='en'>Expand panel</span>"
        );

        adjustPanelWidth();
      }

    });


    //Open all witnesses for the same book
    const allWitnessesBtn = panel.querySelector('.open-all-witnesses');

    //Fill in the book number in the label
    panel.querySelectorAll('.book-n-label').forEach(el => el.textContent = bookN);

    if (allWitnessesBtn) {
        allWitnessesBtn.addEventListener('click', async (e) => {
          e.preventDefault();

          const container = document.getElementById('resourcePanel');

          //Find all core manuscripts that have this book available
          const candidates = (window.BDD_MSS || [])
          .filter(m => m.kind === 'core')
          .filter(m => Array.isArray(m.books) && m.books.includes(bookN));

          let opened = 0;

          for (const m of candidates) {
            const msName = m.uiGroup || m.sigle;
            const bookId = `${msName}_${m.sigle}_${bookN}`;

            //Skip if already on the workspace
            const existing = container.querySelector(`[data-ms='${bookId}']`);
            if (existing) {
              continue;
            }

            const selectedViews = [true, false, true, false, false];
            await initializeMirador(container, bookId, selectedViews);
            opened++;
          }

          adjustPanelWidth();
          updateWelcomeMessageVisibility();
          toggleTranscriptionButtonVisibility();

          if (opened === 0) {
            alert(
              localStorage.getItem('selectedLanguage') === 'de'
                ? `Alle verfügbaren Zeugen von Buch ${bookN} sind bereits geöffnet.`
                : `All available witnesses for book ${bookN} are already open.`
            );
          }
        });
      }


    let [transcriptionAdded, structureAdded, miradorAdded, scribeAdded] = selectedViews

    var viewsElements = panel.getElementsByClassName('col');
    const addTranscriptionBtn = panel.querySelector('.add-transcription-btn');
    const addStructureBtn = panel.querySelector('.add-structure-btn');
    const miradorBtn = panel.querySelector('.mirador-btn');
    const scribeBtn = panel.querySelector('.scribe-btn');

    if (transcriptionAdded){
        viewsElements[0].classList.remove('d-none');
        addTranscriptionBtn.classList.remove('btn-outline-primary');
        addTranscriptionBtn.classList.add('btn-primary');
    }
    if (structureAdded){
      viewsElements[1].classList.remove('d-none');
      addStructureBtn.classList.remove('btn-outline-primary');
      addStructureBtn.classList.add('btn-primary');
    }
    if (miradorAdded){
      viewsElements[2].classList.remove('d-none');
      miradorBtn.classList.remove('btn-outline-primary');
      miradorBtn.classList.add('btn-primary');
    }
    if (scribeAdded){
      viewsElements[3].classList.remove('d-none');
      scribeBtn.classList.remove('btn-outline-primary');
      scribeBtn.classList.add('btn-primary');
    }

   

    addTranscriptionBtn.addEventListener('click', function() {
      if (!transcriptionAdded) {
        viewsElements[0].classList.remove('d-none');
        transcriptionAdded = true;
        addTranscriptionBtn.classList.remove('btn-outline-primary');
        addTranscriptionBtn.classList.add('btn-primary');
      } else {
        viewsElements[0].classList.add('d-none');
        transcriptionAdded = false;
        addTranscriptionBtn.classList.remove('btn-primary');
        addTranscriptionBtn.classList.add('btn-outline-primary');
      }
      saveResourceState(); // Save resource panel status after addition/deletion transcription
      adjustPanelWidth();
    });

    addStructureBtn.addEventListener('click', function() {
      if (!structureAdded) {
        viewsElements[1].classList.remove('d-none');
        structureAdded = true;
        addStructureBtn.classList.remove('btn-outline-primary');
        addStructureBtn.classList.add('btn-primary');
      } else {
        viewsElements[1].classList.add('d-none');
        structureAdded = false;
        addStructureBtn.classList.remove('btn-primary');
        addStructureBtn.classList.add('btn-outline-primary');
      }
      saveResourceState(); //Save resource panel status after addtion/deletion structure
      adjustPanelWidth();
    });

    miradorBtn.addEventListener('click', function() {
      if (!miradorAdded) {
        viewsElements[2].classList.remove('d-none');
        miradorAdded = true;
        miradorBtn.classList.remove('btn-outline-primary');
        miradorBtn.classList.add('btn-primary');
        // Force Mirador to recalculate when panel becomes visible
        setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
      } else {
        viewsElements[2].classList.add('d-none');
        miradorAdded = false;
        miradorBtn.classList.remove('btn-primary');
        miradorBtn.classList.add('btn-outline-primary');
      }
      saveResourceState(); //Save resource panel status after addtion/deletion Mirador Viewer
      adjustPanelWidth();
    });

    scribeBtn.addEventListener('click', function() {
      if (!scribeAdded) {
        viewsElements[3].classList.remove('d-none');
        scribeAdded = true;
        scribeBtn.classList.remove('btn-outline-primary');
        scribeBtn.classList.add('btn-primary');
      } else {
        viewsElements[3].classList.add('d-none');
        scribeAdded = false;
        scribeBtn.classList.remove('btn-primary');
        scribeBtn.classList.add('btn-outline-primary');
      }
      saveResourceState(); //Save resource panel status after addtion/deletion structure
      adjustPanelWidth();
    });

    return panel;
}

//Removes a resource from the workspace list, its panel, and its generated modals
function removeListItem(id) {
  $("#resourcesUnorderedList li[for='" + id + "']").remove();
  document.querySelectorAll(`.modal[data-resource-panel="${CSS.escape(id)}"]`)
    .forEach(modal => {
      modal.remove();
    });

  $("[data-ms='" + id + "']").remove();

  adjustPanelWidth();
  saveResourceState();
}




// ========================================================
// CHAPTER AND INTERROGATION NAVIGATION
// ========================================================

//Scrolls to the previous or next chapter within the current transcription column
function navigateChapter(button, direction) {
    const chapterDiv = button.closest('.tei_chapter'); //Find the closest chapter div
    const column = chapterDiv.closest('.transcription-col'); //Find the closest transcription column
    const chapters = column.querySelectorAll('.tei_chapter'); //Select all chapters in the column
    const currentIndex = Array.from(chapters).indexOf(chapterDiv); //Get the current chapter index

    if (direction === 'prev' && currentIndex > 0) { //Scroll to previous chapter
        const prevChapter = chapters[currentIndex - 1];
        column.scrollTo({
            top: prevChapter.offsetTop - 180,
            behavior: 'smooth'
        });
    } else if (direction === 'next' && currentIndex < chapters.length - 1) { //Scroll to next chapter
        const nextChapter = chapters[currentIndex + 1];
        column.scrollTo({
            top: nextChapter.offsetTop - 180,
            behavior: 'smooth'
        });
    }
}

//Scrolls to the previous or next interrogation within the current transcription column
function navigateInterrogation(button, direction) {
    const interrogationDiv = button.closest('.tei_interrogation'); //Find the closest interrogation div
    const column = interrogationDiv.closest('.transcription-col'); //Find the closest transcription column
    const interrogations = column.querySelectorAll('.tei_interrogation'); //Select all interrogation in the column
    const currentIndex = Array.from(interrogations).indexOf(interrogationDiv); //Get the current interrogation index

    if (direction === 'prev' && currentIndex > 0) { //Scroll to previous interrogation
        const prevInterrogation = interrogations[currentIndex - 1];
        column.scrollTo({
            top: prevInterrogation.offsetTop - 180,
            behavior: 'smooth'
        });
    } else if (direction === 'next' && currentIndex < interrogations.length - 1) { //Scroll to next interrogation
        const nextInterrogation = interrogations[currentIndex + 1];
        column.scrollTo({
            top: nextInterrogation.offsetTop - 180,
            behavior: 'smooth'
        });
    }
}

//Copies a direct link to the selected TOC, chapter, or interrogation section
function copySectionLink(button) {
    const section = button.closest('.tei_chapter, .tei_interrogation, .tei_toc');
    const panel = button.closest('.resource-panel-item');

    if (!section || !panel) {
        console.warn('Section or resource panel not found.');
        return;
    }

    const sectionId = section.id;
    const bookId = panel.getAttribute('data-ms');

    if (!sectionId || !bookId) {
        console.warn('Missing section id or book id.');
        return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('add', bookId);
    url.hash = sectionId;

    navigator.clipboard.writeText(url.toString()).then(() => {
        const icon = button.querySelector('i');
        if (!icon) return;

        const oldClass = icon.className;
        icon.className = 'fa-solid fa-check';

        setTimeout(() => {
        icon.className = oldClass;
        }, 2000);
    }).catch(err => {
        console.error('Could not copy section link:', err);
    });
}

//Opens the transcription view when necessary and scrolls from a structure-table link to its chapter
function linkStructureToChapter(link) {
    const targetId = link.getAttribute('data-chapter-id');
    if (!targetId) return;

    const panel = link.closest('.resource-panel-item');
    if (!panel) return;

    const transcriptionCol = panel.querySelector('.transcription-col');
    const transcriptionBtn = panel.querySelector('.add-transcription-btn');

    if (!transcriptionCol) return;

    //If transcription panel is hidden, show it
    if (transcriptionCol.classList.contains('d-none') && transcriptionBtn) {
      transcriptionBtn.click();
    }

    setTimeout(() => {
      const target = panel.querySelector('#' + CSS.escape(targetId));

      if (target) {
        transcriptionCol.scrollTo({
          top: target.offsetTop - 180,
          behavior: 'smooth'
        });
      }
    }, 200);
}

//Extracts the numeric interrogation identifier from an element ID
function getInterrogationNumber(id) {
    let regex = /int-(\d+)/;
    let match = id.match(regex);
    return match ? match[1] : null;
}


// ========================================================
// CHAPTER AND INTERROGATION SYNCHRONIZATION
// ========================================================

//Function to find all corresponding divs based on data-corresp
function findAllCorrespondingDivsFromDataCorresp(div) {
    let correspondingDivs = [];

    //Read data-corresp attribute
    let corresp = div.getAttribute('data-corresp');

    if (corresp) {
        let ids = corresp.split(/\s+/); // Split by space

        ids.forEach(id => {
            let correspondingDiv = document.getElementById(id);
            if (correspondingDiv) {
                correspondingDivs.push(correspondingDiv);
            }
        });
    }
    return correspondingDivs;
}

//Function to find all corresponding divs from all manuscripts for the same interrogation
function findAllCorrespondingDivs(interrogationNumber) {
    //Get all divs with a interrogation in their ID
    let allInterrogations = document.querySelectorAll('[id*="int-"]');
    let correspondingDivs = [];

    allInterrogations.forEach(function (interrogationDiv) {
        //Check if the interrogation number matches
        if (getInterrogationNumber(interrogationDiv.id) === interrogationNumber) {
            correspondingDivs.push(interrogationDiv);
        }
    });
    return correspondingDivs;
}

//Finds the TOC elements of all open witnesses belonging to the specified book
function findTocsForBook(bookN, currentToc = null) {
  const correspondingTocs = [];

  document
    .querySelectorAll('.resource-panel-item')
    .forEach(panel => {
      const panelBookId = panel.getAttribute('data-ms');
      if (!panelBookId) return;

      const panelBookN = panelBookId.split('_')[2];

      if (panelBookN !== bookN) return;

      const toc = panel.querySelector('.tei_toc');

      if (toc && toc !== currentToc) {
        correspondingTocs.push(toc);
      }
    });

  return correspondingTocs;
}

//Aligns the tables of contents of all open witnesses of the same book
async function syncTocs(button) {
  const currentToc = button.closest('.tei_toc');
  const currentPanel = button.closest('.resource-panel-item');

  if (!currentToc || !currentPanel) {
    console.warn('TOC or resource panel not found.');
    return;
  }

  const currentBookId = currentPanel.getAttribute('data-ms');
  if (!currentBookId) return;

  const bookN = currentBookId.split('_')[2];
  if (!bookN) return;

  let correspondingTocs = findTocsForBook(
    bookN,
    currentToc
  );

  //If no other witness is open, load all witnesses of the same book
  if (correspondingTocs.length === 0) {
    await openAllWitnessesForCurrentBook(button);

    correspondingTocs = findTocsForBook(
      bookN,
      currentToc
    );
  }

  scrollToCorrespondingDivs(correspondingTocs);
}

//Aligns all open corresponding chapters and loads missing witnesses when necessary
async function syncChapters(button) {
    const chapterDiv = button.closest('.tei_chapter');
    if (!chapterDiv) {
      console.log('Chapter div not found');
      return;
    }
    let correspondingDivs = findAllCorrespondingDivsFromDataCorresp(chapterDiv);
    if (correspondingDivs.length === 0) {
      await openAllWitnessesForCurrentBook(button);
      correspondingDivs = findAllCorrespondingDivsFromDataCorresp(chapterDiv);
    }
    scrollToCorrespondingDivs(correspondingDivs);
}

//Function to sync interrogations across all manuscripts
async function syncInterrogations(button) {
    const interrogationDiv = button.closest('.tei_interrogation');

    if (!interrogationDiv) {
        console.log('Interrogation div not found');
        return;
    }

    const interrogationNumber = getInterrogationNumber(interrogationDiv.id);

    if (!interrogationNumber) {
        console.log('Interrogation number not found');
        return;
    }

    let correspondingDivs = findAllCorrespondingDivs(interrogationNumber)
        .filter(div => div !== interrogationDiv);

    if (correspondingDivs.length === 0) {
        await openAllWitnessesForCurrentBook(button);

        correspondingDivs = findAllCorrespondingDivs(interrogationNumber)
        .filter(div => div !== interrogationDiv);
    }

    scrollToCorrespondingDivs(correspondingDivs);
}

//if it finds matches that are already open, it aligns them
function scrollToCorrespondingDivs(divs) {
    divs.forEach(div => {
      const scrollContainer = div.closest('.transcription-col');

      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: div.offsetTop - 180,
          behavior: "smooth"
        });
      }
    });
}

//if it finds no matches, it opens all the other witnesses from the same book and it then automatically aligns chapters or interrogations.
async function openAllWitnessesForCurrentBook(button) {
    const panel = button.closest('.resource-panel-item');
    if (!panel) return;

    const bookId = panel.getAttribute('data-ms');
    if (!bookId) return;

    const parts = bookId.split('_');
    const bookN = parts[2];

    const container = document.getElementById('resourcePanel');
    if (!container || !bookN) return;

    const candidates = (window.BDD_MSS || [])
      .filter(m => m.kind === 'core')
      .filter(m => Array.isArray(m.books) && m.books.includes(bookN));

    for (const m of candidates) {
      const msName = m.uiGroup || m.sigle;
      const candidateBookId = `${msName}_${m.sigle}_${bookN}`;

      const existing = container.querySelector(`[data-ms='${candidateBookId}']`);
      if (existing) continue;

      const selectedViews = [true, false, true, false, false];
      await initializeMirador(container, candidateBookId, selectedViews);
    }

    adjustPanelWidth();
    updateWelcomeMessageVisibility();
    toggleTranscriptionButtonVisibility();
}



// ========================================================
// PANEL LAYOUT AND VISIBILITY
// ========================================================

//Adjusts each resource panel width according to the number of visible views
function adjustPanelWidth() {
    const resourcePanel = document.getElementById('resourcePanel');
    if (!resourcePanel) return;

    const panels = resourcePanel.getElementsByClassName('resource-panel-item');
    const totalPanels = panels.length;

    Array.from(panels).forEach(panel => {

      if (panel.classList.contains('panel-expanded')) return;

      panel.classList.remove(
        'only-child',
        'quarter-width',
        'half-width',
        'three-quarter-width',
        'full-width'
      );

      //If only one panel exists, always make it full width
      if (totalPanels === 1) {
        panel.classList.add('full-width');
        return;
      }

      const transcription = panel.querySelector('.transcription-col');
      const structure     = panel.querySelector('.structure-col');
      const mirador       = panel.querySelector('.mirador-col');
      const scribe        = panel.querySelector('.scribe-col');

      const cols = [transcription, structure, mirador, scribe];
      const activeCount = cols.reduce((n, el) => n + (el && !el.classList.contains('d-none') ? 1 : 0), 0);

      if (activeCount <= 1) {
        panel.classList.add('quarter-width');
      } else if (activeCount === 2) {
        panel.classList.add('half-width');
      } else if (activeCount === 3) {
        panel.classList.add('three-quarter-width');
      } else {
        panel.classList.add('full-width');
      }
    });
}

//Shows the welcome message only when the workspace contains no resource panels
function updateWelcomeMessageVisibility() {
  const panel = document.getElementById("resourcePanel");
  const welcome = document.getElementById("welcomeMessage");

  if (!panel || !welcome) return;

  //If no child resource panels exist
  if (panel.children.length === 0) {
    welcome.style.display = "block";
  } else {
    welcome.style.display = "none";
  }
}

//Shows the global transcription display menu only when at least one resource is open
function toggleTranscriptionButtonVisibility() {
    const resourcePanel = document.getElementById('resourcePanel');
    const transcriptionButton = document.getElementById('transcription-view-button');

    if (resourcePanel && resourcePanel.children.length > 0) {
      transcriptionButton.style.display = 'block';
    } else {
      transcriptionButton.style.display = 'none';
    }
}

//Enables line wrapping in all transcription columns for the reading view (lesefassung)
function toggleTextWrap() {
    var transcriptionDivs = document.querySelectorAll('.transcription-col');
    transcriptionDivs.forEach(function(div) {
        div.style.whiteSpace = 'normal';
    });
}

//Disables line wrapping in all transcription columns for the original-layout view
function resetTextWrap() {
    var transcriptionDivs = document.querySelectorAll('.transcription-col');
    transcriptionDivs.forEach(function(div) {
        div.style.whiteSpace = 'nowrap';
    });
}



// ========================================================
// WORKSPACE INFORMATION CONTENT
// ========================================================

$(document).ready(function() {
    loadHTMLDoc("../data/texts/infoButtonsTexts.html"); // Adjust the path here
});

//Loads HTML file
function loadHTMLDoc(filename) {
    $.ajax({
        type: "GET",
        url: filename,
        dataType: "html",
        success: function(html) {
            displayHTMLContent(html);
        },
        error: function(xhr, status, error) {
            console.error("Error loading HTML file:", error);
        }
    });
}

//display HTML content into the corresponding workspace modals
function displayHTMLContent(htmlDoc) {
    let contentDiv = document.createElement('div');
    contentDiv.innerHTML = htmlDoc;

    let contentInfo;
    
    contentInfo = $(contentDiv).find("#infoSchreibtisch");
    $("#infoSchreibtisch").html(contentInfo.html());
    
    /*let contentInfoStyle = $(contentDiv).find("#infoStyleTranscriptions") 
    $("#infoStyleTranscriptions").html(contentInfoStyle.html());*/
    let contentInfoStyle = $(contentDiv).find("#infoStyleTranscriptions");
    $("#infoStyleTranscriptions").html(contentInfoStyle.html());

    const legendContent =
      document.getElementById('infoStyleTranscriptions');

    if (legendContent) {
      addStandardTooltips(legendContent);

      legendContent
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach(el => initTooltip(el));
    }

    let contentInfoDownloadJSON = $(contentDiv).find("#infoDownloadJSON");
    $("#infoDownloadJSON").html(contentInfoDownloadJSON.html());
    checkLanguage();      
}





// ========================================================
// WORKSPACE MODALS
// ========================================================

//Initializes Bootstrap tooltips inside the transcription legend whenever the modal is shown
/*document.getElementById('legendModal').addEventListener('shown.bs.modal', function () {
    this
      .querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach(el => initTooltip(el));
});*/
//Initializes standard and custom Bootstrap tooltips
//inside the transcription legend whenever the modal is shown
document.getElementById('legendModal').addEventListener('shown.bs.modal', function () {
    addStandardTooltips(this);
    this
      .querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach(el => initTooltip(el));
  }
);

//What's on my desk - list of resources
document.getElementById('listResources').addEventListener('click', function() {
    $('#resourcesList').modal('show');
});

//Downloads the current workspace state after confirmation in the JSON information modal
document.getElementById('downloadJsonFromModalBtn').addEventListener('click', function() {
    saveResourceState();
    const resourceState = JSON.parse(localStorage.getItem('resourceState')) || [];
    downloadJson(resourceState);
});
