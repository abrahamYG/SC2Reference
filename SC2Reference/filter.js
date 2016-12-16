$(document).ready(function(){

// NEW selector
jQuery.expr[':'].Contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

// OVERWRITES old selecor
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

function highlight_words(word, element) {
    if(word) {
        var textNodes;
        word = word.replace(/\W/g, '');
        var str = word.split(" ");
        $(str).each(function() {
            var term = this;
            var textNodes = $(element).contents().filter(function() { return this.nodeType === 3 });
            textNodes.each(function() {
              var content = $(this).text();
              var regex = new RegExp(term, "gi");
              content = content.replace(regex, '<span class="highlight">' + term + '</span>');
              $(this).replaceWith(content);
            });
        });
    }
}

function get_filter_from_url(){
	var line = "";
	if(window.location.hash.search("/filter/") > 0) {
		var line = window.location.hash.slice("/filter/".length+1);
	}
	return line;
}

function apply_filter(filtertext) {
	if  (filtertext != "") {
		$('figure').hide();
		$('figure').removeClass('result');
		$("figure a").attr("rel","");
		filtertext.split(",").forEach(function(filter) {
			$( "figcaption:Contains('" + filter + "')" ).closest('figure').show();
			$( "figcaption:Contains('" + filter + "')" ).closest('figure').find('img').addClass('result');
			$('.result').trigger("unveil");
			$( "figcaption:Contains('" + filter + "')" ).closest('figure a').attr("rel","gallery");
			$('figcaption').removeHighlight();
			$('figcaption').highlight(filter);
		});
	}
	else {
		$('figure').show();
		$('figure').removeClass('result');
		$('figcaption').removeHighlight();
		$("figure a").attr("rel","gallery");

	} 
}
window.onpopstate = function(event) {
	var line = "";
	if(event.state) {
		if(typeof event.state.filter !== 'undefined') { line = event.state.filter; }
	}
	else if(history.state) {
		if(typeof history.state.filter !== 'undefined') { line = history.state.filter; }
	}
	else { line = get_filter_from_url(); }
	$('#filter').val(line);
	$('#filter').trigger("search");
};

	$('body').prepend('<div class="filter_block">Filter: <input type="search" id="filter"><button id="searchbtn">search</button><button id="clear">clear</button><div class="links"><a href="cliffs.html" id="cliff_link">Cliffs</a> | <a href="doodads.html" id="doodad_link">Doodads</a> | <a href="tilesets.html" id="tilset_link">Tilesets</a><div class="tip">Tip: You can search for multiple terms by separating each term with a comma (dont use spaces unless deliberate to differentiate, say, "<em>tree</em>" from "s<em>tree</em>t"). For example: "zerg,creep" to search anything that contains either "zerg" or "creep".</div>')
    var location = $(location).attr('href');
    if (location = "http://www.screference.op74.net/Archive/doodads.html" ) {
		$('#doodad_link').addClass('active');
    }
    else if (location = "http://www.screference.op74.net/Archive/clifss.html" ) {
    	$('#cliff_link').addClass('active');
    }
    else {
    	$('#tileset_link').addClass('active');
    }

    $('#filter').on("search", function() {  
	    var line = $('#filter').val()
	    var filterstate = {filter:line};
	    history.pushState(filterstate,"","#/filter/"+line);
	    apply_filter(line);
    	//alert ("ep1 checked");
    });
    
	$('#filter').val( get_filter_from_url() );
	$('#filter').trigger("search");

	$('#searchbtn').click(function() {
		$('#filter').trigger("search");
	});
	$('#clear').click(function() {
		$('figure').show();
		$('figcaption').removeHighlight();
		$('#filter').val("");
		$("figure a").attr("rel","gallery");
	});





});