var objects= []

function preload() {

}

function setup() {
    canvas= createCanvas(400, 400)
    canvas.center()
    video= createCapture(VIDEO)
    video.size(400, 250)
    video.hide()
    objectDetector= ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML= "Status: Object Detecting"
}

function draw() {
    image(video, 0, 0, 400, 400)
    
    if (varStatus != "") {
        objectDetector.detect(video, gotResults)

        for (i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML= "Status: Objects Detected"
            document.getElementById("objectsnumber").innerHTML= "Number of Objects: " + objects.length

            fill("#015f85")
            accuracy= floor(objects[i].confidence * 100)
            text(objects[i].label + ": " + accuracy + "%", objects[i].x, objects[i].y)

            noFill()
            stroke("#015f85")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

    if (objects[i].label==input) {
        video.stop()
        objectDetector.detect(gotResult)
        document.getElementById("status").innerHTML= "Status: Given object found"
        synth= window.speechSynthesis
        utterThis= new SpeechSynthesisUtterance(synth, speak(utterThis))
    }

    else {
        document.getElementById("status").innerHTML= "Status: Given object not found"
    }
}

function start() {
    input= document.getElementById("input").value
}

function modelLoaded() {
    console.log("model loaded")
    modelStatus= true
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }

    else {
        console.log(results)
        objects= results
    }
}