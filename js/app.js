//Variables globales
const listaCursos = document.querySelector('#lista-cursos');
const tbody = document.querySelector('table tbody');
const carrito = document.querySelector('#carrito');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let arrCursos = [];

//Eventos
eventListeners();
function eventListeners(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    document.addEventListener('DOMContentLoaded', () => {
        arrCursos = JSON.parse(localStorage.getItem('cursos')) || [];
        mostrarHTML();
    });
    btnVaciarCarrito.addEventListener('click', () => {
        arrCursos = [];
        mostrarHTML();
    });
}

//Funciones
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        if(e.target.parentElement.previousElementSibling.textContent > 1){
            //Decrementar en uno a count
            arrCursos = arrCursos.map(item => {
                if(item.id === e.target.getAttribute('data-id')){
                    item.count--;
                    return item;
                }
                return item;
            });
        }else{
            arrCursos = arrCursos.filter(item => item.id != e.target.getAttribute('data-id'));
        }
        mostrarHTML();
    }
}
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const card = e.target.parentElement.parentElement;
        leerDatos(card);
    }
}
function leerDatos(card){
    const cardObj = {
        title: card.querySelector('h4').textContent,
        image: card.querySelector('img').src,
        price: card.querySelector('.precio span').textContent,
        id: card.querySelector('a').getAttribute('data-id'),
        count: 1
    }
    //Validar si cardObj ya existe
    const some = arrCursos.some(item => item.id ===  cardObj.id);
    if(some){
        //Incrementar en uno a count
        arrCursos = arrCursos.map(item => {
            if(item.id === cardObj.id){
                item.count++;
                return item;
            }
            return item;
        });
    }else{
        arrCursos.push(cardObj);
    }
    mostrarHTML();
}
function mostrarHTML(){
    //Limpiar HTML
    limpiarHTML();

    if(arrCursos.length){
        //Mostrar cards
        arrCursos.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src=${item.image} width=100 height=100></img>
                </td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.count}</td>
                <td>
                    <a style="cursor: pointer;" class="borrar-curso" data-id=${item.id}>X</a>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('cursos', JSON.stringify(arrCursos));
}

function limpiarHTML(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
}

