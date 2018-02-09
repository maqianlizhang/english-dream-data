const IndexModel = require('../model/index')
const list = require('../json/detailright.json')

const saveHeaderData = (req, res) => {
	list.map((value, index) => {
		IndexModel.saveHeaderData ( value.type, value.rightimg, value.video, value.posimg, (result) => {
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

const getIndexInfoCon = (req, res) => {
	const { type, link } = req.query
	IndexModel.findIndexInfo(type, link, (result) => {
		res.json({
			"list": result
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

const deleteDetail = (req, res) => {
  const id = req.query.id;
  IndexModel.deleteDetail(id, (result) => {
    if( result ) {
      res.json({
        "ret": true,
        "data": {
          delete: true
        }
      })
    } else {
      res.json({
        "ret": true,
        "data": {
          delete: false
        }
      })
    }
  })
}
module.exports = {
	getHeaderData,
	getListData,
	getIndexCon,
	saveHeaderData,
	getIndexType,
	getDetailCon,
	getIndexInfoCon,
	deleteDetail
}