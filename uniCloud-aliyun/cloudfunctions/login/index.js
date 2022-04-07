'use strict';
const util = require('../../../utils/scert.js')
const db = uniCloud.database()
exports.main = async (event, context) => {
  // 获取 user 表的集合对象
  const collection = db.collection('users')
  let user
  let pwd
  // 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
  console.log(event);
  if(event.openid&&!event.password){
	  user=await collection.where({
		  openid:event.openid
	  }).get()
	  if(user.affectedDocs<1){
	  	  await collection.add({
	  		  openid:event.openid
	  	  })
	  }
	  return {
	  	  code: 0,
	  	  // data:event.username
	  	  msg: 'success'
	  }
  }else{
	  user = await collection.where({
	  	username: event.username,
	  }).get()
	  
	  pwd = await collection.where({
	  	password:event.password
	  }).get()
	  console.log(event.password,'22222222222222');
	  // affectedDocs 当做找到的个数
	  if (user.affectedDocs < 1) {
	    // 没有找到
	  	return {
	  		code: -1,
	  		msg: '账号不存在！'
	  	}
		return
	  } 
	  if (pwd.affectedDocs < 1) {
	    // 没有找到
	  	return {
	  		code: -1,
	  		msg: '密码错误,请重新输入！'
	  	}
	  } else {
		  

		  await collection.doc(user.data[0]._id).set({
		  	  		  openid:event.openid,
					  username: event.username,
					  password:util.sha1(event.password) 
		  })
	  	return {
	  		code: 0,
	  		// data:event.username
	  		msg: 'success'
	  	}
	  }
  }
}
