const video = document.getElementById("myvideo");
const handimg = document.getElementById("handimage");
//const canvas = document.getElementById("canvas");
//const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let imgindex = 1
let isVideo = false;
let model = null;

video.width = 400
video.height = 300

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video stopped"
    }
}




trackButton.addEventListener("click", function(){
    toggleVideo();
});



function runDetection() {
    model.detect(video).then(predictions => {

        if( x < 0 || x > canvas2.width){

//basically we want the prediction x ~ 0 and y ~ y?
          if(x && predictions[0]){
            var xx = predictions[0].bbox[0];
            var yy = predictions[0].bbox[1];
            console.log("y",y);
            console.log("pred",predictions[0].bbox[1]);
            if( (xx+100 > 0 > xx-100) && (yy+100 > y > yy-100)   ){
              console.log("biff!");
              dx = -dx;
            }
          }else{
            x = 0;
          }
        }


//        console.log("Predictions: ", predictions);
//        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

function runDetectionImage(img) {
    model.detect(img).then(predictions => {
        console.log("Predictions: ", predictions);
//        model.renderPredictions(predictions, canvas, context, img);
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Loaded Model!"
    runDetectionImage(handimg)
    trackButton.disabled = false
});
