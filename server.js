const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb') // imports onjectId from mongodb package to wrap the string ID 
const PORT = 2121;
require('dotenv').config();
let db;
const dbConnectionStr = process.env.DB_STRING;
const dbName = 'bugInvestigationLog';

	
	MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
	    .then(client => {
	        console.log(`Connected to ${dbName} Database`)
	        db = client.db(dbName)
	    })
	    
	app.set('view engine', 'ejs')
	app.use(express.static('public'))
	app.use(express.urlencoded({ extended: true })) 
	// ^^ allows Express to read text fields and select choices frm req.body
	app.use(express.json())	
	
	app.get('/',(request, response)=>{
	// req: from browser data: from mongo 
	    db.collection('bugs').find().toArray()
	    .then(data => {
			console.log('bug array:', data)
			
			
	        response.render('index.ejs', { info: data })
	    })
	    .catch(error => console.error(error))
	})
	
	app.post('/addBug', (request, response) => {
			console.log(`post to /addBug successful: Form data:`,request.body)
console.log('request is:', request.body)
	    db.collection('bugs').insertOne(
			{
				title: request.body.title,
	    errorMessage: request.body.errorMessage, 
		description:request.body.description,
		status: request.body.status,
		solution: request.body.solution
		
	})
	    .then(result => {
	        console.log('Bug Added')
			//console.log('db response:',response)
	        response.redirect('/')
	    })
	    .catch(error => console.error(error))
	})
	
	app.put('/update', (request, response) => {
	    db.collection('bugs').updateOne(
			{_id: new ObjectId(request.body.bugId)},
			{
	        $set: {
	            status:request.body.newStatus,
				solution: request.body.newNotes
	          }
	    },{
	        sort: {_id: 1},
	        upsert: false
	    })
	    .then(result => {
	        console.log('new updates complete')
	        response.json('Updates Complete')
	    })
	    .catch(error => console.error(error))
	
	})
	
	app.delete('/deleteBug', (request, response) => {
		console.log('app.delete accessed')
		console.log('REQUEST BODY: ',request.body)
	    db.collection('bugs').deleteOne({_id: new ObjectId(request.body.bugId) })
	    .then(result => {
	        
	        response.json('Bug Deleted')
	    })
	    .catch(error => console.error(error))
	
	})
	
	app.listen(process.env.PORT || PORT, ()=>{
	    console.log(`Server running on port ${PORT}`)
	})
	

