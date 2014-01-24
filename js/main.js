$(function() {

	$.ajax({
		url: "parts/top-menu.html",
		success: function (data) { $('#top-menu').append(data); },
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

});