var goodsCodeu = location.href.split('?')[1].split('=')[1]
// console.log(location.href.split('?')[1].split('=')[1]) //62206
var mainDetail = $1('.main')
ajax({
    url: '../json/good_detail.json',
    type: 'get',
    caches: false,
    data: 'json',
    async: 'true',
    success: function (json) {
        // console.log(json);
        var jsonArr = JSON.parse(json)
        var str = '';
        var strUl = '';
        var strBd = '';
        jsonArr.forEach(function (item, index, json) {
            if (item.id_goods == goodsCodeu) {
                item.image.master.forEach(function (itemMas, index, json) {
                    // console.log(itemMas)
                    strUl += ` <li class="view_img"><img src="${itemMas.path}" alt=""></li>`
                })
                str = `<div class="main_left">
            <div class="left_view">
                <div class="view_imgBox">
                    <a href="#" class="small_prev"></a>
                    <ul class="view_ul">
                    ${strUl}
                    </ul>
                    <a href="#" class="small_next"></a>
                </div>
                <div class="view_like">
                    <i class="iconfont icon-shoucangjia"></i>
                    <a href="#" class="view_collect">收藏</a>
                </div>
            </div>
            <div class="left_showImg">
                <div class="bigImg_box">
                    <img src="${item.bigimg}" alt="">
                </div>
            </div>

            </div>
            <div class="main_right">
            <div class="right_top">
                <h3 class="good_name">${item.pro_title}</h3>
                <p class="good_sn">款号：${item.id_alias}</p>
                <p class="good_price">
                    ¥${item.price}
                    <span class="mkprice">¥${item.market_price}</span>
                </p>
                <div class="fila_sales">
                    <p class="sales_title">促销</p>
                    <a href="#">【免运费】会员专享</a>
                </div>
            </div>
            <div class="right_mid">
                <div class="good_color">
                    <p class="color_txt">颜色:</p>
                    <ul class="color_img">
                        <li class="color_code">
                            <img src="${item.color.image_url}" alt="">
                        </li>

                    </ul>
                </div>
                <div class="good_size">
                    <p class="size_txt">尺码:</p>
                <ul class="size_ul">
                    <li class="size_num"><span>S</span></li>
                    <li class="size_num"><span>M</span></li>
                    <li class="size_num"><span>X</span></li>
                    <li class="size_num"><span>XL</span></li>
                    <li class="size_num"><span>2XL</span></li>
                    <li class="size_num"><span>3XL</span></li>
                    <li class="size_num"><span>4XL</span></li>
                </ul>
                </div>
                <div class="good_num">
                    <div class="num_left">购买数量</div>
                    <div class="num_box">
                        <a href="javascript:;" class="num_minus" >-</a>
                        <input type="text" class="num_input" value="1">
                        <a href="javascript:;" class="num_plus">+</a>
                    </div>

                </div>
                <div class="good_btn">
                    <a href="javascript:;" class="btn_chart">加入购物车</a>
                    <a href="./good_cart.html" class="btn_buy">立即购买</a>
                </div>
            </div>
            </div>
            <div class="main_bottom">
            `
                item.image.bd.forEach(function (ite, index, json) {
                    // console.log(ite)
                    strBd += `<img src="${ite.path}" alt="">`
                })
                strBd += "</div>"
            }
        })
        str += strBd
        mainDetail.innerHTML = str

        // 图片切换
        var viewImg = $2('.view_imgBox .view_ul .view_img')
        var showBox = $1('.left_showImg .bigImg_box')

        for (var i = 0, len = viewImg.length; i < len; i++) {
            viewImg[i].index = i
            viewImg[i].onmouseenter = function () {
                console.log(this.firstChild)
                var imgSrc = this.firstChild.getAttribute('src')
                console.log(imgSrc)
                console.log(showBox.firstElementChild)
                showBox.firstElementChild.src = imgSrc
            }
        }

        //商品数量变更
        var numMinus = $1('.good_num .num_box .num_minus ')
        var numPlus = $1('.good_num .num_box .num_plus ')
        var numInput = $1('.good_num .num_box .num_input')
        var inputTxt = numInput.getAttribute('value')
        console.log(inputTxt)
        //增加
        numPlus.onclick = function () {
            inputTxt++;
            numInput.setAttribute('value', inputTxt)
        }
        //减少
        numMinus.onclick = function () {
            inputTxt--;
            if (inputTxt < 1) {
                inputTxt = 1
                alert('已经不能再少了...')
            }
            numInput.setAttribute('value', inputTxt)
        }


        var btnChart = $1('.good_btn .btn_chart');
        var btnBuy = $1('.good_btn .btn_buy');
        //点击加入购物车
        btnChart.onclick = function () {
            //获取商品的数量和id  inputTxt  goodsCodeu
            var cartArr = []
            //判断本地存储中是否已有商品
            if (localStorage.getItem("good")) {
                cartArr = JSON.parse(localStorage.getItem("good"))
            }
            var flag = false //标记
            cartArr.forEach(function (item, index, self) {
                if (item.id === goodsCodeu){
                    item.num += inputTxt
                    flag = true
                }
            })
            if(!flag){
                cartArr.push({
                    'id':goodsCodeu,
                    'num':inputTxt 
                })
            }
            //更新本次存储
            localStorage.setItem('good',JSON.stringify(cartArr))
            alert('已加入购物车')
            // console.log(inputTxt)
            
        }
    }
})