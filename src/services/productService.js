import ProductDaoDB from "../dao/productDaoMongoDB.js";

export default class ProductService {

    constructor() {
        this.productDao = new ProductDaoDB()
    }

    getProducts = async () => {
        
    }

        


}