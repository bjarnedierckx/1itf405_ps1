let video = document.getElementById('webcam');

//let video = document.querySelector('#webcam');

// The video
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;

//Link voor de data: aanpasbaar
let modelURL = 'https://teachablemachine.withgoogle.com/models/BBG07N-Bk/';

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
    if (navigator.mediaDevices.getUserMedia) {
        const constraints = {
            video: { facingMode: { exact: 'environment' } }
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.log("Error accessing camera: ", error);
            });
    } else {
        console.log("getUserMedia is not supported");
    }
    //STEP 2: Start classifying
    classifyVideo();
}

// STEP 2 classify the video!
function classifyVideo() {
    classifier.classify(video, gotResults);
}


function draw() {
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
    window.open("Info.html#"+ label);
}


