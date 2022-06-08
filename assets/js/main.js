"use strict"
document.addEventListener('DOMContentLoaded', ()=>{
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
                        listenerOut = null
                    }) {
            this.triger = document.querySelectorAll(triger)
            this.listener = listener
            this.classActive = classActive
            this.toggleEl = document.querySelector(toggleEl)
            this.closeBtn = closeBtn
            this.overlay = document.querySelector(overlay)
            this.showOveraly = showOveraly
            this.bodyClass = bodyClass
            this.listenerOut = listenerOut
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
        }

        open(){
            this.triger.forEach(item=>{
                item.addEventListener(this.listener, (e)=>{
                    e.preventDefault()
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
                // easing: 'linear',
                easing: 'spring(1, 80, 10, 0)',
                // direction: 'alternate',
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
            this.elements.forEach(item=>{
                item.addEventListener(this.listener, (e)=>{
                    e.preventDefault();
                    item.classList.add(`animate__animated`)
                    item.classList.add(`${this.animateName}`)
                })
                if(this.listenerOut != null){
                    item.addEventListener(this.listenerOut, (e)=>{
                        e.preventDefault();
                        item.classList.remove(`animate__animated`)
                        item.classList.remove(`${this.animateName}`)
                    })
                }
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
                        animationName='animate__fadeInRight'}) {
            this.itemsTabs = document.querySelectorAll(itemsTabs)
            this.wrapperItemsContent = document.querySelectorAll(wrapperItemsContent)
            this.classActive = classActive
            this.animationName = animationName
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
            this.itemsTabs[0].classList.add('item_active')
            this.wrapperItemsContent[0].classList.add(this.classActive)
            this.itemsTabs.forEach((item,id)=>{
                item.addEventListener('click', (e)=>{
                    e.preventDefault()
                    this.clearClass(id)
                    if(!item.classList.contains('item_active')){
                        item.classList.add('item_active')
                    }
                })
            })
        }
    }

    const tabs = new ToggleTabs({
        itemsTabs: '.item_tab',
        wrapperItemsContent: '.items_wrapper',

    })
    tabs.init()











    //Анимация кнопки в поиске
    const sectionLink = new animateTranslate({
        elements: '.section_link',
        classActive: 'animate_after',

    })
    sectionLink.animateEl()




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
    }catch (e) {

    }

    //Вызов поисковика
    try{
        const serachToggle = new TogglerClases({
            triger: '.search_input',
            toggleEl: '.serach_result',
            classActive: 'serach_result_active',
            showOveraly: false,
            bodyClass: 'active_serach'
        })
        serachToggle.init()
    }catch(e){

    }


    const specialItemAnimate = new TogglerClases({
        triger: '.special_item',
        listener: 'mouseover',
        classActive: 'animate',
        showOveraly: false,
        listenerOut: 'mouseout'

    })
    specialItemAnimate.init()






    //slider
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
});
