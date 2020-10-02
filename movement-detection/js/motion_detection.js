
function motionDetection(reversed, ctx){
  var motion = [];
  // draw the video and get its pixels
  ctx.drawImage(video, 0, 0, video.width, video.height);
  var data = ctx.getImageData(0, 0, video.width, video.height).data;
  // we can now loop over all the pixels of the video
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var pos = (x + y * video.width) * 4;
      var r = data[pos];
      var g = data[pos+1];
      var b = data[pos+2];
      if(old[pos] && Math.abs(old[pos].red - r) > threshold) {
        // push the x, y and rgb values into the motion array
        // but multiply the x and y values bck up by scalefactor
        // to get their actual screen position
        if(reversed){
          motion.push({x: (video.width - x) * scalefactor, y: y * scalefactor, r: r, g: g, b: b});
        }else{
          motion.push({x: x * scalefactor, y: y * scalefactor, r: r, g: g, b: b});
        }
      }
      old[pos] = { red: r, green: g, blue: b};
    }
  }

return motion;
}

/*
  for (var yy = 0; yy < h; yy+= sample_size) {
    for (var xx = 0; xx < w; xx+= sample_size) {

      var pos = (xx + yy * w) * 4;
      var r = data[pos];
      var g = data[pos+1];
      var b = data[pos+2];

      if(old[pos] && Math.abs(old[pos].red - r) > threshold) {
              var bright = brightness(r, g, b, sample_size);
              ctx.fillStyle = rgb(r, g, 0);
              ctx.fillEllipse(w - xx, yy, bright, bright);

      }

      old[pos] = { red: r, green: g, blue: b};

*/
