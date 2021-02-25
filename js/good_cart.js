;
(function () {
    var goodArr = []
    if (localStorage.getItem('good')) {
        goodArr = JSON.parse(localStorage.getItem('good'))
    }
    ajax({
        url: '../json/good_detail.json',
        type: 'get',
        datatype: 'json',
        success: function (json) {
            // console.log(json)
            var str = '';
            var cartUl = $1('.cart_goods .cart_ul')
            console.log(cartUl)
            var jsonData = JSON.parse(json);
            jsonData.forEach(function (item, index, self) {
                console.log(item)
                goodArr.forEach(function (ite, index, self) {
                    console.log(ite)
                    if (item.id_goods == ite.id) {
                        str += `<li class="cart_li" >
                        <input type="checkbox" class="li_input">
                        <i></i>
                        <div class="li_img">
                            <a href="./good_detail.html?id=${ite.id}" target="_blank">
                                <img src="${item.bigimg}" alt="">
                            </a>
                        </div>
                        <div class="li_detail">
                            <div class="detail_l">
                                <h5 class="title_t">${item.pro_title}</h5>
                                <p>颜色:${item.color.attr_name};尺码:S</p>
                            </div>
                            <div class="detail_r">
                                <span class="detail_price">¥${item.price}</span>
                                <span class="detail_mkprice">¥${item.market_price}</span>
                            </div>
                            <div class="detail_num">
                                <p class="num_l">
                                    <span class="num_txt">数量:</span>
                                    <a href="javascript:;" class="num_minus" minusCode="${ite.id}">-</a>
                                    <input type="text" class="num_ipt" value="${ite.num}" >
                                    <a href="javascript:;" class="num_plus" plusCode="${ite.id}">+</a>
                                </p>
                                <p class="num_r">
                                    <a href="javascript:;" delCode="${ite.id}">删除</a>
                                </p>
                            </div>

                        </div>
                    </li>`
                    }
                })
            })
            cartUl.innerHTML = str
            //商品数量增减
            var numMinus = $2('.num_l .num_minus')
            var numPlus = $2('.num_l .num_plus')
            // var numValue=$2('.num_l .num_ipt')
            // var valueTxt =numValue.value
            console.log(numMinus)
            numMinus.forEach(function (item, index, self) {
                console.log(item)
                item.onclick = function () {
                    console.log(this.nextElementSibling)
                    var valueTxt = this.nextElementSibling.value
                    valueTxt--
                    this.nextElementSibling.value = valueTxt
                    if (valueTxt < 1) {
                        alert('已经不能再少了...')
                        this.nextElementSibling.value = 1
                    }
                    //更新本地存储
                    var minusId = this.getAttribute('minusCode')
                    // console.log(minusId)
                    goodArr.forEach(function (item, index, self) {
                        if (item.id == minusId) {
                            item.num = valueTxt
                            localStorage.setItem('good', JSON.stringify(goodArr))
                        }
                    })

                }
            })
            numPlus.forEach(function (item, index, self) {
                console.log(item)
                item.onclick = function () {
                    console.log(this.previousElementSibling

                    )
                    var valueTxt = this.previousElementSibling.value
                    valueTxt++
                    this.previousElementSibling.value = valueTxt
                    if (valueTxt > 20) {
                        alert('商品库存不足...')
                        this.previousElementSibling.value = 20
                    }
                    //更新本地存储
                    var plusId = this.getAttribute('plusCode')
                    // console.log(minusId)
                    goodArr.forEach(function (item, index, self) {
                        if (item.id == plusId) {
                            item.num = valueTxt
                            localStorage.setItem('good', JSON.stringify(goodArr))
                        }
                    })
                }
            })
            //点击删除
            var delLi = $2('.num_r a')
            // console.log(delLi)
            delLi.forEach(function (item, index, self) {
                // console.log(item)
                item.onclick = function () {
                    var flag = true
                    var sumPrice = 0
                    var delId = this.getAttribute('delCode')
                    var inputI = $1('.cart_top i')
                    // console.log(this.parentNode.parentNode.parentNode.parentNode)
                    //删除dom结构
                    this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode)
                    //删除本地存储中的数据
                    goodArr.forEach(function (item, index, self) {
                        if (item.id == delId) {
                            goodArr.splice(index, 1)
                            localStorage.setItem('good', JSON.stringify(goodArr))
                        }
                    })
                    //
                    var liIpt = $2('.cart_li .li_input')
                    liIpt.forEach(function (item, index, self) {
                        if (item.checked) {
                            // console.log(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText)
                            var goodNum = item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.value
                            var goodPrice = parseInt(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText.split('¥')[1])
                            // console.log(goodPrice)
                            sumPrice += goodNum * goodPrice
                        } else {
                            flag = false
                        }

                    })
                    var totolPrice = $1('.sum_r .sum_price')
                    totolPrice.innerHTML = "¥" + sumPrice + ".00"
                    var checkAll = $1('.cart_top .checkbox_all')
                    if (flag) {
                        checkAll.checked =true
                        inputI.classList.add('bg_blue')
                    }

                }
            })
            //全选框
            var checkAll = $1('.cart_top .checkbox_all')
            var inputI = $1('.cart_top i')

            var liIpt = $2('.cart_li .li_input')

            checkAll.onchange = function () {
                inputI.classList.add('bg_blue')
                console.log(this.checked)
                var flag = this.checked
                // _this=this //保存this指向
                var sumPrice = 0
                liIpt.forEach(function (item, index, self) {
                    item.checked = flag
                    item.nextElementSibling.classList.add('bg_blue')
                    if (!flag) {
                        inputI.classList.remove('bg_blue')
                        item.nextElementSibling.classList.remove('bg_blue')
                    }

                    if (item.checked) {
                        // console.log(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText)
                        var goodNum = item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.value
                        var goodPrice = parseInt(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText.split('¥')[1])
                        // console.log(goodPrice)
                        sumPrice += goodNum * goodPrice
                    }
                })
                var totolPrice = $1('.sum_r .sum_price')
                totolPrice.innerHTML = "¥" + sumPrice + ".00"
            }
            //单选
            liIpt.forEach(function (item, index, self) {
                item.onchange = function () {
                    var sumPrice = 0
                    var flag = true
                    liIpt.forEach(function (item, index, self) {
                        if (item.checked) {
                            item.nextElementSibling.classList.add('bg_blue')
                            var goodNum = item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.value
                            var goodPrice = parseInt(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText.split('¥')[1])
                            // console.log(goodPrice)
                            sumPrice += goodNum * goodPrice
                        } else {
                            flag = false
                            item.nextElementSibling.classList.remove('bg_blue')
                        }
                    })
                    var totolPrice = $1('.sum_r .sum_price')
                    totolPrice.innerHTML = "¥" + sumPrice + ".00"
                    if (flag) {
                        checkAll.checked = true
                        inputI.classList.add('bg_blue')

                    } else {
                        checkAll.checked = false
                        inputI.classList.remove('bg_blue')
                    }
                }


            })


            //底部全选框
            // var checkBottom=$1('.sum_l .checkbox_ipt')

            // checkBottom.onclick=function(){
            //     inputI.classList.add('bg_blue')
            //                 console.log(this.checked)
            //                 var flag = this.checked
            //                 // _this=this //保存this指向
            //                 var sumPrice = 0
            //                 liIpt.forEach(function (item, index, self) {
            //                     item.checked = flag
            //                     item.nextElementSibling.classList.add('bg_blue')
            //                     if (!flag) {
            //                         inputI.classList.remove('bg_blue')
            //                         item.nextElementSibling.classList.remove('bg_blue')
            //                     }

            //                     if (item.checked) {
            //                         // console.log(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText)
            //                         var goodNum = item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.value
            //                         var goodPrice = parseInt(item.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.firstElementChild.innerText.split('¥')[1])
            //                         // console.log(goodPrice)
            //                         sumPrice += goodNum * goodPrice
            //                     }
            //                 })
            //                var totolPrice=$1('.sum_r .sum_price')
            //                totolPrice.innerHTML ="¥"+sumPrice+".00"

            // }

            var buyIt =$1('.main_content_r .buyIt')
            buyIt.onclick=function(){
                alert('购买成功...再逛逛吧')
            }


        }
    })



















})()