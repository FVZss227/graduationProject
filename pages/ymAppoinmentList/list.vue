<!-- 新办订单列表 -->
<template>
	<view class="order-list">
		<view class="item" v-for="(item,index) in appointData" :key="index">
			<view class="weui-form-preview">
				<view class="weui-form-preview__hd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label label_name">
							{{item.trueName}}
						</view>
						<view class="weui-form-preview__value">姓名</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">身份证号:</view>
						<view class="weui-form-preview__value">{{item.idNo}}</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">疫苗名称</view>
						<view class="weui-form-preview__value">{{item.ymType}}--{{item.ymName}}</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">剂次</view>
						<view class="weui-form-preview__value">{{item.ymNumber}}</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">接种位置</view>
						<view class="weui-form-preview__value">{{item.injectPlace}}</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">接种地点</view>
						<view class="weui-form-preview__value">{{item.injectAddress}}</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">预约时间</view>
						<view class="weui-form-preview__value">{{item.injectDate}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getOpenId,
	} from '@/utils/storage.js'
	export default {
		name: '',
		components: {},

		data() {
			return {
				appointData: [],

			};
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.$cloud({
					name: "ymAppoinment",
					data: {
						openid: getOpenId().openid
					}
				}).then(res => {
					console.log(res, '----------------- appointment---------------');
					if (res.code == 0) {
						this.appointData = res.data
						console.log(this.appointData);
					}
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.order-list .item {
		margin: 20rpx;
		border-radius: 10px;
		background-color: #ffffff;
	}

	.weui-form-preview {
		position: relative;
		border-radius: 10px;
		padding: 10rpx 30rpx;
		background-color: #ffffff;
	}

	.weui-form-preview__hd {
		position: relative;
		padding: 20rpx 0;
		border-bottom: 1px dashed #c3c3c3;

		.weui-form-preview__label {
			min-width: 200rpx;
			color: #333;
			font-size: 32rpx;
			font-weight: 500;
			text-align: left;
		}
		.label_name{
			font-weight: bold;
		}
		.weui-form-preview__value {
			font-style: normal;
			font-size: 28rpx;
			font-weight: 400;
		}
	}

	.weui-form-preview__bd {
		padding-top: 12rpx;

		.weui-form-preview__item {
			padding-bottom: 12rpx;
		}
	}

	.weui-form-preview__item {
		display: flex;
		-moz-box-pack: justify;
		-ms-box-pack: justify;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-moz-justify-content: space-between;
		justify-content: space-between;
		-moz-box-align: center;
		-webkit-box-align: center;
		box-align: center;
		align-items: center;
		-webkit-align-items: center;
		-moz-align-items: center;
	}

	.weui-form-preview__label {
		color: #999999;
		font-size: 26rpx;
		font-weight: 400;
	}

	.weui-form-preview__value {
		color: #333;
		font-size: 26rpx;
		font-weight: 400;
		display: block;
		overflow: hidden;
		word-break: normal;
		word-wrap: break-word;
	}

	.weui-form-preview__ft {
		padding-bottom: 10rpx;
	}
</style>
