var msg = document.querySelector("#msg");
var outputSec = document.querySelector(".output-data");
var output = document.querySelector(".output");
var inputSec = document.querySelector("#input");
var startBtn = document.querySelector("#start");
var stopBtn = document.querySelector("#stop");
var stopBtn = document.querySelector("#cmnt");
var allSortOpts = document.querySelectorAll(".opt");
var sortMode = "bubble";
var blockArray = [];

function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

class Block {
  constructor(value) {
    this.crrValue = value;
    this.height = `${this.adjustHeight()}px`;
    this.width = "max-content";
    this.domNode = this.createCrrNode();
    this.id = this.domNode.getAttribute("id");
    this.applyStyle();
  }

  createCrrNode() {
    let node = document.createElement("div");
    node.setAttribute("id", `block-${parseInt(Math.random() * 100000)}`);
    node.innerHTML = ` <span class="highlight">  ${this.crrValue}  </span>`;
    return node;
  }

  applyStyle() {
    this.domNode.style.cssText = `
        height: ${this.height}; 
        width: ${this.width};
        color: white;
        background-color:${generateRandomColor()};
        border: 1px solid grey;
        border-bottom: none;
        padding: 5px 4px;
        margin: 2px;
        margin-bottom: 0;
        font-size: 10px;
        display:flex;
        justify-content: center;
        align-items: flex-start;
    `;
  }

  addInside(container) {
    container.insertAdjacentElement("beforeEnd", this.domNode);
  }

  swap(givenValue) {
    console.log("Value Swapped");
    console.log("Before swap " + this.crrValue);
    console.log("After swap " + givenValue);
  }

  adjustHeight() {
    let max = Block.prototype.maxVal;
    let base = 150;
    let literalHeight = Math.round((this.crrValue / max) * base);
    return literalHeight;
  }
}

function setBg(element, color) {
  let prev = element.domNode.style.backgroundColor;
  element.domNode.style.backgroundColor = color;

  return prev;
}

async function resetBg(el, pv) {
  await new Promise((done) => setTimeout(() => done(), 1));
  return setBg(el, generateRandomColor());
}

async function bubbleSortAlgorithm(unsortedArray) {
  let tmp;
  for (let i = 0; i < unsortedArray.length; i++) {
    for (let j = 0; j < unsortedArray.length - i - 1; j++) {
      //   let pv1 = blockArray[j].domNode.style.backgroundColor;
      //   let pv2 = blockArray[j + 1].domNode.style.backgroundColor;
      //   blockArray[j].domNode.style.backgroundColor = "red";
      //   blockArray[j + 1].domNode.style.backgroundColor = "red";
      setBg(blockArray[j], "red");
      setBg(blockArray[j + 1], "red");

      if (unsortedArray[j] < unsortedArray[j + 1]) {
        tmp = unsortedArray[j + 1];
        unsortedArray[j + 1] = unsortedArray[j];
        unsortedArray[j] = tmp;
      }
      resetBg(blockArray[j]);
      resetBg(blockArray[j + 1]);
    }
  }

  let sortedArray = unsortedArray;
  console.log(sortedArray);
  outputSec.innerHTML = "";
  console.log(blockArray);
  sortedArray.forEach((value, idx) => {
    blockArray.forEach((el) => {
      if (el.crrValue == value) {
        el.addInside(outputSec);
      }
    });
  });
}

function sortArray(mode = "bubble", unsortedArray) {
  if (mode == "bubble") {
    // console.log(` This is sort mode ->  ${unsortedArray}` + sortMode);
    bubbleSortAlgorithm(unsortedArray);
  } else if (mode == "selection") {
    console.log(" This is sort mode -> " + sortMode);
  } else if (mode == "quick") {
    console.log(" This is sort mode -> " + sortMode);
  } else if (mode == "merge") {
    console.log(" This is sort mode -> " + sortMode);
  }
}

function makeAnimation(unsortedArray) {
  outputSec.innerHTML = "";
  unsortedArray.forEach((element, i) => {
    blockArray[i] = new Block(element);
    blockArray[i].addInside(outputSec);
  });

  startBtn.addEventListener("click", () => {
    sortArray("bubble", unsortedArray);
  });
  stopBtn.addEventListener("click", () => {});
}

function changeInputhandler() {
  val = inputSec.value;
  data = val.split(" ").filter((v) => Number(v));
  data = data.map((el) => Number(el));
  // console.log(`Sorting Array ${data}`);
  output.style.visibility = "visible";
  msg.style.visibility = "visible";
  setTimeout(() => (msg.style.visibility = "hidden"), 2000);

  if (data.length > 24) {
    alert("More than 25 numbers are not allowed");
    data = data.filter((el, idx) => {
      if (idx <= 24) {
        return el;
      }
    });
    reparsed_data = data.reduce((prev, single_num) => prev + " " + single_num);
    inputSec.value = reparsed_data;
  }

  //   console.log(Math.max(...data));
  Block.prototype.maxVal = Math.max(...data);
  makeAnimation(data);
}

function main() {
  inputSec.addEventListener("change", changeInputhandler);
  // inputSec.addEventListener("input", changeInputhandler);
  msg.style.visibility = "hidden";
  changeInputhandler();
  allSortOpts.forEach((el) => {
    el.addEventListener("change", (e) => {
      sortMode = e.target.value;
      console.log(sortMode);
    });
  });
}

main();
