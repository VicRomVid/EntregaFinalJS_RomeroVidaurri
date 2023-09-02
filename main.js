let lista = []

let elementoAgregar = document.getElementById("botonAgregar");

let elementoGuardar = document.getElementById("botonGuardar");

let elementoHistorica = document.getElementById("botonHistorica");

elementoAgregar.addEventListener("click",
    function agregarALista(){
    const especie = document.getElementById("especie").value
    const observaciones = parseInt(document.getElementById("observaciones").value)
    if(!isNaN(observaciones) && observaciones >0){
        const item = {especie, observaciones};
        lista.push(item);
        mostrarLista();
    }else{
        Swal.fire(
            'Error',
            'Ingresa una cantidad mayor a 0',
            'error'
        )
    }
});

elementoGuardar.addEventListener("click",
    function guardarLista(){
    const listaJSON = JSON.stringify(lista);
    localStorage.setItem("listaData", listaJSON)
    Swal.fire(
        '¡Listo!',
        'Tu lista ha sido guardada en el local storage',
        'success'
    )
});

elementoHistorica.addEventListener("click",
function historica(){
    fetch('listaHistorica.json')
    .then(response => response.json())
    .then(info => {
        const aves = info.aves;
        const avesContainer = document.getElementById('lista');
    
        aves.forEach(ave => {
            const aveElement = document.createElement('li');
            aveElement.textContent = `Nombre Común: ${ave.nombreComun}, Nombre Científico: ${ave.nombreCient}, Residencia: ${ave.residencia}`
            avesContainer.appendChild(aveElement);
        });
    })
    .catch(error => {
        console.error('Oh-oh! Algo salió mal.', error);
    });
});

function mostrarLista() {
    const listaElement = document.getElementById("lista")
    listaElement.innerHTML="";

    lista.forEach((item)=>{
        const listItem = document.createElement("li")
        listItem.textContent = `${item.especie} - observaciones: ${item.observaciones}`
        listaElement.appendChild(listItem)
    })  
};

