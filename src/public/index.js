const socketClient = io()

let submit = document.getElementById('submit')

submit.addEventListener('click', evt => {
    // evt.preventDefault();
    
    
    console.log("Click?");
    
    const form = document.getElementById('formNewProduct')
    const newProduct =  Array.from(form.elements)
    console.log("newProduct en index.js: ", newProduct);
    
    
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