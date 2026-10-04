'use strict'

const form = document.querySelector("#form_toDO");
const submitBTN = document.querySelector("#btn_submit");
const input = document.querySelector("#form_input");
let listToDo = JSON.parse(localStorage.getItem("toDo")) || [];
const ul = document.querySelector("#todo_list");


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

    if (listToDo.length === 0) {
        ul.innerHTML = `<p>Список пуст!</p>`;
        return;
    }
    ul.innerHTML = "";

    listToDo.forEach(item => {

        let li = document.createElement("li");
        let itemStatus = item.status === "inWork" ? "В работе!" : "Завершон!";
        li.dataset.id = item.id;
        li.className = "todo-row";
        li.innerHTML = ` <span class="id_task" data-id="1">
                        #${counter}
                    </span>
                    <span class="text_task" data-id="${item.id}">${item.text}</span>
                    <span class="status_task" data-id="${item.id}">${itemStatus}</span>
                    <span class="task_ended" data-id="${item.id}"><button data-id="${item.id}" class="task_ended_button" >Закончить</button></span>
                    <span class="delete_task"  data-id="${item.id}"><button class="delete_task_btn"  data-id="${item.id}">Удалить</button></span>`;
        ul.append(li);
        counter++;

    });
}

submitBTN.addEventListener('click', function (e) {

    e.preventDefault();
    const statusAdd = addTask(input);
    if (statusAdd) {
        renderList();
        input.value = "";
    }
})

renderList();