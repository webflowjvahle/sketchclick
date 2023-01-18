let targetNodeSketch = document.querySelector(".c-main");

let configSketch = { childList: true };

let callbackSketch = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
      if (document.querySelector("[data-sketch]")) {
        console.log("navLinkSketch element is present on the page");
        let navLinkSketch = document.querySelector("[data-sketch");
        navLinkSketch.addEventListener("click", function () {
          console.log("navLinkSketch has been clicked");
          setTimeout(function () {
            const canvasSketchParent = document.querySelector(".c-sketch");
            const sketchable = document.getElementById("sketchable");
            const sketch = Sketch.create({
              container: sketchable,
              width: canvasSketchParent.offsetWidth,
              height: canvasSketchParent.offsetWidth,
              fullscreen: false,
              autoclear: false,
            });

            let isDrawing = false;

            sketchable.addEventListener("pointerdown", (event) => {
              isDrawing = true;
              sketch.beginPath();
              sketch.moveTo(event.clientX, event.clientY);
            });

            sketchable.addEventListener("pointermove", (event) => {
              if (isDrawing) {
                sketch.lineWidth = 3;
                sketch.lineTo(event.clientX, event.clientY);
                sketch.strokeStyle = "#ef233c";
                sketch.stroke();
              }
            });

            sketchable.addEventListener("pointerup", () => {
              isDrawing = false;
            });

            document
              .getElementById("btnClear")
              .addEventListener("click", () => {
                sketch.clear();
              });
          }, 400);
        });
      } else {
        console.log("navLinkSketch element is not present on the page");
      }
    }
  }
};

let observerSketch = new MutationObserver(callbackSketch);
observerSketch.observe(targetNodeSketch, configSketch);
