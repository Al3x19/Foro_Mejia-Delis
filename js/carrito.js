const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
});

// ----------------------------

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// lista de todos los productos

const productList = document.querySelector('.container-items');

// variable de arreglos de productos

let allProductos = [];


const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos')

productList.addEventListener('click', e =>{
    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement
    
    const infoProduct = {
        quantity : 1,
        titulo :product.querySelector('h2').textContent,
        precio :product.querySelector('p').textContent
        }
    const exits = allProductos.some(product => product.titulo === infoProduct.titulo)

        if (exits) {
            const products = allProductos.map(product => {
                if (product.titulo === infoProduct.titulo) {
                    product.quantity++;
                    return product
                }else{
                    return product
                }
            })
            allProductos = [...products]
        }else{
            allProductos = [...allProductos, infoProduct]

        }
    
    showHtml();
    }

});

rowProduct.addEventListener('click', (e) =>{
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement
        const titulo = product.querySelector('p').textContent;
        allProductos = allProductos.filter(
            product => product.titulo !== titulo
        );
        
        showHtml();
    }
})

// Mostrar Html

const showHtml = ()=>{
    if (!allProductos.length) {
        containerCartProducts.innerHTML=`
        <p class="cart-emty">El carrito esta Vacio</p>
        `
    }

    // limpiar show 
    rowProduct.innerHTML='';


    let total= 0;
    let totalOfProduct =0;
    
    allProductos.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('.cart-product')

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-carrito-producto">${product.titulo}</p>
                <span class="precio-producto-carrito">${product.precio}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        `
        rowProduct.append(containerProduct);

        total = total + parseInt(product.quantity *product.precio.slice(1));
        totalOfProduct = totalOfProduct + product.quantity;

    });
    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProduct;
    localStorage.setItem('productosCarrito', JSON.stringify(allProductos)); //Con esto agrego los valores al localStorage
}


    document.addEventListener('DOMContentLoaded', ()=>{ //Con esta funcion puedo acceder a los valores del localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productosCarrito'));
    if(productosGuardados){
        allProductos = productosGuardados;
        showHtml();
    }
})