'use strict';
//加密密码
// const sha1 = require('./utils/scert.js')

// 获取数据库实例
const db = uniCloud.database()
exports.main = async (event, context) => {
  // 获取 user 表的集合对象
  const collection = db.collection('users')
  // 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
  let user = await collection.where({
  	username: event.username,
  }).get()
  
  // affectedDocs 当做找到的个数
  if (user.affectedDocs < 1) {
	  //没有数据则新增注册
	const res = await collection.add({
				username: event.username,
				// password:sha1.sha1(event.password) 
				password:event.password
			})
  	return {
  		code: 0,
  		msg: '用户注册成功'
  	}
  } else {
  	return {
  		code: -1,
  		msg: '该用户已存在，请重新输入'
  	}
  }
}
