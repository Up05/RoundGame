"use-strict"

const rand = Math.random.bind();

let main = {
    a: 0,
    r: 0,
    x: 0,
    y: 0,
    lost: false,
    score: 0
}

let meteors = [],
  particles = [],
     sounds = [],
    volumes = [],
     images = [];

let player

let cg

function preload(){
    sounds.push(loadSound("assets/background-music.wav")); volumes.push(0.3);
    sounds.push(loadSound("assets/death-sound.wav"));      volumes.push(0.3);
    images.push(loadImage("assets/meteor1.png"))
}

function setup(){
    let c = createCanvas(windowWidth, windowHeight) 
    c.position(0, 0)

    main.r = width / 10

    player = new Player()

    u_setupBackground()

    sounds[0].setVolume(volumes[0])
    sounds[0].loop()
    sounds[0].play()

    console.clear()
    console.log("%cYou can mute individual sounds by: (paste into this/console)\nbackground music: sounds[0].setVolume(0); volumes[0] = 0;\ndeath \"music\": sounds[1].setVolume(0); volumes[1] = 0;", "color: #0ad; font-size: 32px;\nExcept if it doesn't work. good luck then!")
}

function draw(){
    image(cg, 0, 0)

    if(main.a > 6.28){
        main.a = 0;
    }
    main.a += 0.02

    main.x = cos(main.a) * main.r + width / 2
    main.y = sin(main.a) * main.r + height / 2

    player.show(main.x, main.y)
    main.r = player.control(main.r)

    particles.push(new Particle(main.x - 5, main.y - 5))
    for(let i in particles){
        particles[i].show()
        if(particles[i].l < 0)
            delete particles[i]
    }
    
    if(frameCount % 50){
        particles = cleanArr(particles)
        meteors = cleanArr(meteors)
    }


    if(rand() < 0.02){
        meteors.push(new Meteor(main.a, main.r + (rand() * 250 - 125)))
    }

    for(let i in meteors){
        meteors[i].show()
        if(meteors[i].collision(player.getVertexes(main.x - 10, main.y - 10, 20))) // I merely forgot, ok!
            lose()
        if(meteors[i].rmv)
            delete meteors[i]
    }

    if(main.r > width / 2) {
        main.r -= 4
    } else if(abs(main.r) > width / 2)
        main.r += 4

    main.score ++

    document.getElementsByTagName("div")[0].children[1].innerText = "score: " + main.score;
}

function cleanArr(arr){
    let temp = []
    for(let i in arr)
        if(arr[i])
            temp.push(arr[i])
    arr = temp
    return arr
}

function u_setupBackground(){
    
    cg = createGraphics(windowWidth, windowHeight)
    cg.background(20)
    cg.ellipseMode(CENTER)
    cg.fill(255, 1)
    cg.noStroke()
    for(let i = 0; (i += 400) <= width + 400;){
        cg.ellipse(cg.width /  2, cg.height / 2, i)
    }
}

function lose(){
    main.lost = true
    let restartTooltip = select('h1')
    restartTooltip.style("visibility", "visible")
    
    sounds[0].stop()

    sounds[1].setVolume(volumes[1])
    sounds[1].play()

    frameRate(0)
}


function keyPressed(){ // function restart(){...
    if(keyCode == 32 && main.lost){
        let restartTooltip = select('h1')
        restartTooltip.style("visibility", "hidden")
        frameRate(60)
        particles.length = 0;
        meteors.length = 0;

        main = {
            a: rand() * 6.28,
            r: width / 10,
            x: 0,
            y: 0,
            lost: false,
            score: 0
        }

        sounds[0].setVolume(volumes[0])
        sounds[0].play()
        sounds[1].stop()
    }
}

