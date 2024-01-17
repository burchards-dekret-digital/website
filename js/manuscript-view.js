//jquery
/*$( document ).ready(function() {
    $(".load_transcription").on("click",function() {
        ms = new URLSearchParams(window.location.search).get('document').replace(".xml", "");
        book = $(this).attr( "for" )
        $('#transcription_container_'+book).html('<div class="spinner-border m-auto" role="status"><span class="visually-hidden">Loading...</span></div>')
        $.ajax({
            url: 'https://burchard.adwmainz.net/exist/rest/db/apps/bdd/modules/viewSingleMS.xql?ms=' + ms + '&book=' + book,
            dataType: 'html',
            type: 'GET',
            success: (data) => {
                $('#transcription_container_'+book).html(data);
            },
            
            error: (jqHXR, errorMessage, error) => {
            }
        });
    })
});*/



$( document ).ready(function() {
//listener: when the value changes, it activates and takes the selected value in the selector and adds a loading sign (spinner)
    $('#book-selector').on('change', function() {
       ms = new URLSearchParams(window.location.search).get('document').replace(".xml", "");
        book = $(this).val()
        $('#container-tabs').html(
                    `<ul class="nav nav-tabs" id="mySecondTab" role="tablist"> \
                        <li class="nav-item" role="presentation"> \
                            <button class="nav-link active" id="text-tab" data-bs-toggle="tab" data-bs-target="#text" href="#text" type="button" role="tab" aria-controls="text" aria-selected="true">Text</button> \
                        </li> \
                        <li class="nav-item" role="presentation"> \
                            <button class="nav-link" id="structure-capitulatio-tab" data-bs-toggle="tab" data-bs-target="#structure-capitulatio" href="#structure-capitulatio" type="button" role="tab" aria-controls="structure-capitulatio" aria-selected="false">Struktur Capitulatio</button> \
                        </li> \
                        <li class="nav-item" role="presentation"> \
                            <button class="nav-link" id="structure-kanones-tab" data-bs-toggle="tab" data-bs-target="#structure-kanones" href="#structure-kanones" type="button" role="tab" aria-controls="structure-kanones" aria-selected="false">Struktur Kanones</button> \
                        </li> \
                        <li class="nav-item" role="presentation"> \
                            <button class="nav-link" id="editing-tab" data-bs-toggle="tab" data-bs-target="#editing" href="#editing" type="button" role="tab" aria-controls="editing" aria-selected="false">Bearbeitung</button> \
                        </li> \
                        <li class="nav-item" role="presentation"> \
                            <button class="nav-link" id="scribes-tab" data-bs-toggle="tab" data-bs-target="#scribes" href="#scribes" type="button" role="tab" aria-controls="scribes" aria-selected="false">Schreiber</button> \
                        </li> \
                    </ul> \
                    <div class="tab-content" id="mySecondTabContent"> \
                        <div class="tab-pane fade show active" id="text" role="tabpanel" aria-labelledby="text-tab"> \
                            <div class="container" style="margin-top:25px;">\
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Transkription</button>\
                                    <ul class="dropdown-menu">\
                                        <li><a href="#" class="dropdown-item" onclick="highlightElement('tei_expan', 'rgb(253, 234, 229)')">Aufgelöste Abkürzungen hervorheben</a></li>\
                                        <li><a href="#" class="dropdown-item" onclick="showElement('tei_expan');hideElement('tei_abbr')">Aufgelöste Abkürzungen anzeigen</a></li>\
                                        <li><a href="#" class="dropdown-item" onclick="showElement('tei_abbr');hideElement('tei_expan')">Abkürzungen anzeigen</a></li>\
                                        <li><a href="#" class="dropdown-item" id="diplomatic" onclick="showElement('tei_lb')">Original Zeilenumbruch</a></li>\
                                        <li><a href="#" class="dropdown-item" id="flowing" onclick="hideElement('tei_lb')">Fließtext</a></li>\
                                        <li><a href="#" class="dropdown-item" onclick="highlightElement(className, color)">Korrekturen hervorheben</a></li>\
                                        <li><a href="#" class="dropdown-item" onclick="showScribes()">Schreiber anzeigen</a></li>\
                                        <li><a href="#" class="dropdown-item" onclick="hideScribes()">Schreiber ausblenden</a></li>\
                                    </ul>\
                            </div>\
                            <div class="container" id="container-transcription"> \
                            </div> \
                        </div> \
                        <div class="tab-pane fade" id="structure-capitulatio" role="tabpanel" aria-labelledby="structure-capitulatio-tab"> \
                            <div class="container-fluid"> \
                                <div class="row"> \
                                    <div class="col-md-3 container" id="container-filter-capitulatio"> \
                                    </div> \
                                    <div class="col-md-9 container" id="container-structure-capitulatio"> \
                                    </div> \
                                </div> \
                             </div> \
                        </div> \
                        <div class="tab-pane fade" id="structure-kanones" role="tabpanel" aria-labelledby="structure-kanones-tab"> \
                            <div class="container-fluid"> \
                                <div class="row"> \
                                    <div class="col-md-3 container" id="container-filter-kanones"> \
                                    </div> \
                                    <div class="col-md-9 container" id="container-structure-kanones"> \
                                    </div> \
                                </div> \
                             </div> \
                        </div> \
                        <div class="tab-pane fade" id="editing" role="tabpanel" aria-labelledby="editing-tab"> \
                            <div class="container"> \
                                <p></p> \
                            </div> \
                        </div> \
                        <div class="tab-pane fade" id="scribes" role="tabpanel" aria-labelledby="scribes-tab"> \
                            <div class="container"> \
                                <p></p> \
                            </div> \
                        </div> \
                    </div>`
                )
                $('#container-transcription').html('<div class="spinner-border text-secondary" role="status" style="margin-top:15px; margin-left:50%;"><span class="visually-hidden">Loading...</span></div>')


// it retrives the data of transcription based on the value of ms + book number
        $.ajax({
            url: 'https://burchard.adwmainz.net/exist/rest/db/apps/bdd/modules/viewSingleMS.xql?ms=' + ms + '&book=' + book,
            dataType: 'html',
            type: 'GET',
            success: (data) => {
                 $('#container-transcription').html(data);
            },
            
            error: (jqHXR, errorMessage, error) => {
            }
        })

// Table Capitulatio
        $('#container-structure-capitulatio').html('<div class="spinner-border text-secondary" role="status" style="margin-top:15px; margin-left:30%;"><span class="visually-hidden">Loading...</span></div>')
        $.ajax({
            url: 'https://burchard.adwmainz.net/exist/rest/db/apps/bdd/modules/viewSingleMsStructureCapitulatio.xql?ms=' + ms + '&book=' + book,
            dataType: 'html',
            type: 'GET',
            success: (data_structure) => {
                $('#container-structure-capitulatio').html(data_structure);
                $('#container-filter-capitulatio').prepend('<div id="capitulatio_filter_container" class="sticky-top mt-5 p-3 container-filters" style="background-color:#e7f1ff;"></div>')

                tag_array = $("#table-capitulatio tr").map(function() { return this.getAttribute('class') || null }).get();
                unique_tag = []
                counter = {}
                for (t in tag_array){
                    keys = tag_array[t].split(" ")
                    for (k in keys){
                        if( !(unique_tag.includes(keys[k]))){
                            counter[keys[k]]=1
                            unique_tag.push(keys[k])
                        }
                        else{
                            counter[keys[k]]+=1
                        }
                    }
                }
                 $("#capitulatio_filter_container").append('<div class="form-check">' +
                 //'<i class="fa-solid fa-circle-info" style="color:#0d6efd;"></i>'+
                 //'<p style="font-size:11.5px">Heben Sie die Markierung von Elementen auf, um sie aus der Tabelle auszublenden. Wählen Sie sie erneut aus, um sie wieder anzuzeigen.</p>'+
                 '<i class="fa-solid fa-circle-info fa-xl mt-3" style="color: #4586f7;" data-bs-toggle="tooltip" data-bs-placement="right" id="info-icon-capitulatio" data-bs-title="Heben Sie die Markierung von Elementen auf, um sie aus der Tabelle auszublenden. Wählen Sie sie erneut aus, um sie wieder anzuzeigen."></i>'+
                 '<div class="d-grid gap-2 mt-4 mb-5">'+
                 '<button class="btn btn-primary btn-sm" id="capitulatio_select_all">Alles auswählen</button>' +
                 '<button class="btn btn-primary btn-sm" id="capitulatio_deselect_all">Alle abwählen</button>' +
                 '</div>'+
                 '<div id="capitulatio_filter_box"><div>')
                 
                 $('#info-icon-capitulatio').tooltip()
                  
                for (tag in unique_tag){             
                       $("#capitulatio_filter_box").append('<div class="form-check">' +
                       '<input class="form-check-input" type="checkbox" name="'+ unique_tag[tag] +'" value="1" checked>' +
                       '<label class="form-check-label">'+
                       unique_tag[tag]+
                        '</label></div>')
                }
                
                 $("#capitulatio_filter_container input[type=checkbox]").on("change",function() {
                      unsel_tags =  Array.from($("#capitulatio_filter_container input[type=checkbox]:not(:checked)")).map(input => input.getAttribute('name'))
                      if(unsel_tags.length) {
                        selector = "#table-capitulatio tr." + unsel_tags.join(", #table-capitulatio tr.")
                        $("#table-capitulatio tr").removeClass("d-none")
                        $(selector).addClass("d-none")
                       }
                       else{
                        $("#table-capitulatio tr").removeClass("d-none")
                       }               
                  });
                  $("#capitulatio_deselect_all").click(function(){
                     $("#capitulatio_filter_box input[type=checkbox]").prop("checked", false);
                     $("#capitulatio_filter_box input[type=checkbox]").trigger("change");
                 })
                 $("#capitulatio_select_all").click(function(){
                     $("#capitulatio_filter_box input[type=checkbox]").prop("checked", true); 
                     $("#capitulatio_filter_box input[type=checkbox]").trigger("change");
                 })
            },
            
            error: (jqHXR, errorMessage, error) => {
            }
        })

// Table Kanones
        $('#container-structure-kanones').html('<div class="spinner-border text-secondary" role="status" style="margin-top:15px; margin-left:30%;"><span class="visually-hidden">Loading...</span></div>')
        $.ajax({
            url: 'https://burchard.adwmainz.net/exist/rest/db/apps/bdd/modules/viewSingleMsStructureKanones.xql?ms=' + ms + '&book=' + book,
            dataType: 'html',
            type: 'GET',
            success: (data_structure) => {
                $('#container-structure-kanones').html(data_structure);
                $('#container-filter-kanones').prepend('<div id="kanones_filter_container" class="sticky-top mt-5 p-3 container-filters" style="background-color:#e7f1ff;"></div>')

                tag_array = $("#table-kanones tr").map(function() { return this.getAttribute('class') || null }).get();
                unique_tag = []
                counter = {}
                for (t in tag_array){
                    keys = tag_array[t].split(" ")
                    for (k in keys){
                        if( !(unique_tag.includes(keys[k]))){
                            counter[keys[k]]=1
                            unique_tag.push(keys[k])
                        }
                        else{
                            counter[keys[k]]+=1
                        }
                    }
                }
                
                $("#kanones_filter_container").append('<div class="form-check">' +
                 //'<i class="fa-solid fa-circle-info" style="color:#0d6efd;"></i>'+
                 //'<p style="font-size:11.5px">Heben Sie die Markierung von Elementen auf, um sie aus der Tabelle auszublenden. Wählen Sie sie erneut aus, um sie wieder anzuzeigen.</p>'+
                 '<i class="fa-solid fa-circle-info fa-xl mt-3" style="color: #4586f7;" data-bs-toggle="tooltip" id="info-icon-kanones" data-bs-placement="right" data-bs-title="Heben Sie die Markierung von Elementen auf, um sie aus der Tabelle auszublenden. Wählen Sie sie erneut aus, um sie wieder anzuzeigen."></i>'+
                 '<div class="d-grid gap-2 mt-4 mb-5">'+
                 '<button class="btn btn-primary btn-sm" id="kanones_select_all">Alles auswählen</button>' +
                 '<button class="btn btn-primary btn-sm" id="kanones_deselect_all">Alle abwählen</button>' +
                 '</div>'+
                 '<div id="kanones_filter_box"><div>')
                 
                 $('#info-icon-kanones').tooltip()
                 
                for (tag in unique_tag){
                    $("#kanones_filter_box").append('<div class="form-check">' +
                       '<input class="form-check-input" type="checkbox" name="'+ unique_tag[tag] +'" value="1" checked>' +
                       '<label class="form-check-label">'+
                       unique_tag[tag]+
                        '</label></div>')
                }
                
                 $("#kanones_filter_container input[type=checkbox]").on("change",function() {
                      unsel_tags =  Array.from($("#kanones_filter_container input[type=checkbox]:not(:checked)")).map(input => input.getAttribute('name'))
                      if(unsel_tags.length) {
                        selector = "#table-kanones tr." + unsel_tags.join(", #table-kanones tr.")
                        $("#table-kanones tr").removeClass("d-none")
                        $(selector).addClass("d-none")
                       }
                       else{
                        $("#table-kanones tr").removeClass("d-none")
                       }             
                  });
                  
                  $("#kanones_deselect_all").click(function(){
                     $("#kanones_filter_box input[type=checkbox]").prop("checked", false);
                     $("#kanones_filter_box input[type=checkbox]").trigger("change");
                 })
                 $("#kanones_select_all").click(function(){
                     $("#kanones_filter_box input[type=checkbox]").prop("checked", true); 
                     $("#kanones_filter_box input[type=checkbox]").trigger("change");
                 })
            },
            
            error: (jqHXR, errorMessage, error) => {
            }
        })
    });    
})

