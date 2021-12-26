//importing express
const exp=require("express")
const app=exp()

//assign port no.
const port=4000
app.listen(port,()=>{ console.log(`Server listening on port ${port}`)})

//import json middleware
app.use(exp.json())



//import path module
const path=require("path")

//connect dist folder with server.js
app.use(exp.static(path.join(__dirname, "dist/DBMS")))


//import express-async-handler
let asyncHandler=require("express-async-handler")

const mysql=require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ajith 1385110"
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//select
{app.post("/admin/products/filter",asyncHandler(async(req,res,next)=>{ 
  
  let obj=req.body;
  console.log(obj,obj.from,obj.to)
  let sql
  if(obj.type=="alltype" && obj.brand=="allbrand"){
    sql=`SELECT p.Product_ID,pc.Brand_Name,pc.PType,p.Color,p.Size,pc.price,p.Quantity FROM garment.products AS p JOIN garment.cost_price AS pc ON p.Price_ID=pc.Cost_Price_ID WHERE pc.price BETWEEN ${obj.from} AND ${obj.to}`
  }
  else if(obj.type=="alltype" && obj.brand!="allbrand"){
    sql=`SELECT p.Product_ID,pc.Brand_Name,pc.PType,p.Color,p.Size,pc.price,p.Quantity FROM garment.products AS p JOIN garment.cost_price AS pc ON p.Price_ID=pc.Cost_Price_ID WHERE pc.price BETWEEN ${obj.from} AND ${obj.to} AND pc.Brand_Name="${obj.brand}"`
  }
  else if(obj.type!="alltype" && obj.brand=="allbrand"){
    sql=`SELECT p.Product_ID,pc.Brand_Name,pc.PType,p.Color,p.Size,pc.price,p.Quantity FROM garment.products AS p JOIN garment.cost_price AS pc ON p.Price_ID=pc.Cost_Price_ID WHERE pc.price BETWEEN ${obj.from} AND ${obj.to} AND pc.PType="${obj.type}"`
  }
  else{
    sql=`SELECT p.Product_ID,pc.Brand_Name,pc.PType,p.Color,p.Size,pc.price,p.Quantity FROM garment.products AS p JOIN garment.cost_price AS pc ON p.Price_ID=pc.Cost_Price_ID WHERE pc.price BETWEEN ${obj.from} AND ${obj.to} AND pc.Brand_Name="${obj.brand}" AND pc.PType="${obj.type}"`
  }

 
  let p= await con.query(sql,(err,result)=>{
    if(err){
      console.log("err in selecting filtered products",err)
    }
      res.send({message : result})
   })

}))
}
app.get("/admin/products/filter",asyncHandler(async(req,res,next)=>{

  let sql="SELECT distinct(Brand_Name) from garment.cost_price"
  await con.query(sql,(err,result)=>{
    if(err){
      console.log("err in selecting brands",err)
    }
    res.send({message : result})
  })

}))



//products
app.get("/admin/products",asyncHandler(async(req,res,next)=>{

  let sql="select p.Product_ID,cp.Brand_Name,cp.PType,p.Color,p.Size,cp.price,p.Quantity  from garment.products as p join garment.cost_price as cp on p.Price_ID=cp.Cost_Price_ID"
  await con.query(sql,(err,result)=>{
    if(err){
      console.log("err in selecting products",err)
    }
    res.send({message : result})
  })
}))




//add
app.post("/admin/products/add",asyncHandler(async(req,res,next)=>{

  let obj=req.body
  console.log(obj)
  let supplier=obj.supplier
  let products=obj.products
  let costPrice=obj.costPrice

  let sql
  if(!obj.update){

    sql=`SELECT s.Supplier_ID,s.SName FROM garment.cost_price AS cp JOIN garment.suppliers AS s ON s.Supplier_ID=cp.Supplier_ID WHERE cp.Brand_Name="${costPrice.brandname}"`
    await con.query(sql,(err,result)=>{
      if(err){
        console.log("err in posting supplier details ",err)
      }
      res.send({message : result})
    })
  }

  if(obj.new){

    if(supplier.sphone2==""){
      sql=`INSERT INTO garment.suppliers (SName, email, phone) VALUES ("${supplier.sname}","${supplier.semail}",${supplier.sphone1})`  
    }
    else{
      sql=`INSERT INTO garment.suppliers (SName, email, phone, alt_phone) VALUES ("${supplier.sname}","${supplier.semail}",${supplier.sphone1},${supplier.sphone2})`
      }
    await con.query(sql,(err,result)=>{
      if(err){
        console.log("err in posting supplier details ",err)
      }
    })

    await con.query("SELECT @supplier:=last_insert_id()",(err,result)=>{
      if(err){
        console.log("err in getting supplier id",err)
      }
    })

     await con.query("SELECT @supplier", async (err,result)=>{
       if(err){
         console.log("err in getting supplier id ",err)
       }
       else{
         sql=`INSERT INTO garment.cost_price (PType, Brand_Name, price, cost, Supplier_ID) VALUES ('${costPrice.type}','${costPrice.brandname}',${costPrice.price},${costPrice.cost},${result[0]["@supplier"]})`
         await con.query(sql,async (err,result)=>{
           if(err){
             console.log("error in inserting data into cost price ",err)
           }
           else{
             
            await con.query("SELECT @id:=last_insert_id()",async (err,result)=>{
              if(err){
                console.log("err in readinf id 1",err)
              }
              else{

                await con.query("SELECT @id",async (err,result)=>{
                  if(err){
                    console.log("error in getting id ",err)
                   }
                  else{
                    for(let p of products){
                      sql=`INSERT INTO garment.products (Price_ID, Color, Size, Quantity) VALUES (${result[0]["@id"]},'${p.color}','${p.size}',${p.quantity})`
                      await con.query(sql,(err,result)=>{
                        if(err){
                          console.log("error in updating product details ",err)
                        } 
                      })
                    }
                 }
                 res.send({message : "SuccessFully Updated"})
               })
              }
            })
           }
         })
       }
     })
    
     //res.send({message : "Successfully updated"})
     // /result[0]["@supplier"]
    
  }
  else{
    sql=`INSERT INTO garment.cost_price (PType, Brand_Name, price, cost, Supplier_ID) VALUES ('${costPrice.type}','${costPrice.brandname}',${costPrice.price},${costPrice.cost},${supplier})`
    await con.query(sql,async (err,result)=>{
      if(err){
        console.log("err in updating cost price ",err)
      }
      else{
        await con.query("SELECT @id:=last_insert_id()",async (err,result)=>{
          if(err){
            console.log("err in readinf id 1",err)
          }
          else{

            await con.query("SELECT @id",async (err,result)=>{
              if(err){
                console.log("error in getting id ",err)
               }
              else{
                for(let p of products){
                  sql=`INSERT INTO garment.products (Price_ID, Color, Size, Quantity) VALUES (${result[0]["@id"]},'${p.color}','${p.size}',${p.quantity})`
                  await con.query(sql,(err,result)=>{
                    if(err){
                      console.log("error in updating product details ",err)
                    } 
                  })
                }
             }
             res.send({message : "SuccessFully Updated"})
           })
          }
        })
        
      }
    })
  }
}))




//customer
// app.get("/admin/customers",asyncHandler(async(req,res,next)=>{
//   let sql=`SELECT * FROM garment.customer`
//   await con.query(sql,(err,result)=>{
//     if(err){
//       console.log("err in getting customer details",err)
//     }
//     res.send({message : result})
//   })
// }))

app.post("/admin/customers",asyncHandler(async(req,res,next)=>{
  let obj=req.body
  
  if(obj.filter){
    console.log(obj.date)
    sql=`SELECT * FROM garment.customer WHERE CDate="${obj.date}"`
    await con.query(sql,(err,result)=>{
      if(err){
        console.log("err in filtering customers ",err)
      }
      console.log(result)
      res.send({message : result})
    })
  }
  else{
    sql=`INSERT INTO garment.customer (CName, CDate, Amount) VALUES ('${obj.purchases.customer.cname}','${obj.purchases.customer.date}',0);`
    await con.query(sql,async (err,result)=>{
      if(err){
        console.log("err in inserting customer",err)
      }
      else{
        sql=`SELECT last_insert_id()`
        await con.query(sql,async (err,result)=>{
          if(err){
            console.log("err in selecting customer ID",err)
          }
          else{
            let id=result[0]["last_insert_id()"]
            let amount=0
            for(let p of obj.purchases.purchaseList){

              sql=`INSERT INTO garment.purchases VALUES (${id},${p.pid},${p.quantity})`
              await con.query(sql,(err,result)=>{
                if(err){
                  console.log("err in inserting purchases",err)
                }
              })
              sql=`SELECT cp.price FROM garment.products AS p JOIN garment.cost_price AS cp on p.Price_ID=cp.Cost_Price_ID WHERE p.Product_ID=${p.pid}`
              await con.query(sql,async (err,result)=>{
                if(err){
                  console.log("err in calculating amount",err)
                }
                amount=amount+result[0]["price"]*p.quantity
                console.log(amount)
                sql=`UPDATE garment.customer SET Amount ='${amount}'  WHERE (Customer_ID = '${id}');`
                con.query(sql,(err,result)=>{
                  if(err){
                    console.log("err in updating amount",err)
                  }
                })
              })
            }
            res.send({message : "Updated Succesfully"})

          }
        })
      }
    })
  }
}))




//customer-purchase
app.get("/admin/customer/:id",asyncHandler(async(req,res,next)=>{
  let cid=(+req.params.id)

  let sql=`SELECT c.CName, c.CDate,pu.Product_ID,cp.Brand_Name,cp.PType,pr.Color,pr.Size,cp.price,pu.Quantity,c.Amount FROM garment.customer AS c JOIN garment.purchases AS pu ON c.Customer_ID=pu.Customer_ID JOIN garment.products AS pr ON pu.Product_ID=pr.Product_ID JOIN garment.cost_price AS cp ON cp.Cost_Price_ID=pr.Price_ID
  WHERE c.Customer_ID=${cid}`
  await con.query(sql,(err,result)=>{
    if(err){
      console.log("error in getting customer purchases",err)
    }
    res.send({message : result})
  })
    
}))


//suppliers
app.get("/admin/suppliers",asyncHandler(async (req,res,next)=>{
  let sql;

  sql=`SELECT * FROM garment.suppliers`
  await con.query(sql,(err,result)=>{
    if(err){
      console.log("err in getting supplier details",err)
    }
    res.send({message : result})
  })
}))


//employee
app.get("/admin/employee",asyncHandler(async (req,res,next)=>{
  let sql=`SELECT e.Employee_ID,e.Employee_Name,e.Designation,e.Join_Date,e.Emp_Email,e.phone,e.alt_phone,es.Salary FROM garment.employee as e join garment.emp_salary as es on e.Designation=es.designation;`

  con.query(sql,(err,result)=>{
    if(err){
      console.log("err in getting employee details from DB",err)
    }
    res.send({message : result})
  })
}))




//add-employee
app.post("/admin/employee/addEmployee",asyncHandler(async(req,res,next)=>{
  let obj=req.body 
  
  let sql
  if(obj.ephone2==""){
    sql=`INSERT INTO garment.employee (Employee_Name, Designation, Join_Date, Emp_Email, phone) VALUES ("${obj.ename}","${obj.designation}","${obj.date}","${obj.empEmail}",${obj.ephone1})`
  }
  else{
    sql=`INSERT INTO garment.employee (Employee_Name, Designation, Join_Date, Emp_Email, phone,alt_phone) VALUES ("${obj.ename}","${obj.designation}","${obj.date}","${obj.empEmail}",${obj.ephone1},${obj.ephone2})`
  }
  con.query(sql,(err,result)=>{
    if(err){
      console.log("err in adding employee details to DB",err)
    }
    res.send({message : "Updated Successfully"})
  })
}))