const IndexModel = require('../model/index')
const list = require('../json/detailcon.json')

const saveHeaderData = (req, res) => {
	list.map((value, index) => {
		IndexModel.saveHeaderData ( value.from, value.count, value.audio, value.type,value.con, value.time, value.link, (result) => {
			console.log('存成功')
		})	
	})
}


const getHeaderData = (req, res) => {
	IndexModel.findHeaderData((navlist, detailtitle, detaillist) => {
		res.json({
			"ret": true,
			"data": {
				navlist, 
				detailtitle,
				detaillist
			}
		})
	})
}

const getIndexCon = (req, res) => {
	IndexModel.getIndexCon((result) => {
		res.json({
			"ret": true,
			"list": result
		})
	})
}

const getIndexType = (req, res) => {
	const link = req.query.link
	IndexModel.getIndexType(link,(list) => {
		res.json({
			list
		})
	})
}

const getListData = (req, res) => {
	const link = req.query.link
	IndexModel.findListCon(link, (result) => {
		res.json({
			"list": result
		})
	})
}

const getDetailCon = (req, res) => {
	const link = req.query.id
 IndexModel.getDetailCon (link, (detail,title) => {
   res.json({
   	"ret": true,
   	"detail": detail,
   	"title": title
   })
 })
}


module.exports = {
	getHeaderData,
	getListData,
	getIndexCon,
	saveHeaderData,
	getIndexType,
	getDetailCon
}