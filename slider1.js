;(function() {
	'use strict';

	function Slider(options) {
		var className = 'slider';
		var duration = 2000;
		
		if (options && options.className) {
			className = options.className;
		}
		/*for(var i=0)
		var totalParent = document.getElementsByClassName(className)[i].value;
		console.log(totalParent);*/
		
		var animator = new Animator();
		var sliderElement = document.getElementsByClassName(className)[0];
		var totalSlides = sliderElement.children[0].childElementCount;
		var indexHolder = sliderElement.children[1];
		console.log(indexHolder);
		var slides = sliderElement.children[0].children;
		var slidesHolder = sliderElement.children[0];
		var currentPosition = 0;
		var slideWidth = 960;

		
		var btnNext = document.createElement('a');
		btnNext.innerHTML = '>';
		btnNext.setAttribute('class','btnNext');
		btnNext.setAttribute('href', '#');
		btnNext.onclick = next;
		btnNext.onmouseover = function(){btnNext.style.opacity = '1'};
		btnNext.onmouseout = function(){btnNext.style.opacity = '0.3'};
		
		
		var btnPrev= document.createElement('a');
		btnPrev.setAttribute('class','btnPrev');
		btnPrev.innerHTML = '<';
		btnPrev.setAttribute('href', '#');
		btnPrev.onclick = prev;
		btnPrev.onmouseover = function(){btnPrev.style.opacity = '1'};
		btnPrev.onmouseout = function(){btnPrev.style.opacity = '0.3'};

		var selectorIndex;
		for(var i=0;i<totalSlides;i++){
			console.log('here');
			 
			selectorIndex = document.createElement('button');
			selectorIndex.innerHTML = i+1;
			selectorIndex.setAttribute('id','btnSelector' + i);
			selectorIndex.style.marginRight = '5px';
			indexHolder.appendChild(selectorIndex);
			console.log('yes');
			selectorIndex.onclick = function(){
				var index = i;
				return function(){
					currentPosition = index;
					console.log(currentPosition);
					var ml = currentPosition * slideWidth * -1;
					animator.animate(slidesHolder, {marginLeft: ml}, 3000);
				}
			}();
			
		}
		
		sliderElement.appendChild(btnPrev);
		sliderElement.appendChild(btnNext);
		
		function next() {
			//currentPosition--;
			currentPosition = currentPosition -1;
			console.log(currentPosition);
			if (currentPosition <0 ) {
				currentPosition = totalSlides - 1;
			}
			var ml = currentPosition * slideWidth * -1;
			
			console.log(currentPosition, ml);
			animator.animate(slidesHolder, {marginLeft: ml}, duration);
			// autoAnimate = setInterval(autoAnimate,3000);
		};
		
		function prev() {
			currentPosition++;
			if (currentPosition >= totalSlides) {
				currentPosition = 0;
			}
			var ml = currentPosition * slideWidth * -1;
			
			console.log(currentPosition, ml);
			animator.animate(slidesHolder, {marginLeft: ml}, duration);
			// autoAnimate = setInterval(autoAnimate,3000);
		};

		var autoAnimate = function(){
			console.log('animating');

			if (currentPosition < totalSlides-1) {
				console.log(currentPosition + 'there');
				currentPosition++;
			}
			else if(currentPosition === totalSlides-1){
				currentPosition = 0;
				console.log(currentPosition + 'elseif');
			}
			var ml = currentPosition * slideWidth * -1;
			
			console.log(currentPosition, ml);
			animator.animate(slidesHolder, {marginLeft: ml}, duration);
		};

		console.log('auto');
		;(function(){
		console.log('auto');
		var autoAnimated = setInterval(autoAnimate,3000);
		sliderElement.onmouseout = function(){autoAnimated = setInterval(autoAnimate,3000); console.log('start auto slide');};
		sliderElement.onmouseover = function(){clearInterval(autoAnimated); console.log('cancel auto slide');};
		})();
		
	};
	
		function Animator() {
			var fps = 50;
			
			this.animate = function(element, props, duration) {
				var intervalDuration = duration/fps;
				var initialPosition = element.style.marginLeft=='' ? 0 : parseInt(element.style.marginLeft);
				
				var endPosition = props.marginLeft;
				var difference = endPosition - initialPosition;
				var counter = 0;
				

				var interval = setInterval(function() {
					counter++;
					var step = difference / intervalDuration;
					var noOfIteration = duration/fps;
					var current = initialPosition + (step * counter);
					if(counter>=noOfIteration){
						clearInterval(interval);
						current = endPosition;
					}
				
				element.style.marginLeft = current + 'px';
			}, intervalDuration);
		};
	}
	
	window.Slider = Slider;
	window.Slider = Slider1;
})();