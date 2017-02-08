(function(global, $) {
  "use strict";

  var slideButton = {

    getButtonWidth: function() {
      return $('.active').outerWidth();
    },

    getCoordinateOfParrentBlock: function() {
      return $('.menu').position().left;
    },

    getCoordinateOfActiveButton: function() {
      return $('.active').position().left - this.getCoordinateOfParrentBlock();
    },

    setActiveButtonBlock: function() {
      var that = this;

      $('.active-button-block').css({
        'left': that.getCoordinateOfActiveButton() + that.getButtonWidth(),
        'margin-left': -that.getButtonWidth(),
        'width': that.getButtonWidth(),
      });
    },

    removeActiveClass: function() {
      $('.menu a').removeClass('active');
    },

    addActiveClass: function(obj) {
      $(obj).addClass('active');
    },

    changeActiveButtonOnClick: function() {
      var that = this;

      $('.btn').on('click', function() {
        that.removeActiveClass();
        that.addActiveClass($(this));
        that.setActiveButtonBlock();
      });
    }
  };

  slideButton.setActiveButtonBlock();
  slideButton.changeActiveButtonOnClick();
}(window, jQuery));
