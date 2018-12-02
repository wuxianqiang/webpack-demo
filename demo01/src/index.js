import { name } from './name'
import './base.css'
import avatar from './image/26681854.png'

document.querySelector('#root').innerHTML = name
const AVATAR_URL = avatar // 相对于输出目录的跟路径
let img = new Image()
img.src = AVATAR_URL
document.body.appendChild(img)

console.log(name)
