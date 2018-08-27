module.exports={

    getProducts:(req,res)=>{
        const dbInstance=req.app.get('db');
        dbInstance.getProducts()
        .then( data => {
            res.status(200).send(data)
        })
    },
    createCart: (req,res,next)=>{
        const {id,num} =req.body
        const dbInstance= req.app.get('db')

        dbInstance.getCartRef([id]).then(data=>{
            console.log(req.session.users)  
        if(data[0]){ 
                const {id} =req.session.users             
                const {numberof, cart_id} = data[0];
                let quantity =numberof;
                quantity += 1; 
                dbInstance.updateCart([quantity,cart_id, id])
                .then( data =>{                  
                    res.status(200).send(data)})
            
        }else {  
            const {id} =req.session.users      
            dbInstance.createCart([num,req.id,id])
            .then(data => res.status(200).send(data))
    }
    })
    },
    getCart:(req,res)=>{
        const dbInstance=req.app.get('db');
        const {id} =req.session.users 
        dbInstance.getCart([id])
        .then( data => {
            res.status(200).send(data)
        })
    },
    deleteFromCart:(req,res,next)=>{
        const {params}=req
        console.log(params)
        const dbInstance= req.app.get('db')
        dbInstance.deleteFromCart([params.id])
        .then(data => res.status(200).send(data))
    },
    checkOut:(req,res,next)=>{
        const dbInstance=req.app.get('db');
        dbInstance.checkOut()
        .then( data => {
            res.status(200).send(data)
        })
    },
    updateCart:(req,res,next)=>{
        const {num,id} =req.body
        const dbInstance= req.app.get('db')
        dbInstance.updateCart([num,id])
        .then(data => res.status(200).send(data))
    }

}