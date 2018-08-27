
const {
    expect,
    assert,
    should
} = require('chai')
const sho = require('should')
const chai = require('chai')
chai.use(require('chai-http'))

describe("Unit testing client", function () {
    let client= require('../../tflclient.js').client
    let microservice= require('../../tflmicroservice.js').gettfldata
    let clients = {}
  it('A2 input should return the right data',async ()=>  {
  clients.roadid = 'A2'
  let res = await client.getdatafromtfl.call(clients)
  console.log(res.data[0].displayName)
    expect(res.data[0].displayName).to.equal('A2');
    })
       
  it('valid road A406 should not return an empty result',async ()=>  {
    clients.roadid = 'A406'
    let res = await client.getdatafromtfl.call(clients)
    console.log(res.data[0].displayName)
      expect(res.data).to.not.equal('');
      })
  it('invalid road \'test\' should not return any data',async ()=>  {
        clients.roadid = 'test'
        let res = await client.getdatafromtfl.call(clients)
          expect(res.status).to.equal(404);
          })

   
});