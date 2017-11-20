function openModal(e, modal_id, options) {
	var defaults = {
		top : 100,
		overlay : 0.5,
		closeButton : null
	};
	var overlay = $("<div id='modal_overlay' style='position: fixed; z-index: 10000; top: 0px; left: 0px; height:100%; width:100%; background: #000; display: none;'></div>");
	$("body").append(overlay);
	var o = $.extend(defaults, options);
	$("#modal_overlay").click(function() {
		_closeModal(modal_id);
	});

	$(o.closeButton).click(function() {
		_closeModal(modal_id);
	});

	var modal_height = $(modal_id).outerHeight();
	var modal_width = $(modal_id).outerWidth();

	$("#modal_overlay").css({
		"display" : "block",
		opacity : 0
	});

	$("#modal_overlay").fadeTo(200, o.overlay);

	$(modal_id).css({
		"display" : "block",
		"position" : "fixed",
		"opacity" : 0,
		"z-index" : 11000,
		"left" : 50 + "%",
		"margin-left" : -(modal_width / 2) + "px",
		"top" : o.top + "px"
	});

	$(modal_id).fadeTo(200, 1);
	if(e && e.preventDefault){
		e.preventDefault();
	}
}

function _closeModal(modal_id) {
	$("#modal_overlay").fadeOut(200,
		function (){
			$("#modal_overlay").remove();
		}
	);
	$(modal_id).css({
		"display" : "none"
	})
}