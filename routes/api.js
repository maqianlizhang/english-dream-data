var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')
const UserController = require('../controller/user')

router.get('/header.json', IndexController.getHeaderData);
router.get('/list.json',IndexController.getListData);
router.get('/index.json', IndexController.getIndexCon);
router.get('/detaillist.json',IndexController.getIndexType);
router.get('/detail.json', IndexController.getDetailCon);
router.get('/indexinfo', IndexController.getIndexInfoCon);
router.get('/deleteDetail/', IndexController.deleteDetail);

router.post('/register/addUser/',UserController.addUser);
router.post('/login/',UserController.login);
router.post('/isLogin/',UserController.isLogin);
router.post('/checklogout/',UserController.logout);

module.exports = router;
