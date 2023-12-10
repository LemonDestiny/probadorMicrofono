let boton = document.getElementById("boton");
let botonVideo = document.getElementById("botonCamara");
let recorder = null;
let recorderVideo;
let grabacion = null;
let contenedor = document.getElementById("video");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");
  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true,
      }
    )
    .then((stream) => {
      recorder = new MediaRecorder(stream);
      recorder.addEventListener("dataavailable", (evento) => {
        const audio = document.createElement("audio");
        const blob = new Blob([evento.data], {
          type: "audio/ogg; codecs=opus",
        });
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        audio.play();
      });
    })
    .catch((err) => {
      console.error(`The following getUserMedia error occurred: ${err}`);
    });

  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        video: true,
      }
    )
    .then((stream) => {
      recorderVideo = new MediaRecorder(stream);
      recorderVideo.addEventListener("dataavailable", (evento) => {
        const video = document.createElement("video");
        const blob = new Blob([evento.data], {
          type: "video/mp4",
        });
        const videoURL = window.URL.createObjectURL(blob);
        video.src = videoURL;
        if (contenedor.firstChild) {
          contenedor.removeChild(contenedor.firstChild);
        }
        contenedor.appendChild(video);
        video.play();
      });
    })
    .catch((err) => {
      console.error(`The following getUserMedia error occurred: ${err}`);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

boton.addEventListener("click", () => {
  if (recorder.state === "recording") {
    boton.textContent = "Probar microfono";
    boton.classList.remove("botonPresionado");
    recorder.stop();
  } else {
    recorder.start();
    boton.textContent = "Detener Grabacion";
    boton.classList.add("botonPresionado");
  }
});

botonVideo.addEventListener("click", () => {
  if (recorderVideo.state === "recording") {
    botonVideo.textContent = "Probar Cámara";
    botonVideo.classList.remove("botonPresionado");
    recorderVideo.stop();
  } else {
    recorderVideo.start();
    botonVideo.textContent = "Detener Grabacion";
    botonVideo.classList.add("botonPresionado");
  }
});
