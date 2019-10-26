const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 4000

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

// define path for express
const pathdic =  path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templetes/views')
const partialspath  = path.join(__dirname,"../templetes/partials") 
//setup handlebars 
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)


// static direcyory to server
app.use(express.static(pathdic))

app.get('/',(req,res)=>
{
    res.render('index',{
        title: "weather",
         name : "aniket"

    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title: "About",
        name:"gupta",
        name : "kkkkkk"
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title: "help",
        helpText: 'This is some helpful text.',
    
        name : "aniket"
    })
})

app.get('/weather',(req,res)=>{
   
   
    if(!req.query.address)
   { 
      return res.send({
           error: "must provide adress"
       })
   }
   
   geocode(req.query.address,(error,{latitude,longitude,location}={}) => 
   { 
       if(error)
       {
           return res.send({error})
       }
       forecast(latitude,longitude,(error,forecastdata)=>
       {
           if(error)
           {
               return res.send({error})
           }
           
           res.send({
               forecast : forecastdata,
               location,
               address : req.query.address
           })
       })
   })
//    res.send({
//        forecast : 'ts is snowing',
//        location : 'kolkata',
//        adress : req.query.address
//   })
})

app.get('/products',(req,res)=>{
    
    if(!req.query.search)
    {
        return res.send({
            error : 'you must provides any location  name'
        })
    }
     console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'aniket',
        errorMessage : "page not founnd"
    })

})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'aniket',
        errorMessage : "my 404 error"
    })

})



app.listen(port,()=>{
    console.log("the server is running at " + port)
})