//tab 切换
var tabH = $2('.login_tab h6')
var tabForm = $2('.left_con .tab_form')
// console.log(tabForm)
var prevIndex = 0
for (var i = 0, len = tabH.length; i < len; i++) {
    tabH[i].index = i
    tabH[i].onclick = function () {
        console.log(this)
        tabH[prevIndex].classList.remove('active')
        tabForm[prevIndex].classList.remove('show')
        tabH[this.index].classList.add('active')
        tabForm[this.index].classList.add('show')
        prevIndex = this.index

    }
}

//登录验证
var passBtn = $1('.login_form .pass_btn')
console.log(passBtn)

// 手机号验证 
var phoneNum = $1('.tab_form .phone_num');
var arr = []
console.log(phoneNum);
for (var i = 0, len = phoneNum.length; i < len; i++) {
    phoneNum[i].onblur = function () {
        var val = this.value.replace(/\s+/g, '') //去掉空格
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(val)) {
            alert('输入有误,请输入13位有效号码')
            arr[0] = 0
        } else {
            arr[0] = 1
        }
    }
}
//密码验证
var loginPass = $1('.tab_form .login_pass')
loginPass.onblur = function () {
    var val = this.value.replace(/\s+/g, '') //去掉空格
    var reg1 = /\d+/
    var reg2 = /[a-z]+/i
    var reg3 = /[^0-9a-z]+/i
    var flag = 0
    if ((val.length < 8 || val.length > 18)) {
        alert('输入有误,请输入8-18位数密码')
        arr[1] = 0
        return
    }
    if (reg1.test(val)) {
        flag++
    }
    if (reg2.test(val)) {
        flag++
    }
    if (reg3.test(val)) {
        flag++
    }
    if (flag < 2) {
        alert('密码必须包含字母、数字或特殊字符中的两种')
    } else {
        arr[1] = 1
    }
}
passBtn.onclick = function () {
    console.log("ppp");
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === 0) {
            alert('请正确输入')
        } else {
            var phoneIpt = phoneNum.value
            console.log(phoneIpt)
            var obj1 = JSON.parse(localStorage.getItem("phoneNumber"))
            console.log(obj1.phone)
            
            if (obj1.phone == phoneIpt) {
                alert('登录成功,欢迎回来')
                window.open('./index.html')
            } else {
                alert('您还未注册,请先注册再登录')
            }
        }
    }
}


//注册
// 图片验证码点击刷新
var picNum = $1('.checkcode_img')
console.log(picNum)
picNum.onclick = function () {
    picNum.src = picNum.src + Date.now()
}
var phoneNumber = $1('.login_message .phone_num')
var messBtn = $1('.login_message .mess_btn')
messBtn.onclick = function () {
    var phoneVal = phoneNumber.value
    var obj = {
        phone: phoneVal
    }
    localStorage.setItem("phoneNumber", JSON.stringify(obj));
}