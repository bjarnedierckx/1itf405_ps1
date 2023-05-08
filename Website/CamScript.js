let video = document.getElementById('webcam');
//let button = document.getElementById('Button1');

//let video = document.querySelector('#webcam');

// The video
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/3qF5u90eV/';

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream){
            video.srcObject = stream;

        })
            .catch (function (error){
                console.log("error 1");
            })
    } else {
        console.log("error 2");
    }
    //STEP 2: Start classifying
    classifyVideo();
}

// STEP 2 classify the video!
function classifyVideo() {
    classifier.classify(video, gotResults);
}


function draw() {
    background(0);

    // STEP 4: Draw the label
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height - 16);
}


// STEP 3: Get the classification!
function gotResults(error, results) {
    // Something went wrong!
    if (error) {
        console.error(error);
        return;
    }
    // Store the label and classify again!
    label = results[0].label;
    classifyVideo();
}

function OpenPage(){
    window.open("Test.html#"+ label);
}


