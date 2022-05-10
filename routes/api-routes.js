
const pool = require('../database')
module.exports = (app) => {
    app.get("/sales",async(req,res)=>{
     try{
       const getData = await pool.query("SELECT * FROM sales")
       console.log(getData)
       res.send(getData)
     }catch(e){
        console.log("error")
     }

 })

 app.post("/sales/add",async(req,res)=>{
   try{
       const numid = parseInt( req.body.numid);
       const item = req.body.item
       console.log(item)
       const price = parseInt(req.body.price)
       const totalnumber = parseInt(req.body.totalnumber)

 
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
await pool.query("INSERT INTO sales VALUES ($1,$2,$3)",[item,price,totalnumber])
// console.log(getData)

res.send("done")
}catch(e){
 console.log(e)
}

})




app.post("/sales/updateAdd",async(req,res)=>{
   try{
       const count = parseInt( req.body.count);
       const item = req.body.item
      let totalcount
 
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
const getData=await pool.query("SELECT totalnumber FROM sales where item=$1",[item])
// console.log(getData)

if(getData.rowCount!=0){
   console.log(getData.rows[0].totalnumber+count)
   totalcount=getData.rows[0].totalnumber+count
   await pool.query("UPDATE sales SET totalnumber=$1 where item=$2",[totalcount,item])
   res.send("updated")

}else{
   res.send("no such machine")
}

}catch(e){
 console.log(e)
}

})



app.post("/sales/updateRemove",async(req,res)=>{
   try{
       const count = parseInt( req.body.count);
       const item = req.body.item
      let totalcount
 
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
const getData=await pool.query("SELECT totalnumber FROM sales where item=$1",[item])
// console.log(getData)

if(getData.rowCount!=0){
   console.log(getData.rows[0].totalnumber+count)
   totalcount=getData.rows[0].totalnumber-count
   if(totalcount>=0){
   await pool.query("UPDATE sales SET totalnumber=$1 where item=$2",[totalcount,item])
   }else{
      res.send("calculation is  not possible")
   }
   res.send("updated")

}else{
   res.send("no such machine")
}

}catch(e){
 console.log(e)
}

})


app.post("/sales/updateAll",async(req,res)=>{
   try{
       const numid = parseInt( req.body.numid);
       const item = req.body.item
       const price = parseInt(req.body.price)
       const totalnumber = parseInt(req.body.totalnumber)
 
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
const getData=await pool.query("SELECT totalnumber FROM sales where item=$1",[item])
// console.log(getData)

if(getData.rowCount!=0){
 
   await pool.query("UPDATE sales SET totalnumber=$1,price=$2 where item=$3",[totalnumber,price,item])

   res.send("updated all values")

}else{
   res.send("no such machine")
}

}catch(e){
 console.log(e)
}

})

app.get("/wash",async(req,res)=>{
   try{
     const getData = await pool.query("SELECT * FROM  washdetails ORDER BY sl DESC   LIMIT 12")
     console.log(getData)
     res.send(getData)
   }catch(e){
      console.log(e)
      console.log("error")
   }

})

app.post("/wash/add",async(req,res)=>{
   try{
       const vechicle = req.body.vechicle;
       const vechicletype = req.body.vechicletype;
        const vechiclenumber = req.body.vechiclenumber;
       const ownername = req.body.ownername
       const dates = new Date();
       const formwash = parseInt(req.body.formwash)
       const underwash = parseInt(req.body.underwash)
       const steamwash = parseInt(req.body.steamwash)
       const interiorDetailing= parseInt(req.body.interiorDetailing)
       const fullWash=parseInt(req.body.fullWash)
       const d = new Date()
      let month = d.getMonth()
       const monthtype =  parseInt(month)
      const totalValue= parseInt(req.body.total)
      console.log(vechicletype)
      console.log(vechiclenumber)
      console.log(interiorDetailing)
      console.log(fullWash)
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])


      console.log("hello")

 
   await pool.query("INSERT INTO washdetails VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12);",[ownername,dates.toString(),formwash,underwash,steamwash,monthtype,totalValue,vechicle,interiorDetailing,fullWash,vechicletype,vechiclenumber])

   res.send("inserted to database")


}catch(e){
 console.log(e)
}

})


app.post("/wash/month",async(req,res)=>{
   try{
       const monthType = parseInt( req.body.month);
      //  const ownername = req.body.ownername
      //  const dates = new Date();
      //  const formwash = parseInt(req.body.formwash)
      //  const underwash = parseInt(req.body.underwash)
      //  const steamwash = parseInt(req.body.underwash)
      //  const d = new Date();
      // let month = d.getMonth()
      //  const monthtype =  parseInt(month)
      // const totalValue= formwash+underwash+steamwash
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])

// console.log(getData)


 
   const getfullDetails =await pool.query("select * from washdetails where monthtype=$1",[monthType])
   // if (getfullDetails.rowCount!=0){
   //    let total=0;
   //    for(let i=0;i<=getfullDetails.rows.length;i++){
   //       console.log(getfullDetails.rows[i])
   //       total=total+getfullDetails.rows[i].totalValue
   //    }
   // }
   const getAmount =await pool.query("select sum(totalvalue) from washdetails where monthtype=$1",[monthType])
   res.send({getfullDetails,getAmount})


}catch(e){
 console.log(e)
}

})


app.post("/salesDetails/add",async(req,res)=>{
   try{
      //  const monthType = parseInt( req.body.month);
       const ownername = req.body.ownername
       const dates = new Date();
       const items =req.body.items
       const cost = parseInt(req.body.cost)
      //  const steamwash = parseInt(req.body.underwash)
       const d = new Date();
      let month = d.getMonth()
       const monthtype =  parseInt(month)
       console.log(monthtype)
      // const totalValue= formwash+underwash+steamwash
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])

// console.log(getData)


 
   const getfullDetails =await pool.query("INSERT INTO salesdetails values($1,$2,$3,$4,$5);",[ownername,items,cost,dates,monthtype])
   res.send("inserted to database")
   // if (getfullDetails.rowCount!=0){
   //    let total=0;
   //    for(let i=0;i<=getfullDetails.rows.length;i++){
   //       console.log(getfullDetails.rows[i])
   //       total=total+getfullDetails.rows[i].totalValue
   //    }
   // }
 


}catch(e){
 console.log(e)
}

})


app.post("/salesDetails/month",async(req,res)=>{
   try{
       const monthType = parseInt( req.body.month);
      //  const ownername = req.body.ownername
      //  const dates = new Date();
      //  const formwash = parseInt(req.body.formwash)
      //  const underwash = parseInt(req.body.underwash)
      //  const steamwash = parseInt(req.body.underwash)
      //  const d = new Date();
      // let month = d.getMonth()
      //  const monthtype =  parseInt(month)
      // const totalValue= formwash+underwash+steamwash
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])

// console.log(getData)


 
   const getfullDetails =await pool.query("select * from salesdetails where monthtype=$1",[monthType])
   // if (getfullDetails.rowCount!=0){
   //    let total=0;
   //    for(let i=0;i<=getfullDetails.rows.length;i++){
   //       console.log(getfullDetails.rows[i])
   //       total=total+getfullDetails.rows[i].totalValue
   //    }
   // }
   const getAmount =await pool.query("select sum(total   cost) from salesdetails where monthtype=$1",[monthType])
   res.send({getfullDetails,getAmount})


}catch(e){
 console.log(e)
}

})



}