let carrito = [];

function agregarAlCarrito(producto, precio) {
    const item = carrito.find(item => item.nombre === producto);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ nombre: producto, precio: precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => quitarDelCarrito(item.nombre);
        li.appendChild(botonEliminar);
        
        carritoItems.appendChild(li);
        total += item.precio * item.cantidad;
    });

    document.getElementById('total').textContent = total;
    verificarListaVacia();
    agregarEfectosAItems();
}

function quitarDelCarrito(producto) {
    const indice = carrito.findIndex(item => item.nombre === producto);
    if (indice !== -1) {
        carrito[indice].cantidad > 1 ? carrito[indice].cantidad-- : carrito.splice(indice, 1);
    }
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function buscarProducto() {
    const input = document.getElementById('buscarInput').value.toLowerCase();
    buscarProductoDesdeInput(input);
}

function buscarProductoDesdeInput(input) {
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        producto.style.display = producto.getAttribute('nombre_producto').toLowerCase().includes(input) ? 'block' : 'none';
    });
}

document.getElementById('buscarInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarProducto();
    }
});

function agregarEfectosAItems() {
    const itemsLista = document.querySelectorAll('#carrito-items li');
    
    itemsLista.forEach(item => {
        item.addEventListener('mouseenter', () => item.style.backgroundColor = '#8b8b8b');
        item.addEventListener('mouseleave', () => item.style.backgroundColor = '#fff');
    });

    const itemsCarrito = document.querySelectorAll('#carrito-items li');
    
    itemsCarrito.forEach(item => {
        item.addEventListener('dblclick', () => item.style.textDecoration = 'line-through');
    });
}

function verificarListaVacia() {
    const ul = document.getElementById('carrito-items');
    document.getElementById('mensajeVacio').style.display = ul.children.length === 0 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');

    const botones = [
        { texto: 'Lista de productos', accion: () => {
            const items = document.querySelectorAll('#carrito-items li');
            const todosItems = Array.from(items).map(item => item.textContent);
            alert(todosItems.length > 0 ? `Lista de todos los ítems:\n${todosItems.join('\n')}` : 'No hay ningun producto en la lista');
        }}
    ];

    botones.forEach(({ texto, accion }) => {
        const boton = document.createElement('button');
        boton.textContent = texto;
        boton.style.margin = '1em';
        boton.addEventListener('click', accion);
        footer.insertAdjacentElement('beforebegin', boton);
    });

    verificarListaVacia();
});
