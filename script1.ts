
interface Task {
    id: number;
    text: string;
    status: "inWork" | "Done"
    ended?: "inwork" | "done"
}

const form: HTMLFormElement | null = document.querySelector("#form_toDO");
const submitBTN: HTMLButtonElement | null = document.querySelector("#btn_submit");
const input: HTMLInputElement = document.querySelector("#form_input")!;
const rawData = localStorage.getItem("toDo");
let listToDo: Task[] = rawData ? JSON.parse(rawData) : [];
const ul: HTMLUListElement | null = document.querySelector("#todo_list");
const filter: HTMLElement | null = document.querySelector(".todo-filter-row");
let currentFilter = "Все";
let showList: Task[];
if (form) {
    form.addEventListener('submit', function (e: SubmitEvent) {
        e.preventDefault();
    })
}

function addTask(item: HTMLInputElement) {
    if (item.value.trim() === "") {
        alert("Введина пустая строка!")
        return false;
    }
    listToDo.push({
        id: Date.now(),
        text: item.value,
        status: "inWork",
        ended: "inwork"
    })
    localStorage.setItem("toDo", JSON.stringify(listToDo))
    return true;
}

function renderList() {
    if (ul) {
        let counter = 1;

        ul.innerHTML = "";
        showList = listToDo.filter(function (e) {
            if (e.status === currentFilter || currentFilter === "Все") {
                e.ended = e.status === "Done" ? "done" : "inwork";
                return (true)
            } else return(false)
        })
        if (showList.length === 0) {
            ul.innerHTML = `<p>Список пуст!</p>`;
            return;
        } else {


            showList.forEach(item => {

                let li = document.createElement("li");
                let itemStatus = item.status === "inWork" ? "В работе!" : "Завершон!";
                li.dataset.id = item.id.toString();
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
}
submitBTN?.addEventListener('click', function (e:MouseEvent) {

        e.preventDefault();
        const statusAdd: boolean = addTask(input);
        if (statusAdd) {
            renderList();
            input.value = "";
        }
})


if (ul) {
    ul.addEventListener('click', function (e:MouseEvent) {
        const target = e.target as HTMLButtonElement;
        if (target.className === 'task_ended_button') {
            doneTask(target)
        }
        else if (target.className === 'delete_task_btn') {
            deleteElement(target);
        }
        
    })
}

function deleteElement(e: HTMLButtonElement) {
        e.closest(".todo-row")?.remove();
        let idItem = Number(e.dataset.id)
        listToDo = listToDo.filter(a => a.id != idItem);
        localStorage.setItem("toDo", JSON.stringify(listToDo))
        renderList();
}

function doneTask(e:HTMLButtonElement) {

        listToDo = listToDo.map(function (i:Task) {
            if (i.id === Number(e.dataset.id)){
                i.status = "Done";
                i.ended = "done"
                return (i)
            }
            return (i)
        })
        localStorage.setItem("toDo", JSON.stringify(listToDo))
        renderList();
}
if (filter) {
    filter.addEventListener("click", function (e:MouseEvent) {
        const target = e.target as HTMLElement;
            e.preventDefault();
            let filter_target : "Все" | "inWork" | "Done";
            if (target.id === "all_task") {
                filter_target = "Все";
            } else if (target.id === "in_process") {
                filter_target = "inWork";
            } else if (target.id === "completed") {
                filter_target = "Done";

            } else return;
            currentFilter = filter_target
            renderList();
    })
}

renderList();

