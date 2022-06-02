"use strict"
document.addEventListener('DOMContentLoaded', ()=>{
    //Саня на jquery не переписывай
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

    const accardionMenu = new AccardionMenu({
        container: '.left_menu_catalog ',
        classElements: '.item_list',
        btnClass: '.accardion_trigger',
        toggleElClass: '.popup_list',
        classActive: 'popup_list_show'
    })
    accardionMenu.init()

    class TogglerClases{
        constructor({triger = null, toggleEl = null, listener = 'click', classActive = null , closeBtn='.close_btn', overlay = '.overlay'}) {
            this.triger = document.querySelector(triger)
            this.listener = listener
            this.classActive = classActive
            this.toggleEl = document.querySelector(toggleEl)
            this.closeBtn = closeBtn
            this.overlay = document.querySelector(overlay)
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
            })
        }

        open(){
            this.triger.addEventListener(this.listener , (e)=>{
                e.preventDefault()
                this.toggleEl.classList.add(this.classActive)
                this.overlay.style.display = 'block'
            })
        }
    }

    try {
        const ShowCatalogLeft = new TogglerClases({
            triger: '#catalog_btn',
            toggleEl: '.left_menu_catalog',
            classActive: 'left_menu_catalog_active'
        })
        ShowCatalogLeft.init()
    }catch (e) {

    }


    //slider
    $('.banners_slider').owlCarousel({
        loop:true,
        nav:false,
        items: 1,

    })
});
