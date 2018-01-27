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

var DetailRight = db.model('detailright', {
	type: Number,
	rightimg: String,
	video: String,
	posimg: String
})
const saveHeaderData = ( type, rightimg, video, posimg, callback) => {
	const navList = new DetailRight({ 
		type,
		rightimg,
		video,
		posimg
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
	const detaillists = {
		title: '',
		list: []
	}
	DetailNav.find({}, (err, res) => {
		detaillists.list = res
		detaillists.title = 'VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。'
		callback(detaillists)
	})
}

const getIndexType = (link,callback) => {
	const detaillist = {
    title: '',
    list: []
  }
  
	DetailTitle.find({link:link}, (err, res) => {
		DetailNav.find({type: res[0].type}, (err, result) => {
			result.map((value) => {
				detaillist.list.push(value)
			})
      detaillist.title = 'VOA>'+res[0].title
			callback(detaillist)
		})
	})
}

const findIndexInfo = (type, link, callback) => {
	const indexinfo = {
    title: '',
    list: []
  } 
  DetailTitle.find({type: type}, ( err, res) => {
  	Nav.find({type: res[0].type, link: link}, (err, result) => {
  		indexinfo.list = result
  		indexinfo.title = 'VOA>'+res[0].title + '>' + result[0].title
  		callback(indexinfo)
  	})

  })
}

const findListCon = (link, callback) => {
	const listcons = {
		'img': {},
		'book': [],
		'con': [],
		'posimg':'',
		'rightimg': '',
		'video': ''
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
							DetailRight.find({type: res[0].type}, (err, resultright) => {
								listcons.posimg = resultright[0].posimg
								listcons.rightimg = resultright[0].rightimg
								listcons.video = resultright[0].video
								callback(listcons)
							})
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
	getDetailCon,
	findIndexInfo
}





