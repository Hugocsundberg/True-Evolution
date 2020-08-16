// BOTS 
storedAnimals = []
let evolutionHasStarted = false
class animalClass {
    constructor(nameFirstHalf, nameSecondHalf, speed, tophalf, bottomhalf, coordinatesX, coordinatesY, animalDirection, animalnumber, size, soundFirstHalf, soundSecondHalf, ispredator, health, controlledAnimal = false, specialPower, attackPower, additionalMovement, fullbody, age = 0) {
        this.nameFirstHalf = nameFirstHalf
        this.nameSecondHalf = nameSecondHalf 
        this.speed = speed
        this.tophalf = tophalf 
        this.bottomhalf = bottomhalf
        this.coordinatesX = coordinatesX
        this.coordinatesY = coordinatesY
        this.animalDirection = animalDirection
        this.animalnumber = animalnumber
        this.size = size
        this.soundFirstHalf = soundFirstHalf
        this.soundSecondHalf = soundSecondHalf
        this.hasMadeSound = false
        this.ispredator = ispredator
        this.health = health
        this.controlledAnimal = controlledAnimal
        this.specialPower = specialPower
        this.attackPower = attackPower
        this.additionalMovement = additionalMovement
        this.fullbody = fullbody
        this.canreproduce = true
        this.canfight = true
        this.age = age
         
    } 

    get name() {
        return this.nameFirstHalf + this.nameSecondHalf
    } 

    live() {
        if (controlledAnimal.health > 0) {
            if(evolutionHasStarted == true) {
            Path(this)
            updateBotPosition(this)
            doesAnimalsCollide()
            isThoughWall(this)
            isControlledAnimalThoughWall()
            }
        }
         setTimeout(() => {
            this.live() 
            
         }, this.speed / 400);
    }

    direction() {
        direction(this)
         setTimeout(() => {
            this.direction() 
            
         }, this.speed);
    }
}

const startgame = (e) => {
    if (e.keyCode == 37 ||e.keyCode == 37 ||e.keyCode == 39 ||e.keyCode == 40) {
        if(evolutionHasStarted == false) {
            evolutionHasStarted = true
            document.getElementById("splashscreen").classList.add("fadeout")
            setTimeout(() => {
                function removeElement(elementId) {
                    // Removes an element from the document
                    var element = document.getElementById(elementId);
                    element.parentNode.removeChild(element);
                }
                removeElement("splashscreen");
            }, 2000);
            dayCounter()
        }
    }
}

window.addEventListener("keydown", startgame)

const startEvolution = () => {
    evolutionHasStarted = true
}



const collide = (animal) => {
    if(animal.coordinatesX > controlledAnimal.coordinatesX - animal.size && animal.coordinatesX < (controlledAnimal.coordinatesX + controlledAnimal.size) && animal.coordinatesY > controlledAnimal.coordinatesY - animal.size && animal.coordinatesY < controlledAnimal.coordinatesY + controlledAnimal.size) {
        if (animal.ispredator && animal.canfight && !animal.controlledAnimal) {
            fightCoolDown(2, animal)
            fight(animal) 
        } else if (!animal.ispredator && animal.canreproduce && genericCanreproduce && !animal.controlledAnimal) {
            reproductionCoolDown(animal)
            fightCoolDown(5, animal)
            repr(animal)
        }
    }
}



const fight = (animal) => {
    if(animal.health > 0) {
    sound(animal)
    if (animal.size >= controlledAnimal.size) {
        controlledAnimal.health -= 2
        animal.health -= 1 * controlledAnimal.attackPower 
    }   
        else if (controlledAnimal.size >= animal.size){
        animal.health -= 3 * controlledAnimal.attackPower
        controlledAnimal.health -= 1
        }
    
    hurtAnimalAnimation(animal)
    isDead(animal)
    // updateStats()
    UpdateAnimalCSS(controlledAnimal)
    updateHealthBars(animal)
    updateHealthBars(controlledAnimal)
    updatePredatorIndicator()
}
}









const hurtAnimalAnimation = (animal) => {
    if (animal.health > 0) {
    document.getElementById("animal" + animal.animalnumber).classList.add("damageTaken")
    document.getElementById("animalOriginal").classList.add("damageTaken")
    setTimeout(()=>{
        if(animal.health > 0) {
            for (k = 0; k < document.getElementById("animal" + animal.animalnumber).classList.length; k++) {
                if(document.getElementById("animal" + animal.animalnumber).classList[k] == "damageTaken") {
                    document.getElementById("animal" + animal.animalnumber).classList.remove("damageTaken")
                }
            }
        document.getElementById("animal" + animal.animalnumber).classList.remove("damageTaken")  
        document.getElementById("animalOriginal").classList.remove("damageTaken")
    }
    }, 70)
}
}

document.getElementById("music").play()

const isDead = (animal) => {
    if (controlledAnimal.health < 1) {
        document.getElementById("music").pause()
        document.getElementById("deathScreen").classList.remove("hidden")
        document.getElementById("deathGid").classList.add("fadein")
        document.getElementById("animalOriginal").classList.add("hidden")
        document.getElementById("thiskilledyou").innerHTML = animal.name + " killed you"
        if(animal.fullbody != undefined) {
            document.querySelector(".deathImage").classList.add(animal.fullbody)
        }
        document.getElementById("imageTopHalf").classList.add(animal.tophalf + "_tophalf")
        document.getElementById("imageBottomHalf").classList.add(animal.bottomhalf + "_bottomhalf")
        document.getElementById("endscore").innerHTML="Final day: " + day
        setTimeout(() => {
            restarteventlistenerInitiate()    
        }, 2000);
        
    }
    if (animal.health < 1) {
        const animalHTML = document.getElementById("animal" + animal.animalnumber)
        sound(animal)
        
        for (k = 0; k < animalHTML.classList.length; k++) {
            if(animalHTML.classList[k] == "predatorbigger") {
                animalHTML.classList.remove("predatorbigger")
            }
            if(animalHTML.classList[k] == "predatorsmaller") {
                animalHTML.classList.remove("predatorsmaller")
            }
        }
        updateHealthBars(animal)
        animalHTML.classList.add("deathanimation")
        // animalHTML.remove()
        // wipeInstance(animal)
        controlledAnimal.size += 10
        controlledAnimal.speed -= 100

        
    }
}

let genericCanreproduce = true

const reproductionCoolDown = (animal) => {
    genericCanreproduce = false
    animal.canreproduce = false
    setTimeout(() => {
        animal.canreproduce = true
    }, 4000)
}

const fightCoolDown = (s, animal) => {
    animal.canfight = false
    setTimeout(() => {
        animal.canfight = true
    }, s * 1000)
}

const soundCoolDown = (animal) => {
    setTimeout(() => {
        animal.hasMadeSound = false
    }, 5000);
}


const repr = (animal) => {
    reproduce(controlledAnimal, animal)
}

const doesAnimalsCollide = () => {
    storedAnimals.forEach(collide)
}

const isThoughWall = (animal) => {
    if (animal.coordinatesX > window.innerWidth) {
        animal.animalDirection = "left"
    } else if (animal.coordinatesY > window.innerHeight) {
        animal.animalDirection = "up"
    } else if (animal.coordinatesX < 0) {
        animal.animalDirection = "right" 
    } else if (animal.coordinatesY < 0) {
        animal.animalDirection = "down"
    }
}

const isControlledAnimalThoughWall = () => {
    if (controlledAnimal.coordinatesX > window.innerWidth - 50) {
        stopRight = true
    } else if (controlledAnimal.coordinatesY > window.innerHeight - 50) {
        stopDown = true
    } else if (controlledAnimal.coordinatesX < 0) {
        stopLeft = true
    } else if (controlledAnimal.coordinatesY < 0) {
        stopUp = true
    }
}

const updateBotPosition = (animal) => {
    if (animal.health > 0) {
    document.getElementById("animal" + animal.animalnumber).style.left = animal.coordinatesX + "px"
    document.getElementById("animal" + animal.animalnumber).style.top = animal.coordinatesY + "px"
}

    // animal.style.left = animal_Position_X + "px"
    // animal.style.top = animal_Position_Y + "px"
}

let animalHasMadeSound = false

const predatorPath = (animal) => {
    stopWalking = true 
    setTimeout(() => {
        stopWalking = false
        movetowards()
    }, 5000);
    const movetowards = () => {
    if (stopWalking == false) {
        if (controlledAnimal.coordinatesX > animal.coordinatesX) {
            animal.coordinatesX ++ 
        }
            else if (controlledAnimal.coordinatesX < animal.coordinatesX) {
                animal.coordinatesX --
            }
        if (controlledAnimal.coordinatesY > animal.coordinatesY) {
            animal.coordinatesY ++ 
        }
            else if (controlledAnimal.coordinatesY < animal.coordinatesY) {
                animal.coordinatesY --
            }
        }
    }
}

const Path = (animal)=> {
    if(animal.health < 1) {
        animal.coordinatesX = 0
        animal.coordinatesY = 0
    } else {
    if (animal.ispredator == true) {
        predatorPath(animal)
    } else {
    switch(animal.animalDirection) {
        case "right": 
            animal.coordinatesX ++
            break
        case "down":
            animal.coordinatesY ++
            break
        case "left":
            animal.coordinatesX --
            break
        case "up":
            animal.coordinatesY --
            break
        case "stop": 
            animal.coordinatesX += 0
            sound(animal)
            break
        case "upright": 
            animal.coordinatesY --
            animal.coordinatesX ++
            break            
        case "rightdown":
            animal.coordinatesX ++
            animal.coordinatesY ++
            break
        case "downleft":
            animal.coordinatesY ++
            animal.coordinatesX --
            break
        case "leftup":
            animal.coordinatesX --
            animal.coordinatesY --
            break
        }
        }
    }
}

    

const sound = (animal) => {

    if (animal.hasMadeSound == false) {
        for (h = 0; h < storedAnimals.length -1; h++) {
            const firsthalfsound = storedAnimals[h].soundFirstHalf
            const secondhalfsound = storedAnimals[h].soundSecondHalf
            document.getElementById(firsthalfsound).pause()
            document.getElementById(secondhalfsound).pause()
        }
        document.getElementById(animal.soundFirstHalf).play()
        document.getElementById(animal.soundSecondHalf).play()
        animal.hasMadeSound = true
        soundCoolDown(animal)
}
}

    


const direction =(animal) => {
    if (animal.ispredator == false) {
    random = Math.floor(Math.random() * 9)
    directionsArray = ["right", "down", "left", "up", "stop", "upright", "rightdown", "downleft", "leftup"]
    animalDirection = directionsArray[random]
    switch (animalDirection) {
        case "right": 
            animal.animalDirection = "right"
            break
        case "down":
            animal.animalDirection = "down"
            break
        case "left":
            animal.animalDirection = "left"
            break
        case "up":
            animal.animalDirection = "up"
            break   
        case "stop": 
            animal.animalDirection = "stop"
            // animal.sound.play()
            break
        case "upright": 
            animal.animalDirection="upright"
            break            
        case "rightdown":
            animal.animalDirection="rightdown"
            break
        case "downleft":
            duckGoesThisWa="downleft"
            break
        case "leftup":
            animal.animalDirection="leftup"
            break
    }
}
    
}



restarteventlistenerInitiate = () => {
    const restart = (e) => {
        // if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            if (controlledAnimal.health < 1) {
                document.getElementById("body").classList.remove("fadein")
                document.getElementById("body").classList.add("fadeout")
                setTimeout(() => {
                    location.reload()    
                }, 1000);
                
            }
            
        // }
        }

document.getElementById("continue").addEventListener('click', restart);
}

// BOT MOVEMENT 



let i = 0
day = 1


const removeAllSpecialPowers = () => {
    if(controlledAnimal.health > 0) {
        for(p = 0; p < document.getElementById("animalOriginal").classList.length; p++) {
            if(document.getElementById("animalOriginal").classList[p] == "specialPower_dash") {
                document.getElementById("animalOriginal").classList.remove("specialPower_dash")
            }
            if(document.getElementById("animalOriginal").classList[p] == "specialPower_escape") {
                document.getElementById("animalOriginal").classList.remove("specialPower_escape")
            }
            if(document.getElementById("animalOriginal").classList[p] == "specialPower_extraDamage") {
                document.getElementById("animalOriginal").classList.remove("specialPower_extraDamage")
            }
            if(document.getElementById("animalOriginal").classList[p] == "specialPower_teleport") {
                document.getElementById("animalOriginal").classList.remove("specialPower_teleport")
            }
        }
    }
}

const updateSpecialPower = () => {
    switch (controlledAnimal.specialPower) {
        case "dash":
            removeAllSpecialPowers();
            document.getElementById("animalOriginal").classList.add("specialPower_dash");
            break;
        case "escape":
            removeAllSpecialPowers();
            document.getElementById("animalOriginal").classList.add("specialPower_escape");
            break;
        case "extraDamage":
            removeAllSpecialPowers();
            document.getElementById("animalOriginal").classList.add("specialPower_extraDamage");
            break;
        case "teleport":
            removeAllSpecialPowers();
            document.getElementById("animalOriginal").classList.add("specialPower_teleport");
            break;
    }
}

// REPRODUCTION
const reproduce = (animal1, animal2)=> {
    const random = Math.floor(Math.random() * 2)
    const boollist = [true, false] 
    let newAnimal = (new animalClass (controlledAnimal.nameFirstHalf, controlledAnimal.nameSecondHalf, controlledAnimal.speed, controlledAnimal.tophalf, controlledAnimal.bottomhalf, controlledAnimal.coordinatesX, controlledAnimal.coordinatesY, "stop", i, controlledAnimal.size, controlledAnimal.soundFirstHalf, controlledAnimal.soundSecondHalf, false, 5, false, controlledAnimal.specialPower, 1, 1, "", 5))
    reproductionCoolDown(newAnimal)
    fightCoolDown(5, newAnimal)
    animalCreator(newAnimal)
    const mutationlist = [200, -100]
    const animallist = [animal1, animal2]
    const bodylist = [animal1.tophalf, animal2.tophalf]
    const bodylist2 = [animal2.bottomhalf, animal1.bottomhalf]
    const namelist = [animal1.nameFirstHalf, animal2.nameFirstHalf]
    const namelist2 = [animal2.nameSecondHalf, animal1.nameSecondHalf]
    const sizelist = [animal2.size, animal1.size]
    const soundlist = [animal1.soundFirstHalf, animal2.soundFirstHalf]
    const soundlist2 = [animal2.soundSecondHalf, animal1.soundSecondHalf]
    const powerlist = [animal1.specialPower, animal2.specialPower]
    
    
    controlledAnimal.nameFirstHalf = namelist[random]
    controlledAnimal.nameSecondHalf = namelist2[random]
    controlledAnimal.speed = animallist[random].speed + mutationlist[random]
    controlledAnimal.tophalf = bodylist[random]
    controlledAnimal.bottomhalf = bodylist2[random]
    controlledAnimal.coordinatesX = animal1.coordinatesX
    controlledAnimal.coordinatesY = animal2.coordinatesY 
    controlledAnimal.animalnumber = "Original" 
    if (controlledAnimal.size > animal2.size) {
        let diffdiff
        let moremore
        diffdiff = controlledAnimal.size - animal2.size
        moremore = diffdiff *0.75 
        controlledAnimal.size = animal2.size + moremore 
    } else {
        diffdiff = animal2.size - controlledAnimal.size
        moremore = diffdiff *0.75 
        controlledAnimal.size = controlledAnimal.size + moremore
    }
    controlledAnimal.size = (animal1.size + animal2.size) / 2 + mutationlist[random] / 10
    controlledAnimal.soundFirstHalf = soundlist[random]
    controlledAnimal.soundSecondHalf = soundlist2[random]
    controlledAnimal.health = 5
    controlledAnimal.specialPower = powerlist[random]
    controlledAnimal.additionalMovement = 1
    controlledAnimal.attackPower = 1
    deedisDoneSpecialPower = false
    

    
        
    

    updateHealthBars(controlledAnimal)
    updatePredatorIndicator()
    sound(controlledAnimal)
    if (controlledAnimal.health < 1) {
        controlledAnimal.health = 1
    }
    if (controlledAnimal.size < 1) {
        controlledAnimal.size = 1
    }
    
    UpdateAnimalCSS(controlledAnimal)
    // updateStats()
     
     
    updateSpecialPower()
    
}

const dayCounter = () => {
    if(controlledAnimal.health > 0) {
        day ++;
    }
    document.querySelector("#population").innerHTML = "DAY: " + day
    newPredators()
    genericCanreproduce = true
    if(controlledAnimal.health > 0) {
        setTimeout(() => {
            dayCounter()
        }, 7000);
    }
    for(b = 0; b < storedAnimals.length; b++) {
        storedAnimals[b].age ++
        if(storedAnimals[b].age > 14) {
            storedAnimals[b].health = -1
            let animalElement = document.getElementById("animal" + storedAnimals[b].animalnumber)
            animalElement.classList.add("deathanimation")
        }
    }
}
 
let infoscreen = false
const infobuttonElement = document.getElementById("infobutton")
const infoscreenElement = document.getElementById("infoscreen")

const infoswitch = () => {
    console.log("got to buttonthing")
    if(!infoscreen) {
        infoscreen = true
        for(y = 0; y < infoscreenElement.classList.length; y++) {
            if(infoscreenElement.classList[y] == "goout") {
                infoscreenElement.classList.remove("goout")
            }
        }
        infoscreenElement.classList.add("comein")
    } else {
        infoscreen = false 
        infoscreenElement.classList.remove("comein")
        infoscreenElement.classList.add("goout")
    }
}

infobuttonElement.addEventListener("click", infoswitch)

const newPredators = () => {
    if(day > 2 && day % 2 == 0) {
        animalCreator(new animalClass("Bo", "ar", 8000, "boar", "boar", (window.innerWidth + 100), 300, "left", i, 100, "catSoundEffektFirstHalf", "catSoundEffektSecondHalf", true, 5, false, undefined, 1, 1, "boar", ))
    }
    if(day > 9 && day % 4 == 0) {
        animalCreator(new animalClass("Bloon", "cat", 17000, "blooncat", "blooncat", (window.innerWidth + 100), 100, "left", i, 100, "catSoundEffektFirstHalf", "catSoundEffektSecondHalf", true, 5, false, "dash", 1, 1, "blooncat" ))
        animalCreator(new animalClass("Bloon", "cat", 17000, "blooncat", "blooncat", (window.innerWidth + 100), 800, "left", i, 100, "catSoundEffektFirstHalf", "catSoundEffektSecondHalf", true, 5, false, "dash", 1, 1, "blooncat" ))
    }
    if(day > 14 && day % 5 == 0) {
        animalCreator(new animalClass("Speed", "pug", 3000, "speedpug", "speedpug", -100,  100, "right", i, 40, "duckSoundFirstHalf", "duckSoundSecondHalf", true, 5, false, "dash", 1, 1, "speedpug"))
    }
    
    if(day > 19 && day % 2 == 1) {
        animalCreator(new animalClass("Be", "ar", 6000, "bear", "bear", (window.innerWidth + 100), (window.innerHeight / 2), "right", i, 200, "duckSoundFirstHalf", "duckSoundSecondHalf", true, 5, false, "dash", 1, 1, "bear"))
    }
        updatePredatorIndicator()
}

// const spawn speed

const updateHealthBars = (animal) => {
    if(true) {
    for(d=0; d < document.getElementById("animal" + animal.animalnumber).children[2].classList.length; d++) {
        if(document.getElementById("animal" + animal.animalnumber).children[2].classList[d  ] == "fivehealth") {
            document.getElementById("animal" + animal.animalnumber).children[2].classList.remove("fivehealth")
        }
        if(document.getElementById("animal" + animal.animalnumber).children[2].classList[d  ] == "fourhealth") {
            document.getElementById("animal" + animal.animalnumber).children[2].classList.remove("fourhealth")
        }
        if(document.getElementById("animal" + animal.animalnumber).children[2].classList[d  ] == "threehealth") {
            document.getElementById("animal" + animal.animalnumber).children[2].classList.remove("threehealth")
        }
        if(document.getElementById("animal" + animal.animalnumber).children[2].classList[d  ] == "twohealth") {
            document.getElementById("animal" + animal.animalnumber).children[2].classList.remove("twohealth")
        }
        if(document.getElementById("animal" + animal.animalnumber).children[2].classList[d  ] == "onehealth") {
            document.getElementById("animal" + animal.animalnumber).children[2].classList.remove("onehealth")
        }
    }
    if(animal.health == 5) {
        document.getElementById("animal" + animal.animalnumber).children[2].classList.add("fivehealth")
}
   if(animal.health == 4) {
        document.getElementById("animal" + animal.animalnumber).children[2].classList.add("fourhealth")
}
   if(animal.health == 3) {
        document.getElementById("animal" + animal.animalnumber).children[2].classList.add("threehealth")
}
   if(animal.health == 2) {
        document.getElementById("animal" + animal.animalnumber).children[2].classList.add("twohealth")
}
   if(animal.health == 1) {
        document.getElementById("animal" + animal.animalnumber).children[2].classList.add("onehealth")
}
}
}


const updatePredatorIndicator = () => {
    for (u = 0; u < storedAnimals.length; u++) {
    if (storedAnimals[u].health > 0 && storedAnimals[u].ispredator == true) {

        for (k = 0; k < document.getElementById("animal" + storedAnimals[u].animalnumber).classList.length; k++) {
            if(document.getElementById("animal" + storedAnimals[u].animalnumber).classList[k] == "predatorbigger") {
                document.getElementById("animal" + storedAnimals[u].animalnumber).classList.remove("predatorbigger")
            }
            if(document.getElementById("animal" + storedAnimals[u].animalnumber).classList[k] == "predatorsmaller") {
                document.getElementById("animal" + storedAnimals[u].animalnumber).classList.remove("predatorsmaller")
            }
        }
            
        if (storedAnimals[u].size >= controlledAnimal.size) {
            document.getElementById("animal" + storedAnimals[u].animalnumber).classList.add("predatorbigger")
        } else if (storedAnimals[u].size < controlledAnimal.size) {
            document.getElementById("animal" + storedAnimals[u].animalnumber).classList.add("predatorsmaller")
            }

    }
}
}

  // if ()
            // if (document.getElementById("animal" + storedAnimals[i].animalnumber).classList[k] == "predatorbigger") {
            //     console.log(document.getElementById("animal" + storedAnimals[i].animalnumber).classList[k])
            //     document.getElementById("animal" + storedAnimals[i].animalnumber).classList.remove("predatorbigger")
            // } 
            // if (document.getElementById("animal" + storedAnimals[i].animalnumber).classList[k] == "predatorsmaller") {
            //     document.getElementById("animal" + storedAnimals[i].animalnumber).classList.remove("predatorsmaller")
            // }


const wipeInstance = (animal) => {
    animal.nameFirstHalf =  null
    animal.nameSecondHalf =  null
    animal.speed =  null
    animal.tophalf =  null
    animal.bottomhalf =  null
    animal.coordinatesX =  null
    animal.coordinatesY =  null
    animal.animalnumber = null
    animal.size =  null
    animal.soundFirstHalf =  null
    animal.soundSecondHalf =  null
    animal.health = null
}

UpdateAnimalCSS = (animal) => {
    if (controlledAnimal.health > 1) {
        document.querySelector("#animalOriginal").style.height = animal.size + "px"
        document.querySelector("#animalOriginal").style.width = animal.size + "px"
        tophalf = document.querySelector(".originalAnimalTop")
        getNameOfclassTop = tophalf.classList[2]
        tophalf.classList.replace(getNameOfclassTop, animal.tophalf + "_tophalf")
        bottomhalf = document.querySelector(".originalAnimalBottom")
        getNameOfclassBottom = bottomhalf.classList[2]
        bottomhalf.classList.replace(getNameOfclassBottom, animal.bottomhalf + "_bottomhalf")
        document.querySelector("#animalName").innerHTML = controlledAnimal.name
    }   

}


const animalCreator = (animal)=> {
    const newDiv = document.createElement("div")
    newDiv.id = "animal" + i
    newDiv.style.width = animal.size + "px"
    newDiv.style.height = animal.size + "px"
    document.querySelector("#body").appendChild(newDiv).classList.add("animal", animal.name)
    const newDiv2 = document.createElement("div")
    const newDiv3 = document.createElement("div")
    const newDiv4 = document.createElement("div")
    
    document.querySelector("#animal" + i).appendChild(newDiv2).classList.add(animal.tophalf + "_tophalf", "animal_tophalf")
    document.querySelector("#animal" + i).appendChild(newDiv3).classList.add(animal.bottomhalf + "_bottomhalf", "animal_bottomhalf")
    if (animal.ispredator == true) {
        document.querySelector("#animal" + i).appendChild(newDiv4).classList.add("healthbar", "fivehealth")
        if(animal.fullbody != undefined) {
            document.querySelector("#animal" + i).classList.add(animal.fullbody)
        }
    }
    i++
    storedAnimals.push(animal)
    animal.direction()
    animal.live()
    
    
}

// LOS ANIMALES 
const Duck = new animalClass("Du", "ck", 5000, "duck", "duck", 200, 200, "stop", 0, 50, "duckSoundFirstHalf", "duckSoundSecondHalf", false, 5, false,  "escape")
const Elephant = new animalClass("Ele", "phant", 16000, "elephant", "elephant", 300, 500, "stop", 1, 100, "elephantSoundFirstHalf", "elephantSoundSecondHalf", false, 5, false, "dash")
const controlledAnimal = new animalClass("Squi", "rrel", 8000, "squirrel", "squirrel", (window.innerWidth / 2), (window.innerHeight / 2), "stop", "Original", 50, "squirrelSoundFirstHalf", "squirrelSoundSecondHalf", false, 5, true, "escape", 1, 1)
const Birb = new animalClass("Bi", "rb", 400, "birb", "birb", 300, 300, "stop", 2, 30, "birbSoundFirstHalf", "birbSoundSecondHalf", false, 5, false, "escape")
const Squid = new animalClass("Sq", "uid", 8000, "squid", "squid", 500, 300, "stop", 3, 70, "squidSoundFirstHalf", "sqiudSoundSecondHalf", false, 5, false, "teleport")
const Snake = new animalClass("Sn", "ake", 14000, "snake", "snake", 100, 300, "stop", 4, 50, "snakeSoundFirstHalf", "snakeSoundSecondHalf", false, 5, false, "extraDamage")
const Cat = new animalClass("Ca", "t", 6000, "cat", "cat", 130, 300, "stop", 5, 50, "catSoundEffektFirstHalf", "catSoundEffektSecondHalf", false, 5, false, "dash")

// const Python = new animalClass("Py", "thon", 5000, "python", "python", 130, 300, "stop", 6, 25, "pythonFirstHalf", "pythonSecondHalf", false, 5)


animalCreator(Duck)
animalCreator(Elephant)
animalCreator(Birb)
animalCreator(Squid)
animalCreator(Snake)
animalCreator(Cat)

updateSpecialPower()
// animalCreator(Python)

// const updateStats = () => {
//     document.querySelector("#speed").innerHTML = "SPEED: " + Math.floor(1000000 / controlledAnimal.speed) + "<br />Size: " + controlledAnimal.size + "<br />" + controlledAnimal.name + " has: " + controlledAnimal.health + " health points"   
// speed}

// updateStats()


// GLOBAL VARIABLES
let stopRight = false
let stopDown = false
let stopLeft = false
let stopUp = false
let deedIsDoneRight = false
let deedIsDoneDown= false
let deedIsDoneLeft= false
let deedIsDoneUp= false
let speed = 2
quackSound = document.querySelector("#quack")



updatePredatorIndicator()




// CONTROLLED MOVEMENT
const controlledAnimalHTML = document.getElementsByClassName('animal')[0]

const updateAnimalPosition = () => {
    controlledAnimalHTML.style.left = controlledAnimal.coordinatesX + "px"
    controlledAnimalHTML.style.top = controlledAnimal.coordinatesY + "px"
}

updateAnimalPosition()

// right 
    

const movement = (e)=> {
    if(e.keyCode == 39 && controlledAnimal.coordinatesX < (window.innerWidth -25)) {
        stopRight = false
        if(deedIsDoneRight == false) {
            deedIsDoneRight = true
            const intervalRight = () => {
                setTimeout(()=>{
                    controlledAnimal.coordinatesX += speed * controlledAnimal.additionalMovement
                    updateAnimalPosition()
                    if(stopRight == false) {
                        intervalRight()
                    }
                }, controlledAnimal.speed / 400)
            }
            intervalRight()
                
        }
    }

// down ⬇
    if(e.keyCode == 40 && controlledAnimal.coordinatesY < (window.innerHeight -25)) {
        stopDown = false
        if(deedIsDoneDown == false) {
            deedIsDoneDown = true
            const intervalDown = () => {
                setTimeout(()=>{
                    controlledAnimal.coordinatesY += speed  * controlledAnimal.additionalMovement
                    updateAnimalPosition()
                    if(stopDown == false) {
                        intervalDown()
                    }
                }, controlledAnimal.speed / 400)
            }
            intervalDown()
                
        }
    }

// left ⬅
    if(e.keyCode == 37 && controlledAnimal.coordinatesX > 25) {
        stopLeft = false
        if(deedIsDoneLeft == false) {
            deedIsDoneLeft = true
            const intervalLeft = () => {
                setTimeout(()=>{
                    controlledAnimal.coordinatesX -= speed  * controlledAnimal.additionalMovement
                    updateAnimalPosition()
                    if(stopLeft == false) {
                        intervalLeft()
                    }
                }, controlledAnimal.speed / 400)
            }
            intervalLeft()
                
        }
    }
// up ⬆
    if(e.keyCode == 38 && controlledAnimal.coordinatesY > 25) {
        stopUp = false
        if(deedIsDoneUp == false) {
            deedIsDoneUp = true
            const intervalUp = () => {
                setTimeout(()=>{
                    controlledAnimal.coordinatesY -= speed  * controlledAnimal.additionalMovement
                    updateAnimalPosition()
                    if(stopUp == false) {
                        intervalUp()
                    }
                }, controlledAnimal.speed / 400)
            }
            intervalUp()
                
        }
    }
}
// STOP MOVEMENT? 🛑
const stopMovement = (e)=> {
if(e.keyCode == 39) {
    stopRight = true
    deedIsDoneRight = false
}
if(e.keyCode == 40) {
    stopDown = true
    deedIsDoneDown = false
}
if(e.keyCode == 37) {
    stopLeft = true
    deedIsDoneLeft = false
}
if(e.keyCode == 38) {
    stopUp = true
    deedIsDoneUp = false
}
}

window.addEventListener('keydown', movement)
window.addEventListener('keyup', stopMovement)

deedisDoneSpecialPower = false

const powerUps = (e) => {
    if (e.code == "Space" && deedisDoneSpecialPower == false) {
        deedisDoneSpecialPower = true
        if (controlledAnimal.specialPower == "dash") {
            controlledAnimal.additionalMovement = 2
            controlledAnimal.attackPower = 2
            for(q = 0; q < storedAnimals.length; q++) {
                storedAnimals[q].canfight = true
            }
            document.getElementById("animalOriginal").classList.remove("specialPower_dash")
            setTimeout(()=> {
                controlledAnimal.additionalMovement = 1
                controlledAnimal.attackPower = 1
            }, 1000)
            setTimeout(() => {
                deedisDoneSpecialPower = false
                updateSpecialPower()
            }, 5000);
        }
        if (controlledAnimal.specialPower == "escape") {
            controlledAnimal.additionalMovement = 3
            attackPower = 2
            document.getElementById("animalOriginal").classList.remove("specialPower_escape")
            setTimeout(()=> {
                controlledAnimal.additionalMovement = 1
                setTimeout(() => {
                    deedisDoneSpecialPower = false
                    updateSpecialPower()
                }, 5000);
            }, 2000)
            
        }
        if (controlledAnimal.specialPower == "extraDamage") {
            controlledAnimal.attackPower = 4
            document.getElementById("animalOriginal").classList.remove("specialPower_extraDamage")
            for(q = 0; q < storedAnimals.length; q++) {
                storedAnimals[q].canfight = true
            }
            setTimeout(()=> {
                controlledAnimal.attackPower = 1
                setTimeout(() => {
                    deedisDoneSpecialPower = false
                    updateSpecialPower()
                }, 5000);
            
            }, 2000)
        }

        if (controlledAnimal.specialPower == "teleport") {
            controlledAnimal.coordinatesX = Math.floor(Math.random() * window.innerWidth + 1);
            controlledAnimal.coordinatesY = Math.floor(Math.random() * window.innerHeight + 1);
            document.getElementById("animalOriginal").classList.remove("specialPower_teleport")
            updateAnimalPosition()
            setTimeout(()=> {
                setTimeout(() => {
                    deedisDoneSpecialPower = false
                    updateSpecialPower()
                    
                }, 2000);
            }, 1000)
            
        }
        
    }
}


window.addEventListener("keydown", powerUps)
let times = 0;
//SCOREBOARD SHIT 
const DOMButton = document.getElementById("submitButton");
const DOMnameInput = document.getElementById("nameInputField");

const onButtonPress = () => {
    if(times < 2) {
    times ++;
    PlayerName = DOMnameInput.value; 




    var http = new XMLHttpRequest();
    var url = 'backend.php';
    var params = `score={\"name\": \"${PlayerName}\", \"score\": ${day}}`;  
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    let parsedJSON;
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            parsedJSON = JSON.parse(http.responseText)
            document.getElementById("slot1").innerHTML= `Name: ${parsedJSON.scores[0].name}  |   Day: ${parsedJSON.scores[0].score}`;
            document.getElementById("slot2").innerHTML= `Name: ${parsedJSON.scores[1].name} | Day: ${parsedJSON.scores[1].score}`;
            document.getElementById("slot3").innerHTML= `Name: ${parsedJSON.scores[2].name} | Day: ${parsedJSON.scores[2].score}`;
            document.getElementById("slot4").innerHTML= `Name: ${parsedJSON.scores[3].name} | Day: ${parsedJSON.scores[3].score}`;
            document.getElementById("slot5").innerHTML= `Name: ${parsedJSON.scores[4].name} | Day: ${parsedJSON.scores[4].score}`;
            document.getElementById("slot6").innerHTML= `Name: ${parsedJSON.scores[5].name} | Day: ${parsedJSON.scores[5].score}`;
            document.getElementById("slot7").innerHTML= `Name: ${parsedJSON.scores[6].name} | Day: ${parsedJSON.scores[6].score}`;
            document.getElementById("slot8").innerHTML= `Name: ${parsedJSON.scores[7].name} | Day: ${parsedJSON.scores[7].score}`;
            document.getElementById("slot9").innerHTML= `Name: ${parsedJSON.scores[8].name} | Day: ${parsedJSON.scores[8].score}`;
            document.getElementById("slot10").innerHTML= `Name: ${parsedJSON.scores[9].name} | Day: ${parsedJSON.scores[9].score}`;
        }
    }
    }




    http.send(params);
}

onButtonPress();

const buttonEventListener = DOMButton.addEventListener("click", onButtonPress);


//XML stuff







