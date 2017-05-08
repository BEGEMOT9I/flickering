function Slider(obj) {
  this.element = document.querySelector(obj.selector + ' .carousel__slider');
  this.sliderPosition = 0;
  this.slideWidth = this.element.querySelector('.slider__item').offsetWidth;
  this.length = this.element.querySelectorAll('.slider__item').length;
  this.showSlides = 4;
  this.isTablet = window.matchMedia('screen and (max-width: 855px)').matches;
  this.LCM = this.showSlides * this.length * (this.length - this.showSlides + 1)
  
  if (obj.interval) {
    this.interval = setInterval(this.toRight.bind(this), obj.interval);
  }

  // Bind slider buttons
  document.querySelector(obj.selector + ' .btn_right').addEventListener('click', this.toRight.bind(this, true));
  document.querySelector(obj.selector + ' .btn_left').addEventListener('click', this.toLeft.bind(this, true));

  window.addEventListener('resize', this.resize.bind(this));
  window.addEventListener('orientationchange', this.resize.bind(this));
}

Slider.prototype.toRight = function(event, userClick) {
  if (userClick && this.interval) {
    clearInterval(this.interval);
  }

  this.sliderPosition = (this.sliderPosition + 1) % this.LCM;
  this.switchSlide();
}

Slider.prototype.toLeft = function(event, userClick) {
  if (userClick && this.interval) {
    clearInterval(this.interval);
  }

  this.sliderPosition = (this.LCM + this.sliderPosition - 1) % this.LCM;
  this.switchSlide();
}

Slider.prototype.switchSlide = function() {
  var slide = this.sliderPosition % this.length;

  var offsetRight = -this.slideWidth * slide;
  var marginOffset = 2 * slide * 16; // 16 == 1rem
  var transformString = "translate3d(" + (offsetRight - marginOffset) + "px, 0, 0)";

  this.element.style.transform = transformString;
  this.element.style.MozTransform = transformString;
  this.element.style.msTransform = transformString;
  this.element.style.OTransform = transformString;
  this.element.style.webkitTransform = transformString;
}

Slider.prototype.resize = function() {
  this.isTablet = window.matchMedia('screen and (max-width: 855px)').matches;
  this.slideWidth = this.element.querySelector('.slider__item').offsetWidth;
  this.switchSlide();
}

document.addEventListener("DOMContentLoaded", function() {
  var slider = new Slider({ selector: '.section_plan' });
});