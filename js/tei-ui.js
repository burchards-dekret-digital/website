// ========================================================
// CONFIGURATION
// ========================================================

//Defines titles and table columns for the Capitula and Corpus structure views
const STRUCTURE_CONFIG = {
  toc: {
    title: 'Capitula',

    columns: [
      {
        de: 'Kapitel nach Handschrift',
        en: 'Chapter after manuscript',
        className: 'chapterNumber'
      },
      {
        de: 'Laufende Nummer',
        en: 'Sequence number',
        className: 'sequenceNumber'
      },
      {
        de: 'Überlieferung',
        en: 'Transmission',
        className: 'transmission'
      },
      {
        de: 'Incipit',
        en: 'Incipit'
      },
      {
        de: 'Hand',
        en: 'Hand'
      }
    ]
  },

  content: {
    title: 'Corpus',

    columns: [
      {
        de: 'Kapitel nach Handschrift',
        en: 'Chapter after manuscript',
        className: 'chapterNumber'
      },
      {
        de: 'Laufende Nummer',
        en: 'Sequence number',
        className: 'sequenceNumber'
      },
      {
        de: 'Überlieferung',
        en: 'Transmission',
        className: 'transmission'
      },
      {
        de: 'Rubrik',
        en: 'Rubric'
      },
      {
        de: 'Inskription',
        en: 'Inscription'
      },
      {
        de: 'Incipit',
        en: 'Incipit'
      },
      {
        de: 'Hand',
        en: 'Hand'
      }
    ]
  }
};

//Defines titles and table columns for the Scribe view
const SCRIBE_CONFIG = {
  info: {
    title: {
      de: 'Schreiber',
      en: 'Scribe'
    }
  },

  hands: {
    title: {
      de: 'Auflistung beteiligte Hände',
      en: 'List of hands involved'
    },

    columns: [
      {
        de: 'Hand',
        en: 'Hand'
      },
      {
        de: 'Schreiber',
        en: 'Scribe'
      },
      {
        de: 'Quelle',
        en: 'Source'
      }
    ]
  }
};

//Provides German and English labels for TEI measure units
const MEASURE_UNITS = {
    days: {
    de: 'Tage',
    en: 'days'
    },
    years: {
    de: 'Jahre',
    en: 'years'
    },
    quadragesimas: {
    de: 'Quadragesimas',
    en: 'quadragesimas'
    }
    
};

//Maps TEI-derived CSS classes to bilingual standard tooltip texts
const STANDARD_TOOLTIPS = {
    'tei_note-contemporary-marginalia': {
    de: 'Zeitgenössische Marginalie.',
    en: 'Contemporary marginalia.'
    },
    'tei_note-later-marginalia': {
    de: 'Spätere Marginalie.',
    en: 'Later marginalia.'
    },
    'tei_note-contemporary-interlinear': {
    de: 'Zeitgenössische Interlinearglosse.',
    en: 'Contemporary interlinear gloss.'
    },
    'tei_note-later-interlinear': {
    de: 'Spätere Interlinearglosse.',
    en: 'Later interlinear gloss.'
    },
    'tei_damage-cut-out': {
    de: 'Beschädigung: ausgeschnitten.',
    en: 'Damage: cut-out.'
    },
    'tei_damage-torn-out': {
    de: 'Beschädigung: herausgerissen.',
    en: 'Damage: torn-out.'
    },
    'tei_damage-burned': {
    de: 'Beschädigung: verbrannt.',
    en: 'Damage: burned.'
    },
    'tei_damage-trimmed': {
    de: 'Beschädigung: beschnitten.',
    en: 'Damage: trimmed.'
    },
    'tei_del-expunctuation': {
    de: 'Expunktion.',
    en: 'Expunctuation.'
    },
    'tei_del-correction': {
    de: 'Korrektur.',
    en: 'Correction.'
    },
    'tei_erasure-visible': {
    de: 'Rasur.',
    en: 'Erasure.'
    }
};

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



// ========================================================
// SHARED DOM HELPERS
// ========================================================

//Creates a document fragment containing German and English language spans
function createLangContent(de, en) {
  const fragment = document.createDocumentFragment();

  const deSpan = document.createElement('span');
  deSpan.lang = 'de';
  deSpan.textContent = de;

  const enSpan = document.createElement('span');
  enSpan.lang = 'en';
  enSpan.textContent = en;

  fragment.append(deSpan, enSpan);

  return fragment;
}



// ========================================================
// TRANSCRIPTION TOOLBARS
// ========================================================

// Creates a reusable Bootstrap toolbar button with icon, bilingual tooltip, and optional action
function createToolbarButton({ classes, title, icon, action }) {
    const button = document.createElement('button');

    button.className = `btn btn-light btn-sm mb-1 me-1 ${classes}`;
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'tooltip');
    button.setAttribute('data-bs-placement', 'top');
    button.setAttribute('data-bs-custom-class', 'custom-tooltip');
    button.setAttribute('data-bs-title', title);

    button.innerHTML = `<i class="${icon}"></i>`;

    if (typeof action === 'function') {
    button.addEventListener('click', function () {
        action(button);
    });
    }

    return button;
}

//Adds the appropriate toolbars to TOC, chapter, and interrogation elements in the transcription
function addTranscriptionToolbars(root = document) {
    addTocToolbar(root);
    addChapterToolbars(root);
    addInterrogationToolbars(root);
}

//Adds Mirador and synchronization buttons to each TABLE OF CONTENTS container (.tei_toc)
function addTocToolbar(root = document) {
    root.querySelectorAll('.tei_toc').forEach(toc => {
    if (toc.querySelector(':scope > .chapter-toolbar')) return;

    const toolbar = document.createElement('div');
    toolbar.className = 'chapter-toolbar toc-toolbar';

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-mirador',
        title: "<span lang='de'>Siehe Capitulatio im Digitalisat</span><span lang='en'>See Capitulatio in the digital copy</span>",
        icon: 'fa-solid fa-eye'
    }));

    toolbar.appendChild(createToolbarButton({
      classes: 'icon-toc-sync',
      title: "<span lang='de'>Inhaltsverzeichnisse aneinander angleichen</span><span lang='en'>Align tables of contents to each other</span>",
      icon: 'fa-solid fa-arrows-left-right',
      action: button => syncTocs(button)
    }));

    toc.prepend(toolbar);
    });
}

//Adds navigation, Mirador, synchronization, and link buttons to CHAPTERS titles
function addChapterToolbars(root = document) {
    root.querySelectorAll('.tei_chapter > .tei_chapter-title').forEach(title => {
    const chapter = title.closest('.tei_chapter');
    if (!chapter || chapter.querySelector(':scope > .chapter-toolbar')) return;

    const toolbar = document.createElement('div');
    toolbar.className = 'chapter-toolbar chapter-main-toolbar';

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-mirador',
        title: "<span lang='de'>Siehe Kapitel im Digitalisat</span><span lang='en'>See chapter in the digital copy</span>",
        icon: 'fa-solid fa-eye'
    }));

    toolbar.appendChild(createToolbarButton({
        classes: 'chapter-nav prev-chapter',
        title: "<span lang='de'>Zum vorherigen Kapitel gehen</span><span lang='en'>Go to the previous chapter</span>",
        icon: 'fa-solid fa-arrow-up-long',
        action: button => navigateChapter(button, 'prev')
    }));

    toolbar.appendChild(createToolbarButton({
        classes: 'chapter-nav next-chapter',
        title: "<span lang='de'>Zum nächsten Kapitel gehen</span><span lang='en'>Go to the next chapter</span>",
        icon: 'fa-solid fa-arrow-down-long',
        action: button => navigateChapter(button, 'next')
    }));

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-sync',
        title: "<span lang='de'>Kapitel aneinander angleichen</span><span lang='en'>Align chapters to each other</span>",
        icon: 'fa-solid fa-arrows-left-right',
        action: button => syncChapters(button)
    }));

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-link',
        title: "<span lang='de'>Link zum Kapitel kopieren</span><span lang='en'>Copy link to this chapter</span>",
        icon: 'fa-solid fa-link',
        action: button => copySectionLink(button)
    }));

    title.before(toolbar);
    });
}

//Adds navigation, Mirador, synchronization, and link buttons to INTERROGATION sections
function addInterrogationToolbars(root = document) {
    root.querySelectorAll('.tei_interrogation').forEach(interrogation => {
    if (interrogation.querySelector(':scope > .chapter-toolbar')) return;

    const title =
        interrogation.querySelector(':scope > .tei_chapter-title') ||
        interrogation.querySelector(':scope > .tei_chapter-number');

    if (!title) return;

    const allInterrogations = Array.from(
        interrogation.closest('.transcription-col')?.querySelectorAll('.tei_interrogation') || []
    );

    const index = allInterrogations.indexOf(interrogation);
    const isFirst = index === 0;

    const toolbar = document.createElement('div');
    toolbar.className = 'chapter-toolbar interrogation-toolbar';

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-mirador',
        title: "<span lang='de'>Siehe Interrogatio im Digitalisat</span><span lang='en'>See interrogation in the digital copy</span>",
        icon: 'fa-solid fa-eye'
    }));

    if (!isFirst) {
        toolbar.appendChild(createToolbarButton({
        classes: 'chapter-nav prev-chapter',
        title: "<span lang='de'>Zur vorherigen Interrogatio gehen</span><span lang='en'>Go to the previous interrogation</span>",
        icon: 'fa-solid fa-arrow-up-long',
        action: button => navigateInterrogation(button, 'prev')
        }));
    }

    toolbar.appendChild(createToolbarButton({
        classes: 'chapter-nav next-chapter',
        title: "<span lang='de'>Zur nächsten Interrogatio gehen</span><span lang='en'>Go to the next interrogation</span>",
        icon: 'fa-solid fa-arrow-down-long',
        action: button => navigateInterrogation(button, 'next')
    }));

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-sync',
        title: "<span lang='de'>Interrogationes aneinander angleichen</span><span lang='en'>Align interrogations to each other</span>",
        icon: 'fa-solid fa-arrows-left-right',
        action: button => syncInterrogations(button)
    }));

    toolbar.appendChild(createToolbarButton({
        classes: 'icon-chapter-link',
        title: "<span lang='de'>Link zur Interrogatio kopieren</span><span lang='en'>Copy link to this interrogation</span>",
        icon: 'fa-solid fa-link',
        action: button => copySectionLink(button)
    }));

    title.before(toolbar);
    });
}



// ========================================================
// HANDSHIFT UI
// ========================================================

//Adds the hand-and-pen icon to TEI handShift elements; scribe information is shown on mouse hover.
function enhanceHandShifts(root = document) {
  root.querySelectorAll('.tei_handShift-wrapper').forEach(handShift => {
    if (handShift.dataset.handShiftUiInitialized === 'true') return;

    handShift.dataset.handShiftUiInitialized = 'true';

    const icon = createHandShiftIcon();
    handShift.prepend(icon);
  });
}

// Creates the hand-and-pen icon used for interactive TEI handShift markers.
function createHandShiftIcon() {
  const icon = document.createElement('span');
  icon.className = 'tei_handShift-icon';

  const image = document.createElement('img');
  image.src = 'https://www.svgrepo.com/show/11315/hand-and-pen.svg';
  image.width = 25;
  image.alt = '';

  icon.appendChild(image);

  return icon;
}


// ========================================================
// STRUCTURE VIEW UI
// ========================================================

/*Simplifies the TEI markup inside clickable chapter and interrogation numbers in the Structure tables.
 Preserved as elements: <num>, <g>, <del>, <add>, <subst>
 Removed completely handShift, abbr.  All other wrappers are removed while their visible content is retained.
 */
function simplifyStructureNumbers(root = document) {
  const numberContainers = root.querySelectorAll(
    '.structure-clickable-number'
  );

  numberContainers.forEach(container => {
    if (
      container.dataset.structureNumberSimplified === 'true'
    ) {
      return;
    }

    /*Remove elements whose complete content should not appear: handShift, abbreviation forms,  unreadable erasures represented by "__"*/
    container
      .querySelectorAll(
        '.tei_handShift-wrapper, .tei_abbr, .tei_erasure-without-substitution'
      )
      .forEach(element => {
        element.remove();
      });

    const descendants = Array.from(
      container.querySelectorAll('*')
    ).reverse();

    descendants.forEach(element => {
      const classes = Array.from(element.classList);

      const shouldPreserve =
        element.classList.contains('tei_num') ||
        element.classList.contains('tei_g') ||
        element.classList.contains('tei_add') ||
        element.classList.contains('tei_subst') ||
        element.classList.contains('tei_del') ||
        classes.some(className =>
          className.startsWith('tei_del-')
        ) ||
        classes.some(className =>
          className.startsWith('tei_erasure-')
        );

      if (shouldPreserve) {
        return;
      }

      /*Remove only the HTML wrapper, not its text or children.*/
      element.replaceWith(...element.childNodes);
    });

    container.dataset.structureNumberSimplified = 'true';
  });
}


//Bootstrap accordions for Capitula and Corpus tables
function buildStructureViews(root = document) {
  root
    .querySelectorAll('#teiStructure')
    .forEach(structure => {
      if (
        structure.querySelector(
          ':scope > #accordionStructure'
        )
      ) {
        return;
      }

      const sources = Array.from(
        structure.querySelectorAll(
          ':scope > .tei-structure-source'
        )
      );

      if (sources.length === 0) {
        return;
      }

      const accordion = document.createElement('div');

      accordion.className =
        'accordion accordion-flush';

      accordion.id = 'accordionStructure';

      sources.forEach(source => {
        const type = source.dataset.structureType;
        const config = STRUCTURE_CONFIG[type];

        if (!config) {
          console.warn(
            'Unknown structure type:',
            type
          );

          return;
        }

        const accordionItem =
          createStructureAccordionItem(
            source,
            config
          );

        accordion.appendChild(accordionItem);
      });

      structure.replaceChildren(accordion);
    });
}

//Creates one Bootstrap accordion item for a Capitula or Corpus structure table
function createStructureAccordionItem(source, config) {
  const type = source.dataset.structureType;
  const msId = source.dataset.msId;
  const bookN = source.dataset.bookN;

  const collapseId =
    `structure-${type}-${msId}-${bookN}`;

  const accordionItem = document.createElement('div');
  accordionItem.className = 'accordion-item';

  const header = document.createElement('h2');
  header.className = 'accordion-header';

  const accordionButton = document.createElement('button');
  accordionButton.className =
    'accordion-button collapsed';

  accordionButton.type = 'button';

  accordionButton.setAttribute(
    'data-bs-toggle',
    'collapse'
  );

  accordionButton.setAttribute(
    'data-bs-target',
    `#${collapseId}`
  );

  accordionButton.setAttribute(
    'aria-expanded',
    'false'
  );

  accordionButton.setAttribute(
    'aria-controls',
    collapseId
  );

  accordionButton.textContent = config.title;

  header.appendChild(accordionButton);

  const collapse = document.createElement('div');
  collapse.id = collapseId;
  collapse.className =
    'accordion-collapse collapse';


  const accordionBody = document.createElement('div');
  accordionBody.className = 'accordion-body';

  const dropdown = createStructureDropdown(
    config.columns
  );

  const tableResponsive = document.createElement('div');
  tableResponsive.className = 'table-responsive';

  const table = source.querySelector(
    ':scope > table'
  );

  if (table) {
    table.prepend(
      createStructureTableHeader(config.columns)
    );

    tableResponsive.appendChild(table);
  }

  accordionBody.append(
    dropdown,
    tableResponsive
  );

  collapse.appendChild(accordionBody);

  accordionItem.append(
    header,
    collapse
  );

  return accordionItem;
}

//Creates the Bootstrap dropdown used to show or hide columns in a structure table
function createStructureDropdown(columns) {
  const dropdown = document.createElement('div');
  dropdown.className =
    'dropdown dropdown-structure';

  const button = document.createElement('button');
  button.className = 'btn btn-secondary btn-sm dropdown-toggle';
  button.type = 'button';
  button.setAttribute('data-bs-toggle', 'dropdown');
  button.setAttribute( 'aria-expanded', 'false');

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-plus-minus';

  button.appendChild(icon);

  const menu = document.createElement('ul');
  menu.className = 'dropdown-menu';

  const title = document.createElement('p');
  title.className = 'ms-3';
  title.style.fontWeight = 'bold';

  title.appendChild(
    createLangContent(
      'Spalten ein-/ausblenden',
      'Show/hide columns'
    )
  );

  menu.appendChild(title);

  columns.forEach((column, index) => {
    menu.appendChild(
      createStructureColumnToggle(
        column,
        index
      )
    );
  });

  dropdown.append(
    button,
    menu
  );

  return dropdown;
}

//Creates one checkbox control for toggling a specific structure table column
function createStructureColumnToggle(column, index) {
  const item = document.createElement('li');

  const label = document.createElement('label');
  label.className = 'dropdown-item';

  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.className =
    'form-check-input toggle-column';

  checkbox.dataset.column = index;
  checkbox.checked = true;

  label.appendChild(checkbox);
  label.append(' ');

  label.appendChild(
    createLangContent(
      column.de,
      column.en
    )
  );

  item.appendChild(label);

  return item;
}

//Builds the bilingual table header for a Capitula or Corpus structure table
function createStructureTableHeader(columns) {
  const thead = document.createElement('thead');
  const row = document.createElement('tr');

  columns.forEach(column => {
    const th = document.createElement('th');

    th.scope = 'col';

    if (column.className) {
      th.className = column.className;
    }

    th.appendChild(
      createLangContent(
        column.de,
        column.en
      )
    );

    row.appendChild(th);
  });

  thead.appendChild(row);

  return thead;
}

//Connects structure column checkboxes to the corresponding table header and data cells
function initStructureColumnToggles(root = document) {
  root
    .querySelectorAll('.dropdown-structure')
    .forEach(dropdown => {
      const checkboxes = dropdown.querySelectorAll(
        '.toggle-column'
      );

      const tableResponsive =
        dropdown.nextElementSibling;

      const table = tableResponsive?.querySelector(
        'table'
      );

      if (!table) {
        return;
      }

      checkboxes.forEach(checkbox => {
        checkbox.addEventListener(
          'change',
          function () {
            const columnIndex = Number.parseInt(
              checkbox.dataset.column,
              10
            );

            const columnNumber = columnIndex + 1;

            const cells = table.querySelectorAll(
              `tr > td:nth-child(${columnNumber}),
               tr > th:nth-child(${columnNumber})`
            );

            cells.forEach(cell => {
              cell.style.display =
                checkbox.checked ? '' : 'none';
            });
          }
        );
      });
    });
}



// ========================================================
// SCRIBE VIEW UI
// ========================================================

//Bootstrap accordion for scribe information and manuscript hands
function buildScribeViews(root = document) {
  root.querySelectorAll('.tei-scribe-source').forEach(source => {
    if (source.dataset.scribeUiInitialized === 'true') return;
    source.dataset.scribeUiInitialized = 'true';

    const accordion = document.createElement('div');
    accordion.className = 'accordion accordion-flush';
    accordion.id = 'accordionScribe';

    source.querySelectorAll(':scope > .tei-scribe-section-source').forEach(section => {
      const type = section.dataset.scribeSection;
      const config = SCRIBE_CONFIG[type];

      if (!config) {
        console.warn('Unknown scribe section:', type);
        return;
      }
      accordion.appendChild(createScribeAccordionItem(section, config));
    });
    source.replaceWith(accordion);
  });
}

//Creates one Bootstrap accordion item for a section of the Scribe view
function createScribeAccordionItem(section, config) {
  const type = section.dataset.scribeSection;
  const source = section.closest('.tei-scribe-source');
  const msId = source?.dataset.msId || '';
  const bookN = source?.dataset.bookN || '';

  const collapseId = `collapse-${type}-${msId}-${bookN}`;
  const headingId = `heading-${type}-${msId}-${bookN}`;

  const accordionItem = document.createElement('div');
  accordionItem.className = 'accordion-item';

  const header = document.createElement('h2');
  header.className = 'accordion-header';
  header.id = headingId;

  const button = document.createElement('button');
  button.className = 'accordion-button collapsed';
  button.type = 'button';
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', `#${collapseId}`);
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', collapseId);
  button.appendChild(createLangContent(config.title.de, config.title.en));

  header.appendChild(button);

  const collapse = document.createElement('div');
  collapse.id = collapseId;
  collapse.className = 'accordion-collapse collapse';
  collapse.setAttribute('aria-labelledby', headingId);

  const body = document.createElement('div');
  body.className = 'accordion-body';

  if (type === 'hands') {
    buildScribeHandsSection(section, body, config);
  } else {
    while (section.firstChild) {
      body.appendChild(section.firstChild);
    }
  }

  collapse.appendChild(body);
  accordionItem.append(header, collapse);

  return accordionItem;
}

//Builds the hands table by adding the column dropdown, bilingual table header, and responsive table wrapper
function buildScribeHandsSection(section, body, config) {
  const table = section.querySelector(':scope > table');

  if (!table) return;

  const dropdown = createScribeColumnDropdown(config.columns);
  const tableResponsive = document.createElement('div');

  tableResponsive.className = 'table-responsive';
  table.prepend(createScribeTableHeader(config.columns));
  tableResponsive.appendChild(table);

  body.append(dropdown, tableResponsive);
}

//Creates the dropdown used to show or hide columns in the manuscript hands table
function createScribeColumnDropdown(columns) {
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown dropdown-scribe';

  const button = document.createElement('button');
  button.className = 'btn btn-secondary btn-sm dropdown-toggle';
  button.type = 'button';
  button.setAttribute('data-bs-toggle', 'dropdown');
  button.setAttribute('aria-expanded', 'false');

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-plus-minus';

  button.appendChild(icon);

  const menu = document.createElement('ul');
  menu.className = 'dropdown-menu';

  const title = document.createElement('p');
  title.className = 'ms-3';
  title.style.fontWeight = 'bold';
  title.appendChild(createLangContent('Spalten ein-/ausblenden', 'Show/hide columns'));

  menu.appendChild(title);

  columns.forEach((column, index) => {
    menu.appendChild(createScribeColumnToggle(column, index));
  });

  dropdown.append(button, menu);

  return dropdown;
}

//Creates one checkbox control for toggling a column in the manuscript hands table
function createScribeColumnToggle(column, index) {
  const item = document.createElement('li');

  const label = document.createElement('label');
  label.className = 'dropdown-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-check-input toggle-scribe-column';
  checkbox.dataset.column = index;
  checkbox.checked = true;

  label.appendChild(checkbox);
  label.append(' ');
  label.appendChild(createLangContent(column.de, column.en));

  item.appendChild(label);

  return item;
}

//Builds the bilingual table header for the manuscript hands table
function createScribeTableHeader(columns) {
  const thead = document.createElement('thead');
  const row = document.createElement('tr');

  columns.forEach(column => {
    const th = document.createElement('th');
    th.appendChild(createLangContent(column.de, column.en));
    row.appendChild(th);
  });

  thead.appendChild(row);

  return thead;
}

//Connects the Scribe view column checkboxes to the corresponding hands table cells.
function initScribeColumnToggles(root = document) {
  root.querySelectorAll('.dropdown-scribe').forEach(dropdown => {
    const checkboxes = dropdown.querySelectorAll('.toggle-scribe-column');
    const tableResponsive = dropdown.nextElementSibling;
    const table = tableResponsive?.querySelector('table');

    if (!table) return;

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const columnIndex = Number.parseInt(checkbox.dataset.column, 10);
        const columnNumber = columnIndex + 1;
        const cells = table.querySelectorAll(`tr > td:nth-child(${columnNumber}), tr > th:nth-child(${columnNumber})`);

        cells.forEach(cell => {
          cell.style.display = checkbox.checked ? '' : 'none';
        });
      });
    });
  });
}



// ========================================================
// INFO / EDITOR UI
// ========================================================

// editorial information UI
function buildInfoViews(root = document) {
  root.querySelectorAll('.tei-info-source').forEach(source => {
    if (source.dataset.infoUiInitialized === 'true') return;

    source.dataset.infoUiInitialized = 'true';

    const editor = document.createElement('div');
    editor.id = 'teiEditor';
    editor.className = 'editor';

    const publicationSource = source.querySelector(':scope > .tei-info-publication-source');

    if (publicationSource) {
      editor.appendChild(createPublicationInfo(publicationSource));
    }

    source.querySelectorAll(':scope > .tei-info-editor-source').forEach(editorSource => {
      editor.appendChild(createEditorInfo(editorSource));
    });

    source.replaceWith(editor);
  });
}

// Creates the bilingual publication date paragraph from XSL-generated publication data.
function createPublicationInfo(source) {
  const paragraph = document.createElement('p');

  source.querySelectorAll('[data-publication-date]').forEach(dateSource => {
    const lang = dateSource.lang;
    const date = dateSource.dataset.publicationDate;

    const span = document.createElement('span');
    span.lang = lang;

    const strong = document.createElement('strong');
    strong.textContent = lang === 'de' ? 'Publiziert am ' : 'Date of publication: ';

    span.append(strong, date);
    paragraph.appendChild(span);
  });

  return paragraph;
}

// Creates one editor block with person, affiliation, and a list of bilingual responsibilities
function createEditorInfo(source) {
  const fragment = document.createDocumentFragment();
  const personSource = source.querySelector(':scope > .tei-info-editor-person');

  if (!personSource) return fragment;

  const person = personSource.querySelector('.tei-info-editor-link, .tei-info-editor-name');
  const affiliation = personSource.querySelector('.tei-info-editor-affiliation');

  if (person) {
    fragment.appendChild(person);
  }

  if (affiliation?.textContent.trim()) {
    fragment.append(`, ${affiliation.textContent.trim()}:`);
  } else {
    fragment.append(':');
  }

  const list = document.createElement('ul');
  const responsibilities = source.querySelectorAll(':scope > .tei-info-responsibilities-source > .tei-info-responsibility-source');

  responsibilities.forEach(responsibility => {
    const item = document.createElement('li');

    while (responsibility.firstChild) {
      item.appendChild(responsibility.firstChild);
    }

    list.appendChild(item);
  });

  fragment.appendChild(list);

  return fragment;
}

// ========================================================
// TEI TABLE UI
// ========================================================

//Enhances TEI tree-of-consanguinity (Book 7) tables with a fullscreen modal and a display button
function enhanceTreeTables(root = document) {
  root
    .querySelectorAll('.tei-table-tree-source')
    .forEach(source => {
      if (source.dataset.treeUiInitialized === 'true') {
        return;
      }

      source.dataset.treeUiInitialized = 'true';

      const table = source.querySelector(
        ':scope > .table-tree-of-consanguinity'
      );

      if (!table) {
        return;
      }

      const modal = createTreeTableModal(
        source,
        table
      );

      const panel = source.closest(
        '.resource-panel-item'
      );

      if (panel) {
        modal.dataset.resourcePanel =
          panel.getAttribute('data-ms') || '';
      }

      const button = createTreeTableModalButton(
        modal.id
      );

      source.appendChild(button);

      document.body.appendChild(modal);
    });
}

//Creates a fullscreen Bootstrap modal containing a cloned tree-of-consanguinity table
function createTreeTableModal(source, sourceTable) {
  const msId = source.dataset.msId;
  const bookN = source.dataset.bookN;

  const modalId =
    `tree-of-consanguinity-${msId}-${bookN}`;

  const labelId =
    `${modalId}-label`;

  const modal = document.createElement('div');

  modal.className = 'modal fade';

  const scribeClass = Array
    .from(source.classList)
    .find(className =>
      className.startsWith('ms_scribe-')
    );

  if (scribeClass) {
    modal.classList.add(scribeClass);
  }

  modal.id = modalId;
  modal.tabIndex = -1;

  modal.setAttribute(
    'aria-labelledby',
    labelId
  );

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog modal-fullscreen';

  const content = document.createElement('div');
  content.className = 'modal-content';

  const header = document.createElement('div');
  header.className = 'modal-header';

  const title = document.createElement('h1');
  title.className = 'modal-title fs-5';
  title.id = labelId;

  title.appendChild(
    createLangContent(
      'Arbor sanguinitates',
      'Arbor sanguinitates'
    )
  );

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';

  closeButton.setAttribute(
    'data-bs-dismiss',
    'modal'
  );

  closeButton.setAttribute(
    'aria-label',
    'Close'
  );

  header.append(
    title,
    closeButton
  );

  const body = document.createElement('div');
  body.className = 'modal-body';

  const modalTable = sourceTable.cloneNode(true);

  modalTable.classList.remove(
    'table-tree-of-consanguinity'
  );

  modalTable.classList.add(
    'modal-table-tree-of-consanguinity'
  );

  body.appendChild(modalTable);

  const footer = document.createElement('div');
  footer.className = 'modal-footer';

  const footerCloseButton =
    document.createElement('button');

  footerCloseButton.type = 'button';

  footerCloseButton.className =
    'btn btn-secondary';

  footerCloseButton.setAttribute(
    'data-bs-dismiss',
    'modal'
  );

  footerCloseButton.appendChild(
    createLangContent(
      'Schließen',
      'Close'
    )
  );

  footer.appendChild(footerCloseButton);

  content.append(
    header,
    body,
    footer
  );

  dialog.appendChild(content);
  modal.appendChild(dialog);

  return modal;
}

//Creates the button that opens the fullscreen tree-of-consanguinity modal.
function createTreeTableModalButton(modalId) {
  const button = document.createElement('button');

  button.type = 'button';

  button.className =
    'btn btn-primary btn-sm button-show-tree';

  button.setAttribute(
    'data-bs-toggle',
    'modal'
  );

  button.setAttribute(
    'data-bs-target',
    `#${modalId}`
  );

  button.appendChild(
    createLangContent(
      'Element größer anzeigen',
      'Display element larger'
    )
  );

  return button;
}

// ========================================================
// TEI AND UI TOOLTIPS
// ========================================================

//Returns the localized label for a TEI measure unit, falling back to the original unit value
function translateMeasureUnit(unit, lang) {
    return MEASURE_UNITS[unit]?.[lang] || unit;
}

//Creates Bootstrap tooltips for TEI num elements using their normalized numeric value

function addNumberTooltips(root = document) {
  root.querySelectorAll('.tei_num[data-value]').forEach(num => {
    // Do not create number tooltips inside the Structure table links
    if (num.closest('.structure-clickable-number')) {
      return;
    }

    const value = num.dataset.value;
    if (!value) return;

    num.setAttribute('data-bs-toggle', 'tooltip');
    num.setAttribute('data-bs-title', value);

    initTooltip(num);
  });
}

//Creates bilingual tooltips for TEI measure elements such as penance duration and fines
function addMeasureTooltips(root = document) {
    root.querySelectorAll('.tei_measure').forEach(el => {
    const type = el.getAttribute('type');
    const quantity = el.getAttribute('quantity');
    const unit = el.getAttribute('unit');

    if (!type || !quantity || !unit) return;
    let labelDe = '';
    let labelEn = '';
    if (type === 'duration-of-penance') {
        labelDe = 'Dauer der Buße';
        labelEn = 'Duration of penance';
    } else if (type === 'fine') {
        labelDe = 'Bußgeld';
        labelEn = 'Fine';
    } else {
        return;
    }
    const unitDe = translateMeasureUnit(unit, 'de');
    const unitEn = translateMeasureUnit(unit, 'en');

    el.setAttribute('data-bs-toggle', 'tooltip');
    el.setAttribute('data-bs-html', 'true');
    el.setAttribute(
        'data-bs-title',
        `<span lang='de'>${labelDe}: ${quantity} ${unitDe}.</span><span lang='en'>${labelEn}: ${quantity} ${unitEn}.</span>`
    );
    initTooltip(el);
    });
}

//Adds predefined bilingual tooltips to TEI elements identified by STANDARD_TOOLTIPS CSS classes
function addStandardTooltips(root = document) {
    Object.entries(STANDARD_TOOLTIPS).forEach(([className, text]) => {
    root.querySelectorAll('.' + className).forEach(el => {
        el.setAttribute('data-bs-toggle', 'tooltip');
        el.setAttribute('data-bs-html', 'true');
        el.setAttribute(
        'data-bs-title',
        `<span lang="de">${text.de}</span><span lang="en">${text.en}</span>`
        );
        initTooltip(el);
    });
    });
}

//Initializes one Bootstrap tooltip and filters its bilingual content to the currently selected language 
function initTooltip(el, options = {}) {
let tip = bootstrap.Tooltip.getInstance(el);

if (!tip) {
    tip = new bootstrap.Tooltip(el, {
    html: true,
    trigger: 'hover focus',
    ...options
    });
}

if (el.dataset.tooltipInitialized === 'true') {
    return;
}

el.dataset.tooltipInitialized = 'true';

// Filter language when tooltip opens
el.addEventListener('show.bs.tooltip', () => {
    const raw =
    el.getAttribute('data-bs-title') ||
    el.getAttribute('title') ||
    '';

    const currentLang =
    localStorage.getItem('selectedLanguage') || 'en';

    const temp = document.createElement('div');
    temp.innerHTML = raw;

    temp.querySelectorAll('span[lang]').forEach(span => {
    if (span.getAttribute('lang') !== currentLang) {
        span.remove();
    }
    });

    tip.setContent({
    '.tooltip-inner': temp.innerHTML
    });
});

// Hide tooltip when clicking the element
el.addEventListener('click', () => {
    tip.hide();
    el.blur();
});
}



// ========================================================
// TOC INTERACTIONS
// ========================================================

//Makes TEI TOC items clickable while ignoring clicks on nested links, buttons, tooltips, and popovers
function addTocItemListeners(root = document) {
    root.querySelectorAll('.tei_toc li[data-sameas]').forEach(item => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', function (event) {
        // Do not jump to the chapter when clicking editorial popovers/tooltips inside the item
        if (
        event.target.closest('[data-bs-toggle="popover"]') ||
        event.target.closest('[data-bs-toggle="tooltip"]') ||
        event.target.closest('a, button')
        ) {
        return;
        }

        linkTocToChapter(item);
    });
    });
}



// ========================================================
// TEI TEXT DISPLAY
// ========================================================

//Scroll from TOC item to corresponding chapter using data-sameas
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

//Hides all elements carrying the specified CSS class
function hideElement(className) {
    var all = document.getElementsByClassName(className);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}

//Shows all elements carrying the specified CSS class as inline elements
function showElement(className) {
    var all = document.getElementsByClassName(className);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'inline';
    }
}

//Highlights transcription text according to the associated manuscript scribe
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
      // Do not apply scribe highlighting to UI elements or popover content
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.matches(
          '.chapter-toolbar, ' +
          '.tei-popover-content, ' +
          '.popover, ' +
          '.popover-body, ' +
          '.tei_note-editorial-comment-icon, ' +
          '.tei_note-editorial-comment-mirador-icon'
        )
      ) {
        return;
      }

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
  /*function removeScribeBgClasses(selectors) {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        [...el.classList].forEach((cls) => {
          if (/^scribe\d+-bg$/.test(cls)) el.classList.remove(cls);
        });
      });
    });
  }*/

    function removeScribeBgClasses(selectors) {
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((container) => {
          // Clean both the selected element and all its descendants
          const elements = [
            container,
            ...container.querySelectorAll('*')
          ];

          elements.forEach((el) => {
            [...el.classList].forEach((cls) => {
              if (/^scribe\d+-bg$/.test(cls)) {
                el.classList.remove(cls);
              }
            });

            el.classList.remove('scribe-unidentified-bg');
          });
        });
      });
    }

  removeScribeBgClasses([
    '.chapter-toolbar',
    '.tei-popover-content',
    '.popover',
    '.taxonomy-icon',
    '.tei_note-editorial-comment-mirador-icon',
    '.tei_note-editorial-comment-icon',
    '.tei_pb',
    '.tei_cb',
    '.tei_handShift-wrapper',
    '.ms_hand-name'
  ]);
}

//Removes all scribe highlighting classes from the transcription
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

//Styles the text range between a TEI delSpan and its corresponding anchor
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

        // Do not apply style to handShift info
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('ms_hand-name')) {
          return;
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

//Styles the text range between a TEI addSpan and its corresponding anchor
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
        
        // Do not apply style to handShift info
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('ms_hand-name')) {
          return;
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



// ========================================================
// TAXONOMY VISUALIZATION
// ========================================================

//Adds taxonomy icons and bilingual tooltips to elements carrying BDD taxonomy classes
function addTaxonomyIcon(root = document) {
  const elements = root.querySelectorAll('[class*="bdd-"]');

  elements.forEach(el => {
    if (el.querySelector(':scope > .taxonomy-icon')) return;

    const bddClasses = Array.from(el.classList)
      .filter(className => className.startsWith('bdd-'));

    if (bddClasses.length === 0) return;

    const icon = document.createElement('span');
    icon.className = 'taxonomy-icon';
    icon.innerHTML = '<i class="fa-solid fa-tag fa-lg"></i>';
    icon.setAttribute('data-bs-toggle', 'tooltip');
    icon.setAttribute('data-bs-html', 'true');
    icon.setAttribute(
      'data-bs-title',
      `<ul><li>${
        bddClasses
          .map(className => bddDescriptions[className] || className)
          .join('</li><li>')
      }</li></ul>`
    );

    icon.addEventListener('mouseover', () => {
      el.style.backgroundColor = '#bfe2fe';
    });

    icon.addEventListener('mouseout', () => {
      el.style.backgroundColor = '';
    });

    if (el.tagName === 'DIV') {
      const heading = el.querySelector(':scope > h5');

      if (heading) {
        heading.appendChild(icon);
      } else {
        el.appendChild(icon);
      }
    } else if (el.tagName === 'BR') {
      el.before(icon);
    } else {
      el.appendChild(icon);
    }

    initTooltip(icon);
  });
}



// ========================================================
// TEI UI INITIALIZATION
// ========================================================

//Initializes all JavaScript-enhanced UI components for HTML generated from the TEI transformation
function initializeTeiUI(root = document) {
  addTeiSectionSpacing(root);
  addTranscriptionToolbars(root);

  root.querySelectorAll('.chapter-toolbar [data-bs-toggle="tooltip"]').forEach(el => initTooltip(el));

  simplifyStructureNumbers(root);
  addNumberTooltips(root);
  addMeasureTooltips(root);
  addStandardTooltips(root);
  addTocItemListeners(root);
  enhanceHandShifts(root);

  addTaxonomyIcon(root);
  underlineDelSpanAndAnchor(root);
  addSpanAndAnchor(root);

  enhanceTreeTables(root);

  buildStructureViews(root);
  initStructureColumnToggles(root);

  buildScribeViews(root);
  initScribeColumnToggles(root);

  buildInfoViews(root);

  initPopovers(root);
}


// ========================================================
// EDITORIAL UI
// ========================================================

//Creates the clickable information icon used as the Bootstrap popover trigger for an editorial comment
function createEditorialPopoverTrigger(note) {
  const trigger = document.createElement('span');
  const isMiradorComment = note.classList.contains('tei_note-editorial-comment-mirador');

  trigger.className = isMiradorComment ? 'tei_note-editorial-comment-mirador-icon' : 'tei_note-editorial-comment-icon';
  trigger.tabIndex = 0;
  trigger.setAttribute('data-bs-toggle', 'popover');

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-circle-info';

  trigger.appendChild(icon);
  return trigger;
}

//Initializes bilingual Bootstrap popovers for TEI editorial comments
// Enhances XSL-generated editorial comment containers with Bootstrap popover triggers and bilingual content
function initPopovers(root = document) {
  root.querySelectorAll('.tei_note-editorial-comment').forEach(note => {
    if (note.dataset.popoverInitialized === 'true') return;

    const content = note.querySelector(':scope > .tei-popover-content');
    if (!content) return;

    const trigger = createEditorialPopoverTrigger(note);
    note.prepend(trigger);
    note.dataset.popoverInitialized = 'true';

    new bootstrap.Popover(trigger, {
      container: 'body',
      html: true,
      sanitize: false,
      placement: 'auto',
      trigger: 'click',
      content: () => {
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        return filterLangSpans(content.innerHTML, currentLang);
      }
    });
  });
}

//Closes open editorial popovers when the user clicks outside a popover or its trigger.
document.addEventListener('click', (e) => {
  //If click is on a popover trigger or inside the popover itself, do nothing
  const clickedTrigger = e.target.closest('[data-bs-toggle="popover"]');
  const clickedInsidePopover = e.target.closest('.popover');

  if (clickedTrigger || clickedInsidePopover) return;

  //Otherwise hide all open popovers
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => {
    const inst = bootstrap.Popover.getInstance(el);
    if (inst) inst.hide();
  });
});



// ========================================================
// TEI LAYOUT
// ========================================================
//Adds Bootstrap top spacing to the main TEI transcription sections
function addTeiSectionSpacing(root = document) {
  root
    .querySelectorAll(
      '.tei_chapter, .tei_interrogation, .tei_paratext'
    )
    .forEach(section => {
      section.classList.add('mt-4');
    });
}