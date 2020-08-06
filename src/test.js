let string = `
.skin *{box-sizing: border-box;margin: 0;padding: 0;}
.skin *::before, .skin *::after{box-sizing: border-box;}

.skin {
    position: relative;
    background: #ffe600;
    height: 50vh;
}
.nose {
    border:15px solid black;
    border-color: black transparent transparent transparent;
    width:0px;
    height: 0px;
    border-radius: 13px;
    position: relative;
    left: 50%;
    top:150px;
    margin-left: -15px;
    z-index: 999;
}
@keyframes wave{
    0%{
        transform: rotate(0deg);
    }
    33%{
        transform: rotate(5deg);
    }
    66%{
        transform: rotate(-5deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.nose:hover{
    animation: wave 300ms infinite linear;
}
.eye{
    border:2px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left:50%;
    top:100px;
    margin-left: -32px;
    background-color: #2e2e2e;
    border-radius: 50%;
}
.eye::before{
    content:'';
    display: block;
    border:2px solid black;
    width:32px;
    height:32px;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    left:8px;
}
.eye.left{
    transform: translateX(-120px);
}
.eye.right{
    transform: translateX(120px);
}
.mouth{
    width:200px;
    height: 200px;
    position: absolute;
    left:50%;
    top:170px;
    margin-left:-100px;
}
.mouth .up{
    position: relative;
    top:-20px;
    z-index: 1;
}
.mouth .up .lip{
    border: 3px solid black;
    height: 30px;
    width:100px;
    border-top-color: transparent;
    border-right-color: transparent;
    position: relative;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    background: #ffe600;
}
.mouth .up .lip.left{
    border-radius: 0 0 0 50px;
    transform: rotate(-20deg) translateX(-53px);   
}
.mouth .up .lip.right{
    border-radius: 0 0 50px 0;
    transform: rotate(20deg) translateX(53px);
}
.mouth .up .lip::before{
    content:'';
    display: block;
    width: 7px;
    height: 30px;
    position: absolute;
    bottom: 0;
    background: #ffe600;
}
.mouth .up .lip.left::before{
    right:-6px;
}
.mouth .up .lip.right::before{
    left:-6px;
}
.mouth .down{
    height: 180px;
    position: absolute;
    top: 5px;
    width: 100%;
    overflow: hidden;
}
.mouth .down .yuan1{
    border:3px solid black;
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left:50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background: #9b000a;
    overflow: hidden;
}
.mouth .down .yuan1 .yuan2{
    width: 200px;
    height: 300px;
    background: #ff485f;
    position: absolute;
    bottom: -160px;
    left: 50%;
    margin-left: -100px;
    border-radius: 100px;
}
.face{
    border: 3px solid black;
    width: 88px;
    height: 88px;
    position: absolute;
    left: 50%;
    top:220px;
    margin-left: -44px;
    background: #f00;
    border-radius: 50%;
}
.face.left{
    transform: translateX(-170px);
}
.face.right{
    transform: translateX(170px);
}
`

const player = {
  id: undefined,
  speed: 100,
  n: 0,
  ui: {
    demo: document.querySelector('#demo'),
    demo2: document.querySelector('#demo2')
  },
  events: {
      '#btnPause': 'pause',
      '#btnPlay': 'play',
      '#btnSlow': 'slow',
      '#btnNormal': 'normal',
      '#btnFast': 'fast'
  },
  init:() => {
    player.ui.demo.innerText = string.substr(0,player.n)
    player.ui.demo2.innerHTML = string.substr(0,player.n)
    player.bindEvents()
    player.play()
  },
  bindEvents: () => {
      for (let key in player.events) {
          if (player.events.hasOwnProperty(key)) {
              const value = player.events[key]
              document.querySelector(key).onclick = player[value]
          }
      }
  },
  run:() => {
    player.n +=1
    if(player.n > string.length){
      window.clearInterval(player.id)
      return
    }
    player.ui.demo.innerText = string.substr(0,player.n)
    player.ui.demo2.innerHTML = string.substr(0,player.n)
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight
  },
  play:() => {
    player.id = setInterval(player.run, player.speed)
  },
  pause:() => {
    window.clearInterval(player.id)
  },
  slow:() => {
    player.pause()
    player.speed = 300
    player.play()
  },
  normal:() => {
    player.pause()
    player.speed = 100
    player.play()
  },
  fast:() => {
    player.pause()
    player.speed = 0
    player.play()
  }
}

player.init()