const express = require("express");
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 4000;

//    APP Configuration

      // define the view engine
app.set('view engine', 'hbs');
     //define the partial directory
hbs.registerPartials(__dirname + '/views/partials');
   //register helper function for get getFullYear
hbs.registerHelper("getCurrentYear",()=>new Date().getFullYear());
  //register helper function for get capitalize
hbs.registerHelper("capitalize",(string)=>string.toUpperCase(string));

  //register middleware function for log requests
app.use((req,res,next)=>{
  let date = new Date();
  let log =`${req.ip}  #::>date : ${date}  Meathod : ${req.method}  Path : ${req.path}`;
  fs.appendFile('./logs/request.txt',log+"\n",(err)=>{if(err)console.log(err);});


  next();

})

// make this directory public
app.use(express.static(__dirname+'/public'));

//      APP Rputes
app.get('/',(req,res)=>{
   res.render('home.hbs',{
     title:"Home page",
     year:new Date().getFullYear()
   });
});

app.get('/contact',(req,res)=>{
   res.render('contact',{
     title:"contact page",
     year:new Date().getFullYear()
   });
});

app.get('/about',(req,res)=>{

  res.render('about.hbs');
});


app.listen(port,()=>{
  console.log("server start listening on port # "+port);
});
