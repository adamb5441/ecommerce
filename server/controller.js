module.exports={
    checkSession:(req,res)=>{
        if(req.session.user){
            res.status(200).send(true)
        } else{
            res.status(200).send(false)
        }
    },
    getProducts:(req,res)=>{
        const dbInstance=req.app.get('db');
        dbInstance.getProducts([])
        .then( data => {
            res.status(200).send(data)
        })
    },
    createCart: (req,res,next)=>{
        const {ref,num} =req.body
        const dbInstance= req.app.get('db')
        const {id} =req.session.users 
        dbInstance.getCartRef([ref,id]).then(data=>{
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
            dbInstance.createCart([ref,num,id])
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
        const {id} =req.session.users 
        const dbInstance=req.app.get('db');
        dbInstance.checkOut([id])
        .then( data => {
            res.status(200).send(data)
        })
    },
    updateCart:(req,res,next)=>{
        const {num,ref} =req.body
        const dbInstance= req.app.get('db')
        dbInstance.updateCart([num,ref])
        .then(data => res.status(200).send(data))
    }

}