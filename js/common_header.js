var mySwiper = new Swiper('.swiper-container', {
    // direction: '', // 垂直切换选项
    // loop: true, 
    autoplay: true,
    observer: true
});

var show = document.querySelector('.show')
ajax({
    url: '../json/banner.json',
    type: "get",
    dataType: "json",
    cache: false,
    success: function (json) {
        console.log(json)
        var str = ''
        json.forEach(function (item, index, json) {
            console.log(item)
            // str += `<img src="${item.img}" alt="" class="show_img">`
            str += `<div class="swiper-slide show"><img src="${item.img}" alt=""></div>`
        })
        show.innerHTML = str
    }
});

//导航切换
var navs = $2('.nav_top .nav_ul  li .title ');
var nav_uls = $2('.nav_top .nav_ul  li  ul');
var prevIndex = 0;
// var 
for (var i = 0, len = navs.length; i < len; i++) {
    navs[i].index = i;
    navs[i].onclick = function () {
        console.log(this)
        if (prevIndex !== this.index) {
            
            nav_uls[prevIndex].classList.remove('nav_show')
        }

        // this.parentNode.nextSibling
        // console.log( this.parentNode.nextSibling.nextSibling)
        var navClass = this.parentNode.nextSibling.nextSibling
        navClass.classList.toggle('nav_show')
        prevIndex = this.index
        console.log(prevIndex)
    }
}