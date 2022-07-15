"use strict"
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('Check gitLab')
    let isToggle = true;


    // Функция throttle будет принимать 2 аргумента:
    // - callee, функция, которую надо вызывать;
    // - timeout, интервал в мс, с которым следует пропускать вызовы.
    function throttle(callee, timeout) {
        // Таймер будет определять,
        // надо ли нам пропускать текущий вызов.
        let timer = null;

        // Как результат возвращаем другую функцию.
        // Это нужно, чтобы мы могли не менять другие части кода,
        // чуть позже мы увидим, как это помогает.
        return function perform(...args) {
            // Если таймер есть, то функция уже была вызвана,
            // и значит новый вызов следует пропустить.
            if (timer) return;

            // Если таймера нет, значит мы можем вызвать функцию:
            timer = setTimeout(() => {
                // Аргументы передаём неизменными в функцию-аргумент:
                callee(...args);

                // По окончании очищаем таймер:
                clearTimeout(timer);
                timer = null;
            }, timeout);
        };
    }

    //Саня на jquery не переписывай
    //Аккардион для меню
    class AccardionMenu{
        constructor({
                        container= null,
                        activeClass = 'popup_list_show',
                        classElements = null,
                        btnClass = null,
                        toggleElClass = null,
                        classActive = ''
                    }) {
            this.container = document.querySelector(container)
            this.classElements = this.container.querySelectorAll(classElements)
            this.btnClass = btnClass
            this.toggleElClass = toggleElClass
            this.classActive = classActive
        }
        init(){
            this.classElements.forEach(item=>{
                let btn = item.querySelector(this.btnClass),
                    popup_list = item.querySelector(this.toggleElClass);
                btn.addEventListener('click', (e)=>{
                    popup_list.classList.toggle(this.classActive)
                    btn.classList.toggle('active')
                })
            })
        }
    }


    //Sliders
    class SliderOwl{
        constructor({
                        wrapperClass = null,
                        ShowMedia = false,
                        MediaSize = 1000,
                        params = {}
                    }){
            this.wrapperClass =wrapperClass
            this.ShowMedia = ShowMedia
            this.MediaSize = MediaSize
            this.params = params
        }
        init(){
            let wrapper = document.querySelector(this.wrapperClass)
            wrapper.classList.add('owl-carousel')
            wrapper.classList.add('owl-theme')
            console.log(this.ShowMedia)
            if(this.ShowMedia){

                if(document.body.clientWidth <= this.MediaSize){
                    $(this.wrapperClass).owlCarousel({
                        ...this.params
                    })
                }

            }
        }
    }


    //Функция считает сколько было проскроленно
    function showScrollMenu(){
        console.log('scroll')
        let scrollDoc = window.scrollY
        if(isToggle == true){
            if(scrollDoc > 700){
                document.body.classList.add('fixed_menu_active')
                document.body.classList.add('is_scroll')
            }else{
                document.body.classList.remove('fixed_menu_active')
                document.body.classList.remove('is_scroll')
            }
        }
    }
    //Пропускает некоторые вызовы функции что бы не загружать страницу расчетами
    const optimizedHandler = throttle(showScrollMenu, 250);
    window.addEventListener("scroll", optimizedHandler);


    //Переключатель классов
    class TogglerClases{
        constructor({triger = null,
                        toggleEl = null,
                        listener = 'click',
                        classActive = null ,
                        closeBtn='.close_btn',
                        overlay = '.overlay',
                        showOveraly = true,
                        bodyClass = '',
                        listenerOut = null,
                        isScrollTop = false
                    }) {
            this.triger = document.querySelectorAll(triger)
            this.listener = listener
            this.classActive = classActive
            this.toggleEl = document.querySelector(toggleEl)
            this.closeBtn = closeBtn
            this.overlay = document.querySelector(overlay)
            this.showOveraly = showOveraly
            this.bodyClass = bodyClass
            this.listenerOut = listenerOut,
                this.isScrollTop = isScrollTop
        }

        init(){
            this.open()
            this.close()

        }
        close(){
            try{
                let closeBtn = this.toggleEl.querySelector(this.closeBtn)
                closeBtn.addEventListener('click', (e)=>{
                    e.preventDefault()
                    isToggle = true
                    this.toggleEl.classList.remove(this.classActive)
                    this.overlay.style.display = ''
                    if(this.bodyClass){
                        document.body.classList.remove(this.bodyClass)
                    }
                })
            }catch(e){

            }
            if(this.listenerOut != null){
                this.triger.forEach(item=>{
                    item.addEventListener(this.listenerOut, (e)=>{
                        e.preventDefault()
                        item.classList.remove('active')
                    })
                })
            }

            if(document.body.classList.contains('is_scroll ')){

                isToggle = true
                document.body.classList.add('fixed_menu_active')
            }
        }

        open(){
            this.triger.forEach(item=>{
                item.addEventListener(this.listener, (e)=>{
                    e.preventDefault()
                    if(this.isScrollTop){
                        scrollTo(0,0)
                        // isToggle = false
                    }
                    // isToggle = false
                    item.classList.add('active')
                    try{
                        this.toggleEl.classList.add(this.classActive)
                    }catch(e){

                    }

                    if(this.showOveraly){
                        this.overlay.style.display = 'block'
                    }
                    if(this.bodyClass) {
                        document.body.classList.add(this.bodyClass)
                    }

                    if(document.body.classList.contains('is_scroll')){
                        if(document.body.classList.contains('active_left_menu_from_fixed')){

                        }else{
                            document.body.classList.remove('fixed_menu_active')
                        }

                    }
                })
            })

        }
    }

    //Анимация для кнопок
    class animateTranslate{
        constructor({elements = null,
                        classActive = '',
                        listener = 'mouseover',
                        listenerOut = null}){
            this.elements = document.querySelectorAll(elements);
            this.listener = listener;
            this.listenerOut = listenerOut;
            this.classActive = classActive;
        }



        animateEl(){
            let isOn = false;
            let tl = anime.timeline({
                duration: 400,
                easing: 'spring(1, 80, 10, 0)',
                loop:false
            })
            this.elements.forEach(item=>{
                item.addEventListener(this.listener, (e)=>{
                    isOn = true
                    if(isOn){
                        item.classList.add(this.classActive)
                        e.preventDefault()
                        tl.add({
                            targets: item,
                            translateX: -20,
                            easing: 'spring',
                        })
                    }
                    if(this.listenerOut != null){
                        // item.addEventListener(this.listenerOut, (e)=>{
                        //     isOn = false
                        //     item.classList.remove(this.classActive)
                        //     tl.add({
                        //         targets: item,
                        //         translateX: 20,
                        //         easing: 'spring',
                        //     })
                        // })
                    }
                })

            })
        }
    }

    //Анимация animate.css
    class animateVariable{
        constructor({elements = null, listener = 'mouseover', listenerOut= null, animateName = ''}){
            this.elements = document.querySelectorAll(elements)
            this.listener = listener
            this.animateName = animateName
            this.listenerOut = listenerOut
        }

        play(){
            let animate = false;
            this.elements.forEach(item=>{
                item.addEventListener(this.listener, (e)=>{
                    e.preventDefault();
                    animate = false;
                   setTimeout(()=>{
                       item.classList.add(`animate__animated`)
                       item.classList.add(`${this.animateName}`)
                   }, 100)
                })
                setTimeout(()=>{
                    animate = true
                    if(animate){
                        if(this.listenerOut != null){
                            item.addEventListener(this.listenerOut, (e)=>{
                                e.preventDefault();
                                item.classList.remove(`animate__animated`)
                                item.classList.remove(`${this.animateName}`)
                            })
                        }
                    }
                },1500)


            })
        }
    }

    //Табы
    class ToggleTabs{
        constructor({
                        itemsTabs = null,
                        wrapperItemsContent = null,
                        itemsContent= null,
                        classActive='show',
                        animationName='animate__fadeInRight',
                        topLink = null,
                        line = false}) {
            this.itemsTabs = document.querySelectorAll(itemsTabs)
            this.wrapperItemsContent = document.querySelectorAll(wrapperItemsContent)
            this.classActive = classActive
            this.animationName = animationName
            this.topLink = topLink
            this.line = line
        }
        clearClass(id){
            for(let i = 0; i <  this.itemsTabs.length; i++ ){
                this.itemsTabs[i].classList.remove('item_active')
                this.wrapperItemsContent[i].classList.remove(this.classActive)
                this.wrapperItemsContent[i].classList.remove(this.animationName)
            }
            this.wrapperItemsContent[id].classList.add(this.classActive)
            this.wrapperItemsContent[id].classList.add(this.animationName)
        }
        init(){
            let line = document.querySelector('#line')
            this.itemsTabs[0].classList.add('item_active')
            this.wrapperItemsContent[0].classList.add(this.classActive)
            if(this.topLink != null){
                let l = document.querySelector(this.topLink)
                l.textContent = this.itemsTabs[0].dataset.text;
                l.href = this.itemsTabs[0].dataset.url;
            }
            if(this.line != false) {
                let left = this.itemsTabs[0].offsetLeft,
                    elWidth = this.itemsTabs[0].offsetWidth,
                    color = this.itemsTabs[0].dataset.color;
                line.style.cssText = `
                        transform: translateX(${(left + (elWidth / 2)) - 15}px);
                        background: ${color};
            }
          
                    `
            }
            this.itemsTabs.forEach((item,id)=>{
                item.addEventListener('click', (e)=>{
                    e.preventDefault()
                    if(this.line){
                        let left = item.offsetLeft,
                            elWidth = item.offsetWidth,
                            color = item.dataset.color;
                        line.style.cssText = `
                        transform: translateX(${(left + (elWidth / 2)) - 15}px);
                        background: ${color};
                    `
                    }


                    this.clearClass(id)
                    if(!item.classList.contains('item_active')){
                        item.classList.add('item_active')
                    }
                    if(this.topLink != null){
                        let l = document.querySelector(this.topLink)
                        l.textContent = item.dataset.text;
                        l.href = item.dataset.url;
                    }
                })
            })
        }
    }

    //Выпадашки селектор
    class selectList{
        constructor({
            triggerEl = null,
            popupList = "",
            classActive = ''
                    }){
            this.triggerEl = document.querySelectorAll(triggerEl)
            this.popupList = popupList
            this.classActive = classActive
        }

        init(){

            this.triggerEl.forEach(item=>{
                item.addEventListener('click', (e)=>{
                    e.preventDefault();
                    item.classList.toggle(this.classActive)
                    let list = item.querySelector(this.popupList)
                    list.addEventListener('click', (e)=>{
                        e.preventDefault()
                        let target = e.target;
                        console.log(target)
                        if(target.classList.contains('item')){
                            let text = item.querySelector('span')
                            text.textContent = target.textContent.trim()
                        }
                    })
                })
            })
        }
    }

    //Переключатель картинок
    class toggleImgs{
        constructor({mainImg = null, imgList = null}){
            this.mainImg = document.querySelector(mainImg)
            this.imgList = document.querySelector(imgList)
        }

        init(){
            this.imgList.addEventListener('click', (e)=>{
                let target = e.target
                if(target.src){
                    this.clearClass()
                    target.parentNode.classList.add('active')
                    this.mainImg.src = target.src
                }
            })
        }
        clearClass(){
            let count = this.imgList.querySelectorAll('li')
            for(let i = 0; i < count.length; i++){
                this.imgList.children[i].classList.remove('active')
            }
        }

    }


    class catalogSort{
        constructor({
                        elements=null,
                        count=5,
                        showLenght = false
                    }) {
            this.elements = document.querySelectorAll(elements)
            this.count = count
            this.showLenght = showLenght
        }

        init(){
            this.elements.forEach(item=>{
                let menuElements = item.querySelector('ul')
                let menulinks = menuElements.querySelectorAll('li')
                let btnShow = menuElements.querySelector('.show_list')
                if(menulinks.length >= this.count){
                    item.classList.add('popup_menu_item')
                }else{
                    btnShow.remove()
                }
                if(btnShow != undefined){
                    if(this.showLenght){
                        let count = menulinks.length
                        btnShow.innerHTML = `<span>+${count - 9}</span>`
                        btnShow.classList.add('count')
                        if(count - 9 < 1){
                            btnShow.remove()
                        }
                    }
                    btnShow.addEventListener('click', (e)=>{
                        e.preventDefault()
                        btnShow.classList.toggle('active')
                        item.classList.toggle('popup_menu_item_active')
                        if(!this.showLenght){
                            if(btnShow.textContent.trim() == 'Паказать все' ){
                                btnShow.textContent = 'Скрыть'
                            }else{
                                btnShow.textContent = 'Паказать все'
                            }
                        }


                    })
                }
            })

        }
    }

    //Класс для обрезки текста
    class sliceText{
        constructor({elements = null, count = 500}){
            this.elements = document.querySelectorAll(elements)
            this.count = count
        }
        slile(){
            this.elements.forEach(item=>{
                if(item.textContent.length > this.count){
                    let fullText = item.innerHTML.trim()
                    let text = item.innerHTML.trim()
                    item.innerHTML = `${text.slice(0, this.count)} ...`
                    let btnShow = document.createElement('div')
                    btnShow.classList.add('btn_show_text')
                    item.appendChild(btnShow)
                    btnShow.textContent = 'Подробнее'
                    btnShow.addEventListener('click', ()=>{
                        btnShow.classList.toggle('open')
                            if(btnShow.classList.contains('open')){
                                item.innerHTML = fullText
                                item.appendChild(btnShow)
                                btnShow.textContent = 'Скрыть'
                            }else{
                                item.innerHTML = `${text.slice(0, this.count)} ...`
                                item.appendChild(btnShow)
                                btnShow.textContent = 'Подробнее'
                            }

                    })
                }
            })
        }
    }
    //Класс для переноса обектов
    class relocateElements {
        constructor({element = null, elementRel = null, removeClass = null, copy = false}) {
            this.element = document.querySelector(element)
            this.elementRel = document.querySelector(elementRel)
            this.removeClass = removeClass
            this.copy = copy
        }

        relocate() {
            if(this.copy != true){
                this.elementRel.appendChild(this.element)
                if(this.removeClass != null){
                    this.element.classList.remove(this.removeClass)
                }
            }else{
                let copyEl = this.element.cloneNode(true);
                this.elementRel.appendChild(copyEl)
                if(this.removeClass != null){
                    copyEl.classList.remove(this.removeClass)
                }
            }

        }
    }


    try{
        //добавление меню в фиксированое меню
        const actionMenuForFixed = new relocateElements({
            element: '.action_menu',
            elementRel: '.action_menu_fixed'
        })
        actionMenuForFixed.relocate()


        const phonesToTabs = new relocateElements({
            element: '.header_phones',
            elementRel: '.tablet_header_phones ',
            removeClass: 'col-5',
            copy: true
        })
        phonesToTabs.relocate()
    }catch(e){

    }


    //Фильтр на странице каталога
    const sortFilterTop = new selectList({
        triggerEl: '.popup_filter',
        popupList: '.select_list',
        classActive: 'popup_active'
    })
    sortFilterTop.init()


    //обрезка текста
    try{
        const seoText = new sliceText({
            elements: '.seo_text',
            count: 290
        })
        seoText.slile()
    }catch (e) {}
    //Переключение табов на главной
    try {
        const tabs = new ToggleTabs({
            itemsTabs: '.item_tab',
            wrapperItemsContent: '.items_wrapper',
            topLink: '#toggle_link',
            line: true

        })
        tabs.init()
    }catch (e) {}

    try{
        const tabsToggleSectionBtn = new ToggleTabs({
            itemsTabs: '.item_tab',
            wrapperItemsContent: '.items_wrapper',
            topLink: '.link_for_tabs',
            line: true
        })
        tabsToggleSectionBtn.init()
    }catch(e){
        console.log(e)
    }


    //Анимация ссылок
    const sectionLink = new animateVariable({
            elements: '.section_link',
            listener: 'mouseover',
            animateName: 'section_link_animation',
            listenerOut: 'mouseout'
        })
    sectionLink.play()



    //Подлючение аккардиона к меню
    const accardionMenu = new AccardionMenu({
            container: '.left_menu_catalog ',
            classElements: '.item_list',
            btnClass: '.accardion_trigger',
            toggleElClass: '.popup_list',
            classActive: 'popup_list_show'
        })
    accardionMenu.init()

    //Вызов меню каталога
    try {
        const ShowCatalogLeft = new TogglerClases({
            triger: '#catalog_btn',
            toggleEl: '.left_menu_catalog',
            classActive: 'left_menu_catalog_active'
        })
        ShowCatalogLeft.init()

        const ShowCatalogLeftFixed = new TogglerClases({
            triger: '#catalog_btn_fixed',
            toggleEl: '.left_menu_catalog',
            classActive: 'left_menu_catalog_active',
            bodyClass: 'active_left_menu_from_fixed'
        })
        ShowCatalogLeftFixed.init()


        const ShowCatalogLeftTablet = new TogglerClases({
            triger: '#catalog_btn_tablet',
            toggleEl: '.left_menu_catalog',
            classActive: 'left_menu_catalog_active'
        })
        ShowCatalogLeftTablet.init()
    }catch (e) {}

    //Вызов поисковика
    try{
        const serachToggle = new TogglerClases({
            triger: '.search_input',
            toggleEl: '.serach_result',
            classActive: 'serach_result_active',
            showOveraly: false,
            bodyClass: 'active_serach',
            isScrollTop: true
        })
        serachToggle.init()
    }catch(e){}
    //Анимация елементов под главным слайдером
    try {
        const specialItemAnimate = new TogglerClases({
            triger: '.special_item',
            listener: 'mouseover',
            classActive: 'animate',
            showOveraly: false,
            listenerOut: 'mouseout'

        })
        specialItemAnimate.init()
    }catch (e) {}





    //Слайдер основной на главной
    try{
        const sliderInfo = new SliderOwl({
            wrapperClass: '.special_item_list',
            ShowMedia: true,
            MediaSize: 1090,
            params: {
                loop:false,
                nav:false,
                items: 3,
                margin: 16,
                dots:false,
                autoWidth:true,
                responsive  : {
                    746:{
                      items: 3
                    },
                    745:{
                        items: 2.5,
                        autoWidth:true,
                    }
                }
            }
        })
        sliderInfo.init()
        $('.banners_slider').owlCarousel({
            loop:true,
            nav:false,
            items: 1,

        })


        $('.brands_list').owlCarousel({
            loop:true,
            nav:false,
            items: 6,
            dots:false,
            responsive:{
                1091:{
                    items: 6
                },
                1090:{
                    items: 5
                },
                700:{
                    items: 4
                }
            }
        })
        let owl = $('.brands_list');
        owl.owlCarousel();
        // Go to the next item
        $('.arrow_btn_next_brands').click(function() {
            owl.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.arrow_btn_prev_brands').click(function() {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            owl.trigger('prev.owl.carousel', [300]);
        })

        if(document.body.clientWidth <= 780){
            owl.trigger('destroy.owl.carousel')
            owl.classList.remove('owl-carousel')
            owl.classList.remove('owl-theme')
        }
    }catch (e) {}

    //Слайдеры на главной
    try{
           $('.reviews_list').owlCarousel({
               loop:true,
               nav:false,
               items: 3,
               dots:false,
               margin: 16,
               responsive:{
                   1091:{
                       items: 3
                   },
                   700:{
                       items: 2
                   }
               }
           })
           let owlReviews = $('.reviews_list');
           owlReviews.owlCarousel();
           // Go to the next item
           $('.arrow_btn_next_reviews').click(function() {
               owlReviews.trigger('next.owl.carousel');
           })
           // Go to the previous item
           $('.arrow_btn_prev_reviews').click(function() {
               // With optional speed parameter
               // Parameters has to be in square bracket '[]'
               owlReviews.trigger('prev.owl.carousel', [300]);
           })
       }catch (e) {}
    //Обрезка кол-ва елементов в меню каталога
    const optionalList = new catalogSort({
        elements:'.wrapper_optional_list',
        count: 5
    })
    optionalList.init()
    //Обрезка кол-во елементов меню
    try{
        const catalogPageMenu = new catalogSort({
            elements: '.catalog_list_toggler_item',
            count: 6,

        })
        catalogPageMenu.init()
    }catch(e){}
    //Обрезка кол-во брендов в фильтре
    try{
            const catalogPageMenuBrand = new catalogSort({
                elements: '.select_list',
                count: 6
            })
        catalogPageMenuBrand.init()
        }catch(e){}
    //Обрезка кол-ва картинок в переключателе
    try {
        const imgListDetail = new catalogSort({
            elements: '.wrapper_imgs_list',
            count: 8,
            showLenght: true
        })
        imgListDetail.init()


    }catch(e){}
    //Переключение картинок на детальной странице
    try {
        const toggleImgsDetailPage = new toggleImgs({
            mainImg: '.full_img',
            imgList: '.imgs_list'
        })
        toggleImgsDetailPage.init()
    }catch(e){}
    //Табы на детальной странице товара
    try{
        const tabsDetailPage = new ToggleTabs({
            itemsTabs: '.item_tab',
            wrapperItemsContent: '.item_tab_content',
            line: false,
            classActive: 'show'
        })
        tabsDetailPage.init()
    }catch(e){}


    //Обрезка кол-во елементов в фильтре
    try {
        const fillterCategoryList = new catalogSort({
            elements: '.category_list_fillter',
            count: 5
        })
        fillterCategoryList.init()
    }catch (e) {}

    //Фильтр цены
    try{
        let minToggle = document.querySelector('.min-toggle');
        let maxToggle = document.querySelector('.max-toggle');

        $('#price-range-submit').hide();

        $(".min_price,.max_price").on('change', function () {

            $('#price-range-submit').show();

            var min_price_range = parseInt($(".min_price").val() );

            var max_price_range = parseInt($(".max_price").val());

            if (min_price_range > max_price_range) {
                $('.max_price').val(min_price_range);
            }

            $(".slider-range").slider({
                values: [min_price_range, max_price_range]
            });

        });


        $(".min_price,.max_price").on("paste keyup", function () {
            $('#price-range-submit').show();

            var min_price_range = parseInt($(".min_price").val());

            var max_price_range = parseInt($(".max_price").val());

            if(min_price_range == max_price_range){

                max_price_range = min_price_range + 100;

                $(".min_price").val(min_price_range);
                $(".max_price").val(max_price_range);
            }

            $(".slider-range").slider({
                values: [min_price_range, max_price_range]
            });

        });

            $(function () {
                $(".slider-range").slider({
                    range: true,
                    orientation: "horizontal",
                    min: 0,
                    max: 100000,
                    values: [0, 100000],
                    step: 100,

                    slide: function (event, ui) {
                        if (ui.values[0] == ui.values[1]) {
                            return false;
                        }

                        $(".min_price").val(`${ui.values[0]}`);
                        $(".max_price").val(`${ui.values[1]}`);
                    }
                });

                $(".min_price").val($(".slider-range").slider("values", 0));
                $(".max_price").val($(".slider-range").slider("values", 1));

            });



    }catch (e) {}
    //обрезка текста на подробной странице
    try{
        const detailDescrText = new sliceText({
            elements: '.descr_slice',
            count: 490
        })
        detailDescrText.slile()
    }catch (e) {}


    //Меню планшетной версии
    function relocateMenuForTab(){
        const infoMenu = document.querySelector('.info_menu')
        const popupMenu = document.querySelector('.left_menu_catalog_list')
        const leftMenuCatalog = document.querySelector('.left_menu_catalog')
        const headerPhones = document.querySelector('.header_phones')
        const menuCol = document.querySelector('.menu_col')
        popupMenu.classList.add('mobile_left_menu')

        infoMenu.appendChild(menuCol)
        infoMenu.appendChild(headerPhones)

        leftMenuCatalog.classList.add('mobile_tabs_active')
        popupMenu.appendChild(infoMenu)
    }


    function tabsInleftMenu(){
        const leftMenuCatalogMobile = document.querySelector('.left_menu_catalog_mobile')
        const tabItem = leftMenuCatalogMobile.querySelectorAll('.tab')
        const mobileLeftMenu = document.querySelector('.mobile_left_menu')
        const mobileTtabsActive = document.querySelector('.mobile_tabs_active ')
        const closeBtn = mobileTtabsActive.querySelector('.close_btn')
        tabItem.forEach((item,id)=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault()
                clearClass(tabItem, 'active')
                item.classList.add('active')
                mobileLeftMenu.children[id].style.display = 'flex'
            })
        })
        let elementsFirstMenu = mobileLeftMenu.children[0].querySelectorAll('li');
        elementsFirstMenu.forEach(item=>{
            item.addEventListener('click', (e)=>{
                if(item.children[1] != null && item.children[1] != undefined){
                    e.preventDefault()
                    item.children[1].classList.add('active_mobile_popup_menu')
                    closeBtn.style.zIndex = '2500'
                    closeBtn.classList.add('back_menu')
                    closePopupMenu(item.children[1])
                }else{
                    console.log('not submenu')
                }
            })


        })
        function closePopupMenu(element){
            console.log(element)
            closeBtn.addEventListener('click', (e)=>{
                if(closeBtn.classList.contains('back_menu')){
                    element.classList.remove('active_mobile_popup_menu')
                    closeBtn.classList.remove('back_menu')
                }
            })
        }
        function clearClass(element, className){
            for(let i = 0; i < element.length; i++){
                element[i].classList.remove(className)
                mobileLeftMenu.children[i].style.display = 'none'
            }
        }
    }

    if(document.body.clientWidth <= 1090){
        relocateMenuForTab()
        tabsInleftMenu()
    }
    function relocateHeaderOptions (){
        const itemsCount = document.querySelector('.items_count')
        const mobileFixedOptionList = document.querySelector('.menu_fixed_list')
        const userLink = document.querySelector('.user');
        itemsCount.appendChild(userLink)
        mobileFixedOptionList.appendChild(itemsCount)
    }
    if (document.body.clientWidth < 781){
        relocateHeaderOptions()


        const sliderTabs = new SliderOwl({
            wrapperClass: '.tabs_content_item',
            ShowMedia: true,
            MediaSize: 781,
            params: {
                loop:false,
                nav:false,
                items: 4,
                margin: 16,
                dots:false,
                autoWidth:true,

            }
        })
        sliderTabs.init()
    }
});
