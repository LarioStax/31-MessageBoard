/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const mongoose = require("mongoose");

const Board = require("../models/Board.js")
const Thread = require("../models/Thread.js")
const Reply = require("../models/Reply.js")

module.exports = function (app) {

  app.route('/api/threads/:board')
    //post a new thread to a board that either exists or gets created
    .post(function (req, res) {
      const board = req.params.board;
      let update = {};
      let options = {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true
      }
      let returnObject = {};

      Board.findOneAndUpdate({ board }, update, options, function (err, updatedBoard) {
        if (err) {
          console.log(err);
        } else {
          Board.findOne({ board }, function (err, foundBoard) {
            if (err) {
              console.log(err);
            } else {
              let newThread = {
                board: req.body.board,
                text: req.body.text,
                delete_password: req.body.delete_password
              };
              Thread.create(newThread, function (err, createdThread) {
                if (err) {
                  console.log(err);
                } else {
                  foundBoard.threads.push(createdThread);
                  foundBoard.save();
                  // console.log(createdThread);
                  res.redirect("/b/" + board);
                }
              });
            }
          })
        }
      });
    })

    .delete(function (req, res) {
      // ******* CHECK DOES THIS REMOVE THE THREAD FROM BOARDS THREAD ARRAY AS WELL!!!! *********
      const thread_id = req.body.thread_id;
      const delete_password = req.body.delete_password;
      Thread.findById(thread_id, function (err, foundThread) {
        if (err || !foundThread) {
          return res.json("Thread not found!");
        } else {
          if (foundThread.delete_password !== delete_password) {
            return res.json("Incorrect password!");
          }
          if (foundThread.delete_password === delete_password) {
            foundThread.remove()
            return res.json("Success!");
          }
        }
      })
    })

    .get(function (req, res) {

    })

  app.route('/api/replies/:board')
    //post a new reply to an existing thread
    .post(function (req, res) {
      const board = req.params.board;
      const thread_id = req.body.thread_id;
      Thread.findById(thread_id, function (err, foundThread) {
        if (err) {
          console.log(err);
        } else {
          let newReply = {
            text: req.body.text,
            delete_password: req.body.delete_password
          }
          Reply.create(newReply, function (err, createdReply) {
            if (err) {
              console.log(err);
            } else {
              foundThread.bumped_on = Date.now();
              foundThread.save();
              // console.log(foundThread);
              // console.log(createdReply);
              res.redirect(`/b/${board}/${thread_id}`)
            }
          })
        }
      })
    })

    .delete(function (req, res) {
      // ******* CHECK DOES THIS REMOVE THE REPLY FROM THREADS REPLIES ARRAY AS WELL!!!! *********
      const reply_id = req.body.reply_id;
      const delete_password = req.body.delete_password;
      Reply.findById(reply_id, function (err, foundReply) {
        if (err || !foundReply) {
          return res.json("Reply not found!");
        } else {
          if (foundReply.delete_password !== delete_password) {
            return res.json("Incorrect password!");
          }
          if (foundReply.delete_password === delete_password) {
            foundReply.remove()
            return res.json("Success!");
          }
        }
      })
    })

};
