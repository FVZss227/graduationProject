'use strict';

//判断是否实名认证过
// 获取数据库实例
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取 user 表的集合对象
	const collection = db.collection('authentication')
	// 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
	let user = await collection.where({
		openid: event.openid,
	}).get()
	console.log(user);
	// affectedDocs 当做找到的个数
	if (user.affectedDocs < 1) {
		return {
			code: -1,
		}
	} else {
		return {
			code: 0,
			data: user.data,
		}
	}
}
