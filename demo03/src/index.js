// module.exports = 'hello world'

// console.log('hello world')

import './index.css'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

function Home(params) {
  return (
    <div>Home</div>
  )
}

ReactDOM.render(<Home/>, document.querySelector('#root'))