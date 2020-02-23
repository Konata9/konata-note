import React from 'react'
import ReactDOM from 'react-dom'

const confirmStyle = {
  width: '30%',
  height: '10vh',
  position: 'absoulute',
  border: '1px solid gray',
  borderRadius: '10px',
  margin: '0 auto',
}

const Confirm = (props = {}) => {
  const { message, onConfirm = () => { }, onCancel = () => { } } = props

  const doOnConfirm = (e) => {
    onConfirm(e)
  }

  const doOnCancel = (e) => {
    onCancel(e)
  }

  return (
    <div id="__confirm__" style={confirmStyle}>
      <div>{message}</div>
      <div>
        <button onClick={doOnConfirm}>Confirm</button>
        <button onClick={doOnCancel}>Cancel</button>
      </div>
    </div>
  )
}

let confirmNode = null
const confirm = async (message, options = {}) => {
  const { onConfirm = () => { }, onCancel = () => { } } = options
  confirmNode = document.createElement('div')
  document.body.appendChild(confirmNode)
  return new Promise((resolve) => {
    ReactDOM.render(<Confirm message={message} onConfirm={onConfirm} onCancel={onCancel} />, confirmNode, () => {
      resolve(document.getElementById('__confirm__'))
    })
  })
}