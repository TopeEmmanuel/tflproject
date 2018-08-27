
const client = {   
    roadid: '',
    getdatafromtfl:function () {
    let roadid=this.roadid
    function getPath(input)
    {
      var jsonSource = require('./config')
      var https = require('https'); 
      let json = jsonSource.jsonString
      let parsedjson = JSON.parse(json)
      let appId = parsedjson.SecurityConfig['appId']
      let appKey = parsedjson.SecurityConfig['appKey']
      let host = parsedjson.SecurityConfig['host']
      let port = parsedjson.SecurityConfig['port']
      let method = parsedjson.SecurityConfig['method']
      let path = `/Road/${input}/?app_id=${appId}&app_key=${appKey}`;
      return {
          host: host, 
          path: path,
          port: port, 
          method: method
      };  
    }
   return new Promise((resolve, reject) => {
    let input = roadid;
    let pathObj = getPath(input);
    let path = pathObj.path;
    let host = pathObj.host;
    let port = pathObj.port;
    let method = pathObj.method;
    var https = require('https');
    var optionsget = {
        host : host, 
        port : port,
        path : path, 
        method : method 
    };
    var reqGet = https.request(optionsget, function(res) {
        res.on('data', function(d) {
            var parsed = JSON.parse(d)
            resolve({
                status: res.statusCode,
                message: "Ok",
                data:parsed
            })
            
        });
        });
        
        reqGet.end();
       
                
   }).catch(
       
{

   }
   )  
  }
}
module.exports = {
    client: client
}

