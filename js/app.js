(function (global, $) {
  "use strict";

  var slideButton = {

    getActiveButton: function () {
      return $('.active');
    },

    getActiveButtonClassAsString: function () {
      return $('.active').attr('class').split(' ')[1];
    },

    getMenuBlock: function () {
      return $('.menu');
    },

    getButtonClass: function () {
      return $('.btn');
    },

    getButtonWidth: function () {
      return this.getActiveButton().outerWidth();
    },

    getCoordinateOfParentBlock: function () {
      return this.getMenuBlock().position().left;
    },

    getCoordinateOfActiveButton: function () {
      return this.getActiveButton().position().left - this.getCoordinateOfParentBlock();
    },

    setActiveButtonBlock: function () {
      var that = this;

      $('.active-button-block').css({
        'left': that.getCoordinateOfActiveButton() + that.getButtonWidth(),
        'margin-left': -that.getButtonWidth(),
        'width': that.getButtonWidth()
      });
    },

    removeActiveClass: function (htmlClass, activeButtonClass) {
      $(htmlClass).removeClass(activeButtonClass);
    },

    addActiveClass: function (htmlClass, activeButtonClass) {
      $(htmlClass).addClass(activeButtonClass);
    },

    changeActiveButtonOnClick: function (htmlClass, activeButtonClass) {
      var that = this;

      $(htmlClass).on('click', function () {
        that.removeActiveClass(htmlClass, activeButtonClass);
        that.addActiveClass($(this), activeButtonClass);
        that.setActiveButtonBlock();
      });
    }
  };

  slideButton.setActiveButtonBlock();
  slideButton.changeActiveButtonOnClick(slideButton.getButtonClass(), slideButton.getActiveButtonClassAsString());
}(window, jQuery));
