// import store from '../store/index.js';
export function getWxLoginUserInfo() {
	let userInfo = uni.getStorageSync('loginWxUserInfo');
	if (userInfo != '' && JSON.stringify(userInfo) != '{}') {
		return JSON.parse(userInfo);
	}
	return {}
}

export function setWxLoginUserInfo(userInfo) {
	let data = userInfo || {}
	try {
		uni.setStorageSync('loginWxUserInfo', JSON.stringify(userInfo));
	} catch (e) {

	}
}

export function getLoginUserInfo() {
	let userInfo = uni.getStorageSync('loginUserInfo');
	if (userInfo != '' && JSON.stringify(userInfo) != '{}') {
		return JSON.parse(userInfo);
	}
	return {}
}

export function setLoginUserInfo(userInfo) {
	let data = userInfo || {}
	try {
		uni.setStorageSync('loginUserInfo', JSON.stringify(userInfo));
	} catch (e) {

	}
}


export function getOpenId() {
	let userInfo = uni.getStorageSync('openId');
	if (userInfo != '' && JSON.stringify(userInfo) != '{}') {
		return JSON.parse(userInfo);
	}
	return {}
}

export function setOpenId(userInfo) {
	let data = userInfo || {}
	try {
		uni.setStorageSync('openId', JSON.stringify(userInfo));
	} catch (e) {

	}
}
