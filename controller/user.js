const UserModel = require('../model/user')
const crypto = require('crypto')

const addUser = (req, res) => {
	const { username, password } = req.body;
	 UserModel.findUser(username, (userinfo)=> {
	 		if (userinfo) {
	 			res.json({
	 				"ret": true,
	 				"data": {
	 					register: false
	 				}
	 			})
	 		} else {
	 			const hash = crypto.createHash('sha256');
				hash.update(password);
	 			UserModel.addUser(username, hash.digest('hex'), ()=> {
	 				res.json({
	 					"ret": true,
	 					"data": {
	 						register: true
	 					}
	 				})
	 			})
	 		}
	 })
}

const login = (req, res) => {
	const { username, password } = req.body;
	const hash = crypto.createHash('sha256');
	hash.update(password);
	UserModel.login(username, hash.digest('hex') , (userinfo) => {
		if( userinfo ) {
			req.session.username = username
			res.json({
				"ret": true,
				"data": {
					login: true,
					user: userinfo.username
				}
			})
		} else {
			res.json({
				"ret": true,
				"data": {
					login: false
				}
			})
		}
	})
}


const isLogin = (req, res) => {
	if(req.session.username) {
		res.json({
			"ret": true,
			"data": {
				username: req.session.username,
				isLogin: true
			}
		})
	} else {
		res.json({
			"ret": true,
			"isLogin": false
		})
	}
}


const logout = (req, res) => {
  if(req.session.username) {
  	req.session.username = ''
  	res.json({
  		"ret": true,
  		"data": {
  			logout: true,
  			user: ''
  		}
  	})
  }
}

module.exports = {
	addUser,
	login,
	isLogin,
  logout
}