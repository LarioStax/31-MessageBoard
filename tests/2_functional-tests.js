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

const mongoose = require("mongoose");
const Board = require("../models/Board.js")
const Thread = require("../models/Thread.js")
const Reply = require("../models/Reply.js")
let threadId;
let threadId2;
let replyId;
let replyId2;


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
      
      test("Delete test - wrong password", function (done) {
        chai.request(server)
          .delete("/api/threads/test")
          .send({ thread_id: threadId, delete_password: "del" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Incorrect password!");
            done();
          })
      })

      test("Delete test - wrong thread id", function (done) {
        chai.request(server)
          .delete("/api/threads/test")
          .send({ thread_id: "abc", delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Thread not found!");
            done();
          })
      })

      test("Delete test", function (done) {
        chai.request(server)
          .delete("/api/threads/test")
          .send({ thread_id: threadId, delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Success!");
            done();
          })
      })
    });
    
    suite('PUT', function() {

      test("Put test", function (done) {
        chai.request(server)
          .put("/api/threads/test")
          .send({ thread_id: threadId2 })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            Thread.findById(threadId2, function (err, foundThread) {
              if (err) {
                console.log(err);
              } else {
                assert.equal(foundThread.reported, true);
                done();
              }
            })
          })
      })

      test("Put test - Wrong thread id", function (done) {
        chai.request(server)
          .put("/api/threads/test")
          .send({ thread_id: "abc" })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body, "Thread not found!");
            done();
          })
      })


    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {

      test("Post test 1", function (done) {
        chai.request(server)
          .post("/api/replies/test")
          .send({ text: "Test reply!", thread_id: threadId2, delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            Reply.find({ text: "Test reply!" }, function (err, foundReply) {
              if (err) {
                console.log(err);
              } else {
                replyId = foundReply[0]._id;
                assert.equal(foundReply[0].text, "Test reply!");
                done();
              }
            })
          })
      })

      test("Post test 2", function (done) {
        chai.request(server)
          .post("/api/replies/test")
          .send({ text: "Test reply 2!", thread_id: threadId2, delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            Reply.find({ text: "Test reply 2!" }, function (err, foundReply) {
              if (err) {
                console.log(err);
              } else {
                replyId2 = foundReply[0]._id;
                assert.equal(foundReply[0].text, "Test reply 2!");
                done();
              }
            })
          })
      })

      test("Post test 3 - wrong thread id", function (done) {
        chai.request(server)
          .post("/api/replies/test")
          .send({ text: "Test reply 3!", thread_id: "abc", delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Thread not found!");
            done();
          })
      })

      test("Post test 4 - no text input", function (done) {
        chai.request(server)
          .post("/api/replies/test")
          .send({ text: "", thread_id: threadId2, delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Text field empty!");
            done();
          })
      })

      test("Post test 5 - no delete password input", function (done) {
        chai.request(server)
          .post("/api/replies/test")
          .send({ text: "Test reply 5!", thread_id: threadId2, delete_password: "" })
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
          .get("/api/replies/test")
          .query({ "thread_id": threadId2 })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            Reply.findById(replyId, function (err, foundReply) {
              assert.exists(foundReply.text, "Not null or undefined")
              assert.equal(foundReply.text, "Test reply!")
              assert.exists(foundReply.created_on, "Not null or undefined")
              done();
            })
          })
      })

      test("Get test - wrong thread id", function (done) {
        chai.request(server)
          .get("/api/replies/test")
          .query({ "thread_id": "abc" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Thread not found!");
            done();
          })
      })
      
    });
    
    suite('PUT', function() {

      test("Put test", function (done) {
        chai.request(server)
          .put("/api/replies/test")
          .send({ thread_id: threadId2, reply_id: replyId })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            setTimeout(function () { //To allow time to set reported to true
              Reply.findById(replyId, function (err, foundReply) {
                if (err) {
                  console.log(err);
                } else {
                  assert.equal(foundReply.reported, true);
                  done();
                }
              })
            }, 50);
          })
      })

      test("Put test - wrong reply id", function (done) {
        chai.request(server)
          .put("/api/replies/test")
          .send({ thread_id: threadId2, reply_id: "abc" })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body, "Reply not found!");
            done();
          })
      })
      
    });
    
    suite('DELETE', function() {

      test("Delete test - wrong password", function (done) {
        chai.request(server)
          .delete("/api/replies/test")
          .send({ reply_id: replyId, delete_password: "del" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Incorrect password!");
            done();
          })
      })

      test("Delete test - wrong reply id", function (done) {
        chai.request(server)
          .delete("/api/replies/test")
          .send({ reply_id: "abc", delete_password: "deldel" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "Reply not found!");
            done();
          })
      })
      
    });
    
  });

});
