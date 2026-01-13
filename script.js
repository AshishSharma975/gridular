document.addEventListener("DOMContentLoaded", function () {
  const imgContainer = document.querySelector(".imgContainer");
  const imgblock = document.querySelector(".imgblock");
  if (!imgContainer || !imgblock) return;

  const resetDuration = 300; 
  const blockSize = 75;      

  function buildGrid() {
    imgblock.innerHTML = "";

    const imgContainerWidth = imgContainer.offsetWidth;
    const imgContainerHeight = imgContainer.offsetHeight;

    const numCols = Math.max(1, Math.floor(imgContainerWidth / blockSize));
    const numRows = Math.max(1, Math.floor(imgContainerHeight / blockSize));

    const blockWidth = imgContainerWidth / numCols;
    const blockHeight = imgContainerHeight / numRows;

    imgblock.style.display = "grid";
    imgblock.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`; // equal columns
    imgblock.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    imgblock.style.width = `${imgContainerWidth}px`;
    imgblock.style.height = `${imgContainerHeight}px`;
    imgblock.style.position = "absolute";
    imgblock.style.top = "0";
    imgblock.style.left = "0";
    imgblock.style.zIndex = 2;
    imgblock.style.pointerEvents = "auto";

    const blocks = [];

    const numBlocks = numCols * numRows;
    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.width = `${blockWidth}px`;
      block.style.height = `${blockHeight}px`;
      block.style.pointerEvents = "auto";
      imgblock.appendChild(block);
      blocks.push(block);
    }

    blocks.forEach((block) => {
      let timeoutId;
      block.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
        block.classList.add("active");
        timeoutId = setTimeout(() => {
          block.classList.remove("active");
        }, resetDuration);
      });
      block.addEventListener("mouseleave", () => {
        clearTimeout(timeoutId);
        block.classList.remove("active");
      });
    });
  }


  buildGrid();

 
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 150);
  });
});
