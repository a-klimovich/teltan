(function(){
  const $filterModalContetn = $('#filterModalContent')

  // MAP property content
  if ($('#map').length) {
    ymaps.ready(init);
  
    function init(){
      const myLocation = [54.241584, 25.786242];
  
      myMap = new ymaps.Map("map", {
        center: myLocation,
        zoom: 12
      }),
  
      myPlacemark = new ymaps.Placemark(myLocation, {}, {
        preset: 'islands#redIcon'
      });
  
      myMap.geoObjects.add(myPlacemark);
    }
  }

  $('.filterTogglerMobile').on('click', (e) => {
    e.preventDefault()
    $filterModalContetn.toggleClass('visible')

    $('body').toggleClass('filter-open')
  })

  $(document).mouseup(e => {
    if(!$filterModalContetn.is(e.target) && $filterModalContetn.has(e.target).length === 0) {
      $filterModalContetn.removeClass('visible')
      $('body').removeClass('filter-open')
    }
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

  //Content Sliders
  $(document).ready(function(){
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
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
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
      asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      prevArrow: '<div class="dots-arrow dots-arrow-prev"><i class="icon-left-arrow rotate-180"></i></div>',
      nextArrow: '<div class="dots-arrow dots-arrow-next"><i class="icon-left-arrow"></i></div>',
      focusOnSelect: true,
    });
  });

  
  

  // Slider Counter
  const $itemSlider =  $('#itemSlider');

  $itemSlider.on('slid.bs.carousel', function (e) {
    $itemSlider.find('.current-slide-number').text(e.to + 1);
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

    constructor(options) {
      this.options = {
        ...this.options,
        options,
      };

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
    }
  }

  new Wizard();

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
      const filteredFiles = Array.from(this.fileList).filter((file) => file.name !== fileId)
      filteredFiles.forEach((file) => dt.items.add(file))

      this.fileList = dt.files

      this.updateOutputInput()

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

