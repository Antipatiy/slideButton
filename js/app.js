(function(global, $) {
  "use strict";

  var slideButton = {

    getActiveButton: function () {
      return $('.active');
    },

    getMenuBlock: function () {
      return $('.menu');
    },

    getTagAInMenuBlock: function () {
      return $(this.getMenuBlock() + ' a');
    },

    getButtonWidth: function() {
      return this.getActiveButton().outerWidth();
    },

    getCoordinateOfParentBlock: function() {
      return this.getMenuBlock().position().left;
    },

    getCoordinateOfActiveButton: function() {
      return this.getActiveButton().position().left - this.getCoordinateOfParentBlock();
    },

    setActiveButtonBlock: function() {
      var that = this;

      $('.active-button-block').css({
        'left': that.getCoordinateOfActiveButton() + that.getButtonWidth(),
        'margin-left': -that.getButtonWidth(),
        'width': that.getButtonWidth()
      });
    },

    removeActiveClass: function() {
      this.getTagAInMenuBlock().removeClass(this.getActiveButton());
    },

    addActiveClass: function(obj) {
      $(obj).addClass(this.getActiveButton());
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
