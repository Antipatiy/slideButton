(function (global, $) {
  "use strict";

  var slideButton = {

    getActiveButton: function () {
      return $('.active');
    },

    getActiveButtonBlock: function () {
      return $('.active-button-block');
    },

    getActiveButtonClassAsString: function () {
      return this.getActiveButton().attr('class').split(' ')[1];
    },

    getMenuBlock: function () {
      return $('.menu-container');
    },

    getButtonClass: function () {
      return $('.btn');
    },

    getButtonWidth: function () {
      return this.getActiveButton().outerWidth();
    },

    getArrOfButtonWidth: function () {
      var arr = [];

      this.getButtonClass().each(function () {
        arr.push($(this).outerWidth());
      });

      return arr;
    },

    getWidthOfMenuContainer: function (arrOfButtonWidth) {
      var widthOfMenuContainer = 0;

      arrOfButtonWidth.forEach(function (item) {
        widthOfMenuContainer += item;
      });

      return widthOfMenuContainer;
    },

    setWidthOfMenuContainer: function () {
      var that = this;

      this.getMenuBlock().css({
        'width': that.getWidthOfMenuContainer(that.getArrOfButtonWidth())
      })
    },

    getButtonHeight: function () {
      return this.getActiveButton().outerHeight();
    },

    getCoordinateOfParentBlock: function () {
      return this.getMenuBlock().position().left;
    },

    getCoordinateOfActiveButton: function () {
      return this.getActiveButton().position().left - this.getCoordinateOfParentBlock();
    },

    setActiveButtonBlock: function () {
      var that = this;

      this.getActiveButtonBlock().css({
        'left': that.getCoordinateOfActiveButton() + that.getButtonWidth(),
        'margin-left': -that.getButtonWidth(),
        'width': that.getButtonWidth(),
        'height': that.getButtonHeight()
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

  slideButton.setWidthOfMenuContainer();
  slideButton.setActiveButtonBlock();
  slideButton.changeActiveButtonOnClick(slideButton.getButtonClass(), slideButton.getActiveButtonClassAsString());
}(window, jQuery));
