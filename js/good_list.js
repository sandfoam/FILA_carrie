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
        function aaa(data){

            var str = '';
            data.forEach(function (item, index, json) {
                console.log(item)
                console.log(item.info.pro_name)
                var strLi = ''
                str += `<li class="list_libox">
                <div class="show_box">
                    <a href="./good_detail.html?id=${item.info.id_goods}" target='_blank' class="show_good"  >
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
        }
        console.log(JSON.parse(json))
        var listArr = JSON.parse(json).data;
        aaa(listArr)
        var smallLi = $2('.show_box ul li ');
        var normalShow = $2('.show_box .normal_show')
        var listLi = $2('.list_goods .list_ul .list_libox')
        for (var i = 0, len = smallLi.length; i < len; i++) {
            smallLi[i].index = i
            smallLi[i].onmouseenter = function () {
                // console.log(this)
                // console.log(this.firstChild.firstChild)
                var normalSrc = this.firstChild.firstChild.getAttribute('_src')
                //    console.log(normalShow)
                // console.log(this.parentNode.previousElementSibling.previousElementSibling.firstElementChild)
                this.parentNode.previousElementSibling.previousElementSibling.firstElementChild.src = normalSrc
            }
        }
        for (var i = 0, len = listLi.length; i < len; i++) {
            listLi[i].onmouseleave = function () {
                console.log(this.firstElementChild.firstElementChild.firstElementChild)
                this.firstElementChild.firstElementChild.firstElementChild.src = this.firstElementChild.firstElementChild.firstElementChild.getAttribute('_src')
            }
        }

        //点击筛选 价格排序
        console.log(json)
        var priceLow = $1('.drop_menu .price_low')
        var priceHeight=$1('.drop_menu .price_height')
        var priceSort = JSON.parse(json).data
        console.log(priceSort)
        priceHeight.onclick = function () {
                priceSort.sort((a,b)=>{
                    return b.info.price-a.info.price 
                })
            console.log(priceSort);
            aaa(priceSort)
        }
        priceLow.onclick = function () {
            priceSort.sort((a,b)=>{
                return a.info.price-b.info.price 
            })
        console.log(priceSort);
        aaa(priceSort)
    }

    }
});

{
    let arr = [
      {
        name: "张三",
        age: 20,
        sex: "男"
      },
      {
        name: "李四",
        age: 16,
        sex: "女"
      },
      {
        name: "王五",
        age: 21,
        sex: "男"
      },
      {
        name: "马六",
        age: 28,
        sex: "男"
      },
      {
        name: "昊七",
        age: 19,
        sex: "女"
      }
    ];
  let arr1 =  arr.sort((a, b) => {
      return a.age - b.age; // 升序
    });
    console.log(arr);
    // {name: "李四", age: 16, sex: "女"}
    // {name: "昊七", age: 19, sex: "女"}
    // {name: "张三", age: 20, sex: "男"}
    // {name: "王五", age: 21, sex: "男"}
    // {name: "马六", age: 28, sex: "男"}
    console.log(arr);
    console.log(arr1);
    
  }