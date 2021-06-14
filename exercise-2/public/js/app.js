var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString, position) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.setAttribute('id',position)
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function (position) {
  console.log()
  if(typeof position !=='number'){
    position =JSON.parse(localStorage.Pending).length;
  }
  var listItemName = taskInput.value ;
  if(listItemName){
    listItem = createNewTaskElement(listItemName,position)
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted);
    setPendingTasks(listItemName)
    taskInput.value = "";
  }else{
    document.getElementById('new-task').setAttribute('style','border-color:red')
    setTimeout(() => {
      document.getElementById('new-task').setAttribute('style','border-color:silver')
    }, 3000);
  }
  
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    if(listItem.parentNode.id == 'completed-tasks'){
      editCompletedTask(editInput.value,this.parentNode.id)
    }else{
      editPendingTask(editInput.value,this.parentNode.id)

    }
      label.innerText = editInput.value
      button.innerText = "Edit";
  } else {
     editInput.value = label.innerText
     button.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function (el) {
  var listItem = this.parentNode;
  const listItemLabel = this.parentNode.getElementsByTagName('label')[0].textContent;
  if(listItem.parentNode.id ==='completed-tasks'){
    deleteCompletedTask(listItemLabel)
  }else{
    deletePendingTask(listItemLabel)
  }
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function (el) {
  var listItem = this.parentNode;
  const label = this.nextElementSibling.textContent
  setCompletedTasks(label)
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

var editPendingTask = function(listitem,position){
  let data = JSON.parse(localStorage.Pending);
  data[position] = listitem;
  localStorage.setItem('Pending',JSON.stringify(data))
}
var editCompletedTask = function(listitem,position){
  let data = JSON.parse(localStorage.Completed);
  data[position] = listitem;
  localStorage.setItem('Completed',JSON.stringify(data))
}
var setPendingTasks = function(listItem){
  if(localStorage.Pending){
    let data = JSON.parse(localStorage.Pending);
    let duplicates = false;
    data.map((item)=>{
      if(item===listItem){
        duplicates=true
      }
    })
    if(!duplicates){
      data.push(listItem);
      localStorage.setItem('Pending',JSON.stringify(data))
    }
  }else{
    localStorage.setItem('Pending', JSON.stringify([listItem]))
  }
}
var setCompletedTasks = function(listItem){
  if(localStorage.Completed){
    let data = JSON.parse(localStorage.Completed);
    let dataPending =JSON.parse(localStorage.Pending);
    let duplicates = false;
    let newPending = [];
    dataPending.map((data)=>{
      if(data!==listItem){
        newPending.push(data)
      }
    })
    data.map((item)=>{
      if(item===listItem){
        duplicates=true
      }
    })
    localStorage.setItem('Pending',JSON.stringify(newPending))
    if(!duplicates){
      data.push(listItem);
      localStorage.setItem('Completed',JSON.stringify(data))
    }
  }else{
    localStorage.setItem('Completed', JSON.stringify([listItem]))
  }
}

var loadPendingTasks = function(){
  if(localStorage.Pending){
    const Data = JSON.parse(localStorage.Pending);
    Data.map((data,index)=>{
      taskInput.value  = data;
      addTask(index);
      taskInput.value  = ''
    })
  }
}
var loadCompletedTasks = function(){
  if(localStorage.Completed){
    const Data = JSON.parse(localStorage.Completed);
    Data.map((data,index)=>{
      const listItem = createNewTaskElement(data,index);
      listItem.getElementsByTagName('input')[0].checked =true
      completedTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskIncomplete);
    })
  }
}
var deleteCompletedTask = function(taskItem){
  const Data = JSON.parse(localStorage.Completed);
  let newCompleted = []
  Data.map((data)=>{
    if(data!==taskItem){
      newCompleted.push(data);
    }
  });
  localStorage.setItem('Completed', JSON.stringify(newCompleted))

}
var deletePendingTask = function(taskItem){
  const Data = JSON.parse(localStorage.Pending);
  let newPending = []
  Data.map((data)=>{
    if(data!==taskItem){
      newPending.push(data);
    }
  });
  localStorage.setItem('Pending', JSON.stringify(newPending))

}
document.onkeydown = function(e) {
  if(e.keyCode === 13) { // The Enter/Return key
    addTask(JSON.parse(localStorage.Pending).length);
  }
};
loadPendingTasks();
loadCompletedTasks()

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}