const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-throught";
let id;
let LIST;

// Creación de fecha

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
}); // parte del codigo del html

// Función agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  } // elinado existe? si se cumple retornar

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = ` 
  <li id = 'elemento'>
  <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
  <p class="text ${LINE}">${tarea}</p>
  <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
</li>
    `;

  lista.insertAdjacentHTML("beforeend", elemento);
}

//Función tarea realizada
function tareaRealizada(element) {
  element.classList.toggle(check); // agregue una clase
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough); // tacha elemento
  console.log(LIST[element.id].realizado);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

//Función tarea eliminada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}

// Cuando hacemos click
botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    // tarea existe?
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = ""; // borrar string, resteo
  id++; // conteo de id
});

// Cuando presionamos enter
document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    // evento, key(tecla)
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = ""; // STRING vacio borra letras
    id++;
  }
});

// actualizar tareas de realizado y eliminado
lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// local storage get item

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = lista.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
//localStorage.setItem('TODO',JSON.stringify(LIST))

//localStorage.getItem('TODO')
