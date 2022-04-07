'use strict';
//加密密码
// const util = require('../../../utils/scert.js')
// 获取数据库实例
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取 user 表的集合对象
	const collection = db.collection('reportList')
	// 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
	// let user = await collection.orderBy("name", "asc").get()
	let user = await collection.where({
		id: event.id,
	}).get()
	return {
		code: 0,
		data: user.data,
		msg: 'success'
	}
}
