$(document).ready(function(){

	$(document).on("click", ".test-start", function() {
		localStorage.setItem('currQuest', 0);
		localStorage.removeItem('timeLast');
	});

	$(document).on("input", ".term-search", function() {
		var search = $(this).val().toLowerCase();

		$.each($(".term-title"), function(key, value) {
			var val = $(value).text().toLowerCase();
			if (!val.match("^"+search)) {
				$(value).hide();
				$(value).next("p").hide();
			}
			else {
				$(value).show();
				$(value).next("p").show();				
			}
		});

		if ($(".term-title:visible").length == 0) $(".not-found").show();
		else $(".not-found").hide();
	});

});