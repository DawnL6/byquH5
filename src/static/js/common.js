import Fastclick from 'fastclick'

(function () {
    // 解决移动端300ms的click事件延迟
    document.addEventListener('DOMContentLoaded', function (event) {
        new Fastclick(document.body)
    })
})()