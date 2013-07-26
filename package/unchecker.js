/**
 * Uncheck all checkboxes in specified form.
 * @param {Object} form object contains checkboxs.
 */
function uncheckAll( f ){	
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
 * Execute uncheck.
 */
var len = document.forms.length;
var i;
for (i=0; i<len; i++){
	uncheckAll(document.forms[i]);
}

