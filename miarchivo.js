let listaDeTareas = '';

function hacerLista(){
    let contador = 1;

    while(true){
       let nuevaTarea = prompt('Ingrese una tarea o presione cancelar');
    
        if(nuevaTarea === null || nuevaTarea === ''){
            break;
        }
    
        listaDeTareas +=`${contador} - ${nuevaTarea}. \n`;
        contador ++;
    }
    
}

function mostrarLista(){
    alert(listaDeTareas);
}

