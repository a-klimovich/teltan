(function(){
  const $body = $('body');
  const $filterModalContetn = $('#filterModalContent')
  const $itemSlider =  $('#itemSlider');

  const $header = $(".header");
  const scroll = 0;
  const active = "active";
  let prevScrollTop = 0;

  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop()

    if(prevScrollTop < scrollTop && prevScrollTop > 0){
      $header.addClass('hiddenSearch')
    } else if(prevScrollTop - 20 > scrollTop){
      $header.removeClass('hiddenSearch')
    }

    if (scrollTop > scroll) {
      $header.addClass(active);
    } else {
      $header.removeClass(active);
    }

    prevScrollTop = scrollTop;
  });

  // Handler mobile manu user
  $('.btnUserMenuProfile').on('click', (e) => {
    $('.user-profile-menu__header').toggleClass('active')
  })

  // MODALS start
  $('#registerModal').on('show.bs.modal', function () {
    $("#logInModal").modal('hide');
  });
  
  $("#registerModal").on('shown.bs.modal', function () {
    $body.addClass('modal-open');
  });
  // MODALS end

  // MOBILE MENU --START--
  $('.hamburger').on('click', () => {
    $('.mobile-menu').addClass('active')
     $body.addClass('overflow-h')
  })

  $('.mobile-menu .closer').on('click', (e) => {
    $('.mobile-menu').removeClass('active')
     $body.removeClass('overflow-h')
  })

  $('.menu__nav .nav-item').on('click', function (e) {
    e.preventDefault()
    const menuBtn = $(this).data('menu-btn')
    $(`.menu.submenu[data-submenu=${menuBtn}]`).addClass('active')
  })

  $('.menu__header .back-menu').on('click', function (e) {
    e.preventDefault()
    $('.menu.submenu').removeClass('active')
  })
  // MOBILE MENU --END--

  // MAPS START
  mapboxgl.accessToken = 'pk.eyJ1IjoiYS1rbGltb2YiLCJhIjoiY2themVqYzI4MGlrZDJxbWlvaDBlMzF6MyJ9.QXFKypM1BnCkQaUZKTuP0g';

  if($('#map').length > 0) {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }

  if($('#mapMini').length > 0) {
    const map = new mapboxgl.Map({
      container: 'mapMini',
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }

  if($('#mapFullSize').length > 0) {
    const map = new mapboxgl.Map({
      container: 'mapFullSize',
      style: 'mapbox://styles/mapbox/streets-v11',
    })

    $("#itemMapFullSize").on('shown.bs.modal', function () {
      map.resize();
    })
  }
  // MAPS END
  
  $('#showListUserNumber').on('click', () => {
    $('.mobile-block-show-contacts').toggleClass('show')
  })

  $('#closeNumberList').on('click', () => {
    $('.mobile-block-show-contacts').removeClass('show')
  })


  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  }
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
      for(var i = this.length - 1; i >= 0; i--) {
          if(this[i] && this[i].parentElement) {
              this[i].parentElement.removeChild(this[i]);
          }
      }
  }

  $('.filterTogglerMobile').on('click', (e) => {
    e.preventDefault()
    $filterModalContetn.toggleClass('visible')

    if ($('#isMobileMenuFiltersOpen').hasClass('modal-backdrop fade show')) {
      $('#isMobileMenuFiltersOpen').remove();
      $body.removeClass('modal-open');
    } else {
      $filterModalContetn.css("z-index", "1050")
      $body.append(`<div id='isMobileMenuFiltersOpen' class="modal-backdrop fade show"></div>`)
      $body.addClass('modal-open')

      $('#isMobileMenuFiltersOpen').on('click', function(e) {
        $(this).remove();
        $filterModalContetn.toggleClass('visible')
        $body.removeClass('modal-open');
      })
    }
    
    $('.cord-container').removeClass('overlay')
  })

  

  $('.filterPropertyCloser').on('click', (e) => {
    e.preventDefault()
    $filterModalContetn.toggleClass('visible')

    $('.cord-container').removeClass('overlay')
  })

  $('.collaps-text-about-btn').on('click', function() {
    $(this).closest('.collaps-text-about').find('.collaps-text-about-text').toggleClass('show')
  })

  if ($("#btnShowMoreBodyTypes")) {
    $('#btnShowMoreBodyTypes').on('click', () => {
      $('.form_radio_btn').filter('.show-additionally').css("display", "inline-block");
      $('#btnShowMoreBodyTypes').css("display", "none")
    })
  }

  if ($(window).width() <= 748) {
    $('.fleamarket-mobile > .nav > .nav-link').on('click', () => {
      $('.fleamarket').addClass('show')
    })
  
    $('.btn-back').on('click', () => {
      $('.fleamarket').removeClass('show')
    })
  }

  // Dropdown cabinet item menu
  $('#dropdownMenuLink').on('click', (e) => {
    e.preventDefault()
    $('.accardion-wrap').toggleClass('active')
  })

  $('.user-product__btn-edit').on('click', (e) => {
    e.preventDefault()
    $('.edit-item-menu_item1').toggleClass('active')
  })

  $('.add-item-favorite').on('click', () => {
    $('.add-item-favorite').toggleClass('active')
  })
  
  $('.followThisItem').on('click', function() {
    $(this).toggleClass('active')
  })

  //Similar Contetn Sliders / VIP content slider
  $(document).ready(function(){
    $('.similar-products-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: '<div class="prev"><img src="./assets/vip-item-arrow.svg" alt="prev"></div>',
      nextArrow: '<div class="next"><img src="./assets/vip-item-arrow.svg" alt="next"></div>',
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
          }
        }, {
          breakpoint: 540,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
          }
        }]
    });

    $('.vip-items-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: '<div class="prev"><img src="./assets/vip-item-arrow.svg" alt="prev"></div>',
      nextArrow: '<div class="next"><img src="./assets/vip-item-arrow.svg" alt="next"></div>',
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }, {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }]
    });
    
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<div class="carousel-control-prev" data-slide="prev"><i class="icon-left-arrow rotate-180"></i><span class="sr-only">Previous</span></div>',
      nextArrow: '<div class="carousel-control-next" data-slide="next"><i class="icon-left-arrow"></i><span class="sr-only">Next</span></div>',
      responsive: [{
        breakpoint: 768,
        settings: {
          centerPadding: '7%',
          centerMode: true,
          arrows: false,
        }
      }]
    });
    

    $('.slider-nav div[data-slide]').click(function(e) {
      e.preventDefault();
      var slideno = $(this).data('slide');
      $('.slider-for').slick('slickGoTo', slideno);
    });

    // ITEM SLITER on modal window
    let $status = $('.slider-counter-mobile');
    let $slickElement = $('.mainItemSlider');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      // currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.text(i + '/' + slick.slideCount);
    });

     $('.mainItemSlider').slick({
      slidesToShow: 1,
      arrows: false,
      vertical: true,
      centerMode: true,
      verticalSwiping: true,
      centerPadding: '18%',
      asNavFor: '.navMainItemSlider',
      responsive: [{
        breakpoint: 856,
        settings: {
          vertical: false,
          centerPadding: '15%',
          verticalSwiping: false,
          centerPadding: 0,
          centerMode: false,
        }
      }]
    });
    
    $('.navMainItemSlider').slick({
      slidesToShow: 9,
      slidesToScroll: 9,
      centerPadding: '24px',
      vertical: true,
      centerMode: true,
      focusOnSelect: true,
      prevArrow: '<div class="dots-arrow dots-arrow-prev"><i class="icon-left-arrow rotate-180"></i></div>',
      nextArrow: '<div class="dots-arrow dots-arrow-next"><i class="icon-left-arrow"></i></div>',
      asNavFor: '.mainItemSlider',
      responsive: [{
        breakpoint: 856,
        settings: "unslick",
      }]
    });

    $('.mainItemSlider').on('wheel', (function(e) {
      e.preventDefault();

      if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickNext');
      } else {
        $(this).slick('slickPrev');
      }
    }));

    $('#modalFullSize').on('shown.bs.modal', function () {
      $('.mainItemSlider').slick('refresh');
      $('.navMainItemSlider').slick('refresh');
    })

    if ($(window).width() < 768) {
      $('#modalFullSize').on('shown.bs.modal', function () {
        $('body .modal-backdrop.show').css({"opacity": '1'})
        $(".item-slider > .add-item-favorite").css({'z-index': '2000', 'top': '-100%', 'right': '20px', 'left': 'auto'})
      })

      $('#modalFullSize').on('hide.bs.modal', function () {
        $('body .modal-backdrop.show').css({"opacity": '0.5'})
        $(".item-slider > .add-item-favorite").css({'z-index': '2', 'top': '20px', 'right': 'auto', 'left': '20px'})
      })
    } else {
      $('#modalFullSize').on('shown.bs.modal', function () {
        $('body .modal-backdrop.show').css({'opacity': '0.8', 'background-color' : '#d5d5d5'})
      })

      $('#modalFullSize').on('hide.bs.modal', function () {
        $('body .modal-backdrop.show').css({'opacity': '0.8', 'background-color' : '#d5d5d5'})
      })
    }
  });

    // Slider Counter
  $itemSlider.on('slid.bs.carousel', function (e) {
    $itemSlider.find('.current-slide-number').text(e.to + 1);
  })

  $('#modalSandMessage').on('show.bs.modal', () => {
    $('#modalFullSize').modal('hide')
  })

  $('#modalSandMessage').on('shown.bs.modal', () => {
    $body.addClass('modal-open')

    new FileUploader(
      // container where will images rendered (prepend method useing)
      '#fileUploaderRenderMessageContainer',
      // single input file element, all files will be merged there
      '#fileUploaderMessageFiles',
      // render image templte
      // {{example}} - placeholders for templateOptions render (dataUrl at lest required)
      // data-file-id - container
      // data-file-remove-id - data for remove btn (whould has the same as container value)
  
      `<div class="ml-3 d-flex align-items-center justify-content-center upload-file" data-file-id="{{name}}">
        <button type="button" class="mr-2 close" data-file-remove-id="{{name}}">
          <span>&times;</span>
        </button>
  
        <span class="upload-file__name">{{name}}</span>
      </div>`,
    )
  })

  /**
   * Filter
   */
  class Filter {
    filterData = {}

    constructor(formSelector) {
      const $form = $(formSelector)

      if (!$form) {
        return false
      }

      const $items = $(`[data-filter-for="${formSelector}"]`)

      $form.on('keyup change paste', 'input, select, textarea', (e) => {
        this.filterData = {...this.filterData, [e.target.name]:e.target.value}

        $items.each((_, el) => {
          const $el = $(el);
          let isFind = true;

          Object.entries(this.filterData).map(([name, value]) => value).forEach((filterDataItem) => {
            if (!$el.data('filter').includes(filterDataItem)) isFind = false
          })

          $el.toggleClass('d-none', !isFind);
        })
      });
    }
  }

  new Filter('#brandFilter')
  new Filter('#userItemFilter')
  new Filter('#nameFilter')

  /**
   * Wizard
   */
   class Wizard {
    options = {
      wrapperSelector: '#wizard',
      stepSelector: '.wizard-step',
      contentSelector: '.wizard-content',
      controlNextSelector: '.wizard-control-next',
      controlPrevSelector: '.wizard-control-prev',
      controlFinalSelector: '.wizard-control-final',
      activeClass: 'active',
      completedClass: 'completed'
    }

    activeStep = 0;

    afterSelectCb = () => {}

    constructor(options = {}, afterSelectCb) {
      this.options = {
        ...this.options,
        ...options,
      };

      this.afterSelectCb = afterSelectCb;

      this.steps = $(`${this.options.wrapperSelector} ${this.options.stepSelector}`);
      this.content = $(`${this.options.wrapperSelector} ${this.options.contentSelector}`);
      this.nextControl = $(`${this.options.wrapperSelector} ${this.options.controlNextSelector}`);
      this.prevControl = $(`${this.options.wrapperSelector} ${this.options.controlPrevSelector}`);
      this.finalControl = $(`${this.options.wrapperSelector} ${this.options.controlFinalSelector}`);

      this.nextControl.on('click', () => {
        this.selectStep(this.activeStep + 1);
      })

      this.prevControl.on('click', () => {
        this.selectStep(this.activeStep - 1);
      })

      this.selectStep(this.activeStep);
    }


    get stepsNumber() {
      return this.content.length;
    }

    selectStep = (index) => {
      const activeClass = this.options.activeClass;
      const completedClass = this.options.completedClass;

      if (this.stepsNumber <= index || index < 0) {
        return false
      }

      this.activeStep = index;

      this.nextControl.removeClass(activeClass)
      this.prevControl.removeClass(activeClass)
      this.finalControl.removeClass(activeClass)

      this.steps.removeClass(activeClass).each((_, el) => {
        if (Number($(el).data('wizardStep')) < index) {
          $(el).addClass(completedClass)
        }

        if (Number($(el).data('wizardStep')) === index) {
          $(el).addClass(activeClass)
        }
      })

      this.content.removeClass(activeClass)
      $(`[data-wizard-content="${index}"]`).addClass(activeClass)

      if (index === 0) {
        this.nextControl.addClass(activeClass)
      } else if (index !== this.stepsNumber - 1) {
        this.nextControl.addClass(activeClass)
        this.prevControl.addClass(activeClass)
      } else {
        this.prevControl.addClass(activeClass)
        this.finalControl.addClass(activeClass)
      }

      this.afterSelectCb(index)
    }
  }

  new Wizard({}, () => {
    if($('#map').length > 0) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
      });
    }
  });

  /**
   * File uploader
   */
  class FileUploader {
    fileList = null

    template = ''

    templateOptions = {
      name: 'name',
    }

    constructor(renderContainerId, fileListId, template) {
      const self = this
      this.renderContainerId = renderContainerId
      this.fileListId = fileListId
      this.template = template

      $(fileListId).on('change', (e) => {
        this.addFiles(e.target.files)

        e.target.value = ''
      })

      $(document).on('click', '[data-file-remove-id]', function() {
        self.removeFile($(this).data('fileRemoveId'));
      })

      $(document).on('click', '.rotate-control', function() {
        const $rotateInput = $(this).find('input');
        const currentRotate = Number($rotateInput.val()) || 0;
        const newRotate = (currentRotate + 90) % 360;

        $(this).closest('[data-file-id]').find('.rotate-img')
          .css({ 'transform': `rotate(${newRotate}deg)` })

        $rotateInput.val(newRotate)
      })
    }

    readFileAsync = (file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
    
        reader.onload = () => {
          resolve(reader.result);
        };
    
        reader.onerror = reject;
    
        reader.readAsDataURL(file);
      })
    }

    updateOutputInput = () => {
      const $fileListInput = $(this.fileListId)

      if ($fileListInput && this.fileList) {
        $fileListInput[0].files = this.fileList;
      }
    }

    addFiles = (files) => {
      const newFilesArr = Array.from(files)
      const allFiles = [...Array.from(this.fileList || []), ...newFilesArr]

      this.fileList = allFiles.reduce((dt, file) => {
        dt.items.add(file)

        return dt;
      }, new DataTransfer()).files;

      newFilesArr.forEach(async (file) => {
        const dataUrl  = await this.readFileAsync(file);

        const filledTemplate = Object.entries(this.templateOptions).reduce((tmp, [key, value]) => {
          const output = tmp.replaceAll(`{{${key}}}`, file[value])

          return output
        }, this.template.replace('{{dataUrl}}', dataUrl))

        $(this.renderContainerId).prepend(filledTemplate)
      })

      this.updateOutputInput()
    }

    removeFile = (fileId) => {
      const dt = new DataTransfer()
      // const filteredFiles = Array.from(this.fileList).filter((file) => file.name !== fileId)
      // filteredFiles.forEach((file) => dt.items.add(file))

      // this.fileList = dt.files

      // this.updateOutputInput()

      $(`[data-file-id="${fileId}"]`).remove()
    }
  }

  new FileUploader(
    // container where will images rendered (prepend method useing)
    '#fileUploaderRenderContainer',
    // single input file element, all files will be merged there
    '#fileUploaderFiles',
    // render image templte
    // {{example}} - placeholders for templateOptions render (dataUrl at lest required)
    // data-file-id - container
    // data-file-remove-id - data for remove btn (whould has the same as container value)
    // .rotate-control button to rotate image
    // .rotate-img - element for rotating
    `<div class="mb-4 col" data-file-id="{{name}}">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="mb-3 d-flex justify-content-center align-items-center photo">
          <img src="{{dataUrl}}" class="rotate-img">
        </div>
        
        <label class="mb-2 p-0 btn text-center text-primary">
          <input type="radio" name="fileMain" value="{{name}}" class="d-none" />
          Set as main
        </label>
  
        <div class="d-flex justify-content-around">
          <div class="mr-3 d-flex justify-content-center align-items-center element-control" data-file-remove-id="{{name}}">
            <i class="mr-2 icon-clear"></i>
            <span class="d-none d-lg-inline-block">Delete</span>
          </div>
  
          <div class="d-flex justify-content-center align-items-center element-control rotate-control">
            <input type="hidden" name="rotate[{{name}}]" value="0" />
            <i class="mr-2 icon-replay"></i>
            <span class="d-none d-lg-inline-block">Rotate</span>
          </div>
        </div>
      </div>
    </div>`,
  )

  /**
   * Range sliders
   */
   class RangeSlider {
    constructor(elementId) {
      this.elementId = elementId;
  
      const element = document.getElementById(this.elementId);
  
      if (element) {
        this.element = element;

        this.init();
      }
    }
  
    init() {
      const { rangeMin = 0, rangeMax = 100 } = this.element.dataset;
    
      this.slider = noUiSlider.create(this.element, {
        start: [Number(rangeMin), Number(rangeMax)],
        connect: true,
        step: 1,
        direction: 'rtl',
        range: {
          min: Number(rangeMin),
          max: Number(rangeMax),
        },
        format: {
          to: (value) => Math.round(value),
          from: (value) => Number(value) || 0,
        },
      });

      const minInput = document.querySelector(`[data-range-min-connected="${this.elementId}"]`);
      const maxInput = document.querySelector(`[data-range-max-connected="${this.elementId}"]`);

      if (minInput && maxInput) {
        this.slider.on('update', () => {
          const [minValue, maxValue] = this.slider.get();
          minInput.value = minValue;
          maxInput.value = maxValue;
        })

        minInput.addEventListener('change', (e) => {
          this.slider.set([e.target.value, null])
        })

        maxInput.addEventListener('change', (e) => {
          this.slider.set([null, e.target.value])
        })
      }

      const setters = document.querySelectorAll(`[data-range-connected="${this.elementId}"]`);
      
      if (setters.length) {
        setters.forEach((node) => {
          node.addEventListener('click', (e) => {
            this.slider.set(e.target.dataset.rangeSet.split(','))
          })
        })
      }
    }
  }

  new RangeSlider('rangeSlider');
  new RangeSlider('rangeSliderMainFilterMobile');
})();


  /**
   * Alerts
   */
  $('#alertInformer').on('click', function () {
    $('.alert-informer').addClass('show');
    
    setTimeout(function () {
      $('.alert-informer').removeClass('show');
    }, 2500)
  })

  $('#alertConfirmation').on('click', function () {
    $('.alert-confirmation').addClass('show');
  })

  $('.allert .close').click(() => {
    $('.allert').removeClass('show')
  })

  // Dependense lists START
  const btnFirstDropD = $(".first-drop");
  const btnSecondDropD = $(".second-drop");
  const countryList = $(".show-country");
  const cityList = $(".show-city");

  const placesList = {
    by: ["Minsk", "Grodno", "Gomel"],
    ru: ["Moskow", "SPB", "Samara"],
    pl: ["Warsawa", "Lublin", "Gdansk"]
  };

  countryList.on("click", function (e) {
    let target = e.target.value;
    let countryName = e.target.closest("label").textContent;
    
    showCityThisCountry(target);
    checkedElement(countryName, btnFirstDropD);

    countryList.removeClass("active");

    if (cityList.hasClass('active') === true) {
      cityList.toggleClass("active");
    }
  });

  cityList.on("click", function (e) {
    let target = e.target.closest("label").textContent;

    checkedElement(target, btnSecondDropD);
    
    cityList.toggleClass("active");

    if (countryList.hasClass('active') === true) {
      countryList.toggleClass("active");
    }
  });

  const showCityThisCountry = (countryName) => {
    if (placesList[countryName]) {
      cityList.empty();
      
      placesList[countryName].forEach((element) => {
        cityList.append(
          `<li><label for="city"><input name="city" value='${element}' type="radio">${element}</label></li>`
        );
      });
        
      checkedElement(placesList[countryName][0], btnSecondDropD);
    }
  };

  const checkedElement = (name, renderTo) => {
    renderTo.empty();
    renderTo.append(name);
  };

  btnFirstDropD.on("click", () => {
    countryList.toggleClass("active");
  });

  btnSecondDropD.on("click", () => {
    cityList.toggleClass("active");
  });
  // Dependense lists END

// Header property filters / dropdown
  const dropdownElems = [$('.dropdown-prise'), $('.dropdown-room-number'), $('.dropdown-building-type'), $('.dropdown-area')]
  const dropdownBtn = [$('.buttonShowPropertyFilterPrice'), $('.buttonShowPropertyFilterRoom'), $('.buttonShowPropertyFilterType'), $('.buttonShowPropertyFilterArea')]

  $('.buttonShowPropertyFilterPrice').click(function(e) {
    $(this).toggleClass('active')
    remooveDropDownActiveMenu(dropdownElems[0])
  })

  $('.buttonShowPropertyFilterRoom').click(function() {
    $(this).toggleClass('active')
    remooveDropDownActiveMenu(dropdownElems[1])
  })

  $('.buttonShowPropertyFilterType').click(function() {
    $(this).toggleClass('active')
    remooveDropDownActiveMenu(dropdownElems[2])
  })

  $('.buttonShowPropertyFilterArea').click(function() {
    $(this).toggleClass('active')
    remooveDropDownActiveMenu(dropdownElems[3])
  }) 

  function remooveDropDownActiveMenu(elem) {
    elem.attr("class").split(/\s+/).forEach((item) => {
      if(item === 'active') {
        elem.removeClass('active')
      } else {
        dropdownElems.forEach(i => i.removeClass('active'));
        elem.addClass('active')
      }
    })
  }

  // Price filter
  let userPrise = [0, 0];
  let userAreaRange = [0, 0];
  const showUserPrice = document.querySelector('.houseRentUserPrise');
  const showUserPriceBuy = document.querySelector('.houseBuyUserPrise');
  const showAreaRange = document.querySelector('.rentAreaCommerce');
  const showAreaRangeBuy = document.querySelector('.buyAreaCommerce');

  const typePropertyRentCommerce = document.querySelector('.typePropertyRentCommerce')
  const typePropertyBuyCommerce = document.querySelector('.typePropertyBuyCommerce')
  const typePropertyRent = document.querySelector('.typePropertyRent')
  const typePropertyBuy = document.querySelector('.typePropertyBuy')


  function howItPrice(priceElement) {
    if (userPrise[0] > 0) {
      priceElement.textContent = `???? ${userPrise[0]}`
    }

    if (userPrise[0] > userPrise[1] && userPrise[1] > 1) {
      priceElement.textContent = `???? ${userPrise[1]}`
    }

    if (userPrise[1] > 0) {
      priceElement.textContent = `???? ${userPrise[1]}`
    }

    if (userPrise[0] > 0 && userPrise[1] > 0) {
      priceElement.textContent = `${userPrise[0]} - ${userPrise[1]}`
    }

    if (userPrise[0] === userPrise[1]) {
      priceElement.textContent = `???? ${userPrise[0]}`
    }
  }

  function howItAreaRange(priceElement) {
    if (userAreaRange[0] > 0) {
      priceElement.textContent = `???? ${userAreaRange[0]}`
    }

    if (userAreaRange[0] > userAreaRange[1] && userAreaRange[1] > 1) {
      priceElement.textContent = `???? ${userAreaRange[1]}`
    }

    if (userAreaRange[1] > 0) {
      priceElement.textContent = `???? ${userAreaRange[1]}`
    }

    if (userAreaRange[0] > 0 && userAreaRange[1] > 0) {
      priceElement.textContent = `${userAreaRange[0]} - ${userAreaRange[1]}`
    }

    if (userAreaRange[0] === userAreaRange[1]) {
      priceElement.textContent = `???? ${userAreaRange[0]}`
    }
  }

  // PRICE RANGE
  $('.priceMin').keyup(function () {
    userPrise[0] = this.value;

    if (data.category === 'rent') {
      howItPrice(showUserPrice);
    } else {
      howItPrice(showUserPriceBuy);
    }
  })

  $('.priceMax').keyup(function () {
    userPrise[1] = this.value;
   
    if (data.category === 'rent') {
      howItPrice(showUserPrice);
    } else {
      howItPrice(showUserPriceBuy);
    }
  })

  // AREA RANGE
  $('.inputAreaMin').keyup(function () {
    userAreaRange[0] = this.value;

    if (data.category === 'rent') {
      howItAreaRange(showAreaRange);
    } else {
      howItAreaRange(showAreaRangeBuy);
    }
  })

  $('.inputAreaMax').keyup(function () {
    userAreaRange[1] = this.value;
   
    if (data.category === 'rent') {
      howItAreaRange(showAreaRange);
    } else {
      howItAreaRange(showAreaRangeBuy);
    }
  })


const categorySelector = ".category";
const categoryMobileSelector = ".categoryMobile"
const rentForm = "#mainFiltersRent";
const buyForm = "#mainFiltersBuy";
const rentFormMobile = "#mainFiltersRentMobile";
const buyFormMobile = "#mainFiltersBuyMobile";
const roomNumer = $('.countRoomNumberFilter');
const priceFilter = $('.houseRentUserPrise');
const typeProperty = $('.typeProperty');

let data = {}

const categoryName = $(categorySelector).attr("name");
const categoryNameMobile = $(categoryMobileSelector).attr("name");

const forms = $(`${rentForm}, ${buyForm}, ${rentFormMobile}, ${buyFormMobile}`);

// Handler show full string with tags parametr filter
const hendleMoreTags = (dataArray) => {
  const nonEmptyCount = dataArray.reduce((acc, [_, value]) => value ? acc + 1 : acc, 0)

  if (nonEmptyCount <= 3) {
    $('.showAllTags').removeClass('active')
  } else {
    $('.showAllTags').addClass('active')
  }
}

// ???????????? ??????????
const renderTags = () => {
  $(".tags .option-item").remove();

  const dataArray = Object.entries(data)
  
  dataArray.forEach(([name, value]) => {
    if (![categoryName].includes(name) && value) {
      const text = Array.isArray(value) ? value.join(", ") : value;

      switch (name) {
        case 'area':
          {
            if (Array.isArray(value)) {
              roomNumer.empty()

            const valArea = value.reduce((acc, n, i, array) => {
              if (i === 0 || i === array.length - 1) {
                  acc.push(n + (i === 0 && array.length > 1 ? '-' : ''));
              } else {
                  let nextEl = array[i+1];
          
                  if (nextEl && nextEl - n > 0.5) {
                      acc.push(n, ', ' , nextEl + (i + 1 === array.length - 1 ? '' : '-'));
                  }
              }
              return acc;
            }, []).join('');

            roomNumer.append(valArea);

            } else if (value === '') {
              roomNumer.empty()
              roomNumer.append("?????????? ????????????");
            } else {
              roomNumer.empty()
              roomNumer.append(value);
            }
          }
          break;

        case 'check-in-date': 
        {
          if (value) {
            $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${value} :???????? ????????????</span></div>`)
          }
        }
          break;

        case 'price':
        case 'rentAreaCommerce':
        case 'buyAreaCommerce':
          break;

        case 'fullAreaRent':
        case 'fullAreaBuy':
          {
            if (value === '') {
              $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title"><strong>????</strong> ???? ${value} :?????????????? ??????????</span></div>`)
            } else {
              $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title"><strong>????</strong> ???? ${value[1]} ???? ${value[0]} :?????????????? ??????????</span></div>`)
            }
          }
          break;

        case 'noFirstFloreRent': 
          $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${value} :????????</span></div>`)

          break;

        case 'noLastFloreRent': 
          $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${value} :????????</span></div>`)
          break;

        case 'fleatRent':
        case 'fleatBuy':
          {
            if (Array.isArray(value)) {
              $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${value[0]} - ${value[1]} : ????????</span></div>`)
            } else {
              $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${value} : ????????</span></div>`)
            }
          }
          break;

        case 'equipment1Rent':
        case 'equipment2Rent':
        case 'equipment3Rent':
        case 'equipment4Rent':
        case 'equipment5Rent':
          
          $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">???????? :${value}</span></div>`)
          break;

        case 'areaTypeBuilduing':
          if (Array.isArray(value)) {
            typeProperty.empty()
            typeProperty.append(data.areaTypeBuilduing.join(', '));
          } else {
            typeProperty.empty()
            typeProperty.append(data.areaTypeBuilduing);
          }

          break;

        case 'paymentType':

          $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${value} :?????? ????????????</span></div>`)
          break;

        default:
          // do this
          $(".tags").append(`<div class="option-item"><button type="button" data-clear-name="${name}" class="closer" ><span aria-hidden="true">&times;</span></button><span class="title">${text}</span></div>`)
          break;
      }
    }
  });

  hendleMoreTags(dataArray)
};

// ???????????????????? ???????????? ?? ?????????????? ?????????? ?????? ????????????????
const setDataToForm = (data) => {
  $("#allFilters").val(JSON.stringify(data));
};

// ???????????????????????? ?? ???????????? ????????????
const updateData = (values) => {
  const screenWidth = window.screen.width;

  data = {
    [categoryName]: $(`${categorySelector}:checked`).val(),
    ...values
  };


  if (screenWidth < 768) {
    data = {
      [categoryNameMobile]: $(`${categoryMobileSelector}:checked`).val(),
      ...values
    };
  }

  
  setDataToForm(data);
  renderTags();
};

const resetAllForms = () => {
  // ?????????? ?????????????????????? ????????????
  updateData({});

  // ?????????? ???????? ????????
  $(rentForm)[0].reset();
  $(buyForm)[0].reset();
  $(rentFormMobile)[0].reset();
  $(buyFormMobile)[0].reset();
}

// ?????????????????? ??????????????????
$(categorySelector).on("change", (e) => {
  $(".main-filters, .modals").toggleClass("hide");

  resetAllForms()
});

$(categoryMobileSelector).on("change", (e) => {
  $(".main-filters, .modals").toggleClass("hide");

  resetAllForms()
});

$('.ressetFilterAll').on('click', () => {
  resetAllForms()
})

// ???????????????? ???????? ???? ?????????????????? ????????????
forms.find("input").on("change", function () {
  $(this).parents().filter("form").submit();
});

// ?????????????????? ???????????????? ?????????? ?? ???????????????????? ????????????
forms.submit(function (e) {
  e.preventDefault();

  const formData = $(this)
    .serializeArray()
    .reduce((acc, { name, value }) => {
      if (acc[name]) {
        if (Array.isArray(acc[name])) {
          return { ...acc, [name]: [...acc[name], value] };
        } else {
          return { ...acc, [name]: [acc[name], value] };
        }
      }

      return { ...acc, [name]: value };
    }, {});

    updateData(formData);
});

// ???????????????? ???????? ?? ?????????????? ???????????????? ?? ???????????? ???? ???????????? ???? ????????
$(document).on("click", "[data-clear-name]", function (e) {
  const name = $(this).data("clearName");

  const form = $(this).parents().filter("form");

  form
    .find(`input[name="${name}"]`)
    .each(function () {
      switch ($(this).attr("type")) {
        case "checkbox":
        case "radio":
          $(this).prop("checked", false);
          break;

        default:
          $(this).val("");
          break;
      }
    })
    .submit();
});

// handling to the top property page
$(document).ready(function() {
  const btnToTheTop = $('#btnToTheTop');
  
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btnToTheTop.addClass('show');
    } else {
      btnToTheTop.removeClass('show');
    }
  });
  
  btnToTheTop.on('click', function(e) {
    e.preventDefault();
    $(document).scrollTop(0)
  });
})