
const socket = io();

const botonEnviarPost = document.getElementById("form--submit")
const botonEnviarDelete = document.getElementById("form--submit--delete")
const container = document.getElementById("container")
// const input_name = document.querySelector("#input-name")
// const input_descr= document.querySelector("#input-descr")
// const input_precio = document.querySelector("#input-precio")
// const input_codigo = document.querySelector("#input-codigo")
// const input_stock = document.querySelector("#input-stock")
// const input_cat = document.querySelector("#input-cat")
// const input_status = document.querySelector("#input-status")



botonEnviarPost.addEventListener("click",() => {
    // let obj = {
    //     name : input_name.value,
    //     description : input_descr.value,
    //     price : input_precio.value,
    //     code : input_codigo.value,
    //     stock : input_stock.value,
    //     category : input_cat.value,
    //     status : input_status.value
    // }

    location.reload()
    // console.log("desde index : ", obj);
    socket.emit("add-product", obj)
})


const input_status = document.querySelector("#delete-input")
botonEnviarDelete.addEventListener("click", () => { 
    let id = input_status.value
    socket.emit("delete-product", id  )
})

// socket.on("mandamosInfo", (data) => {
//     if(data != 0){
//         // console.log("data -> ", data);
//         // container.innerHTML = container.innerHTML + 
//         // `
//         // <div>  
//         // <p>ID: {{this.id}}</p>
//         // <p>Titulo: ${data.title}</p>            
//         // <p>Precio: ${data.price}</p>
//         // <p>---------------------------</p>
//         // </div>
//         // `
//     }

// })