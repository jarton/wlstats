import { MongoClient, ObjectID } from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import _debug from 'debug'

const debug = _debug('app:server:main')
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

let db;

// DB collections
const MEETS_COLLECTION = 'meets',
	RESULTS_COLLECTION = 'results',
	LIFTERS_COLLECTION = 'lifters',
	CLUBS_COLLECTION = 'clubs';

	//MongoClient = mongodb.MongoClient;
MongoClient.connect("mongodb://localhost:27017/wlstats", function(err, database) {
	if(err) {
		console.log(err);
		process.exit(1);
	}

	db = database;
	app.listen(6969, () => {
		debug('backend runnig')	
	})

	debug('db connection good')
});

// GET PAGE
app.get('/',function(req, res) {
	//	res.sendFile(path.resolve('src/index.html'));
});

//API ROUTES

function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

/* /lifters/
 * :id - get a lifter by id
 */
app.get("/lifters/:id", function(req, res) {
	db.collection(LIFTERS_COLLECTION)
		.findOne({'_id': Number(req.params.id)}, function(err, doc) {
			if (err) {
				handleError(res, err.message, "failed to get lifter");
			}
			else {
				res.status(200).json(doc);	
			}
	})
});

/* /meets/
 * id:				 - get a meet by id
 */
app.get("/meets/:id", function(req, res) {
	db.collection(MEETS_COLLECTION)
	.findOne({'_id': Number(req.params.id)}, function(err, doc) {
		if (err) {
			handleError(res, err.message, "failed to get meet");
		}
		else {
			res.status(200).json(doc);
		}
	})
});

/* /clubs/
 * :id  -  get result by id
 */
app.get("/clubs/:id", function(req, res) {
	db.collection(CLUBS_COLLECTION)
		.findOne({'_id': Number(req.params.id)}, function(err, doc){
		if (err) {
			handleError(res, err.message, "failed to get club");
		}
		else {
			res.status(200).json(doc)	;
		}
	})
});


/* /result/
 * /lifter/:id	- get all results for a lifter
 */
app.get("/results/lifter/:id", function(req, res) {
	db.collection(RESULTS_COLLECTION).find({lifterid: Number(req.params.id)})
		.toArray(function(err, docs) {
			if (err) {
				handleError(res, err.message, "Failed to get results");
			}
			else {
				res.status(200).json(docs);
			}
	})
});

export default app
