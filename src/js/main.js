"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  //Саня на jquery не переписывай
  //Аккардион для меню
  var AccardionMenu = /*#__PURE__*/function () {
    function AccardionMenu(_ref) {
      var _ref$container = _ref.container,
          container = _ref$container === void 0 ? null : _ref$container,
          _ref$activeClass = _ref.activeClass,
          activeClass = _ref$activeClass === void 0 ? 'popup_list_show' : _ref$activeClass,
          _ref$classElements = _ref.classElements,
          classElements = _ref$classElements === void 0 ? null : _ref$classElements,
          _ref$btnClass = _ref.btnClass,
          btnClass = _ref$btnClass === void 0 ? null : _ref$btnClass,
          _ref$toggleElClass = _ref.toggleElClass,
          toggleElClass = _ref$toggleElClass === void 0 ? null : _ref$toggleElClass,
          _ref$classActive = _ref.classActive,
          classActive = _ref$classActive === void 0 ? '' : _ref$classActive;

      _classCallCheck(this, AccardionMenu);

      this.container = document.querySelector(container);
      this.classElements = this.container.querySelectorAll(classElements);
      this.btnClass = btnClass;
      this.toggleElClass = toggleElClass;
      this.classActive = classActive;
    }

    _createClass(AccardionMenu, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.classElements.forEach(function (item) {
          var btn = item.querySelector(_this.btnClass),
              popup_list = item.querySelector(_this.toggleElClass);
          btn.addEventListener('click', function (e) {
            popup_list.classList.toggle(_this.classActive);
            btn.classList.toggle('active');
          });
        });
      }
    }]);

    return AccardionMenu;
  }(); //Переключатель классов


  var TogglerClases = /*#__PURE__*/function () {
    function TogglerClases(_ref2) {
      var _ref2$triger = _ref2.triger,
          triger = _ref2$triger === void 0 ? null : _ref2$triger,
          _ref2$toggleEl = _ref2.toggleEl,
          toggleEl = _ref2$toggleEl === void 0 ? null : _ref2$toggleEl,
          _ref2$listener = _ref2.listener,
          listener = _ref2$listener === void 0 ? 'click' : _ref2$listener,
          _ref2$classActive = _ref2.classActive,
          classActive = _ref2$classActive === void 0 ? null : _ref2$classActive,
          _ref2$closeBtn = _ref2.closeBtn,
          closeBtn = _ref2$closeBtn === void 0 ? '.close_btn' : _ref2$closeBtn,
          _ref2$overlay = _ref2.overlay,
          overlay = _ref2$overlay === void 0 ? '.overlay' : _ref2$overlay,
          _ref2$showOveraly = _ref2.showOveraly,
          showOveraly = _ref2$showOveraly === void 0 ? true : _ref2$showOveraly,
          _ref2$bodyClass = _ref2.bodyClass,
          bodyClass = _ref2$bodyClass === void 0 ? '' : _ref2$bodyClass,
          _ref2$listenerOut = _ref2.listenerOut,
          listenerOut = _ref2$listenerOut === void 0 ? null : _ref2$listenerOut;

      _classCallCheck(this, TogglerClases);

      this.triger = document.querySelectorAll(triger);
      this.listener = listener;
      this.classActive = classActive;
      this.toggleEl = document.querySelector(toggleEl);
      this.closeBtn = closeBtn;
      this.overlay = document.querySelector(overlay);
      this.showOveraly = showOveraly;
      this.bodyClass = bodyClass;
      this.listenerOut = listenerOut;
    }

    _createClass(TogglerClases, [{
      key: "init",
      value: function init() {
        this.open();
        this.close();
      }
    }, {
      key: "close",
      value: function close() {
        var _this2 = this;

        try {
          var closeBtn = this.toggleEl.querySelector(this.closeBtn);
          closeBtn.addEventListener('click', function (e) {
            e.preventDefault();

            _this2.toggleEl.classList.remove(_this2.classActive);

            _this2.overlay.style.display = '';

            if (_this2.bodyClass) {
              document.body.classList.remove(_this2.bodyClass);
            }
          });
        } catch (e) {}

        if (this.listenerOut != null) {
          this.triger.forEach(function (item) {
            item.addEventListener(_this2.listenerOut, function (e) {
              e.preventDefault();
              item.classList.remove('active');
            });
          });
        }
      }
    }, {
      key: "open",
      value: function open() {
        var _this3 = this;

        this.triger.forEach(function (item) {
          item.addEventListener(_this3.listener, function (e) {
            e.preventDefault();
            item.classList.add('active');

            try {
              _this3.toggleEl.classList.add(_this3.classActive);
            } catch (e) {}

            if (_this3.showOveraly) {
              _this3.overlay.style.display = 'block';
            }

            if (_this3.bodyClass) {
              document.body.classList.add(_this3.bodyClass);
            }
          });
        });
      }
    }]);

    return TogglerClases;
  }(); //Анимация для кнопок


  var animateTranslate = /*#__PURE__*/function () {
    function animateTranslate(_ref3) {
      var _ref3$elements = _ref3.elements,
          elements = _ref3$elements === void 0 ? null : _ref3$elements,
          _ref3$classActive = _ref3.classActive,
          classActive = _ref3$classActive === void 0 ? '' : _ref3$classActive,
          _ref3$listener = _ref3.listener,
          listener = _ref3$listener === void 0 ? 'mouseover' : _ref3$listener,
          _ref3$listenerOut = _ref3.listenerOut,
          listenerOut = _ref3$listenerOut === void 0 ? null : _ref3$listenerOut;

      _classCallCheck(this, animateTranslate);

      this.elements = document.querySelectorAll(elements);
      this.listener = listener;
      this.listenerOut = listenerOut;
      this.classActive = classActive;
    }

    _createClass(animateTranslate, [{
      key: "animateEl",
      value: function animateEl() {
        var _this4 = this;

        var isOn = false;
        var tl = anime.timeline({
          duration: 400,
          // easing: 'linear',
          easing: 'spring(1, 80, 10, 0)',
          // direction: 'alternate',
          loop: false
        });
        this.elements.forEach(function (item) {
          item.addEventListener(_this4.listener, function (e) {
            isOn = true;

            if (isOn) {
              item.classList.add(_this4.classActive);
              e.preventDefault();
              tl.add({
                targets: item,
                translateX: -20,
                easing: 'spring'
              });
            }

            if (_this4.listenerOut != null) {// item.addEventListener(this.listenerOut, (e)=>{
              //     isOn = false
              //     item.classList.remove(this.classActive)
              //     tl.add({
              //         targets: item,
              //         translateX: 20,
              //         easing: 'spring',
              //     })
              // })
            }
          });
        });
      }
    }]);

    return animateTranslate;
  }(); //Анимация animate.css


  var animateVariable = /*#__PURE__*/function () {
    function animateVariable(_ref4) {
      var _ref4$elements = _ref4.elements,
          elements = _ref4$elements === void 0 ? null : _ref4$elements,
          _ref4$listener = _ref4.listener,
          listener = _ref4$listener === void 0 ? 'mouseover' : _ref4$listener,
          _ref4$listenerOut = _ref4.listenerOut,
          listenerOut = _ref4$listenerOut === void 0 ? null : _ref4$listenerOut,
          _ref4$animateName = _ref4.animateName,
          animateName = _ref4$animateName === void 0 ? '' : _ref4$animateName;

      _classCallCheck(this, animateVariable);

      this.elements = document.querySelectorAll(elements);
      this.listener = listener;
      this.animateName = animateName;
      this.listenerOut = listenerOut;
    }

    _createClass(animateVariable, [{
      key: "play",
      value: function play() {
        var _this5 = this;

        this.elements.forEach(function (item) {
          item.addEventListener(_this5.listener, function (e) {
            e.preventDefault();
            item.classList.add("animate__animated");
            item.classList.add("".concat(_this5.animateName));
          });

          if (_this5.listenerOut != null) {
            item.addEventListener(_this5.listenerOut, function (e) {
              e.preventDefault();
              item.classList.remove("animate__animated");
              item.classList.remove("".concat(_this5.animateName));
            });
          }
        });
      }
    }]);

    return animateVariable;
  }(); //Табы


  var ToggleTabs = /*#__PURE__*/function () {
    function ToggleTabs(_ref5) {
      var _ref5$itemsTabs = _ref5.itemsTabs,
          itemsTabs = _ref5$itemsTabs === void 0 ? null : _ref5$itemsTabs,
          _ref5$wrapperItemsCon = _ref5.wrapperItemsContent,
          wrapperItemsContent = _ref5$wrapperItemsCon === void 0 ? null : _ref5$wrapperItemsCon,
          _ref5$itemsContent = _ref5.itemsContent,
          itemsContent = _ref5$itemsContent === void 0 ? null : _ref5$itemsContent,
          _ref5$classActive = _ref5.classActive,
          classActive = _ref5$classActive === void 0 ? 'show' : _ref5$classActive,
          _ref5$animationName = _ref5.animationName,
          animationName = _ref5$animationName === void 0 ? 'animate__fadeInRight' : _ref5$animationName;

      _classCallCheck(this, ToggleTabs);

      this.itemsTabs = document.querySelectorAll(itemsTabs);
      this.wrapperItemsContent = document.querySelectorAll(wrapperItemsContent);
      this.classActive = classActive;
      this.animationName = animationName;
    }

    _createClass(ToggleTabs, [{
      key: "clearClass",
      value: function clearClass(id) {
        for (var i = 0; i < this.itemsTabs.length; i++) {
          this.itemsTabs[i].classList.remove('item_active');
          this.wrapperItemsContent[i].classList.remove(this.classActive);
          this.wrapperItemsContent[i].classList.remove(this.animationName);
        }

        this.wrapperItemsContent[id].classList.add(this.classActive);
        this.wrapperItemsContent[id].classList.add(this.animationName);
      }
    }, {
      key: "init",
      value: function init() {
        var _this6 = this;

        this.itemsTabs[0].classList.add('item_active');
        this.wrapperItemsContent[0].classList.add(this.classActive);
        this.itemsTabs.forEach(function (item, id) {
          item.addEventListener('click', function (e) {
            e.preventDefault();

            _this6.clearClass(id);

            if (!item.classList.contains('item_active')) {
              item.classList.add('item_active');
            }
          });
        });
      }
    }]);

    return ToggleTabs;
  }();

  var tabs = new ToggleTabs({
    itemsTabs: '.item_tab',
    wrapperItemsContent: '.items_wrapper'
  });
  tabs.init(); //Анимация кнопки в поиске

  var sectionLink = new animateTranslate({
    elements: '.section_link',
    classActive: 'animate_after'
  });
  sectionLink.animateEl(); //Подлючение аккардиона к меню

  var accardionMenu = new AccardionMenu({
    container: '.left_menu_catalog ',
    classElements: '.item_list',
    btnClass: '.accardion_trigger',
    toggleElClass: '.popup_list',
    classActive: 'popup_list_show'
  });
  accardionMenu.init(); //Вызов меню каталога

  try {
    var ShowCatalogLeft = new TogglerClases({
      triger: '#catalog_btn',
      toggleEl: '.left_menu_catalog',
      classActive: 'left_menu_catalog_active'
    });
    ShowCatalogLeft.init();
  } catch (e) {} //Вызов поисковика


  try {
    var serachToggle = new TogglerClases({
      triger: '.search_input',
      toggleEl: '.serach_result',
      classActive: 'serach_result_active',
      showOveraly: false,
      bodyClass: 'active_serach'
    });
    serachToggle.init();
  } catch (e) {}

  var specialItemAnimate = new TogglerClases({
    triger: '.special_item',
    listener: 'mouseover',
    classActive: 'animate',
    showOveraly: false,
    listenerOut: 'mouseout'
  });
  specialItemAnimate.init(); //slider

  $('.banners_slider').owlCarousel({
    loop: true,
    nav: false,
    items: 1
  });
  $('.brands_list').owlCarousel({
    loop: true,
    nav: false,
    items: 6,
    dots: false
  });
  var owl = $('.brands_list');
  owl.owlCarousel(); // Go to the next item

  $('.arrow_btn_next_brands').click(function () {
    owl.trigger('next.owl.carousel');
  }); // Go to the previous item

  $('.arrow_btn_prev_brands').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
  });
  $('.reviews_list').owlCarousel({
    loop: true,
    nav: false,
    items: 3,
    dots: false,
    margin: 16
  });
  var owlReviews = $('.reviews_list');
  owlReviews.owlCarousel(); // Go to the next item

  $('.arrow_btn_next_reviews').click(function () {
    owlReviews.trigger('next.owl.carousel');
  }); // Go to the previous item

  $('.arrow_btn_prev_reviews').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owlReviews.trigger('prev.owl.carousel', [300]);
  });
});