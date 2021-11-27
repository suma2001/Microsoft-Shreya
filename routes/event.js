const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authenticate = require('../middleware/authenticate')
const { Event, EventFile } = require('../models/event');

// to validate object IDs
const { ObjectID } = require('mongodb')
const app = express();

const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
  });

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

app.get('/recommendedGroups', (req, res)=>{
    var docs=[];
    var strengths = Array.from(req.headers.weaknesses.split(","))
    
    Event.find().then((events) => {
        const filtered=[];
        const recommendedGroups=[]

        strengths.map(strength =>{
             events.map(event => {
                 if(event.course.toLowerCase().includes(strength.toLowerCase()) || event.subject.toLowerCase().includes(strength.toLowerCase())) 
                 { 
                    recommendedGroups.push(event)
                    filtered.push(event._id)
                     
                    }
               })
        })
       
        events.map(event=>{
            docs.push({ 
                "id":event._id,
                "content": event.subject
            })
        })
        recommender.train(docs);
        const similarDocuments = recommender.getSimilarDocuments(filtered[0], 0, 1);
        const ids=[];
        similarDocuments.map(doc=>{
            ids.push(doc.id)
        })
        
      
        ids.map(id =>{
            events.map(event => {
             
                if(event._id === id && !recommendedGroups.includes(event)) 
                {  
                    recommendedGroups.push(event)
                }
              })
       })
        res.json({recommendedGroups}) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});

app.get('/events', authenticate, (req, res) => {

    var docs=[];
    Event.find().then((events) => {
        
        events.map(event=>{
            docs.push({ 
                "id":event._id,
                "content":event.description
            })
        })
        recommender.train(docs);
        const similarDocuments = recommender.getSimilarDocuments("615825bf8be4cf42e49a3db2", 0, 10);
        res.send(events) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});

app.post('/events', authenticate, (req, res) => {
    const event = new Event(req.body);
    event.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
});

app.patch('/events/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const event = req.body;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Update the event by its id.
    Event.findOneAndUpdate({_id: id}, {$set: event}, {new: true}).then((updatedEvent) => {
        if (!updatedEvent) {
            res.status(404).send()
        } else {
            res.send(updatedEvent)
        }
    }).catch((error) => {
        res.status(400).send() // bad request for changing the event.
    })
});




// Add groups liked by the user
app.post('/events/member/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Add member to event
    Event.findOneAndUpdate({_id: id}, {$push: {members: username}}, {new: true}).then((updatedEvent) => {
        if (!updatedEvent) {
            res.status(404).send()
        } else {
            res.send(updatedEvent)
        }
    }).catch((error) => {
        res.status(400).send() // bad request for adding member.
    })
});

app.delete('/events/member/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const username = req.body.username;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Add member to event
    Event.findOneAndUpdate({_id: id}, {$pullAll: {members: [username]}}, {new: true}).then((updatedEvent) => {
        if (!updatedEvent) {
            res.status(404).send()
        } else {
            res.send(updatedEvent)
        }
    }).catch((error) => {
        res.status(400).send() // bad request for changing the event.
    })
});

app.delete('/events/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete the event by its id.
    Event.findByIdAndDelete(id).then((event) => {
        if (!event) {
            res.status(404).send()
        } else {
            res.send(event)
        }
    }).catch((error) => {
        res.status(400).send() 
    })
});



/** File Upload Routes **/

// A POST route to upload a file for an event. Note: This does not directly attach a file to the event, that will be
// done in the /event POST or PATCH route.
app.post("/event_files", multipartMiddleware, (req, res) => {
    cloudinary.v2.uploader.upload(
        req.files.file.path,
        { resource_type: "auto" },
        function (error, result) {
            var file = new EventFile({
                file_name: req.files.file.originalFilename,
                file_id: result.public_id,
                file_url: result.url
            });

            file.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

/// a DELETE route to remove a file by its id
app.delete("/event_files/:file_id", (req, res) => {
    const file_id = req.params.file_id;
    const { editing, event_id } = req.body;

    // Delete a file by its id (NOT the database ID, but its id on the cloudinary server)
    cloudinary.uploader.destroy(file_id, function (result) {

        // Delete the image from the database
        EventFile.findOneAndRemove({ file_id: file_id })
            .then(file => {
                if (!file) {
                    res.status(404).send();
                } else {
                    if (editing === 1) {
                        Event.findByIdAndUpdate(event_id, {$pull: {files: file}}, {new: true})
                            .then(event => {
                                if (!event) {
                                    res.status(404).send();
                                } else {
                                    res.send(file);
                                }
                            })
                    }
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});

app.post("/subscribe", (req, res) => {
    const { subscription, title, message } = req.body;
    const payload = JSON.stringify({ title, message });
    webpush.sendNotification(subscription, payload)
    .catch((err) => console.error("err", err));
    res.status(200).json({ success: true });
});

module.exports = app;