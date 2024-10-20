//obtenemos el elemento select
let opcion = document.getElementById('contenedorPeliculasSeries');

//obtenemos el input
let entrada = document.getElementById('barraBuscar');

//obtenemos el boton 
let boton = document.getElementById('botonBuscar');

//obtenemos el ul donde se mostraran los resultados
let lista = document.getElementById('listaHallazgos');

let archivoJson = opcion.value;//aqui ya tiene el que posee por defecto

//evento que realiza el cambio de seleccion de usuario
opcion.addEventListener('change', cambiarOpcion);

//evento que llama a un evento personalizado para mostrar el mensaje
opcion.addEventListener('mensajeCambio', mensaje);

//evento que provoca que solo se permitan letras y las teclas de espacio y borrar
entrada.addEventListener('keydown', function(event){
    if((event.key < 65 || event.key > 90) && event.key != 32 && event.key != 8){
        event.preventDefault();   
    }
});

//evento que realiza la busqueda
boton.addEventListener('click', busqueda);

//ultimos eventos PARA MOSTRAR Y OCULTAR LA SIPNOSIS
li.addEventListener('mouseover', function(){
    elementoP.style.display = 'block';
});

li.addEventListener('mouseout', function(){
    elementoP.style.display = 'none';
})

//funciones que son llamadas por los eventos
function cambiarOpcion(){
    archivoJson = opcion.value; //aqui se obtiene el valor de la opcion que el usuario elija
    let evento = new CustomEvent('mensajeCambio');
    opcion.dispatchEvent(evento);
}

function mensaje(){
    alert('Opcion cambiada: ' + opcion.value);
}


function busqueda(){
    lista.innerHTML = "";//cuando se va a iniciar una busqueda se limpia
    
    //obtnenemos el json que se elije
    let json = '/json/' + archivoJson;
   
    //entrada del usuario para filtrar
    let ingreso = entrada.value 
    
    //recordar que hago todo mayusculas porque no hay minusculas en el json..
    let datoBusqueda = ingreso.toUpperCase();
    
    //con fetch hago la llamada al json que el usuario elegio..
    fetch(json)
    .then(res => res.json())
    .then(salida => {
        for(let item of salida.data){
            if(item.nombre.startsWith(datoBusqueda) == true){//si hay coincidencias totales o parciales
                //crea el elemento li y p y le brinda la informacion 
                let parrafo = document.createElement("p");
                parrafo.id= item.nombre;// el id del parrafo sera el nombre
                parrafo.innerText = item.sinopsis;
                parrafo.display = 'none';//no quiero que se muestre de una vez

                let itemLista = document.createElement("li");
                itemLista.innerText = item.nombre + ": ";
                
                //creo el evento de una vez para que se muestre cuando el mouse este encima del li, tomo el id segun el item.nombre..
                itemLista.addEventListener('mouseover', function(){
                    let parrafo = document.getElementById(item.nombre);
                    parrafo.style.display= 'block';
                });

                //cuando el mouse se retira del li..
                itemLista.addEventListener('mouseout', function(){
                    let parrafo = document.getElementById(item.nombre);
                    parrafo.style.display= 'none';
                });

                //finalmente se agregan el p al li y el li al ul
                itemLista.appendChild(parrafo);
                lista.appendChild(itemLista);
            }
        }
    })
    .catch(function(error){//finalmente si algo sale mal que muestre en consola el error
        console.log(error);
    });
}




