const client = require('./tflclient').client


function gettfldata(roadid) {
  let clients = {}
  let params = {}
  let exitcode=0
  let finalmessage =''
  clients.roadid =roadid ||process.argv[2]
  process.on('exit', function(code) {  
    process.exit(exitcode)
});

  if(clients.roadid==''||clients.roadid==undefined)
  {
    exitcode=1
    finalmessage='road id is not supplied'
    let finaloutput = {
        finaldata: [],
        status: 500,
        message: finalmessage,
      } 
      console.log(finalmessage);

    return finaloutput
  }
  
  client.getdatafromtfl.call(clients).then((response) => {
   
    let finaloutput = {
        finaldata: response.data,
        status: response.status,
        message: finalmessage,
      }
  
    if(response.status=='200')
    { 
    let parsed = response.data
    let displayName = parsed[0].displayName
    let status = parsed[0].statusSeverity
    let statusSeverityDescription = parsed[0].statusSeverityDescription
    finalmessage = 'The status of the road '+ displayName+ ' is as follows' +  '\n' + 
    'Road Status is '+status+  '\n' + 
    'Road Status Description is '+statusSeverityDescription;
    finaloutput.message=finalmessage
    console.log(finalmessage);
    } 
    
    else if(response.status=='404')
    {              
        finalmessage=  `${clients.roadid} is not a valid road on the tfl system`
        finaloutput.message=finalmessage
        console.log(finalmessage);
        exitcode=1

    }
    else
       {
        finalmessage=  `error whilst processing data`
        exitcode=1
        console.log(finalmessage);

       }

       return finaloutput

  }) 
}

module.exports = {
  gettfldata: gettfldata
}
// entry point
gettfldata()