// var show = document.querySelector('.show')
// ajax({
//     url: '../json/banner.json',
//     type: "get",
//     dataType: "json",
//     cache: false,
//     success: function (json) {
//         console.log(json)
//         var str = ''
//         json.forEach(function (item, index, json) {
//             console.log(item)
//             // str += `<img src="${item.img}" alt="" class="show_img">`
//             str += `<div class="swiper-slide show"><img src="${item.img}" alt=""></div>`
//         })
//         show.innerHTML = str
//     }
// });

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
//筛选列表切换
var selNew = $1('.list_top_r .list_sel .sel_new')
console.log(selNew)
selNew.onclick = function () {
    console.log(this.nextSibling.nextSibling)
    this.nextSibling.nextSibling.classList.toggle('sel_show')
}

//数据渲染页面
var listBox = $1('.list_goods .list_ul')
ajax({
    url: '../json/fila_goodlist.json',
    type: 'get',
    data: "json",
    caches: false,
    success: function (json) {
        console.log(JSON.parse(json))
        var listArr = JSON.parse(json).data;
        var str = '';
        listArr.forEach(function (item, index, json) {
            console.log(item)
            console.log(item.info.pro_name)
            var strLi = ''
            str += `<li class="list_libox">
            <div class="show_box">
                <a href="" class="show_good"  >
                    <img class="normal_show" _src="${item.info.image}" src="${item.info.image}" alt="">
                </a>
                <p >${item.info.pro_name}</p>
                <ul>
                `
            item.child.forEach(function (ite, index, json) {
                console.log(ite)
                strLi += `<li><a href=""><img _src='${ite.image.normal}' src="${ite.image.small}" alt=""></a></li>`
            })
            strLi += `</ul>
                        <div class="price">
                            <span class="price_now">¥${item.info.price}</span>
                            <span class="price_pre">¥${item.info.market_price}</span>
                        </div>
                        </div>
                        </li>`
            str += strLi
        })
        listBox.innerHTML = str
        var smallLi=$2('.show_box ul li ');
        var normalShow=$2('.show_box .normal_show')
        var listLi=$2('.list_goods .list_ul .list_libox')
        for(var i=0,len=smallLi.length;i<len;i++){
            smallLi[i].index=i
            smallLi[i].onmouseenter=function(){
                // console.log(this)
                    // console.log(this.firstChild.firstChild)
                   var normalSrc= this.firstChild.firstChild.getAttribute('_src')
                //    console.log(normalShow)
                // console.log(this.parentNode.previousElementSibling.previousElementSibling.firstElementChild)
                 this.parentNode.previousElementSibling.previousElementSibling.firstElementChild.src=normalSrc
            }
        }
        for(var i=0,len=listLi.length;i<len;i++){
            listLi[i].onmouseleave=function(){
                console.log(this.firstElementChild.firstElementChild.firstElementChild)
                this.firstElementChild.firstElementChild.firstElementChild.src=this.firstElementChild.firstElementChild.firstElementChild.getAttribute('_src')
            }
        }
        
    }
});

