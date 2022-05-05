'use strict';
// 获取数据库实例
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取 user 表的集合对象
	const collection = db.collection('authentication')
	// 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
	let user = await collection.where({
		idNo: event.idNo,
	}).get()
	let openID=await collection.where({
		openid:event.openid
	}).get()
	// affectedDocs 当做找到的个数
	if (user.affectedDocs < 1&&openID.affectedDocs<1) {
		//没有数据则新增注册
		const res = await collection.add({
			openid: event.openid,
			trueName: event.trueName,
			idNo: event.idNo,
			gender: event.gender,
			bornTime: event.bornTime,
			address: event.address,
			phone:event.phone
		})
		return {
			code: 0,
			msg: '实名认证成功'
		}
	} else if(openID.affectedDocs>=1){
		let user = await collection.where({
				openid:event.openid
		}).update({
			openid: event.openid,
			trueName: event.trueName,
			idNo: event.idNo,
			gender: event.gender,
			bornTime: event.bornTime,
			address: event.address,
			phone:event.phone
		})
		return {
			code: 0,
			msg: '修改信息成功'
		}
	}
	else {
		return {
			code: -1,
			msg: '该证件号已存在!'
		}
	}
}
