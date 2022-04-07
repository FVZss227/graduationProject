import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginUserInfo
	},
	getters: {
	
		loginUserInfo: (state) => state.loginUserInfo,
	},
	mutations: {
		SET_LOGINUSERINFO: function(state, loginUserInfo) {
			state.loginUserInfo = loginUserInfo; 
		},
		
		removeaAll(keys) {
			let _key = keys || uni.getStorageInfoSync().keys;
			if (_key.length > 0) {
				_key.map(el => {
					uni.removeStorageSync(el);
				})
			}
		}
	},
	actions: {
		setLoginUserInfo({
			commit
		}, data) {
			commit('SET_LOGINUSERINFO', data)
		},
		
	}
})

export default store
