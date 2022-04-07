<template>
	<view class="login-container">
		<view class="cu-form-group margin-top">
			<view class="title">姓名:</view>
			<input placeholder="请输入真实姓名" v-model="formData.trueName" />
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">身份证号:</view>
			<input placeholder="请输入身份证号" v-model="formData.idNo" />
		</view>

		<view class="cu-form-group margin-top">
			<view class="title">性别:</view>
			<radio-group class=" g-flex g-flex-item" name="radio" @change="RadioChange">
				<label class="radioGroup">
					<radio value="0" style="margin-right: 10rpx;" /><text>男</text>
				</label>
				<label>
					<radio value="1" style="margin-right: 10rpx;" /><text>女</text>
				</label>
			</radio-group>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">日期选择:</view>
			<picker class=""  mode="date" :value="date" start="1900-01-01" end="2022-01-01" @change="DateChange">
				<view class="picker">
						{{date}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">地址:</view>
			<input placeholder="请输入地址" v-model="formData.address" />
		</view>
		<view class="loing_btn g-flex g-flex-center">
			<button class="cu-btn" @click="authHandle">
				<text>
					实名认证
				</text>
			</button>
		</view>


	</view>
</template>
<script>
	import {
		getOpenId,
	} from '@/utils/storage.js';
	import util from '@/utils/scert.js'
	export default {
		name: '',
		components: {},
		data() {
			return {
				formData: {
					openid: '',
					trueName: '', //真实姓名
					idNo: '', //身份证号
					gender: '', //性别 0:男  1:女
					bornTime: '', //出生日期
					address: '', //户籍地址

				},
				date: '请选择时间'
			};
		},

		computed: {},
		created() {
			this.formData.openid = getOpenId().openid || ''
		},
		methods: {
			RadioChange(e) {
				this.formData.gender = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
				this.formData.bornTime=e.detail.value
				console.log(this.date);
			},
			//表单校验
			validate() {
				if (!this.formData.trueName) {
					uni.showModal({
						title: "提示",
						content: '请输入真实姓名',
						showCancel: false,
					});
					return
				}
				if (!this.formData.idNo) {
					uni.showModal({
						title: "提示",
						content: '请输入身份证号',
						showCancel: false,
					});
					return
				}
				if (!this.formData.gender) {
					uni.showModal({
						title: "提示",
						content: '请选择性别',
						showCancel: false,
					});
					return
				}
				if (!this.formData.bornTime) {
					uni.showModal({
						title: "提示",
						content: '请输入出生日期',
						showCancel: false,
					});
					return
				}
				if (!this.formData.address) {
					uni.showModal({
						title: "提示",
						content: '请输入地址',
						showCancel: false,
					});
					return
				}

				return true
			},

			authHandle() {
				if (!this.validate()) return
				let params = JSON.parse(JSON.stringify(this.formData))
				this.$cloud({
					name: "authData",
					data: {
						...params
					}
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: "认证成功！"
						});
						setTimeout(() => {
							this.formData = {}
							uni.navigateBack({
								delta: 1
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


		}

	};
</script>

<style lang="scss" scoped>
	.login-container {
		margin: 30rpx 50rpx;

		.cu-form-group {
			border-radius: 20rpx;
		}

		.title {
			width: 138rpx;
		}

		.radioGroup {
			margin-right: 60rpx;
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


		}

		.goRegister {
			margin-top: 40rpx;
		}
	}
</style>
