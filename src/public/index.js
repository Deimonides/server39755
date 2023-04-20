const socket = io()
const ProductManager = require('../ProductManager')
const productManager = new ProductManager('./dbProducts.json')

let submit = document.getElementById('submit')

submit.addEventListener('click', evt => {
    evt.preventDefault();
    
    // fetch('/src/ProductManager.js', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({key: 'value'})
    //   })
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
    
    
    
    console.log('Submit!');
    
    productManager.addProduct(
        document.getElementById('title').value,
        document.getElementById('description').value,
        document.getElementById('code').value,
        document.getElementById('price').value,
        status = true,
        document.getElementById('stock').value,
        document.getElementById('category').value,
        document.getElementById('thumbnails').value
    )


})