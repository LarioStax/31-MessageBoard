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
                  res.redirect("/b/" + board);
                }
              });
            }
          })
        }
      });
    })

    .get(function (req, res) {

    })

  app.route('/api/replies/:board');

};
