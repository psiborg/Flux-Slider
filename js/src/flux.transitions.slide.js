flux.transitions.slide = function(fluxslider, opts) {
	return new flux.transition(fluxslider, $.extend({
		direction: 'left',
		setup: function() {
			var width = this.slider.image1.width(),
				height = this.slider.image1.height(),
				
			currentImage = $('<div class="current"></div>').css({
				height: height+'px',
				width: width+'px',
				position: 'absolute',
				top: '0px',
				left: '0px',
				background: this.slider[this.options.direction == 'left' ? 'image1' : 'image2'].css('background-image')	
			}),

			nextImage = $('<div class="next"></div>').css({
				height: height+'px',
				width: width+'px',
				position: 'absolute',
				top: '0px',
				left: width+'px',
				background: this.slider[this.options.direction == 'left' ? 'image2' : 'image1'].css('background-image')
			});
			
			this.slideContainer = $('<div class="slide"></div>').css({
				width: (2*width)+'px',
				height: height+'px',
				position: 'relative',
				left: this.options.direction == 'left' ? '0px' : -width+'px'
			}).css3({
				'transition-duration': '600ms',
				'transition-timing-function': 'ease-in',
				'transition-property': 'all'
			});
			
			this.slideContainer.append(currentImage).append(nextImage);

			this.slider.image1.append(this.slideContainer);
		},
		execute: function() {
			var _this = this,
				delta = this.slider.image1.width();
			
			if(this.options.direction == 'left')
				delta = -delta;
			
			this.slideContainer.css3({
				'transform' : flux.browser.translate(delta)
			}).transitionEnd(function(){
				_this.finished();
			});
		}
	}, opts));	
}