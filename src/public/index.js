const socketClient = io()
// const ProductManager = require('../ProductManager.js')
// const productManager = new ProductManager('./dbProducts.json')

// const serverSocket = new Server( serverHTTP )

    // serverSocket.on('connection',   () => {
    //     console.log('[nodemon] SOCKET new client') // SOCKET on
    // })

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
    
    console.log("Click?");
    
    const form = document.getElementById('formNewProduct')
    const newProduct =  Array.from(form.elements)
    
    
    socketClient.emit('newProduct', newProduct)
    
    console.log("socket emit?");

    // form.FormData = ""
/* 
    
    productManager.addProduct(
        document.getElementById('title').value,
        document.getElementById('description').value,
        document.getElementById('code').value,
        document.getElementById('price').value,
        document.getElementById('stock').value,
        document.getElementById('category').value,
        document.getElementById('thumbnails').value
    ) */


})