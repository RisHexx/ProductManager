import sql from "../config/db.js";

export const getProducts = async function(req, res) {
  try{
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;

    res.status(200).json({
        sucess : true,
        data : products
    })
    // console.log(products);
  }catch(err){
        console.error('ERROR : '+ err);
        res.status(500).json({
        sucess : false,
        message : "Internal Server Error"
    })
    }
}



export const getProduct = async function(req, res) {
    const {id} = req.params;
    try{
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    `;
    if(product.length === 0){
        return res.status(404).json({
            sucess : false,
            message : "Product Not Found"
        })
    }
    res.status(200).json({
        sucess : true,
        data : product[0]
    })
    }catch(err){
        console.error('ERROR : '+ err);
        res.status(500).json({
        sucess : false,
        message : "Internal Server Error"
    })
    }

}

export const createProduct = async function(req, res) {
  const {name , price , image } = req.body;
  if(!name || !price || !image){
    res.status(400).json({
        sucess : false,
        message : "All Fields Are Required"
    })}
    try{
        const newProduct = await sql`
        INSERT INTO products (name , price , image) VALUES (${name} , ${price} , ${image})
        RETURNING *
        `;
        // console.log("New Product Added")
        res.status(201).json({
            sucess : true,
            data : newProduct[0]
        })
    }catch(err){
        console.error('ERROR : '+ err);
        res.status(500).json({
        sucess : false,
        message : "Internal Server Error"
    })
    
  }
}



export const updateProduct = async function(req, res) {
  const {id} = req.params;
  const {name, price, image} = req.body;
  try{
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    `;
    if(product.length === 0){
        return res.status(404).json({
            sucess : false,
            message : "Product Not Found"
        })
    }
    const updatedProduct = await sql`
    UPDATE products
    SET name = ${name}, price = ${price}, image = ${image}
    WHERE id = ${id}
    RETURNING *
    `;
    res.status(200).json({
        sucess : true,
        data : updatedProduct[0]
    })
  }catch(err){
        console.error('ERROR : '+ err);
        res.status(500).json({
        sucess : false,
        message : "Internal Server Error"
    })
  }
}



export const deleteProduct = async function(req, res) {
  const {id} = req.params
  try{
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    `;
    if(product.length === 0){
        return res.status(404).json({
            sucess : false,
            message : "Product Not Found"
        })
    }
    const deleteProducts = await sql`
    DELETE FROM products WHERE id=${id} RETURNING *
    `;


    res.status(200).json({
        sucess : true,
        data : deleteProduct[0]
    })
  }catch(err){
        console.error('ERROR : '+ err);
        res.status(500).json({
        sucess : false,
        message : "Internal Server Error"
    })
}
}