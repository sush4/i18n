var pg = require('pg');
var obj = require('../Model/object.js');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/stringDN';
var client = new pg.Client(connectionString);
// client.connect();

DBUtil = function (){
	connectDB();
}

function connectDB(){
	client.connect(function(err){
	  if(err){
	    console.log('Database connection error'+err+connectionString);
	  }else{
	    console.log('Database connection successful'+connectionString);
	  }
	});
}

DBUtil.prototype.search = function (query1,callback){

	var query = client.query("SELECT key FROM list WHERE value = $1 ", [query1]);
    var rows = [];
    query.on('row', function(row, res) {
    rows.push(row);
    callback(row.key)

	});
}

DBUtil.prototype.insertdb = function (key,value){
	var query = client.query("INSERT into list (key, value, type) VALUES ($1, $2, $3) ", [key, value,1]);
}

DBUtil.prototype.update = function (updateKey,callback){
	console.log('update');
}

DBUtil.prototype.showAll = function (callback){
	// var obj = new OBJ();
	// obj.setKey('test');
	var list = [];
	var query = client.query('SELECT * FROM list;');
	query.on('row',function(row){
		var tempObj = new OBJ(row);
		list.push(new OBJ(row));
	});
	query.on('end',function(results){
		callback(list);
	});

	// console.log('showAll'+obj.getKey());
}

DBUtil.prototype.update = function (query,callback){
	console.log('update');
}
var results = [];
var query1 = client.query('CREATE TABLE IF NOT EXISTS list (key text not null, value text not null, type int not null, PRIMARY KEY(key, value))');
query1.on('end', function() {
   console.log("List table successfully created");
});

// var dbUtil = new DBUtil();

// dbUtil.showAll();

module.exports = DBUtil;