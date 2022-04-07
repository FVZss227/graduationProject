'use strict';
// 获取数据库实例
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取 user 表的集合对象
	const collection = db.collection('hs-appointment')
	// 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
	let user = await collection.where({
		openid: event.openid,
	}).get()
	console.log(user);
	// affectedDocs 当做找到的个数
	//没有数据则新增注册
	if(event.idNo==undefined){
		return {
			code: 0,
			data: user.data,
			
		}
	}else{
		const res = await collection.add({
			trueName: event.trueName,
			openid:event.openid,
			idNo: event.idNo,
			hsType:event.hsType,
			hsName:event.hsName,
			hsDate:event.hsDate,
			hsAddress:event.hsAddress
		})
		return {
			code: 0,
			data: user.data,
			msg: '预约成功',
		}
	}
	
}

