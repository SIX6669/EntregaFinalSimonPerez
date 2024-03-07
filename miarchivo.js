class Tarea {
    constructor(id, nombre, completada){
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
    }
}    

window.onload = async function(){
    await cargarTareasDesdeLocalStr();
    mostrarTareaMsarcada();
}

async function cargarTareasDesdelocalStr(){
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
    botonMarcado.addEventListener("click",function(){
        
    })

    botonMarcado.addEventListener("click", function(){
        tareaMarcada(t)
        listaElement.removeChild(tareaDiv);
        tareaMarcadaAlLocal();
        mostrarTareaMarcada()
    })

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
      tareaDiv.appendChild(tareaElement);
      listElement.appendChild(tareaDiv);
    }) 
    
    
}

//Calendario

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

function updateCalendar(){
    yearDiv.innerText = now.year;
    monthDiv.innerText = now.monthLong;
    calendarioDias.innerHTML="";

    let daysInAMonth = now.daysInMonth;

    for(i = 1; i <=daysInAMonth; i++){
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;
        calendarioDias.appendChild(day);
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

