

$(function() {

	$.ajax({
		url: "parts/top-menu-items.html",
		success: function (data) { $('#top-menu').append(makePretty(data)); },
		dataType: 'html'
	});

	$.ajax({
		url: "parts/main-content.html",
		success: function (data) { $('#main-content').append(makePretty(data)); },
		dataType: 'html'
	});
	
	function makePretty(html) {
		var tree = $("<div>" + html + "</div>");
	
		tree.find("stamp").each(function() {
				$(this).replaceWith(getHtml($(this).text()));
		});

		return tree;
	}

	function getHtml(foo) { 
		var labelType = 'label-info';
		
		if(foo == 'GitHub') {
			labelType = 'label-primary';
		} else if(foo == 'book') {
			labelType = 'label-success';
		} else if(foo == 'PDF') {
			labelType = 'label-info';
		} else if(foo == 'TODO') {
			labelType = 'label-danger';
		}
		
		return('<span class="label ' + labelType + '">' + foo + '</span>'); 
	}

});