let guardarTareas = [];

function crearTarea() {
    let title = document.getElementById('titulos').value;
    let description = document.getElementById('descripciones').value;
    if (title === "" || description === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }
    // Guarda cada tarea como objeto
    guardarTareas.push({ title, description });
    localStorage.setItem("tareas", JSON.stringify(guardarTareas));
    mostrarTareas();
    document.getElementById("tareas").style.display = "block";
}

// Muestra todas las tareas
function mostrarTareas() {
    let llenatareas = document.getElementById("llenarTareas");
    llenatareas.innerHTML = "";
    guardarTareas.forEach((tarea, index) => {
        llenatareas.innerHTML += `
            <div class="row">
                <div class="col-sm-2">
                    <input type="checkbox" class="form check-input">
                </div>
                <div class="col-sm-5">
                    <h6>${tarea.title}</h6>
                    
                </div>
                <div class="col-sm-5">
                    <button class="btn btn-primary btn-sm" onclick="verTarea(${index})">Ver</button>
                    <button class="btn btn-warning btn-sm" onclick="editarTarea(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">Eliminar</button>
                </div>
            </div>
        `;
    });
}

// Elimina una tarea por índice
function eliminarTarea(index) {
    guardarTareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(guardarTareas));
    mostrarTareas();
    if (guardarTareas.length === 0) {
        document.getElementById("tareas").style.display = "none";
    }
}

function verTarea(index) {
    let tarea = guardarTareas[index];
    document.getElementById("verTitulo").innerText = tarea.title;
    document.getElementById("verDescripcion").innerText = tarea.description;
    document.getElementById("verModal").style.display = "block";
}
