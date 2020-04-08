'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
const imgView = document.getElementById('img-view')
const viewType = document.querySelector('.view-type')
const imageName = document.querySelector('.imageName')
console.log(imageName.innerHTML)

const imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1586377453/fraboni/Visite01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1586377460/fraboni/Visite02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1586377462/fraboni/Visite03.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1586377454/fraboni/Visite04.jpg',
]
const imgName= [
  'RDC vue 1',
  'RDC vue 2',
  'RDC vue 3',
  'RDC vue 4',
]

let num = 0

const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(   
    'Camera',
   9,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const check = () => {
  num <= 3 || num === 9 ?( () => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    viewType.classList.add('hide')
  })()
    :( () => {
      canvas.classList.remove('hide')
      viewType.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
  // scene.render()
  num === 0 ? imgView.src = imgs[0] : null
  num === 1 ? imgView.src = imgs[1] : null
  num === 2 ? imgView.src = imgs[2] : null
  num === 3 ? imgView.src = imgs[3] : null
  num === 9 ? imgView.src = imgs[9] : null
}

//check()

const next = () => {
  num < imgs.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  //check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  scene = createScene()
  //check()
}

engine.runRenderLoop(function () {
    imageName.innerHTML = imgName[num]
  scene.render()
})

if(num!==0){
window.addEventListener('resize', function () {
  engine.resize()  
})
}
