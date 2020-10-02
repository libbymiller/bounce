
// allows me global access to canvas and it’s width and height properties

	// this enables me to have many canvases all positioned on top of eachother at 100% width and height of page
function createCanvas(canvas_name, fullscreen, xx, yy,ww,hh){
	var canvas = document.createElement('canvas');
	var body = document.querySelector('body');
	canvas.setAttribute("id", canvas_name);
	body.appendChild(canvas);
	var ctx = canvas.getContext('2d');
	canvas.style.position = "absolute";
        if(fullscreen){
            resize(canvas);
        }else{
		canvas.width = ww;
		canvas.height = hh;
		canvas.style.left = xx+"px";
		canvas.style.top = yy+"px";
        }
	return ctx;
}



function createHiddenCanvas(canvas_name, fullscreen, xx, yy, ww, hh){
	var ctx = createCanvas(canvas_name, fullscreen, xx, yy, ww, hh)
//	canvas.style.left = -w+"px";
	return ctx;
}

function resize(canvas){

	canvas.style.left = "0px";
	canvas.style.top = "40px";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log("resize: " + canvas.width +":" + canvas.height);
	window.addEventListener("resize", resize, false);
}
