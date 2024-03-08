class Tarea {
    constructor(id, nombre, completada){
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
    }
}    

window.onload = async function(){
    await cargarTareasDesdeLocalStr();
    mostrarTareaMarcada();
}

async function cargarTareasDesdeLocalStr(){
    let tareasGuardadas = await obtenerDesdeLocalStr("Lista de Tareas");
    listaDeTareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];

    let tareasCompletadas = await obtenerDesdeLocalStr("Tareas Marcadas");
    tareasMarcadas = tareasCompletadas ? JSON.parse(tareasCompletadas) : [];
}

function obtenerDesdeLocalStr(clave){
   return new Promise((res) => {
    let valor = localStorage.getItem(clave);
    res(valor);
   })
}

function guardrEnLocalStr(clave, valor){
    new Promise((res)=>
    {localStorage.setItem(clave, JSON.stringify(valor));
    res();
    })
}

let listaDeTareas = [];
let tareasMarcadas = [];
//Botones
let inputTarea = document.getElementById("inputTarea");
let addTaskButton = document.getElementById("addTaskButton");
let showListButton = document.getElementById("showListButton");

function agrearTarea(){
    listaDeTareas.push(new Tarea(listaDeTareas.length + 1, inputTarea.value, false));
    inputTarea.value ="";
    guardrEnLocalStr("Lista de Tareas", listaDeTareas);
}

inputTarea.addEventListener("keydown", function(event){
    if (event.key==="Enter") {
       agrearTarea();
       event.preventDefault();
    }
});

addTaskButton.addEventListener("click", function(){
    agrearTarea();
});

function mostrarLista(){
  let listaElement = document.getElementById("taskList");
  listaElement.innerHTML = "";

  let tareasGuardadas = localStorage.getItem("Lista de Tareas");
  if(tareasGuardadas){
    listaDeTareas = JSON.parse(tareasGuardadas)
  }

  listaDeTareas.forEach(t =>{
    let tareaDiv = document.createElement("div")
    let tareaElement = document.createElement("li");
    tareaElement.textContent = t.nombre;

    let botonMarcado = document.createElement("button");
    botonMarcado.classList.add("btn", "btn-succes");
    botonMarcado.textContent = "Completado";
    botonMarcado.addEventListener("click", function(){
        tareaMarcada(t)
        listaElement.removeChild(tareaDiv);
        tareaMarcadaAlLocal();
        mostrarTareaMarcada()
    })

    let botonBorrar = document.createElement("button");
    botonBorrar.classList.add("btn", "btn-danger");
    botonBorrar.innerHTML = "Borrar";
    botonBorrar.addEventListener("click", function(){
        borrarTarea(t);
        listaElement.removeChild(tareaDiv);
    })

    tareaElement.appendChild(botonBorrar);
    tareaElement.appendChild(botonMarcado);
    tareaDiv.appendChild(tareaElement);
    listaElement.appendChild(tareaDiv);
  })
  
}

showListButton.addEventListener("click",mostrarLista);

function tareaMarcada(t){
    let tareaIndex = listaDeTareas.indexOf(t)
    if(tareaIndex !== -1){
        listaDeTareas[tareaIndex].completada = true;
        let tareaMarcada = listaDeTareas.splice(tareaIndex, 1)[0];
        tareasMarcadas.push(tareaMarcada);
        localStorage.setItem("Lista de Tareas", JSON.stringify(listaDeTareas));
        
    }
}

function borrarTarea(t){
    let tareaIndex = listaDeTareas.indexOf(t);
    if(tareaIndex != -1){
        listaDeTareas.splice(tareaIndex, 1);
        localStorage.setItem("Lista de Tareas", JSON.stringify(listaDeTareas));
    }
}

function tareaMarcadaAlLocal(){
    localStorage.setItem("Tareas Marcadas",JSON.stringify(tareasMarcadas))
}


function mostrarTareaMarcada(){
    let listElement = document.getElementById("markedList");
    listElement.innerHTML = "";

    let tareasGuardadas = localStorage.getItem("Tareas Marcadas");
    tareasMarcadas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
      
    tareasMarcadas.forEach(t =>{
      let tareaDiv = document.createElement("div");
      let tareaElement = document.createElement("li");
      tareaElement.textContent = t.nombre;

      let botonBorrar = document.createElement("button");
      botonBorrar.classList.add("btn", "btn-danger");
      botonBorrar.innerHTML = "Borrar"

      botonBorrar.addEventListener("click", function(){
        borrarTarea(t);
        listElement.removeChild(tareaDiv);
      })

      tareaElement.appendChild(botonBorrar);
      tareaDiv.appendChild(tareaElement);
      listElement.appendChild(tareaDiv);
    }) 
    
    
}

let DateTime = luxon.DateTime;
let now = DateTime.local();

let calendarioAño = document.getElementById("calendar-años");
let calendarioMes = document.getElementById("calendar-meses");
let calendarioDias = document.getElementById("calendar-dias");

let yearDiv = document.createElement("div");
yearDiv.className = "year";
yearDiv.innerText = now.year;
calendarioAño.appendChild(yearDiv);

let monthDiv = document.createElement("div");
monthDiv.className = "month";
monthDiv.innerText = now.monthLong;
calendarioMes.appendChild(monthDiv);

function updateCalendar() {
    yearDiv.innerText = now.year;
    monthDiv.innerText = now.monthLong;
    calendarioDias.innerHTML = "";

    let daysInAMonth = now.daysInMonth;
    let startingDayOfWeek = now.startOf("month").weekday;

    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Agregar nombres de los días de la semana
    for (let i = 0; i < 7; i++) {
        let dayName = document.createElement("div");
        dayName.className = "day-name";
        dayName.innerText = dayNames[i];
        calendarioDias.appendChild(dayName);
    }

    // Agregar días en blanco antes del primer día del mes
    for (let i = 0; i < startingDayOfWeek; i++) {
        let emptyDay = document.createElement("div");
        emptyDay.className = "empty-day";
        calendarioDias.appendChild(emptyDay);
    }

    let orderDays = [];
    for (let i = 1; i <= daysInAMonth; i++) {
        orderDays.push(i);
    }

    orderDays.sort((a, b) => {
        let dateA = now.set({ day: a });
        let dateB = now.set({ day: b });
        return dateA.weekday - dateB.weekday;
    });

    let counter = 0;
    for (let i = 1; i <= daysInAMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        let date = now.set({ day: i });
        day.setAttribute("data-date", date.toISODate());
        if (date.startOf("day") < DateTime.local().startOf("day")) {
            day.classList.add("violet");
        } else if (date.startOf("day") > DateTime.local().startOf("day")) {
            day.classList.add("green");
        } else {
            day.classList.add("gray");
        }

        day.innerText = i;
        calendarioDias.appendChild(day);
        counter++;
    }

    // Rellenar el espacio restante en la fila con días en blanco
    while (counter % 7 !== 0) {
        let emptyDay = document.createElement("div");
        emptyDay.className = "empty-day";
        calendarioDias.appendChild(emptyDay);
        counter++;
    }
}

updateCalendar();

document.getElementById("prevMonth").addEventListener("click", () =>{
    now = now.minus({month:1});
    updateCalendar();
})

document.getElementById("nextMonth").addEventListener("click",()=>{
    now = now.plus({months: 1});
    updateCalendar();
});
