// const express = require("express");
// const app=express();

// const PORT = process.env.PORT;

// app.listen(PORT,() =>{
//     console.log("App is running at port ",PORT);
// })

var myRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
var myArray = myRe.test("5Roopammm@");

console.log(myArray);