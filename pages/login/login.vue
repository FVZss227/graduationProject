<template>
	<view class="login-container">
		<view class="cu-form-group margin-top">
			<text class="cuIcon-people icon_style"></text>
			<input placeholder="请输入用户名" v-model="formData.username" />
		</view>
		<view class="cu-form-group margin-top">
			<text class="cuIcon-lock icon_style"></text>
			<input placeholder="请输入密码" password v-model="formData.password" />
		</view>
		<view class="user_agreement g-flex g-flex-align-center g-flex-center">
			<checkbox-group @change="checkboxChange">
				<checkbox :checked="isChecket" class="checkBox" />
				授权登录视为您已阅读并同意<text class="textInfo" @click="agreementHandle">《用户协议》</text>
			</checkbox-group>
		</view>
		<view class="loing_btn g-flex g-flex-center">
			<button class="cu-btn" @click="loginHandle">
				<text>
					账号密码登录
				</text>
			</button>
		</view>
		<view class=" goRegister g-flex g-flex-end">
			<view class="">
				没有账号,去
				<text style="color:#4e87ff" @click="registerHandle">注册</text>
			</view>
		</view>
		<view class="loing_btn g-flex g-flex-column g-flex-align-center">
			<view class="login_img" @click="bindGetUserInfo">
				<image class="wxlogin_class" src="../../static/wxLogin.png" mode=""></image>
			</view>
			<view class="">
				微信一键登录
			</view>
		</view>
	</view>
</template>
<script>
	import {
		setWxLoginUserInfo,
		setLoginUserInfo,
		getWxLoginUserInfo,
		getLoginUserInfo,
		getOpenId,
		setOpenId
	} from '@/utils/storage.js';
	import util from '@/utils/scert.js'
	export default {
		name: '',
		components: {},
		data() {
			return {
				formData: {
					password: '',
					username: '',
					openid: ""
				},
				isRead: false,
				isChecket: false,
				code: '',
				isValue: false
			};
		},
		onLoad(option) {
			if (option.loginForm) {
				let params = JSON.parse(option.loginForm)
				this.formData.username = params.username
				this.formData.password = params.password
			}
		},
		computed: {},
		created() {

		},
		methods: {
			checkboxChange() {
				this.isChecket = !this.isChecket


			},
			//表单校验
			validate() {
				if (!this.formData.username) {
					uni.showModal({
						title: "提示",
						content: '请输入用户名',
						showCancel: false,
					});
					return
				}
				if (!this.formData.password) {
					uni.showModal({
						title: "提示",
						content: '请输入密码',
						showCancel: false,
					});
					return
				}
				if (!this.isChecket) {
					uni.showModal({
						title: "提示",
						content: '请仔细阅读并同意协议',
						showCancel: false,
					});
					return
				}
				return true
			},
			//账号密码登录
			loginHandle() {
				if (!this.validate()) return
				//账号密码登录也要获取openID
				uni.login({
					provider: "weixin",
					success: (res) => {
						console.log(res);
						if (res.errMsg == "login:ok") {
							this.code = res.code;
							this.$cloud({
								name: "wxLogin",
								data: {
									js_code: this.code
								}
							}).then(res => {
								//把取到的openID存到缓存
								setOpenId(res.data)
								this.formData.openid = res.data.openid
								//调用登录接口
								this.login()
							})
						} else {}
					}
				})


			},
			//微信登录按钮
			bindGetUserInfo(e) {
				console.log(e);
				if (!this.isChecket) {
					uni.showModal({
						title: "提示",
						content: '请仔细阅读并同意协议',
						showCancel: false,
					});
					return
				}
				uni.login({
					provider: "weixin",
					success: (res) => {
						console.log(res);
						if (res.errMsg == "login:ok") {
							this.code = res.code;

						} else {}
					}
				})
				//调用uni.getUserProfile接口获取用户信息（需用户授权）
				uni.getUserProfile({
					desc: '用于获取用户的信息资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res);
						setWxLoginUserInfo(res.userInfo)
						//调用微信登录接口获取openID
						this.$cloud({
							name: "wxLogin",
							data: {
								js_code: this.code
							}
						}).then(res => {
							console.log(res, 'wwxxxxxxxxxxxxx');
							//把取到的openID存到缓存
							setOpenId(res.data)
							this.formData.openid = res.data.openid
							this.formData.username = ''
							this.formData.password = ''
							//调用登录接口
							this.login()
						})
					}
				})

			},
			login() {
				let params = JSON.parse(JSON.stringify(this.formData))
				// if (params.password) {
				// 	params.password = util.sha1(params.password)
				// }
				this.$cloud({
					name: "login",
					data: {
						...params
					}
				}).then(res => {
					console.log(res, '1111111111');
					if (res.code === 0) {
						if (this.formData.openid && this.formData.password) {
							setLoginUserInfo(params)
						}

						//登录成功清空表单
						for (const key in this.formData) {
							this.formData[key] = ''
						}
						uni.showToast({
							title: "登录成功！"
						});
						setTimeout(() => {

							uni.redirectTo({
								url: '../home/home'
							})
						}, 500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "error"
						});
					}
				});
			},
			agreementHandle() {
				uni.navigateTo({
					url:'../useraAgreement/index'
				})
			},
			//去注册
			registerHandle() {
				uni.navigateTo({
					url: '../register/register'
				})
			}

		}

	};
</script>

<style lang="scss" scoped>
	.login-container {
		margin: 300rpx 50rpx;

		.cu-form-group {
			border-radius: 20rpx;

			.icon_style {
				margin-right: 10rpx;
			}
		}

		.user_agreement {
			margin-top: 30rpx;
			font-size: 28rpx;

			.checkBox {
				margin-right: 10rpx;
				transform: scale(0.7)
			}

			.textInfo {
				color: #4e87ff;
			}
		}

		.loing_btn {
			margin-top: 40rpx;

			.cu-btn {
				border-radius: 25px;
				width: 600rpx;
				height: 100rpx;
				color: #fff;
				background-color: #59b58d;
			}

			.login_img {
				.wxlogin_class {
					width: 100rpx;
					height: 100rpx;
				}
			}
		}

		.goRegister {
			margin-top: 40rpx;
		}
	}
</style>
