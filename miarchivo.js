class Tarea {
    constructor(id, nombre, completada){
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
    }
}

let listaDeTareas = [];

let inputTarea = document.getElementById("inputTarea");
let addTaskButton = document.getElementById("addTaskButton");
let showListButton = document.getElementById("showListButton");


inputTarea.addEventListener("keydown", function(event){
    if (event.key==="Enter") {
       agrearTarea();
       event.preventDefault();
    }
});

addTaskButton.addEventListener("click", function(){
    agrearTarea();
});

function agrearTarea(){
    listaDeTareas.push(new Tarea(listaDeTareas.length + 1, inputTarea.value, false));
    inputTarea.value ="";
}


function mostrarLista(){
  let listaElement = document.getElementById("taskList");
  listaElement.innerHTML = "";

  listaDeTareas.forEach(t =>{
    let tareaElement = document.createElement("li");
    tareaElement.textContent = t.nombre;
    listaElement.appendChild(tareaElement);
  })
}

function tareaMarcada(){
    let tareaNombre = prompt('¿Que tarea completaste?');
    let tarea = listaDeTareas.find(t => t.nombre === tareaNombre);
    if(tarea){
        tarea.completada = true;
        alert('tarea completada exitosamente');
    }else{
        alert('tarea no encontrada');
    }
}

function mostrarTareaMarcada(tareaNombre){
    let tarea = listaDeTareas.find(t => t.nombre === tareaNombre);
    if(tarea){
        alert(`La tarea ${tareaNombre} ha sido marcada como completada`);
    } else {
        alert("Tarea no encontrada");
    }
}


showListButton.addEventListener("click",mostrarLista);
