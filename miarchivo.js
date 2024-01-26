let listaDeTareas = [];

function crearTarea(){
    let contador = listaDeTareas.length + 1;

    while(true){
       let nuevaTarea = prompt('Ingrese una tarea o presione cancelar');
    
        if(nuevaTarea === null || nuevaTarea === ''){
            break;
        }
    
        listaDeTareas.push({id: contador, nombre: nuevaTarea, completada: false });
        contador ++;
    }
    
}

function mostrarLista(){
    let listaFormateada = listaDeTareas.map(tarea => `${tarea.id} - ${tarea.nombre} (${tarea.completada ? 'Completada' : 'Pendiente'})`).join('\n');
    alert(listaFormateada);
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
