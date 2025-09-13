const array = [];
function addToArray() {
  const item = document.getElementById("todo-input");
  array.push(item.value);
  item.value = "";
  console.log(array);
  return array

}
function displayArray() {
  let p = document.createElement("p");
  p.textContent = array[array.length - 1];
  document.getElementById("todo-list").appendChild(p);
}
function displayArrayFinal() {
  let d = document.createElement("div");
  todoName = document.getElementById("todo-input-2").value;
  todoDate = document.getElementById("date").value;
  if (todoName === "" || todoDate === "") {
    alert("Please enter both a task and a date.");
    return;
  }
  else {

    d.className = "todo-items";
    d.innerHTML = `
<div style="display: flex; justify-content: space-between; width: 320px;">
  <p>${todoName}</p>
  <p>${todoDate}</p>
</div>
<button onclick="deleteItem(this)" class="delete-button">Delete</button>
`;
    document.getElementById("todo-list-paragraph").appendChild(d);
  }
  document.getElementById("todo-input-2").value = "";
  document.getElementById("date").value = "";


}
function deleteItem(button) {
  button.parentElement.remove();

}
