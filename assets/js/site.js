$(document).ready(function() {
	$('body.portfolio #content > ul > li[id]').each(function() {
		$('a[rel*="lightbox"]', this).colorbox({
			      rel: $(this).attr('id'),
			 maxWidth: '95%',
			maxHeight: '90%',
			    fixed: true,
		});
	});
});
