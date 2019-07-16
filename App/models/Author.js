/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable quotes */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({

	first_name:{
		type:String,
		required:true
	},
	last_name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
	  type:String,
	  required:true
	},
	birth_date:{
		type:Date
	},
	gender:{
		type:String,
		enum:["H","M","O"]
	},
	posts:{
		type:[Schema.Types.ObjectId],
		ref:"posts"
	},
	profile_picture:{
		type:String
	},
	is_active:{
		type:Boolean,
		default:true
	}

}, {collection:"authors",timestamps:true} );

AuthorSchema.pre('save',function(next){
	const author = this;
	const SALT_FACT = 10;
	//console.log(author.isModified("password"));
	if(!author.isModified("password")){return next();}
	bcrypt.genSalt(SALT_FACT,function(err,salt){
		if(err) return next(err);
		//console.log(author.password);
		bcrypt.hash(author.password, salt,function(err,hash){
			if(err) return next(err);
			//console.log(hash);
			author.password = hash;			
			next();
		});
	});
});

module.exports = mongoose.model("authors",AuthorSchema);