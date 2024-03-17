const confetti = {
  maxCount: 100, //set max confetti count
  speed: 5, //set the particle animation speed
  frameInterval: 15, //the confetti animation frame interval in milliseconds
  alpha: 1.0, //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
  gradient: false, //whether to use gradients for the confetti particles
  start: null, //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
  stop: null, //call to stop adding confetti
  toggle: null, //call to start or stop the confetti animation depending on whether it's already running
  pause: null, //call to freeze confetti animation
  resume: null, //call to unfreeze confetti animation
  togglePause: null, //call to toggle whether the confetti animation is paused
  remove: null, //call to stop the confetti animation and remove all confetti immediately
  isPaused: null, //call and returns true or false depending on whether the confetti animation is paused
  isRunning: null, //call and returns true or false depending on whether the animation is running
}

confetti.start = startConfetti
confetti.stop = stopConfetti
confetti.toggle = toggleConfetti
confetti.pause = pauseConfetti
confetti.resume = resumeConfetti
confetti.togglePause = toggleConfettiPause
confetti.isPaused = isConfettiPaused
confetti.remove = removeConfetti
confetti.isRunning = isConfettiRunning
let supportsAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame
let colors = [
  "rgba(255,0,0,",
  "rgba(0,0,255,",
  "rgba(0,195,0,",
  "rgba(159,0,255,",
  "rgba(255,255,0",
  "rgba(255,165,0",
  "rgba(153,108,0",
  "rgba(0,0,0",
]
let streamingConfetti = false
let animationTimer = null
let pause = false
let lastFrameTime = Date.now()
let particles = []
let waveAngle = 0
let context = null

function resetParticle(particle, width, height) {
  particle.color =
    colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")")
  particle.color2 =
    colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")")
  particle.x = Math.random() * width
  particle.y = Math.random() * height - height
  particle.diameter = Math.random() * 10 + 5
  particle.tilt = Math.random() * 10 - 10
  particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05
  particle.tiltAngle = 0
  return particle
}

function toggleConfettiPause() {
  if (pause) resumeConfetti()
  else pauseConfetti()
}

function isConfettiPaused() {
  return pause
}

function pauseConfetti() {
  pause = true
}

function resumeConfetti() {
  pause = false
  runAnimation()
}

function runAnimation() {
  if (pause) return
  else if (particles.length === 0) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    animationTimer = null
  } else {
    let now = Date.now()
    let delta = now - lastFrameTime
    if (!supportsAnimationFrame || delta > confetti.frameInterval) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      updateParticles()
      drawParticles(context)
      lastFrameTime = now - (delta % confetti.frameInterval)
    }
    animationTimer = requestAnimationFrame(runAnimation)
  }
}

function startConfetti(timeout, min, max) {
  let width = window.innerWidth
  let height = window.innerHeight
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, confetti.frameInterval)
      }
    )
  })()
  let canvas = document.getElementById("confetti-canvas")
  if (canvas === null) {
    canvas = document.createElement("canvas")
    canvas.setAttribute("id", "confetti-canvas")
    canvas.setAttribute(
      "style",
      "display:block;z-index:999999;pointer-events:none;position:absolute;top:0"
    )
    document.body.appendChild(canvas)
    canvas.width = width
    canvas.height = height
    window.addEventListener(
      "resize",
      function () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      },
      true
    )
    context = canvas.getContext("2d")
  }
  let count = confetti.maxCount
  if (min) {
    if (max) {
      if (min == max) count = particles.length + max
      else {
        if (min > max) {
          let temp = min
          min = max
          max = temp
        }
        count = particles.length + ((Math.random() * (max - min) + min) | 0)
      }
    } else count = particles.length + min
  } else if (max) count = particles.length + max
  while (particles.length < count)
    particles.push(resetParticle({}, width, height))
  streamingConfetti = true
  pause = false
  runAnimation()
  if (timeout) {
    window.setTimeout(stopConfetti, timeout)
  }
}

function stopConfetti() {
  streamingConfetti = false
}

function removeConfetti() {
  stop()
  pause = false
  particles = []
}

function toggleConfetti() {
  if (streamingConfetti) stopConfetti()
  else startConfetti()
}

function isConfettiRunning() {
  return streamingConfetti
}

function drawParticles(context) {
  let particle
  let x, y
  context.font = "16px Arial"
  context.textAlign = "center"

  for (let i = 0; i < particles.length; i++) {
    particle = particles[i]
    x = particle.x + particle.tilt
    y = particle.y + particle.tilt
    const ballDiameter = 50 // Adjust the diameter for larger pool balls
    const whiteDiskRadius = 15

    context.beginPath()
    context.arc(x, y, ballDiameter / 2, 0, 2 * Math.PI)

    switch (getBallColor(i)) {
      case "red":
        context.fillStyle = "#ff0000"
        break
      case "blue":
        context.fillStyle = "#0000ff"
        break
      case "orange":
        context.fillStyle = "#ffa500"
        break
      case "purple":
        context.fillStyle = "#800080"
        break
      case "green":
        context.fillStyle = "#008000"
        break
      case "brown":
        context.fillStyle = "#a52a2a"
        break
      case "yellow":
        context.fillStyle = "#ffff00"
        break
      default:
        context.fillStyle = particle.color
        break
    }

    context.fill()

    context.beginPath()
    context.arc(x, y, whiteDiskRadius, 0, 2 * Math.PI)
    context.fillStyle = "#ffffff"
    context.fill()

    context.fillStyle = "#000000"
    context.fillText(getBallNumber(getBallColor(i)), x, y + 6)
  }
}

function getBallColor(index) {
  return colors[index % colors.length]
}

function getBallNumber(color) {
  switch (color) {
    case "rgba(255,0,0,":
      return 3
    case "rgba(0,0,255,":
      return 2
    case "rgba(255,165,0":
      return 5
    case "rgba(159,0,255,":
      return 4
    case "rgba(0,195,0,":
      return 6
    case "rgba(153,108,0":
      return 7
    case "rgba(255,255,0":
      return 1
    default:
      return 0
  }
}

function updateParticles() {
  let width = window.innerWidth
  let height = window.innerHeight
  let particle
  waveAngle += 0.01
  for (let i = 0; i < particles.length; i++) {
    particle = particles[i]
    if (!streamingConfetti && particle.y < -15) particle.y = height + 100
    else {
      particle.tiltAngle += particle.tiltAngleIncrement
      particle.x += Math.sin(waveAngle)
      particle.y +=
        (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5
      particle.tilt = Math.sin(particle.tiltAngle) * 15
    }
    if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
      if (streamingConfetti && particles.length <= confetti.maxCount)
        resetParticle(particle, width, height)
      else {
        particles.splice(i, 1)
        i--
      }
    }
  }
}

export { confetti }
