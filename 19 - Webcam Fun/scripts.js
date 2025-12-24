const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip"); // put all the images
const snap = document.querySelector(".snap");

// video from pc to canvas element (take a snapshot from video every 16ms).
// Feat:

// 1 take photo from video
// 1.1 download photo to your computer (.png file)

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  console.log("take this photo");

  let downloadPic = document.createElement("a");
  let snapshotPic = document.createElement("img");
  let url = canvas.toDataURL("image/png");

  console.log("url", url);

  snapshotPic.classList.add("strip");

  snapshotPic.src = url;
  downloadPic.href = snapshotPic.src;
  downloadPic.download = "image-png";
  console.log("img url:", snapshotPic.src);

  downloadPic.appendChild(snapshotPic);
  strip.appendChild(downloadPic);
}

// ctx.globalAlpha = 0.1;

// pixels = greenScreen(pixels);

// NOTE: each ImageData object ha a "data" property which return an
// array (Uint8ClamperedArray) that represents the pixels data.
// each pixel = 4 RGBA bytes (r-g-b-alpha); each color component has a value from 0 to 255

// 2 live script effects
// 2.1 redEffect filter
function redEffect(pixels) {
  let numBytes = pixels.data.length;
  console.log("num of bytes: ", numBytes);

  for (let i = 0; i < numBytes; i += 4) {
    pixels.data[i + 1] = 0;
    pixels.data[i + 2] = 0;
  }
  return pixels;
}

// 2.2 rgbSplitEffect filter (take r-g-b colors and slightly offset them)
function rgbSplit(pixels) {
  let numBytes = pixels.data.length;

  for (let i = 0; i < numBytes; i = i + 4) {
    pixels[i + 1];
    pixels[i + 2];
    return pixels;
  }
}

// 2.3 alhpaEffect filter (ghosting effect)

// 2.4 greenScreen effect (pick a color from the background and pull out every color within that specific color range - usually green)
// use the param on the canva to select the color to pull out

getVideo();

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      console.log(stream);
      video.srcObject = stream;
      video.play();
      paintToCanvas();
    })
    .catch((err) => console.log("error: ", err));
}

// ctx.getImageData;

console.log(
  `video width: ${video.getBoundingClientRect().width}, video height: ${
    video.getBoundingClientRect().height
  }`
);

console.log(video);

function paintToCanvas() {
  const width = video.getBoundingClientRect().width;
  const height = video.getBoundingClientRect().height;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height, {
      willReadFrequently: true,
    });

    console.log("pixels", pixels);

    pixels = redEffect(pixels);

    // pixels = rgbSplit(pixels);

    // ctx.globalAlpha = 0.1;

    // pixels = greenScreen(pixels);

    ctx.putImageData(pixels, 0, 0);
    // console.log("doing");
  }, 120);
}
