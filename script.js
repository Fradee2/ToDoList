'use strict'

const form = document.querySelector("#form_toDO");
const submitBTN = document.querySelector("#btn_submit");
const input = document.querySelector("#form_input");
let listToDo = JSON.parse(localStorage.getItem("toDo")) || [];
const ul = document.querySelector("#todo_list");
const filter = document.querySelector(".todo-filter-row");
let currentFilter = "Все";
let showList;
form.addEventListener('submit', function (e) {
    e.preventDefault();
})


function addTask(item) {
    if (item.value.trim() === "") {
        alert("Введина пустая строка!")
        return false;
    }
    listToDo.push({
        id: Date.now(),
        text: item.value,
        status: "inWork"
    })
    localStorage.setItem("toDo", JSON.stringify(listToDo))
    return true;
}

function renderList() {
    let counter = 1;
    ul.innerHTML = "";
    showList = listToDo.filter(function (e) {
        if (e.status === currentFilter || currentFilter === "Все") {
            e.ended = e.status === "Done"? "done" :"inwork";
            return (e)
        }
    })
    if (showList.length === 0) {
        ul.innerHTML = `<p>Список пуст!</p>`;
        return;
    } else {
      

        showList.forEach(item => {
           
                let li = document.createElement("li");
                let itemStatus = item.status === "inWork" ? "В работе!" : "Завершон!";
                li.dataset.id = item.id;
                li.className = "todo-row";
                li.innerHTML = ` <span class="id_task" data-id="${item.id}">
                        #${counter}
                    </span>
                    <span class="text_task" data-status=${item.ended} data-id="${item.id}">${item.text}</span>
                    <span class="status_task" data-id="${item.id}">${itemStatus}</span>
                    <span class="task_ended" data-id="${item.id}"><button data-id="${item.id}" class="task_ended_button" >Закончить</button></span>
                    <span class="delete_task"  data-id="${item.id}"><button class="delete_task_btn"  data-id="${item.id}">Удалить</button></span>`;
                ul.append(li);
                counter++;
        });
    }
}

submitBTN.addEventListener('click', function (e) {

    e.preventDefault();
    const statusAdd = addTask(input);
    if (statusAdd) {
        renderList();
        input.value = "";
    }
})



ul.addEventListener('click', function (e) {
    if (e.target.className === 'task_ended_button') {
        doneTask(e.target)
    }
    else if (e.target.className === 'delete_task_btn') {
        deleteElement(e.target);
    }
    else return (false);
})

function deleteElement(e) {
    e.closest(".todo-row").remove();
    let idItem = Number(e.dataset.id)
    listToDo = listToDo.filter(a => a.id != idItem);
    localStorage.setItem("toDo", JSON.stringify(listToDo))
    renderList();
}

function doneTask(e) {

    listToDo = listToDo.map(function (i) {
        if (i.id === Number(e.dataset.id)) {
            i.status = "Done";
            return (i)
        }
        return (i)
    })
    localStorage.setItem("toDo", JSON.stringify(listToDo))
    renderList();
}

filter.addEventListener("click", function (e) {
    e.preventDefault();
    let filter_target;
    if (e.target.id === "all_task") {
        filter_target = "Все";
    } else if (e.target.id === "in_process") {
        filter_target = "inWork";
    } else if (e.target.id === "completed") {
        filter_target = "Done";

    } else return;
    currentFilter = filter_target
    renderList();
})

renderList();

