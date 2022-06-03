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
                        bodyClass = ''
                    }) {
            this.triger = document.querySelector(triger)
            this.listener = listener
            this.classActive = classActive
            this.toggleEl = document.querySelector(toggleEl)
            this.closeBtn = closeBtn
            this.overlay = document.querySelector(overlay)
            this.showOveraly = showOveraly
            this.bodyClass = bodyClass
        }

        init(){
            this.open()
            this.close()

        }
        close(){
            let closeBtn = this.toggleEl.querySelector(this.closeBtn)
            closeBtn.addEventListener('click', (e)=>{
                e.preventDefault()
                this.toggleEl.classList.remove(this.classActive)
                this.overlay.style.display = ''
                if(this.bodyClass){
                    document.body.classList.remove(this.bodyClass)
                }
            })
        }

        open(){
            this.triger.addEventListener(this.listener , (e)=>{
                e.preventDefault()
                this.toggleEl.classList.add(this.classActive)
                if(this.showOveraly){
                    this.overlay.style.display = 'block'
                }
                if(this.bodyClass) {
                    document.body.classList.add(this.bodyClass)
                }
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

    //slider
    $('.banners_slider').owlCarousel({
        loop:true,
        nav:false,
        items: 1,

    })
});
