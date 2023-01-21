const { readFile,writeFile } = require('fs/promises')

class ProductManager{
    constructor(path){
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: products.length + 1
            }
            products.push(newProduct);
            writeFile(this.path,JSON.stringify(products));
            console.log("Producto agregado!");
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            console.log(products);
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const filterProduct = products.filter(prod => prod.id == id);
            console.log(filterProduct);  
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const index = products.findIndex(prod => prod.id == id);
            const update = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: products[index].id
            }
            if(index !== -1){
                products[index] = update;
                writeFile(this.path,JSON.stringify(products))
                console.log("Product updated!");
            }else{
                console.log("Product not found!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const result = await readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const filterProducts = products.filter(prod => prod.id !== id);
            writeFile(this.path,JSON.stringify(filterProducts));
            console.log("Product deleted");
        } catch (error) {
            console.log(error);
        }
    }
}

const clase = new ProductManager('./products.json');
clase.deleteById(3);

