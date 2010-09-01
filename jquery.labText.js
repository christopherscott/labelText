/*
copyright (c) 2010 Christopher Scott Hernandez
Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

defTextFancy v0.1.3
a jQuery plugin to populate fields with default text

http://christopher-scott.com
	
*/

// create a no-conflict scope
(function($) {
	
	// extend the jQuery object
	$.fn.labText = function(options) {
		
		// set up some reasonable defaults
		options = $.extend({
			inSpeed : 200,
			outSpeed : 200,
			opacity: .4,
			labelClass : '',
			fieldClass : ''
		}, options);
		
		// return "this" to make it chainable
		// using $.each() for implied iteration
		return this.each(function() {
						
			var $label = $(this),
				name = $(this).attr("for"),
				$field = $('[id=' + name + ']'),
				type = $field.get(0).type,
				padtop = parseInt($field.css("paddingTop"), 10) + parseInt($field.css("borderTopWidth"), 10),
				padleft = parseInt($field.css("paddingLeft"), 10) + parseInt($field.css("borderLeftWidth"), 10);

			if ($field.length <= 0) return;			

			if (type != "text" && type != "textarea" && type != "password") {
				return
			}
					
			// position the labels, grab the field posiiton
			$label.css({'position' : 'absolute'});
			var offset = $field.position();
			
			// move labels to correct position
			$label.css({
				'left' : offset.left,
				'top' : offset.top,
				'padding-left' : parseInt(padleft + 0) + "px",
				'padding-right' : padleft,
				'padding-top' : padtop,
				'padding-bottom' : padtop,
				'line-height' : $field.css('line-height'),
				'font-family' : $field.css('font-family'),
				'font-size' : $field.css('font-size')
			});
						
			if (options.labelClass) {
				$label.addClass(options.labelClass);
			}
			
			if (options.fieldClass) {
				$field.addClass(options.fieldClass);
			}

			// compensating for values that might already be present like after a refresh
			if ($field.val()) {
				$label.css({ "opacity" : "0" });
			}

			// event handlers for focus, blur, and keypress
			$field.focus(function() {
				if ( $.trim($field.val()) === '' ) {
					$label.animate({ "opacity" : options.opacity }, options.outSpeed);
				}
			}).blur(function() {
				if ( $.trim($field.val()) === '' ) {
					$label.animate({ "opacity" : "1" }, options.inSpeed);
				}
			}).keypress(function() {
				$label.animate({ "opacity" : "0"}, options.outSpeed);
			});	

		});

	};

})(jQuery);