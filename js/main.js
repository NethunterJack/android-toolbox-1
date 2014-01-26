$(function() {
	
	$.ajax({
		url: "parts/top-menu.html",
		success: function (data) { 
			$('#top-menu').append(data); 
			menuPrepare();
		},
		dataType: 'html'
	});

	showLinks();
	
	Handlebars.registerHelper('link', function(url, text) {
	  text = Handlebars.Utils.escapeExpression(text);
	  url  = Handlebars.Utils.escapeExpression(url);
	  var result = '<a href="' + url + '">' + text + '</a>';
	  return new Handlebars.SafeString(result);
	});
	
	Handlebars.registerHelper('gravatar', function(hash) {
	  var size = 80;
	  var url = 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
	  var result = '<img src="' + url + '"/>';
	  return new Handlebars.SafeString(result);
	});
	
	function showLinks() {
		$.ajax({
			url: "parts/link-list-template.html",
			success: function (data) { 
				var source = data;
				var template = Handlebars.compile(source);
				$('#main-content').empty();
				renderLinks(template);
			},
			dataType: 'html'
		});
	}
	
	function showContribute() {
		$.ajax({
			url: "parts/contribute.html",
			success: function (data) { 
				
				var source = data;
				var template = Handlebars.compile(source);
				$('#main-content').empty();
				renderContributors(template);
			},
			dataType: 'html'
		});
	}
	
	function menuPrepare() {
		$("#home_frame").click(function(event){
			event.preventDefault();
			showLinks();
		});
	
		$("#contribute_frame").click(function(event){
			event.preventDefault();
			showContribute();
		});
	}
	
	function renderContributors(template) {
		$.ajax({
			url: "content/contributors.json",
			success: function (data) { 
				var context = data;
				var html = template(context);
				$('#main-content').append(html); 
			},
			dataType: 'json'
		});
	}
	
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