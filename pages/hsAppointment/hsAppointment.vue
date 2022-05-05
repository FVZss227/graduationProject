<template>
	<view class="container">
		<view class="select-tips">
			请选择需要预约的项目
		</view>
		<view class="item g-flex g-flex-align-center g-flex-item" @click="gotoDetail('personal')">
			<view class="item-img">
				<image class="img-class" src="../../static/person.png" mode=""></image>
			</view>
			<view class="item-content">
				<view class="item-title">
					新冠核酸检测（个人单检）
				</view>
				<view class="item-desc">
					新型冠状病毒个人核酸检测

				</view>
				<view class="item-pirce">
					￥8元
				</view>
			</view>


		</view>

		<view class="item g-flex g-flex-align-center g-flex-item" @click="gotoDetail('group')">
			<view class="item-img">
				<image class="img-class" src="../../static/micro.png" mode=""></image>
			</view>
			<view class="item-content">
				<view class="item-title">
					新冠核酸检测（10合1混采）
				</view>
				<view class="item-desc">
					新型冠状病毒核酸检测（多人标本混合检测）

				</view>
				<view class="item-pirce">
					￥0元
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
						console.log(res, 'wwxxxxxxxxxxxxx');
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
			height: 200upx;
			border-radius: 10upx;
			box-shadow: 0 1rpx 16rpx rgba(0, 0, 0, 0.1);

			.item-img {
				margin: 0 30upx;

				.img-class {
					width: 80upx;
					height: 80upx;
				}


			}

			.item-content {

				.item-title {
					font-size: 32upx;
					color: #000000;
				}

				.item-desc {
					margin: 20upx 0;
					font-size: 26upx;
					color: #555653;
				}

				.item-pirce {
					font-size: 26upx;
					color: #ffaa00;
				}
			}
		}
	}
</style>
