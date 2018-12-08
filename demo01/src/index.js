import { name } from './name'
import './base.css'
import avatar from './image/26681854.png'
import './reset.less'
import jQuery from 'jquery'
import moment from 'moment'
// import 'style-loader!css-loader!./public.scss'
// loader的其他写法

// require('expose-loader?jQuery!jquery') // 内联loader，
// window.jQuery = jQuery
// 全局的jQuery对象

console.log(jQuery)
console.log(moment)

document.querySelector('#root').innerHTML = name
var AVATAR_URL = avatar // 相对于输出目录的跟路径，有可能返回一个新的文件路径，也有可能返回一个base64图片编码
var img = new Image()
img.src = AVATAR_URL
document.body.appendChild(img)

console.log(name)
// 执行上下文，这是一个局部变量
// 如果你有一个第三方插件，依赖全局对象下的属性
// window.jQuery
console.log(_)
