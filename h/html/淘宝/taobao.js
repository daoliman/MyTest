var service_sdf= document.getElementsByClassName('service-bd')[0].getElementsByTagName("li")[0]

var service_float=document.getElementById("service-float");

service_sdf.onmouseover=function(){
    service_float.style.display = 'block';
}
service_sdf.onmouseout=function(){
    service_float.style.display = 'none';
}
service_float.onmouseover=function(){
    service_float.style.display = 'block';
}
service_float.onmouseout=function(){
    service_float.style.display = 'none';
}

//轮播
var box = document.getElementById('box');
var ball = document.getElementById('ball');
var btns = document.getElementById('btn').getElementsByTagName('li');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var flag = true;
var l = 0;
//设置第一个焦点高亮
btns[0].style.opacity = '0.9';
//自动轮播
var timer = setTimeout(scroll, 1000);
//自动轮播函数
function scroll() {
    l -= 520;
    //判断是否滚到最后一张
    if (l == -3640) {
        l = -520;
        ball.style.left = 0;
    }
    //大图调用运动函数
    move.speedDown({
        dom: ball,
        attr: {
            left: l
        },
        step: 10,
        callback: function () {
            //设置循环
            if (flag == true) {
                clearTimeout(timer)
                timer = setTimeout(scroll, 5000);
            }
        }
    })
    //焦点切换
    //所有焦点非高亮
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.opacity = '0.2';
    }
    //判断大图是否走到最后一张
    if (-l / 520 == 6) {
        btns[0].style.opacity = '0.9';
    }
    //当前位置焦点高亮
    if (btns[-l / 520]) {
        btns[-l / 520].style.opacity = '0.9';
    }
}
//点击切换
for (var i = 0; i < btns.length; i++) {
    btns[i].index = i;
    btns[i].onmouseover = function () {
        //停止自动轮播
        clearTimeout(timer);
        //保证轮播从当前位置开始
        l = this.index * -520;
        //设置焦点高亮
        for (var i = 0; i < btns.length; i++) {
            btns[i].style.opacity = '0.2';
        }
        this.style.opacity = '0.9';
        //调用运动函数，大图切换
        move.speedDown({
            dom: ball,
            attr: {
                left: this.index * -520
            },
            step: 10
        })
    }
}
//滑入停止
box.onmouseover = function () {
    flag = false;
    clearTimeout(timer)
    prev.style.display = 'block';
    next.style.display = 'block';
    move.speedDown({
        dom: prev,
        attr: {
            opacity: 100
        },
        step: 100
    })
    move.speedDown({
        dom: next,
        attr: {
            opacity: 100
        },
        step: 100
    })
}
//滑出循环轮播
box.onmouseout = function () {
    timer = setTimeout(scroll, 1000);
    flag = true;
    move.speedDown({
        dom: prev,
        attr: {
            opacity: 0
        },
        step: 100,
        callback: function () {
            prev.style.display = 'none';
        }
    })
    move.speedDown({
        dom: next,
        attr: {
            opacity: 0
        },
        step: 100,
        callback: function () {
            next.style.display = 'none';
        }
    })
}
//返回上一张
prev.onclick = function () {
    l += 520;
    if (l > 0) {
        l = -3000;
        ball.style.left = -3600 + 'px';
    }
    move.speedDown({
        dom: ball,
        attr: {
            left: l
        },
        step: 10
    })
    //焦点切换
    //所有焦点非高亮
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.opacity = '0.2';
    }
    //判断大图是否走到最后一张
    if (-l / 520 == 6) {
        btns[0].style.opacity = '0.9';
    }
    //当前位置焦点高亮
    if (btns[-l / 520]) {
        btns[-l / 520].style.opacity = '0.9';
    }
    //阻止文本被选中
    this.onselectstart = function () {
        return false;
    }
}
//前进到下一张
next.onclick = function () {
    l -= 520;
    if (l == -3640) {
        l = -520;
        ball.style.left = 0 + 'px';
    }
    move.speedDown({
        dom: ball,
        attr: {
            left: l
        },
        step: 10
    })
    //焦点切换
    //所有焦点非高亮
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.opacity = '0.2';
    }
    //判断大图是否走到最后一张
    if (-l / 520 == 6) {
        btns[0].style.opacity = '0.9';
    }
    //当前位置焦点高亮
    if (btns[-l / 520]) {
        btns[-l / 520].style.opacity = '0.9';
    }
    //阻止文本被选中
    this.onselectstart = function () {
        return false;
    }
}


/*move.speedDown({
 dom: div,     //设置运动的元素
 attr: 'width',   //设置变化的属性
 end: 600,        //设置变化的终点
 step: 40,        //步数
 callback: function () {     //回调函数
 self.style.background = "blue";
 }
 })*/

var move = {
    //获取元素样式
    getStyle: function (obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, false)[attr];
    },
    //缓冲运动
    speedDown: function (opt) {
        //保存this
        var self = this;
        //清除已有计时器
        clearInterval(opt.dom.timer);
        //添加计时器
        opt.dom.timer = setInterval(function () {
            //假设动画结束
            opt.dom.isMove = true;
            for (key in opt.attr) {
                if (key == 'opacity') {
                    var start = parseFloat(self.getStyle(opt.dom, key)) * 100;
                } else {
                    var start = parseFloat(self.getStyle(opt.dom, key));
                }
                var len = ((opt.attr[key] - start) / opt.step) > 0 ? Math.ceil((opt.attr[key] - start) / opt.step) : Math.floor((opt.attr[key] - start) / opt.step);

                if (start != opt.attr[key]) {
                    if (key == 'opacity') {
                        //关闭动画结束的开关
                        opt.dom.isMove = false;
                        opt.dom.style.opacity = (start + len) / 100;
                        opt.dom.style.filter = 'alpha(opacity=' + parseFloat(start + len) + ')';
                    } else {
                        //关闭动画结束的开关
                        opt.dom.isMove = false;
                        opt.dom.style[key] = (start + len) + 'px';
                    }
                }
                //判断是否结束动画
                if (opt.dom.isMove) {
                    clearInterval(opt.dom.timer);
                    opt.callback ? opt.callback() : null;
                }
            }
        }, 10)
    }
}/**
 * Created by Administrator on 2017/10/11.
 */
