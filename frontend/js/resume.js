document.addEventListener("DOMContentLoaded", function () {
  // Get the iframe element
  const pdfFrame = document.getElementById("pdfFrame");

  // Set the iframe height to match the device height
  pdfFrame.style.height = window.innerHeight + "px";

  // Handle window resize events to update the iframe height
  window.addEventListener("resize", function () {
    pdfFrame.style.height = window.innerHeight + "px";
  });
});
