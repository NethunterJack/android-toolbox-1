$(function() {

	$.ajax({
		url: "parts/top-menu.html",
		success: function (data) { $('#top-menu').append(makePretty(data)); },
		dataType: 'html'
	});

	
	$.ajax({
		url: "parts/link-list-template.html",
		success: function (data) { 
			var source = data;
			var template = Handlebars.compile(source);
			renderLinks(template);
		},
		dataType: 'html'
	});
	
	Handlebars.registerHelper('link', function(url, text) {
	  text = Handlebars.Utils.escapeExpression(text);
	  url  = Handlebars.Utils.escapeExpression(url);

	  var result = '<a href="' + url + '">' + text + '</a>';

	  return new Handlebars.SafeString(result);
	});
	
	
	function renderLinks(template) {
		$.ajax({
			url: "content/links.json",
			success: function (data) { 
				var context = data;
				var html = template(context);
				$('#main-content').append(html); 
			},
			dataType: 'json'
		});
	}
	
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