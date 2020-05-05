/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../app.js');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {

      test("Post test 1", function (done) {
        chai.request(server)
          .post("/api/threads/test")
          .send({ text: "Test thread!", delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            Thread.find({ text: "Test thread!" }, function (err, foundThread) {
              if (err) {
                console.log(err);
              } else {
                threadId = foundThread[0]._id;
                assert.equal(foundThread[0].text, "Test thread!");
                done();
              }
            })
          })
      })
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
