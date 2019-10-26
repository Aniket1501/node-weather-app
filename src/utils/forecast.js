 const request = require('request') 
 
 const forecast = (log,lat,callback) =>
 {
    const url ='https://api.darksky.net/forecast/9d2278dae3db80f862836a86c368815b/'+ log+','+lat+'?units=us'

    request({url : url,json : true},(error,response)=>
    {
        if(error)
        
        {
            callback('unable to connect internet',undefined)
        }
        else if(response.body.error)
        {
            callback('unable to find location')
        }
        else
        {
            callback(undefined,{
              summary :  response.body.daily.data[0].summary,
              timezone : response.body.timezone,
               temperature : response.body.currently.temperature,
             precipitation : response.body.currently.precipProbability 
            })
        }
    })

 }

 module.exports = forecast