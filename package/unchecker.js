
/**
 * Uncheck all checkboxes in specified form.
 * @param {Object} form object contains checkboxs.
 */
function uncheckAll( f ){	
  //console.log('uncheckAll');

	var len = f.elements.length;
	var i;
	var e;
	for (i=0; i<len; i++){
		e = f.elements[i];
		if (e.type == "checkbox"){
			e.checked = false;
		}
	}
}

/**
 * Execute uncheckAll if the url is target.
 */
chrome.runtime.sendMessage({action: "IsTarget"}, function(response) {
  //console.log(response.result);

  if (response.result === true) {
    var len = document.forms.length;
    var i;
    for (i=0; i<len; i++){
    	uncheckAll(document.forms[i]);
    }
  }
  
});

