let currentValue = "0";
let previousValue = null;
let pendingOperator = null;
let justEvaluated = false;

const displayEl = document.getElementById("display");
const historyEl = document.getElementById("history");
const opMap = { "+": "+", "−": "-", "×": "*", "÷": "/" };

function updateScreen() {
  displayEl.textContent = format(currentValue);
  historyEl.textContent = (pendingOperator && previousValue!== null)? `${format(previousValue)} ${pendingOperator}` : "\u00A0";
  document.querySelectorAll(".key-op").forEach(b => b.classList.toggle("is-active", b.dataset.op === pendingOperator));
}
function format(v) {
  if (v === "Error") return v;
  if (v.toString().length <= 11) return v;
  return Number(v).toPrecision(8);
}
function inputDigit(d) {
  if (justEvaluated || currentValue === "Error") { currentValue = d; justEvaluated = false; }
  else { currentValue = currentValue === "0"? d : currentValue + d; }
  updateScreen();
}
function inputDecimal() {
  if (justEvaluated) { currentValue = "0."; justEvaluated = false; }
  else if (!currentValue.includes(".")) currentValue += ".";
  updateScreen();
}
function chooseOperator(op) {
  if (currentValue === "Error") return;
  if (pendingOperator && previousValue!== null &&!justEvaluated) evaluate();
  previousValue = currentValue;
  pendingOperator = op;
  justEvaluated = true;
  updateScreen();
}
function evaluate() {
  if (!pendingOperator || previousValue === null) return;
  const a = parseFloat(previousValue), b = parseFloat(currentValue);
  let r;
  switch (opMap[pendingOperator]) {
    case "+": r = a + b; break;
    case "-": r = a - b; break;
    case "*": r = a * b; break;
    case "/": r = b === 0? NaN : a / b; break;
  }
  currentValue = isFinite(r)? parseFloat(r.toFixed(10)).toString() : "Error";
  previousValue = null; pendingOperator = null; justEvaluated = true;
  updateScreen();
}
function percent() { if(currentValue!=="Error") { currentValue = (parseFloat(currentValue)/100).toString(); updateScreen(); } }
function backspace() {
  if (justEvaluated || currentValue === "Error" || currentValue.length === 1) currentValue = "0";
  else currentValue = currentValue.slice(0, -1);
  justEvaluated = false; updateScreen();
}
function clearAll() { currentValue="0"; previousValue=null; pendingOperator=null; justEvaluated=false; updateScreen(); }

document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    const {num, op, action} = btn.dataset;
    if(num!==undefined) inputDigit(num);
    else if(op!==undefined) chooseOperator(op);
    else if(action==="decimal") inputDecimal();
    else if(action==="equals") evaluate();
    else if(action==="clear") clearAll();
    else if(action==="backspace") backspace();
    else if(action==="percent") percent();
  });
});

const keyMap = {"+":"+","-":"−","*":"×","/":"÷"};
document.addEventListener("keydown", e => {
  if(e.key>="0"&&e.key<="9") inputDigit(e.key);
  else if(e.key===".") inputDecimal();
  else if(keyMap[e.key]) chooseOperator(keyMap[e.key]);
  else if(e.key==="Enter"||e.key==="="){e.preventDefault();evaluate();}
  else if(e.key==="Backspace") backspace();
  else if(e.key==="Escape") clearAll();
  else if(e.key==="%") percent();
});
updateScreen();