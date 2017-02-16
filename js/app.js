(function (global, $) {
  "use strict";

  var slideButton = {

    // Get elements ------------------------------------------------------------------------------

    getActiveButton: function () {
      return $('.active');
    },

    getActiveButtonBlock: function () {
      return $('.active-button-block');
    },

    getMenuContainer: function () {
      return $('.menu-container');
    },

    getButtonClass: function () {
      return $('.btn');
    },

    getMenuWrapper: function () {
      return $('.menu-wrapper');
    },

    // End get elements ------------------------------------------------------------------------------

    // Get elements characteristics ------------------------------------------------------------------------------

    getActiveButtonClassAsString: function () {
      return this.getActiveButton().attr('class').split(' ')[1];
    },

    getButtonWidth: function () {
      return this.getActiveButton().outerWidth();
    },

    getArrOfButtonWidth: function (activeClass) {
      var arr = [];

      if (arguments.length === 0) {
        this.getButtonClass().each(function () {
          arr.push($(this).outerWidth());
        });
        return arr;
      }
      else {
        this.getButtonClass().each(function () {
          if ($(this).hasClass(activeClass)) {
            return false;
          }
          else {
            arr.push($(this).outerWidth());
          }
        });
        return arr;
      }
    },

    getWidthOfMenuContainer: function (arrOfButtonWidth) {
      var widthOfMenuContainer = 0;

      arrOfButtonWidth.forEach(function (item) {
        widthOfMenuContainer += item;
      });

      return widthOfMenuContainer;
    },

    getButtonHeight: function () {
      return this.getActiveButton().outerHeight();
    },

    getCoordinateOfParentBlock: function () {
      return this.getMenuContainer().position().left;
    },

    getCoordinateOfActiveButton: function () {
      return this.getActiveButton().position().left - this.getCoordinateOfParentBlock();
    },

    getCenterOfMenuWrapper: function () {
      return this.getMenuWrapper().width() * 0.5 + this.getMenuWrapper().offset().left;
    },

    getCenterOfActiveButton: function () {
      return this.getButtonWidth() * 0.5;
    },

    getWidthOfButtonsOnLeftSideOfActive: function () {
      return this.getWidthOfMenuContainer(this.getArrOfButtonWidth(this.getActiveButtonClassAsString()));
    },

    // End get elements characteristics ------------------------------------------------------------------------------

    // Set elements characteristics ------------------------------------------------------------------------------

    setWidthOfMenuContainer: function () {
      var that = this;

      this.getMenuContainer().css({
        'width': that.getWidthOfMenuContainer(that.getArrOfButtonWidth())
      })
    },

    setActiveButtonBlock: function () {
      var that = this;

      this.getActiveButtonBlock().css({
        'left': that.getWidthOfButtonsOnLeftSideOfActive() + that.getButtonWidth(),
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
        that.setToCenterActiveButton();
        that.setActiveButtonBlock();
      });
    },

    setToCenterActiveButton: function () {
      var that = this;

      this.getMenuContainer().offset({
        'left': that.getCenterOfMenuWrapper() - that.getWidthOfButtonsOnLeftSideOfActive() - that.getCenterOfActiveButton()
      });
    }
    // End set elements characteristics ------------------------------------------------------------------------------
  };

  slideButton.setWidthOfMenuContainer();
  slideButton.changeActiveButtonOnClick(slideButton.getButtonClass(), slideButton.getActiveButtonClassAsString());
  slideButton.setToCenterActiveButton();
  slideButton.setActiveButtonBlock();
}(window, jQuery));
































