const { query } = require("express")
const Pool = require("pg").Pool

const  client = new Pool({
user:"vishnu",
password:'1234',
host:'localhost',
port: 5432,
database:'penta'
})





// client.connect()
// .then(()=>{console.log("conncetion successfull")})
// .then(()=> client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5]))
// // .then( results => console.table(results.rows))
// .catch((e)=>{
//     console.log("error in connection")
//     console.log(e)
// })
// .finally(()=>{client.end()})

// module.exports=client;


module.exports=client
 

// exports.execute =  async ()=>{

//    await  client.connect()
// //     console.log("conncetion successfull")
// //     let query1="INSERT INTO sales VALUES ($1,$2,$3,$4),"[21,"dob",4,5]
// // //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
// //     await client.query(query1)
// //     client.end()
// return client

// }
// exports.stop =  async ()=>{

//     await  client.end()
//  //     console.log("conncetion successfull")
//  //     let query1="INSERT INTO sales VALUES ($1,$2,$3,$4),"[21,"dob",4,5]
//  // //    await client.query("INSERT INTO sales VALUES ($1,$2,$3,$4)",[22,"dob",4,5])
//  //     await client.query(query1)
//  //     client.end()
// //  return client
 
//  }
// // exports.a