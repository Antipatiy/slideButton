(function (global, $) {
  "use strict";

  var slideButton = {

    // Get elements ------------------------------------------------------------------------------

    $getActiveButton: function () {
      return $('.active');
    },

    $getActiveButtonVirtualBlock: function () {
      return $('.active-button-block');
    },

    $getMenuContainer: function () {
      return $('.menu-container');
    },

    $getButton: function () {
      return $('.btn');
    },

    $getMenuWrapper: function () {
      return $('.menu-wrapper');
    },

    // End get elements ------------------------------------------------------------------------------

    // Get elements characteristics ------------------------------------------------------------------------------

    getActiveButtonClassAsString: function () {
      return this.$getActiveButton().attr('class').split(' ')[1];
    },

    getButtonWidth: function () {
      return this.$getActiveButton().outerWidth();
    },

    getArrOfButtonWidth: function (activeClass) {
      var arr = [];

      if (arguments.length === 0) {
        this.$getButton().each(function () {
          arr.push($(this).outerWidth());
        });
        return arr;
      }
      else {
        this.$getButton().each(function () {
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
      return this.$getActiveButton().outerHeight();
    },

    getCoordinateOfParentBlock: function () {
      return this.$getMenuContainer().position().left;
    },

    getCoordinateOfParentBlockByOffset: function () {
      return this.$getMenuContainer().offset().left;
    },

    getCoordinateOfMenuWrapper: function () {
      return this.$getMenuWrapper().offset().left;
    },
    //
    // getCoordinateOfActiveButton: function () {
    //   return this.$getActiveButton().position().left - this.getCoordinateOfParentBlock();
    // },

    getCenterOfMenuWrapperAtDocument: function () {
      return this.$getMenuWrapper().width() * 0.5 + this.getCoordinateOfMenuWrapper();
    },

    getCenterOfMenuWrapper: function () {
      return this.$getMenuWrapper().width() * 0.5;
    },

    getCenterOfActiveButton: function () {
      return this.getButtonWidth() * 0.5;
    },

    getWidthOfButtonsOnLeftSideOfActive: function () {
      var activeClass = this.getActiveButtonClassAsString(),
          arrOfButtonWidth = this.getArrOfButtonWidth(activeClass);
      
      return this.getWidthOfMenuContainer(arrOfButtonWidth);
    },

    // End get elements characteristics ------------------------------------------------------------------------------

    // Set elements characteristics ------------------------------------------------------------------------------

    setWidthOfMenuContainer: function () {
      var that = this,
          arrOfButtonWidth = that.getArrOfButtonWidth();

      this.$getMenuContainer().css({
        'width': that.getWidthOfMenuContainer(arrOfButtonWidth)
      })
    },

    setActiveButtonBlock: function () {
      $('<div class="active-button-block"></div>').insertBefore('.btn:first-child');
    },

    setPropertiesOfActiveButtonBlock: function () {
      var that = this;

      this.$getActiveButtonVirtualBlock().css({
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

        that.getCoordinateOfParentBlock();

        that.removeActiveClass(htmlClass, activeButtonClass);
        that.addActiveClass($(this), activeButtonClass);
        that.setToCenterActiveButton();
        that.setPropertiesOfActiveButtonBlock();
      });
    },

    stopButtonSliding: function () {
      if (this.getWidthOfButtonsOnLeftSideOfActive() + this.getCenterOfActiveButton() < this.getCenterOfMenuWrapper()) {

      }
    },

    setToCenterActiveButton: function () {
      var that = this;

      if (this.getWidthOfButtonsOnLeftSideOfActive() + this.getCenterOfActiveButton() < this.getCenterOfMenuWrapper() && this.getCoordinateOfParentBlockByOffset() === this.getCoordinateOfMenuWrapper()) {

        that.getCoordinateOfParentBlockByOffset();
        that.getCoordinateOfMenuWrapper();

        return false;
      }
      else {
        this.$getMenuContainer().offset({
          'left': that.getCenterOfMenuWrapperAtDocument() -
          that.getWidthOfButtonsOnLeftSideOfActive() -
          that.getCenterOfActiveButton()
        });
      }
    }
    // End set elements characteristics ------------------------------------------------------------------------------
  };

  slideButton.setWidthOfMenuContainer();
  slideButton.changeActiveButtonOnClick(slideButton.$getButton(), slideButton.getActiveButtonClassAsString());
  slideButton.setToCenterActiveButton();
  slideButton.setActiveButtonBlock();
  slideButton.setPropertiesOfActiveButtonBlock();
}(window, jQuery));































