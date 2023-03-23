//Variables globales
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const tbody = document.querySelector('table tbody');
const btnCarrito = document.querySelector('#vaciar-carrito');
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
}

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const card = e.target.parentElement.parentElement;
        leerDatos(card);
    }
}
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        if(e.target.parentElement.previousElementSibling.textContent > 1){
            //Decrementar en uno a count
            arrCursos = arrCursos.map(item => {
                if(item.id === e.target.getAttribute('data-id')){
                    item.count--;
                    //Return evita que  se sigan ejecutando mas lineas de codigo
                    return item;
                }
                return item;
            });
        }else{
            //Filtrar los elementos
            arrCursos = arrCursos.filter(item => item.id != e.target.getAttribute('data-id'));
        }
        mostrarHTML();
    }
}
function leerDatos(card){
    const objCurso = {
        image: card.querySelector('img').src,
        title: card.querySelector('h4').textContent,
        price: card.querySelector('.precio span').textContent,
        id: card.querySelector('a').getAttribute('data-id'),
        count: 1
    }

    //Verificar si ya existen elementos en el array
        //some me devuelve true si al menos un elemento cumple con la condicion de la callback
    const some = arrCursos.some(item => item.id === objCurso.id);
    if(some){
        //Incrementar en uno a count
        arrCursos = arrCursos.map(item => {
            if(item.id === objCurso.id){
                item.count++;
                return item;
            }
            return item;
        });
    }else{
        arrCursos.push(objCurso);
    }
    mostrarHTML();
}
function mostrarHTML(){
    //Limpiar cursos
    limpiarHTML();

    if(arrCursos.length){
        arrCursos.forEach(item => {
            //Crear row
            const row = document.createElement('tr');
    
            //Crear td de img
            const tdImg = document.createElement('td');
            const img = document.createElement('img');
            img.src = item.image;
            img.width = 100;
            img.height = 100;
            tdImg.appendChild(img);
            row.appendChild(img);
    
            //Crear td de title
            const tdTitle = document.createElement('td');
            tdTitle.textContent = item.title;
            row.appendChild(tdTitle);
    
            //Crear td de price
            const tdPrice = document.createElement('td');
            tdPrice.textContent = item.price; //Template string
            row.appendChild(tdPrice);
    
            //Craer td de count
            const tdCount = document.createElement('td');
            tdCount.textContent = item.count;
            row.appendChild(tdCount);
    
            //Crear td de Eliminar
            const tdEliminar = document.createElement('td');
            const eliminar = document.createElement('a');
            eliminar.textContent = 'X';
            eliminar.classList.add('borrar-curso');
            eliminar.style.cursor = 'pointer';
            eliminar.setAttribute('data-id', item.id);
            tdEliminar.appendChild(eliminar);
            row.appendChild(tdEliminar);
    
            tbody.appendChild(row);
        });
        mostrarTotal();
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
function mostrarTotal(){
    const total = arrCursos.reduce((acumulador, item) => acumulador + (item.count * Number(item.price.slice(1))), 0);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td></td>
        <td></td>
        <td>Total: ${total}</td>
    `;
    tbody.appendChild(row)
}
