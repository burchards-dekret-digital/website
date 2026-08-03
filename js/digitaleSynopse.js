






/*function openHandShiftInMirador(targetId, sigla) {
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

*/









  

  
  



/*
function copyCitation(id) {
  var citation = document.getElementById(id).innerText;
  var buttonElement = event.target; // Get the button that was clicked
  var originalText = buttonElement.innerText.trim(); // Store the original text of the button

  // Write text to clipboard
  navigator.clipboard.writeText(citation).then(function() {
      // Change button text based on its current language
      if (originalText === "Kopieren") {
          buttonElement.innerText = "Kopiert"; // Change to "Kopiert" for German
      } else {
          buttonElement.innerText = "Copied"; // Change to "Copied" for English
      }

      // After 2 seconds, revert back to original button text
      setTimeout(function() {
          buttonElement.innerText = originalText;
      }, 2000);
  }, function(err) {
      console.error('Could not copy text: ', err);
  });
}
*/



  

  