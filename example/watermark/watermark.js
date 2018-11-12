/**
 * options:
 *  startPos 水印出现的起始位置 left, top
 *  separate 水印的间隔距离 left, top
 *  text, x, y, width, height, rotate, text-align, font-size, font-weight, color, bg, opacity, 
 */

function WaterMark(text, options, invisible = true) {
  var options = options ? options : {}

  this._text = text

  this._waterMarkLeft = options.startPos ? options.startPos.left : 20
  this._waterMarkTop = options.startPos ? options.startPos.top : 20

  this._waterMarkSeparateLeft = options.separate ? options.separate.left : 40
  this._waterMarkSeparateTop = options.separate ? options.separate.top : 40

  this._waterMarkWidth = options.width || 120
  this._waterMarkHeight = options.height || 40
  this._waterMarkRotate = options.rotate || 45
  this._waterMarkTextAlign = options.textAlign || 'center'
  this._waterMarkFontSize = options.fontSize || 12
  this._waterMarkFontWeight = options.fontWeight || 'none'
  this._waterMarkColor = options.color || '#c5c8ce'
  this._waterMarkBackgroundColor = options.bgColor || 'transparent'
  this._waterMarkOpacity = invisible ? 0.005 : (options.opacity || 0.5)

  //初始化容器样式
  this.init()
}

// 初始化水印容器
WaterMark.prototype.initWaterMarkContainer = function () {
  this._waterMarkContainer = document.createElement('div')
  this._waterMarkContainer.className = 'waterMark-container'

  this._waterMarkContainer.style.pointerEvents = 'none'
  this._waterMarkContainer.style.position = 'absolute'
  this._waterMarkContainer.style.top = 0
  this._waterMarkContainer.style.left = 0
  this._waterMarkContainer.style.zIndex = 1000
}

WaterMark.prototype.getPageInfo = function () {
  this._pageWidth = Math.max(document.body.scrollWidth, document.body.clientWidth)
  this._pageHeight = Math.max(document.body.scrollHeight, document.body.clientHeight)

  // 根据页面大小计算行列数
  this._cols = Math.ceil(this._pageWidth / (this._waterMarkWidth + this._waterMarkSeparateLeft))
  this._rows = Math.ceil(this._pageHeight / (this._waterMarkHeight + this._waterMarkSeparateTop))
}

WaterMark.prototype.init = function () {
  this._body = document.getElementsByTagName('body')[0]
  this._waterMarkFragment = document.createDocumentFragment()

  this.getPageInfo()
  this.initWaterMarkContainer()
}

// 单个水印块的状态设置
WaterMark.prototype.createWaterMarkBlock = function (id, top, left) {
  var waterMarkBlcok = document.createElement('div')
  waterMarkBlcok.id = id
  waterMarkBlcok.style.className = 'waterMark-block'

  waterMarkBlcok.innerHTML = this._text

  waterMarkBlcok.style.width = `${this._waterMarkWidth}px`
  waterMarkBlcok.style.height = `${this._waterMarkHeight}px`
  waterMarkBlcok.style.transform = `rotate(${this._waterMarkRotate}deg)`

  waterMarkBlcok.style.pointerEvents = 'none'

  waterMarkBlcok.style.position = 'absolute'
  waterMarkBlcok.style.top = top
  waterMarkBlcok.style.left = left

  waterMarkBlcok.style.textAlign = this._waterMarkTextAlign
  waterMarkBlcok.style.fontSize = this._waterMarkFontSize
  waterMarkBlcok.style.fontWeight = this._waterMarkFontWeight
  waterMarkBlcok.style.color = this._waterMarkColor
  waterMarkBlcok.style.background = this._waterMarkBackgroundColor
  waterMarkBlcok.style.opacity = this._waterMarkOpacity

  return waterMarkBlcok
}

WaterMark.prototype.create = function () {
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      var id = '' + i + j
      var left = `${(j) * (this._waterMarkWidth + this._waterMarkSeparateLeft)}px`
      var top = `${(i) * (this._waterMarkHeight + this._waterMarkSeparateTop)}px`

      this._waterMarkFragment.appendChild(this.createWaterMarkBlock(id, top, left))
    }
  }

  this._waterMarkContainer.appendChild(this._waterMarkFragment)
  this._body.appendChild(this._waterMarkContainer)
}

window.onload = function () {
  // 初始化水印
  var waterMark = new WaterMark('测试用水印，1234567|2234', { opacity: .6, rotate: 35 }, false)
  waterMark.create()

  var code = ''

  // document.body.onkeypress = function (e) {
  //   var keychar = String.fromCharCode(e.keyCode)
  //   code += keychar
  //   // if (e.keyCode === '13') {
  //   //   console.log(e)
  //   // }
  // }

  document.getElementById('Description').onkeypress = function (e) {
    var keychar = String.fromCharCode(e.keyCode)
    code += keychar
  }

  // document.onkeyup = function (e) {
  //   console.log(code)
  // }

}

// onresize 时要加上节流方法，不然要爆炸
// window.onresize = function () {
//   var waterMark = new WaterMark('测试用水印，1234567，2234', { opacity: .8 })
//   console.log('onresize')
//   waterMark.create()
// }