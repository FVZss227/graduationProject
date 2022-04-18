'use strict';
//加密密码
// const util = require('../../../utils/scert.js')
// 获取数据库实例
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取 user 表的集合对象
	const collection = db.collection('ym-appointment')
	// 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
	// let user = await collection.orderBy("name", "asc").get()
	let user = await collection.where({
		_id:event._id
	}).update({
		status:'1',
		ymTrueDate:event.ymTrueDate
	})
	return {
		code: 0,
		data: user.data,
		msg: 'success'
	}
}
