let boton = document.getElementById("boton");
let recorder = null;
let grabacion = null;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");
  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true,
      }
    )

    // Success callback
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

    // Error callback
    .catch((err) => {
      console.error(`The following getUserMedia error occurred: ${err}`);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

boton.addEventListener("click", () => {
  if (recorder.state === "recording") {
    boton.textContent = "Probar microfono"
    recorder.stop();
  } else {
    recorder.start();
    boton.textContent = "Detener Grabacion"
    
  }
});
