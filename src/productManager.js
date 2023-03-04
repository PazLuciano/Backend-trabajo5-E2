const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");

class ProductManager{
    constructor(path){       
        this.path = path;
    }

    addProduct = async (product) => {
        let info = await fs.readFile(this.path)
        let data = await JSON.parse(info)
        // console.log(data);
        // console.log(product);
        if (data.Productos == undefined){
            
            const data = {Productos : []}
            fs.writeFile(this.path, JSON.stringify(data))
        }      
        
        if(product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price")
        && product.hasOwnProperty("code") && product.hasOwnProperty("stock") && product.hasOwnProperty("status") &&
        product.hasOwnProperty("category")){
        
            const {title, description, price, thumbnail, code, stock, category} = product;   

            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail || ["Sin imagen"];
            this.code = code;
            this.stock = stock;
            this.category = category;
            console.log(data.Products);

            if (data.Productos != undefined){                                        
                const encontrar = data.Productos.some(objeto => objeto.code == product.code);
                   
                if(encontrar){
                    // console.log("producto agregado anteriormente!");
                    return "producto agregado anteriormente!"
                 
                }else{      
                    let valorId = data.Productos.length + 1;                         
                    const productoAgregar = {
                        id : valorId,
                        title : this.title,
                        description : this.description,
                        price : this.price,
                        thumbnail : this.thumbnail,
                        code : this.code,
                        stock : this.stock,
                        category : this.category,
                        status : true
                        };
                    data.Productos.push(productoAgregar);                         
                    fs.writeFile(this.path, JSON.stringify(data)) // Agregar al json                  
                    // console.log("Elemento añandido correctaenteLOG");
                    let retorno = "Elemento añadido correctamentea";
                    return retorno
                }
            }else{
                
                this.id = 1;
                const productoAgregar = {
                    id: this.id,
                    title : this.title,
                    description : this.description,
                    price : this.price,
                    thumbnail : this.thumbnail,
                    code : this.code,
                    stock : this.stock,
                    cateogory : this.category,
                    status : true
                };
                data.Productos = [productoAgregar];               
                await fs.writeFile(this.path, JSON.stringify(data));
                return "Elemento añadido correctamente1!"
            }
        }else{
            console.log("campos incorrectos");
            return "Campos incorrectos"
        }
    }      
    getProducts = async () =>{
        try {
            const info = await fs.readFile(this.path);
            // console.log(info);
            const data = await JSON.parse(info);
            // console.log(data);
            if(data.Productos){
                return data.Productos
            }else{
                // console.log("Ahora por aca!");
                const data = {Productos : []}
                fs.writeFile(this.path, JSON.stringify(data))
                const info = await fs.readFile(this.path);
                return info
            }


            
        } catch (error) {
            console.log(error);    
        }
    }
    getProductById = async (id) => {
        const info = await this.getProducts()
        let productoEncontrado;
        info.forEach(element => {
            if (element.id == id) {
                productoEncontrado = element;
            }
        })
        if(productoEncontrado){
            return productoEncontrado;
        }else{
            return "Producto no encontrado!"
        }
    }
    updateProduct = async (id, objetoActualizar) => {
        const info = await this.getProducts()
        const encontrar = info.some(objeto => objeto.id == id);
        console.log(encontrar);
        if(encontrar){

            let indiceProducto = info.findIndex(obj => obj.id == id);
            
            info[indiceProducto].title = objetoActualizar.title || info[indiceProducto].title;
            info[indiceProducto].description = objetoActualizar.description || info[indiceProducto].description;
            info[indiceProducto].price = objetoActualizar.price || info[indiceProducto].price;
            info[indiceProducto].thumbnail = objetoActualizar.thumbnail || info[indiceProducto].thumbnail;
            info[indiceProducto].code = objetoActualizar.code || info[indiceProducto].code;
            info[indiceProducto].stock = objetoActualizar.stock || info[indiceProducto].stock;
            info[indiceProducto].category = objetoActualizar.category|| info[indiceProducto].category;
            info[indiceProducto].status = objetoActualizar.status || info[indiceProducto].status;           
            let productos = {Productos : info}
            // console.log(info[indiceProducto]);
            // console.log(info);
            fs.writeFile(this.path, JSON.stringify(productos));
            return "Producto actualizado correctamente!"
            
        }else{
            return "Producto no encontrado para actualizar!!"
        }
    }
    deleteProduct = async (id) => {
        
        const info = await fs.readFile(this.path);
        const data = await JSON.parse(info);
        const array = data.Productos;
        
        let indexProducto = array.findIndex(obj => obj.id == id);
        // let idProducto = array[indexProducto].id;
        // console.log(idProducto);
        // console.log(indexProducto);
        if(indexProducto != -1){
            // console.log(array);
            array.splice(indexProducto,1);
            // console.log(array);
            let productos = {Productos : array}
            fs.writeFile(this.path, JSON.stringify(productos));
            // this.espaciosLibres.push(idProducto)
            return "Producto eliminado correctamente!"           
        }else{
            return "Producto no encontrado!"
        }

    }
}


exports.ProductManager = ProductManager