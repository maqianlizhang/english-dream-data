const db = require('../utils/database')

const User = db.model('user', { 
	username: String,
	password: String
})

const findUser = (username, callback) => {
	console.log(username)
	User.findOne({username: username}, (err, res) => {
		callback(res)
	})
}

const addUser = ( username, password, callback) => {
	const user = new User({ 
		username: username,
		password: password
	})

	user.save().then(() => {
		callback()
	})
}

const login = (username, password, callback) => {
	User.findOne({username: username, password:password }, (err, res) => {
		callback(res)
	})
}

module.exports= {
	findUser,
	addUser,
	login
}

