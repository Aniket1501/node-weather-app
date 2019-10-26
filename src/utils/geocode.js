const request =require('request')

const geocode   = (address , callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW5pMTUyNCIsImEiOiJjazFreTh0eWkwMDFlM21wbWh6aGQ2dHhiIn0.P0rWo7ktG9oHxx-PiftEHQ&limit=1'

    request({ url,json :true},(error,{body}) =>
    {
        if(error)
        {
            callback('unable to coonbect internet',undefined )
        }
        else if(body.features.length === 0)
        {
            callback('unable to fine location ,search correctly')
        }
        else{
            callback(undefined,{
              
                latitude: body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}







module.exports = geocode