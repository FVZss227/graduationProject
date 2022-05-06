/**
* author: Zhangys
* description: 核酸预约记录列表
* @createTime: 2022-05-05 13:13:31
*/
<template>
	<view class="order-list">
		<view class="item" v-for="(item,index) in appointData" :key="index">
			<view class="weui-form-preview" @click="auditStatus(item)">
				<view class="weui-form-preview__hd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label label_name">
							{{item.trueName}}
						</view>
						<view class="auditBtn"
							:style="item.status=='0'?'background-color:#FBC02D' : 'background-color:#26DA6F'">
							<text>{{item.status=='0'?'核酸未做':'核酸已做'}}</text>
						</view>
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
						<view class="weui-form-preview__label">核酸名称</view>
						<view class="weui-form-preview__value">{{item.hsName}}</view>
					</view>
				</view>

				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">接种地点</view>
						<view class="weui-form-preview__value">{{item.hsAddress}}</view>
					</view>
				</view>
				<view class="weui-form-preview__bd">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">预约时间</view>
						<view class="weui-form-preview__value">{{item.hsDate}}</view>
					</view>
				</view>
				
				<view class="weui-form-preview__bd" v-if="item.hsTrueDate">
					<view class="weui-form-preview__item">
						<view class="weui-form-preview__label">实际检测时间</view>
						<view class="weui-form-preview__value">{{item.hsTrueDate}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getOpenId,
		getLoginUserInfo
	} from '@/utils/storage.js'
	export default {
		name: '',
		components: {},

		data() {
			return {
				appointData: [],
				isAdmin: false
			};
		},
		onShow() {
			if (getLoginUserInfo().username == 'admin') {
				this.isAdmin = true
				this.checkList()
				return
			}
			this.getList()
		},
		methods: {
			//获取该用户核酸检测预约列表
			getList() {
				this.$cloud({
					name: "hsAppoinment",
					data: {
						openid: getOpenId().openid
					}
				}).then(res => {
					if (res.code == 0) {
						this.appointData = res.data
						console.log(this.appointData);
					}
				})
			},
			
			//获取表里面所有的预约记录，审核用
			checkList() {
				this.$cloud({
					name: "auditHs",
					data: {
						type: 'hs'
					}
				}).then(res => {
					if (res.code == 0) {
						this.appointData = res.data
						console.log(this.appointData);
					}
				})
			},
			auditStatus(val) {
				if (!this.isAdmin) return
				if (val.status == '1') {
					uni.showModal({
						content: '结果已出，无法操作！'
					})
					return
				}
				uni.navigateTo({
					url: './auditStatus?params=' + JSON.stringify(val)
				})
				console.log(val._id);
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

		.label_name {
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

	.auditBtn {
		width: 120rpx;
		height: 40rpx;
		border-radius: 10rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
