

$(function() {

	$.ajax({
		url: "parts/top-menu-items.html",
		success: function (data) { $('#top-menu').append(data); },
		dataType: 'html'
	});

	$.ajax({
		url: "parts/main-content.html",
		success: function (data) { $('#main-content').append(data); },
		dataType: 'html'
	});

});