"use strict"
document.addEventListener('DOMContentLoaded', ()=>{
    let isToggle = true;
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



    window.addEventListener('scroll', (e)=>{
        let scrollDoc = window.scrollY
        console.log(scrollDoc)
        if(isToggle == true){
            if(scrollDoc > 700){
                document.body.classList.add('fixed_menu_active')
                document.body.classList.add('is_scroll')
            }else{
                document.body.classList.remove('fixed_menu_active')
                document.body.classList.remove('is_scroll')
            }
        }
    })


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


    const sortFilterTop = new selectList({
        triggerEl: '.popup_filter',
        popupList: '.select_list',
        classActive: 'popup_active'
    })
    sortFilterTop.init()



try {
    const tabs = new ToggleTabs({
        itemsTabs: '.item_tab',
        wrapperItemsContent: '.items_wrapper',
        topLink: '#toggle_link',
        line: true

    })
    tabs.init()
}catch (e) {

}

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
    }catch (e) {

    }

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
    }catch(e){

    }

try {
    const specialItemAnimate = new TogglerClases({
        triger: '.special_item',
        listener: 'mouseover',
        classActive: 'animate',
        showOveraly: false,
        listenerOut: 'mouseout'

    })
    specialItemAnimate.init()
}catch (e) {


//Фильтр в каталоге

}






try{
    $('.banners_slider').owlCarousel({
        loop:true,
        nav:false,
        items: 1,

    })


    $('.brands_list').owlCarousel({
        loop:true,
        nav:false,
        items: 6,
        dots:false
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

}catch (e) {

}
    //slider
   try{
       $('.reviews_list').owlCarousel({
           loop:true,
           nav:false,
           items: 3,
           dots:false,
           margin: 16
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
   }catch (e) {

   }



    //catalog

    class catalogSort{
        constructor({elements=null, count=5}) {
            this.elements = document.querySelectorAll(elements)
            this.count = count

        }

        init(){
            this.elements.forEach(item=>{
                let menuElements = item.querySelector('ul')
                let menulinks = menuElements.querySelectorAll('li')
                let btnShow = menuElements.querySelector('.show_list')
                if(menulinks.length > this.count){
                    item.classList.add('popup_menu_item')
                }
                if(btnShow != undefined){
                    btnShow.addEventListener('click', (e)=>{
                        e.preventDefault()
                        btnShow.classList.toggle('active')
                        item.classList.toggle('popup_menu_item_active')
                        if(btnShow.textContent.trim() == 'Паказать все' ){
                            btnShow.textContent = 'Скрыть'
                        }else{
                            btnShow.textContent = 'Паказать все'
                        }
                    })
                }
            })

        }
    }

try{
    const catalogPageMenu = new catalogSort({
        elements: '.catalog_list_toggler_item',
        count: 6
    })
    catalogPageMenu.init()
}catch(e){

}
try{
        const catalogPageMenuBrand = new catalogSort({
            elements: '.select_list',
            count: 6
        })
    catalogPageMenuBrand.init()
    }catch(e){

    }


    const fillterCategoryList = new catalogSort({
        elements: '.category_list_fillter',
        count: 5
    })
    fillterCategoryList.init()


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

});
