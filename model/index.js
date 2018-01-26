const db = require('../utils/database')


var NavList = db.model('title', { 
	title: String,
	link: String,
	type: Number
})

var ListImg = db.model('listimg', { 
	imgUrl: String,
	moveImg: String,
	type: Array
})

var Book = db.model('book', { 
	imgUrl: String,
	type: Number
})

var ListCon = db.model('listcon', { 
	con: String,
	type: Number
})

var DetailTitle = db.model('detailtitle', { 
	title: String,
	link: String,
	type: Number
})

var Nav = db.model('nav', { 
	title: String,
	link: String,
	type: Number
})

var DetailNav = db.model('detailnav', { 
	link: String,
	type: Number,
	con: String,
	time: String
})

var DetailCon = db.model('detailcon', {
	from: String,
	count: Number,
	audio: String,
	type: Number,
	con: String,
	time: String,
	link: String
})

const saveHeaderData = ( from , count, audio, type, con, time, link, callback) => {
	const navList = new DetailCon({ 
		from,
		count,
		audio,
		type,
		con,
		time,
		link
	})
	navList.save().then(() => {
		callback();
	})
}

const findHeaderData = (callback) => {
	NavList.find({},(err,res) => {
		DetailTitle.find({}, (err, detaillist) => {
			Nav.find({}, (err, navlist) => {
        callback(res, detaillist, navlist )
			})
		})
	})	
}

const getIndexCon = (callback) => {
	DetailNav.find({}, (err, res) => {
		callback(res)
	})
}

const getIndexType = (link,callback) => {
	const detaillist = []
	DetailTitle.find({link:link}, (err, res) => {
		DetailNav.find({type: res[0].type}, (err, result) => {
			result.map((value) => {
				detaillist.push(value)
			})
			callback(detaillist)
		})
	})
}

const findListCon = (link, callback) => {
	const listcons = {
		'img': {},
		'book': [],
		'con': []
	}
	NavList.find({link:link}, (err,res)=> {
		ListImg.find({}, (err, result) => {
			for(var i =0 ; i < result[0].type.length; i++) {
				if( result[0].type[i] === res[0].type) {
					listcons.img = result[0]
					Book.find({type: res[0].type}, (err, result) => {
						listcons.book = result
						ListCon.find({type: res[0].type}, (err, result) => {
							listcons.con = result
							callback(listcons)
						})
					})
				} 
			}
		})
	})
}

const getDetailCon = (link, callback) => {
	let details = {}
	DetailNav.find({link:link}, (err, res) => {
		DetailCon.find({link:res[0].link}, (err, result) => {
				callback(result[0], res[0].con)
		})
	})
}

module.exports = {
	saveHeaderData,
	findHeaderData,
	findListCon,
	getIndexType,
	getIndexCon,
	getDetailCon
}





