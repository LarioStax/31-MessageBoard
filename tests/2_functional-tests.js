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

      test("Post test 2", function (done) {
        chai.request(server)
          .post("/api/threads/test")
          .send({ text: "Test thread 2!", delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            Thread.find({ text: "Test thread 2!" }, function (err, foundThread) {
              if (err) {
                console.log(err);
              } else {
                threadId2 = foundThread[0]._id;
                assert.equal(foundThread[0].text, "Test thread 2!");
                done();
              }
            })
            
          })
      })

      test("Post test 3 - no text input", function (done) {
        chai.request(server)
          .post("/api/threads/test")
          .send({ text: "", delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Text field empty!");
            done();
          })
      })

      test("Post test 4 - no delete password input", function (done) {
        chai.request(server)
          .post("/api/threads/test")
          .send({ text: "Test thread 3!", delete_password: "" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Please provide a delete password!");
            done();
          })
      })
      
    });
    
    suite('GET', function() {
      
      test("Get test", function (done) {
        chai.request(server)
          .get("/api/threads/test")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.exists(res.body[0].text, "Not null or undefined")
            assert.equal(res.body[0].text, "Test thread 2!")
            assert.exists(res.body[0].replycount, "Not null or undefined")
            assert.exists(res.body[0].created_on, "Not null or undefined")
            assert.exists(res.body[0].bumped_on, "Not null or undefined")
            done();
          })
      })
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
