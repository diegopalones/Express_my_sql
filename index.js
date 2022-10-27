const express = require("express");
const app = express();
const PORT = 3000;
const mysql = require('mysql2')

app.use(express.json());

const db = mysql.createConnection({

    
    host : 'localhost',
    user: 'root',
    password: 'VA03ma21DP',
    // datebase: 'datebaseexpress', //cuando indico la base de datos con la que tengo que trabajar me salta un error de conexion con la base de datos. 

})


db.connect();

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE DateBaseExpress";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Creada base de datos...");
    });
  });

  app.get("/createtable-products", (req, res) => {
    let sql =
      "CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), price INT(12), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Creada tabla de productos...");
    });
  });  

  app.get("/createtable-categories", (req, res) => {
    let sql =
      "CREATE TABLE categories(id int AUTO_INCREMENT,category_name VARCHAR(255), category_description VARCHAR(255), PRIMARY KEY(id))";
  
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send("Creada tabla de categorias...");
    });
  });
      
  

//   Crea un endpoint para añadir un producto nuevo y añade 2 nuevos productos

app.post("/create_element", (req, res) => {
    let sql = `INSERT INTO products (name, Price ) values ('La iliada', 18), ('La odisea', 14);`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send("Producto creado...");
    });
  });

//   Crea un endpoint para crear una categoría y añade 2 nuevas categorías 


  app.post("/create_category", (req, res) => {
    let sql = `INSERT INTO categories (category_name, category_description ) values ('Humanidades', 'Arte'), ('Historia', 'Historia del arte');`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      console.log(result);
  
      res.send("Añadidas categorias...");
    });
  });

//   Crea un endpoint para actualizar un producto. 

app.put("/product_update/:id", (req, res) => {
    let update = req.body.nombre;
  
    let sql = `UPDATE products SET name = '${update}' WHERE id = ${req.params.id}`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send("Producto actualizado...");
    });
  });

//   Crea un endpoint para actualizar una categoría.

app.put("'/category_update':id", (req, res) => {
    let update = req.body.nombre;
  
    let sql = `UPDATE categories SET category_name = '${update}' WHERE id = ${req.params.id}`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send("categoria actualizada...");
    });
  });


//   Crea un endpoint que muestre todos los productos

app.get("/products", (req, res) => {
    db.query("SELECT * FROM products;", (err, result) => {
      if (err) throw err;
  
      res.send(result);
    });
  });
      
//   Crea un endpoint que muestre todas las categorías

app.get("/categories", (req, res) => {
    db.query("SELECT * FROM categories;", (err, result) => {
      if (err) throw err;
  
      console.log(result);
  
      res.send(result);
    });
  });

//   Crea un endpoint donde puedas seleccionar un producto por id

app.get("/productid/:id", (req, res) => {
    let sql = `SELECT * FROM products WHERE id = ${req.params.id};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send(result);
    });
  });

//   Crea un endpoint que muestre de forma descendente los productos.

app.get("/productdesc", (req, res) => {
    let sql = `SELECT * FROM products ORDER BY id DESC;`;
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send(result);
    });
  });

//   Crea un endpoint donde puedas seleccionar una categoría por id

app.get("categoryid/:id", (req, res) => {
    let sql = `SELECT * FROM categories where id = ${req.params.id};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

//   Crea un endpoint donde puedas buscar un producto por su nombre

app.get("/productname/:name", (req, res) => {
    let sql = `SELECT * FROM products WHERE name = ${req.params.name};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

//   Crea un endpoint donde puedas eliminar un producto por su id

app.delete("/delete_products/:id", (req, res) => {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
  
      res.send("Post deleted");
    });
  });







  app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));







  
  









    
    
