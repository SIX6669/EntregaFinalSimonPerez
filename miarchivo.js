let listaDeTareas = '';
let nuevaTarea;
let contador = 1;

while(true){
    nuevaTarea = prompt('Ingrese una tarea o presione cancelar');

    if(nuevaTarea === null || nuevaTarea === ''){
        break;
    }

    listaDeTareas +=`${contador} - ${nuevaTarea}. \n`;
    contador ++;
}
alert(listaDeTareas)
console.log(listaDeTareas)