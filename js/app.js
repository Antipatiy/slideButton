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

    // Get elements characteristics ------------------------------------------------------------------------------

    getActiveButtonClassAsString: function () {
      return this.$getActiveButton().attr('class').split(' ')[1];
    },

    getActiveButtonWidth: function () {
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

    getWidthOfMenuWrapper: function () {
      return this.$getMenuWrapper().width()
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

    getCoordinateOfMenuWrapper: function () {
      return this.$getMenuWrapper().offset().left;
    },

    getCenterOfMenuWrapperAtDocument: function () {
      return this.getWidthOfMenuWrapper() * 0.5 + this.getCoordinateOfMenuWrapper();
    },

    getCenterOfMenuWrapper: function () {
      return this.getWidthOfMenuWrapper() * 0.5;
    },

    getCenterOfActiveButton: function () {
      return this.getActiveButtonWidth() * 0.5;
    },

    getWidthOfButtonsOnLeftSideOfActive: function () {
      var activeClass = this.getActiveButtonClassAsString(),
          arrOfButtonWidth = this.getArrOfButtonWidth(activeClass);
      
      return this.getWidthOfMenuContainer(arrOfButtonWidth);
    },

    getWidthOfButtonsOnRightSideOfActive: function () {
      var arrOfButtonWidth = this.getArrOfButtonWidth();

      return this.getWidthOfMenuContainer(arrOfButtonWidth) - this.getWidthOfButtonsOnLeftSideOfActive();
    },

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
        'left': that.getWidthOfButtonsOnLeftSideOfActive() + that.getActiveButtonWidth(),
        'margin-left': -that.getActiveButtonWidth(),
        'width': that.getActiveButtonWidth(),
        'height': that.getButtonHeight()
      });
    },

    removeActiveClass: function (htmlClass, activeButtonClass) {
      $(htmlClass).removeClass(activeButtonClass);
    },

    addActiveClass: function (htmlClass, activeButtonClass) {
      $(htmlClass).addClass(activeButtonClass);
    },

    changeActiveButtonOnClick: function () {
      var that = this,
          htmlClass = this.$getButton(),
          activeButtonClass = this.getActiveButtonClassAsString();

      $(htmlClass).on('click', function () {
        var $htmlClass = $(this);

        that.getCoordinateOfParentBlock();
        that.removeActiveClass(htmlClass, activeButtonClass);
        that.addActiveClass($htmlClass, activeButtonClass);
        that.setToCenterActiveButton();
        that.setPropertiesOfActiveButtonBlock();
      });
    },

    setToCenterActiveButton: function () {
      var that = this;

      if (this.getWidthOfButtonsOnLeftSideOfActive() + this.getCenterOfActiveButton() < this.getCenterOfMenuWrapper()) {
        this.$getMenuContainer().offset({
          'left': that.getCoordinateOfMenuWrapper()
        });
      }
      else if (this.getWidthOfButtonsOnRightSideOfActive() < this.getCenterOfMenuWrapper()) {
        var arrOfButtonWidth = this.getArrOfButtonWidth();

        this.$getMenuContainer().offset({
          'left': that.getCoordinateOfMenuWrapper() -
          (that.getWidthOfMenuContainer(arrOfButtonWidth) - that.getWidthOfMenuWrapper())
        });
      }
      else {
        this.$getMenuContainer().offset({
          'left': that.getCenterOfMenuWrapperAtDocument() -
          that.getWidthOfButtonsOnLeftSideOfActive() -
          that.getCenterOfActiveButton()
        });
      }
    }
  };

  slideButton.setWidthOfMenuContainer();
  slideButton.changeActiveButtonOnClick();
  slideButton.setToCenterActiveButton();
  slideButton.setActiveButtonBlock();
  slideButton.setPropertiesOfActiveButtonBlock();
}(window, jQuery));





























