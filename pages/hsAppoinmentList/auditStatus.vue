/**
 * author: Zhangys
 * description: 管理员审核核酸预约功能
 * @createTime: 2022-05-05 13:12:56
 */
<template>
	<view class="container">
		<view class="c-title">用户信息</view>
		<view class="cu-form-group">
			<view class="title">用户名称:</view>
			<input :value="hsDetail.trueName" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">证件号:</view>
			<input :value="hsDetail.idNo" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号:</view>
			<input :value="hsDetail.phone" disabled></input>
		</view>
		<view class="c-title" style="margin-top: 30upx;">核酸检测信息</view>
		<view class="cu-form-group">
			<view class="title">核酸检测名称(Vaccine):</view>
			<input :value="hsDetail.hsName" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检测类型:</view>
			<input :value="hsDetail.hsType" disabled></input>
		</view>
		<view class="c-title" style="margin-top: 30upx;">预约信息</view>
		<view class="cu-form-group">
			<view class="title">检测地点:</view>
			<input :value="hsDetail.hsAddress" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预约检测时间:</view>
			<input :value="hsDetail.hsDate" disabled></input>
		</view>

		<view class="c-title" style="margin-top: 30upx;">检测信息</view>
		<view class="cu-form-group">
			<view class="title">实际检测时间:</view>
			<picker class="" mode="date" :value="date" start="1900-01-01" end="2022-10-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="loing_btn g-flex g-flex-center">
			<button class="cu-btn" @click="submitAppoinment">
				<text>
					提交结果
				</text>
			</button>
		</view>
	</view>



</template>

<script>
	import {
		getOpenId,
	} from '@/utils/storage.js';
	export default {
		name: '',

		data() {
			return {
				hsDetail: {
					hsTrueDate: '',
				},
				date: '请选择时间',
			}
		},
		onLoad(option) {
			if (option) {
				let params = JSON.parse(option.params)
				this.hsDetail = params

				console.log(params);

			}
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
				this.hsDetail.hsTrueDate = e.detail.value
				console.log(this.date);
			},
			
			//表单验证
			validate() {
				if (!this.hsDetail.hsTrueDate) {
					uni.showModal({
						title: "提示",
						content: '请选择实际检测时间',
						showCancel: false,
					});
					return
				}
				return true
			},
			//提交申请
			submitAppoinment() {
				if (!this.validate()) return
				this.$cloud({
					name: "changeHsStatus",
					data: {
						hsTrueDate: this.hsDetail.hsTrueDate,
						_id: this.hsDetail._id
					}
				}).then(res => {
					if (res.code == 0) {
						uni.showModal({
							title: "提示",
							content: res.msg,
							showCancel: false,
						});
						uni.navigateBack({
							delta: 1
						})
						return
					}
				})
			}
		}

	}
</script>
<style lang='scss' scoped>
	.container {
		/* background-color: #ffffff; */
		.c-title {
			margin-top: 30upx;
			padding: 0 25upx;
			font-size: 28upx;
			line-height: 80upx;
			font-weight: bold;
			color: #000;
			background: #ffffff;
		}

		.cu-form-group {
			min-height: 86upx;
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
