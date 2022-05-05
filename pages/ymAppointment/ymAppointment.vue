<template>
	<view class="container">
		<view class="select-tips">
			请选择需要接种的类型
		</view>
		<view class="item g-flex g-flex-align-center g-flex-item" @click="gotoDetail('1')">
			<view class="item-img">
				<image class="img-class" src="../../static/reject.png" mode=""></image>
			</view>
			<view class="item-content g-flex g-flex-align-center g-flex-item g-flex-justify">
				<view class="item-title">
					第一针
				</view>
				<view style="margin-right: 20upx;">
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		
		<view class="item g-flex g-flex-align-center g-flex-item" @click="gotoDetail('2')">
			<view class="item-img">
				<image class="img-class" src="../../static/reject.png" mode=""></image>
			</view>
			<view class="item-content g-flex g-flex-align-center g-flex-item g-flex-justify">
				<view class="item-title">
					第二针
				</view>
				<view style="margin-right: 20upx;">
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		
		<view class="item g-flex g-flex-align-center g-flex-item" @click="gotoDetail('3')">
			<view class="item-img">
				<image class="img-class" src="../../static/reject.png" mode=""></image>
			</view>
			<view class="item-content g-flex g-flex-align-center g-flex-item g-flex-justify">
				<view class="item-title">
					第三针(加强针)
				</view>
				<view style="margin-right: 20upx;">
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>

		

	</view>
</template>

<script>
	import {
		getOpenId,
	} from '@/utils/storage.js';
	export default {
		name: '',
		components: {

		},
		data() {
			return {
				userInfo:{}
			}
		},
		computed: {

		},
		created() {

		},
		methods: {
			//先验证是否实名认证
			gotoDetail(val){
				this.$cloud({
						name: "isAuth",
						data: {
							openid: getOpenId().openid
						}
					}).then(res => {
						if(res.code=='-1'){
							uni.showModal({
								title: "提示",
								content: '根据最新安全规定,预约前需实名认证',
								showCancel: false,
								success: (res) => {
									if(res.confirm){
										uni.navigateTo({
											url:'../authentication/authentication'
										})
									}
								}
							});
							return
						}
							this.userInfo=res.data[0]
							this.userInfo.type=val
							uni.navigateTo({
								url:'./detail?userInfo='+JSON.stringify(this.userInfo)
							})
					})
			},
			// gotoDetail(val) {
			// 	uni.navigateTo({
			// 		url:'./detail?type='+val
			// 	})
			// },
		},
	}
</script>

<style lang='scss' scoped>
	page {
		height: auto;
		background-color: #FFFFFF;
	}

	.container {
		margin: 40upx;

		.select-tips {
			margin: 10upx 0;
			font-size: 34upx;
			font-weight: bold;
		}

		.item {
			margin: 30upx 0;
			width: 100%;
			height: 90upx;
			border-radius: 10upx;
			box-shadow: 0 1rpx 16rpx rgba(0, 0, 0, 0.1);

			.item-img {
				margin: 0 30upx;

				.img-class {
					width: 60upx;
					height: 60upx;
				}


			}

			.item-content {

				.item-title {
					font-size: 32upx;
					color: #000000;
				}

				
			}
		}
	}
</style>
