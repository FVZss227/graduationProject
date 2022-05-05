<template>
	<view>
		<view class="home_container">
			<view class="home_img">
				<swiper class="swiper" :autoplay='true' :indicator-dots="true" :circular="true"
					indicator-color="#666666" indicator-active-color="#666666" @change="intervalChange">
					<swiper-item v-for="(item, index) in imgList" :key="index">
						<view class="home_img">
							<image class="home_img_bg" :src="item.src" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
				
			</view>
			<view class="home_content">
				<view class="home_content_card g-flex g-flex-justify">
					<view class="content_card_item g-flex g-flex-align-center" @click="goToBusiness('vaccine')" v-if="!isAdmin">
						<view class="card_item_content g-flex g-flex-align-center ">
							<view>
								<image class="card_item_img" src="../../static/reject.png" mode=""></image>
							</view>
							<view class="g-flex g-flex-column">
								<text class="card_item_text">疫苗预约</text>
								<text class="card_item_subtext">预约接种新冠疫苗</text>
							</view>
						</view>
					</view>
					<view class="content_card_item g-flex g-flex-align-center" @click="goToBusiness('nucleicAcid')" v-if="!isAdmin">
						<view class="card_item_content g-flex g-flex-align-center">
							<view>
								<image class="card_item_img" src="../../static/test.png" mode=""></image>
							</view>
							<view class="g-flex g-flex-column">
								<text class="card_item_text">核酸检测</text>
								<text class="card_item_subtext">预约核酸检测</text>
							</view>
						</view>
					</view>
				</view>
				<view class="home_content_card g-flex g-flex-justify">
					<view class="content_card_item g-flex g-flex-align-center" @click="goToBusiness('vaccineList')">
						<view class="card_item_content g-flex g-flex-align-center ">
							<view>
								<image class="card_item_img" src="../../static/jilu1.png" mode=""></image>
							</view>
							<view class="g-flex g-flex-column">
								<text class="card_item_text">疫苗预约记录</text>
								<text class="card_item_subtext">查看疫苗预约记录</text>
							</view>
						</view>
					</view>
					<view class="content_card_item g-flex g-flex-align-center" @click="goToBusiness('nucleicAcidList')">
						<view class="card_item_content g-flex g-flex-align-center">
							<view>
								<image class="card_item_img" src="../../static/jilu1.png" mode=""></image>
							</view>
							<view class="g-flex g-flex-column">
								<text class="card_item_text">核酸预约记录</text>
								<text class="card_item_subtext">查看核酸预约记录</text>
							</view>
						</view>
					</view>
				</view>
				<view class="home_content_card g-flex g-flex-justify">
					<view class="content_card_item g-flex g-flex-align-center" @click="goToBusiness('report')" v-if="!isAdmin">
						<view class="card_item_content g-flex g-flex-align-center ">
							<view>
								<image class="card_item_img" src="../../static/report.png" mode=""></image>
							</view>
							<view class="g-flex g-flex-column">
								<text class="card_item_text">检验报告</text>
								<text class="card_item_subtext">查看检验报告</text>
							</view>
						</view>
					</view>
					<view class="content_card_item g-flex g-flex-align-center" @click="goToBusiness('personal')">
						<view class="card_item_content g-flex g-flex-align-center">
							<view>
								<image class="card_item_img" src="../../static/personal.png" mode=""></image>
							</view>
							<view class="g-flex g-flex-column">
								<text class="card_item_text">个人中心</text>
								<text class="card_item_subtext">查看个人信息</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLoginUserInfo,
		getOpenId,
		setWxLoginUserInfo,
		setLoginUserInfo,
		getWxLoginUserInfo,
		setOpenId
	} from '@/utils/storage.js';
	export default {
		name: '',
		components: {

		},
		data() {
			return {
				formData: {
					openid: ""
				},
				code: '',
				imgList:[
					{
						value:'1',
						src:'../../static/bg.jpg'
					},
					// {
					// 	value:'2',
					// 	src:'../../static/bg2.jpg'
					// },
					// {
					// 	value:'3',
					// 	src:'../../static/bg3.jpg'
					// }
				],
				isAdmin:false
			}
		},
		computed: {
		
		},
		created() {
			if(getLoginUserInfo().username=='admin'){
				this.isAdmin=true
			}
		},
		methods: {
			intervalChange(e) {
				// console.log(e.target);
			},
			//微信登录
			bindGetUserInfo(e) {
				uni.showLoading({
					mask: true
				})
				uni.login({
					provider: "weixin",
					success: (res) => {
						console.log(res);
						if (res.errMsg == "login:ok") {
							this.code = res.code;
							uni.hideLoading()
						} else {}
					}
				})
				uni.getUserProfile({
					desc: '该授权用于获取用户的信息资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res);
						setWxLoginUserInfo(res.userInfo)
						this.$cloud({
							name: "wxLogin",
							data: {
								js_code: this.code
							}
						}).then(res => {
							setOpenId(res.data)
							this.formData.openid = res.data.openid
							// this.formData.username = '',
							// this.formData.password = ''
							this.login()
						})
					}
				})
			},
			login() {
				this.$cloud({
					name: "login",
					data: {
						...this.formData
					}
				}).then(res => {
					console.log(res, '1111111111');
					if (res.code === 0) {
						// 			console.log(!this.formData.openid);
						// 			if (!this.formData.openid) {
						// 				let params = JSON.parse(JSON.stringify(this.formData))
						// 				params.password = util.sha1(params.password)
						// 				setLoginUserInfo(params)
						// 			}

						// 			this.formData.username = '',
						// 				this.formData.password = ''
						this.code = ''
						uni.showToast({
							title: "登陆成功！"
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: "error"
						});
					}
				});
			},
			goToBusiness(val) {
				if (!getOpenId().openid&&getLoginUserInfo().username!='admin') {
					uni.showModal({
						title: '提示',
						content: '登录后可享用所有功能，是否登录？',
						success: (res) => {
							if (res.confirm) {
								// this.bindGetUserInfo()
								uni.navigateTo({
									url: "../login/login"
								})
							}
						}
					})
					return
				
				}
				// console.log(val);
				if (val == 'report') {
					uni.navigateTo({
						url: '../reportList/reportList'
					})
					return
				}
				if (val == 'personal') {
					uni.navigateTo({
						url: "../personal/personal"
					})
					return
				}
				if (val == 'nucleicAcid') {
					uni.navigateTo({
						url: "../hsAppointment/hsAppointment"
					})
					return
				}
				if(val=='vaccine'){
					uni.navigateTo({
						url: "../ymAppointment/ymAppointment"
					})
					return
				}
				if(val=='vaccineList'){
					uni.navigateTo({
						url: "../ymAppoinmentList/list"
					})
					return
				}
				if(val=='nucleicAcidList'){
					uni.navigateTo({
						url: "../hsAppoinmentList/list"
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: '开发中，尽请期待！',
				})
			}
		},
	}
</script>

<style lang='scss'>
	page {
		height: auto;
		background-color: #FFFFFF;
	}

	.home_container {
		.home_img {
			width: 100%;
			height: 400rpx;
			.swiper{
				.home_img_bg {
					width: 100%;
					height: 80%;
				}
			}
			
		}

		.home_content {
			position: relative;
			top: -210rpx;
			background-color: #fdfdfd;
			width: 100%;
			border-top-left-radius: 3em;
			border-top-right-radius: 3em;

			.home_content_card {
				position: relative;
				top: 50rpx;
				height: 180rpx;
				margin: 40rpx 20rpx;

				.content_card_item {
					width: 48%;
					height: 100%;
					border-radius: 1.5em;
					background-color: #ffffff;
					box-shadow: 0 1rpx 16rpx rgba(0, 0, 0, 0.1);

					.card_item_content {
						margin-left: 20rpx;

						.card_item_img {
							margin: 10rpx;
							width: 80rpx;
							height: 80rpx;
						}

						.card_item_text {
							color: #4d85fd;
							font-size: 36rpx;
							font-weight: bold;
						}

						.card_item_subtext {
							margin-top: 10rpx;
							font-size: 28rpx;
						}
					}

				}
			}
		}
	}
</style>
