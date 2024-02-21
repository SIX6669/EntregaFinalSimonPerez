class Tarea {
    constructor(id, nombre, completada){
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
    }
}

window.onload = function()  {
    let tareasGuardadas = localStorage.getItem("Lista de Tareas");
    listaDeTareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    
    let tareasCompletadas = localStorage.getItem("Tareas Marcadas");    
    tareasMarcadas = tareasCompletadas ? JSON.parse(tareasCompletadas) : [];
    
    mostrarTareaMarcada();
}

let listaDeTareas = [];

let inputTarea = document.getElementById("inputTarea");
let addTaskButton = document.getElementById("addTaskButton");
let showListButton = document.getElementById("showListButton");

function agrearTarea(){
    listaDeTareas.push(new Tarea(listaDeTareas.length + 1, inputTarea.value, false));
    inputTarea.value ="";
    localStorage.setItem("Lista de Tareas", JSON.stringify(listaDeTareas))
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
    botonMarcado.textContent = "Completado";

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

let tareasMarcadas = [];

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



