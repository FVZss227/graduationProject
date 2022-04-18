<template>
	<view class="container">
		<view class="user_info g-flex g-flex-column g-flex-center g-flex-align-center">
			<image class="info_avatarUrl" v-if="loginWxUserInfo.nickName" :src="loginWxUserInfo.avatarUrl" mode="">
			</image>
			<image class="info_avatarUrl" v-else src="../../static/user_img.png" mode=""></image>
			<view class="info_name" v-if="loginWxUserInfo.nickName">
				{{loginWxUserInfo.nickName}}
			</view>
			<view class="info_name" v-else>
				{{loginUserInfo.username}}
			</view>
		</view>
		<view class="user_content">

			<view class="user_item g-flex g-flex-justify" @click="toBusiness('hsReport')">
				<view class="g-flex g-flex-align-center">
					<image class="content_img" src="../../static/jilu1.png" mode=""></image>
					<view>核酸预约记录</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="user_item g-flex g-flex-justify" @click="toBusiness('ymReport')">
				<view class="g-flex g-flex-align-center">
					<image class="content_img" src="../../static/jilu1.png" mode=""></image>
					<view>疫苗预约记录</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="user_item g-flex g-flex-justify" @click="toBusiness('reportList')">
				<view class="g-flex g-flex-align-center">
					<image class="content_img" src="../../static/report.png" mode=""></image>
					<view>检测结果查询</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="user_item g-flex g-flex-justify" @click="toBusiness('modifyPwsd')">
				<view class="g-flex g-flex-align-center">
					<image class="content_img" src="../../static/personal.png" mode=""></image>
					<view>完善信息</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="user_item g-flex g-flex-justify" @click="toBusiness('about')">
				<view class="g-flex g-flex-align-center">
					<image class="content_img" src="../../static/about.png" mode=""></image>
					<view>关于</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="user_item g-flex g-flex-justify" @click="toBusiness('version')">
				<view class="g-flex g-flex-align-center">
					<image class="content_img" src="../../static/about.png" mode=""></image>
					<view>版本信息</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>

		</view>
		<view class="loing_btn g-flex g-flex-center">
			<button class="cu-btn" @click="logOut">
				<text>
					退出登录
				</text>
			</button>
		</view>
	</view>
</template>

<script>
	import {
		getWxLoginUserInfo,
		getLoginUserInfo,

	} from '@/utils/storage.js';
	export default {
		name: '',
		components: {

		},
		data() {
			return {
				loginWxUserInfo: {},
				loginUserInfo: {}
			}
		},
		computed: {

		},
		created() {
			this.loginWxUserInfo = getWxLoginUserInfo('loginWxUserInfo')
			this.loginUserInfo = getLoginUserInfo('loginUserInfo')
			console.log(this.loginUserInfo);
			console.log(this.loginWxUserInfo);
			// console.log();
			this.loginUserInfo.username=getLoginUserInfo().username=='admin'?'超级管理员':getLoginUserInfo().username
		},
		methods: {
			toBusiness(val) {
				if (val == 'hsReport') {

					return
				}
				if (val == 'ymReport') {

					return
				}
				if (val == 'reportList') {

					return
				}
				if (val == 'modifyPwsd') {

					return
				}
				if (val == 'about') {

					return
				}
			},
			//退出登录
			logOut() {
				uni.showModal({
					title: '提示',
					content: '确定要退出吗',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.navigateTo({
								url:'../home/home'
							})
						}
					}
				})

			}
		},
	}
</script>

<style lang='scss'>
	page {
		background-color: #FFFFFF;
	}
	.container {
		margin: 40rpx 40rpx;
		.user_info {
			background-image: url(../../static/bg2.png);
			height: 300rpx;
			border-radius: 16rpx;
			background-color: #FFFFFF;
			box-shadow: 0 1rpx 16rpx rgba(0, 0, 0, 0.1);
			.info_avatarUrl {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
				margin-bottom: 30rpx;
			}
			.info_name {
				font-size: 40rpx;
			}
		}
		.user_content {
			margin-top: 80rpx;
			height: 800rpx;
			.content_img {
				margin-right: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
			.user_item {
				margin: 0 20rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 32rpx;

				.cuIcon-right {
					float: right;
				}
			}
			.user_item:first-child {
				border-top: 0.5px solid #787878;
			}
		}
		.loing_btn {
			margin-top: 40rpx;
			.cu-btn {
				/* border-radius: 25px; */
				width: 600rpx;
				height: 100rpx;
				color: #fff;
				background-color: #59b58d;
			}

		}
	}
</style>
