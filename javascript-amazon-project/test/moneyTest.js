import { formatCurrency } from "../scripts/utils/money.js";
if (formatCurrency(2095) === '20.95') {
  console.log("Test passed" + ":" + formatCurrency(2095))
}
else {
  console.log("Test failed" + ":" + formatCurrency(2095))
}
if (formatCurrency(0) === '0.00') {
  console.log("Test passed" + ":" + formatCurrency(0))
}
else {
  console.log("Test failed" + ":" + formatCurrency(0))
}
if (formatCurrency(2000.5) === '20.01') {
  console.log("Test passed" + ":" + formatCurrency(2000.5))
}
else {
  console.log("Test failed" + ":" + formatCurrency(2000.5))
}
if (formatCurrency(2000.4) === '20.00') {
  console.log("Test passed" + ":" + formatCurrency(2000.4))
}
else {
  console.log("Test failed" + ":" + formatCurrency(2000.4))
}
