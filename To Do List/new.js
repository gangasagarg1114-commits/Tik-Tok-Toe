const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");


addBtn.addEventListener("click", function () {
    const task = input.value.trim();
    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.innerText = task;
    li.classList.add("task");

    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function(){
    li.remove();
})
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    input.value = "";
    
});

deleteBtn.addEventListener("click", function(){
    li.remove();
})