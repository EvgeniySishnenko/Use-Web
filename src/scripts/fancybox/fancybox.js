
function fancybox () {
    $("a.group").fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
        'overlayShow'	:	true,
        'width'         :   750,
        'height'         :  430
	});

	$("a.fncb").fancybox({
		'transitionIn': 'elastic',
		'transitionOut': 'elastic',
		'speedIn': 600,
		'speedOut': 200,
		'overlayShow': true,
		'width': 1200
	});
}
module.exports = fancybox;