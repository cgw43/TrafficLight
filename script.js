let north = document.querySelectorAll(".n, .circles");
let south = document.querySelectorAll(".s, .circles");
let east = document.querySelectorAll(".e, .circles");
let west = document.querySelectorAll(".w, .circles")
let peds = document.querySelectorAll(".pedimg");
let light = 0;
let started = false;
let slowTime = 4000;
let goTime = 10000;
const redLightDelay = 2000;
let ns = false;

document.getElementById("start").addEventListener("click", function () {
    started = true;
    console.log("START");
    if (document.getElementById("stoplight").value)
        goTime = document.getElementById("stoplight").value * 1000;
    else
        goTime = 10000;
    if (document.getElementById("slowlight").value)
        slowTime = document.getElementById("slowlight").value * 1000;
    else
        slowTime = 4000;

    ////////////////////
    // set lights to starting position 
    ///////////////////
    // disable start button
    document.getElementById("start").disabled = true;
    changeLight();
})

document.getElementById("stop").addEventListener("click", function () {
    started = false;
    console.log("STOP");
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function delayByLight(lightCode) {
    if (lightCode == 0) {return redLightDelay}
    if (lightCode == 1) {return slowTime}
    if (lightCode == 2) {return goTime}
    
}

function clearLights() {
    for (i=0;i<north.length;i++) {
        north[i].classList = "circle n";
        south[i].classList = "circle s";
        east[i].classList = "circle e";
        west[i].classList = "circle w";
    }

    peds[0].src = "/img/stop.jpg"
    peds[1].src = "/img/stop.jpg"
}

function changePedestrianImage() {
    if (ns) {
        peds[0].src = "/img/walk.jpg"
        peds[1].src = "/img/stop.jpg"
    } else {
        peds[0].src = "/img/stop.jpg"
        peds[1].src = "/img/walk.jpg"
    }
}

function changeLight() {

    // 0 =>  on red go to green // change to red & pause for stopDelay & go to green for goTime
    // 1 =>  on yellow go to red // change to red and change ns and stop for RedTime
    // 2 =>  on green go to yellow // change to yellow for slowTime
    if (started) {
        console.log("Entering");
        let time = delayByLight(light);
        console.log(time);
        sleep(time).then(() => {
            console.log("Exiting");

            if (light == 0) {
                // just changed to red
                // don't remove
            } else if (ns) {
                north[light].classList = "circle n";
                south[light].classList = "circle s";
            } else {
                east[light].classList = "circle e";
                west[light].classList = "circle w";
            }

            light--;

            if (light < 0) {
                console.log("Changing");
                light = 2;
                ns = !ns;
                changePedestrianImage();
                if (ns) { // get rid of the red
                    north[0].classList = "circle n";
                    south[0].classList = "circle s";
                } else {
                    east[0].classList = "circle e";
                    west[0].classList = "circle w";
                }
            }

            if (ns) {
                north[light].classList.add(north[light].getAttribute("color"));
                south[light].classList.add(south[light].getAttribute("color"));
            } else {
                east[light].classList.add(east[light].getAttribute("color"));
                west[light].classList.add(west[light].getAttribute("color"));
            }
            
            if (light == 0) {
                peds[0].src = "/img/stop.jpg"
                peds[1].src = "/img/stop.jpg"
            }
            changeLight();
        })
    } else {
        // undisable start button
        document.getElementById("start").disabled = false;
        // clear lights
        clearLights();
        light = 0;
        ns = false;
        north[0].classList.add(north[0].getAttribute("color"));
        south[0].classList.add(north[0].getAttribute("color"));
        east[0].classList.add(east[0].getAttribute("color"));
        west[0].classList.add(west[0].getAttribute("color"));

    }
}



