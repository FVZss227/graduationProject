/**
* author: Zhangys
* description: 疫苗预约详情
* @createTime: 2022-05-05 13:20:47
*/
<template>
	<view class="container">
		<view class="c-title">用户信息</view>
		<view class="cu-form-group">
			<view class="title">用户名称:</view>
			<input :value="ymDetail.trueName" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">证件号:</view>
			<input :value="ymDetail.idNo" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号:</view>
			<input :value="ymDetail.phone" disabled></input>
		</view>
		<view class="c-title" style="margin-top: 30upx;">疫苗信息</view>
		<view class="cu-form-group">
			<view class="title">疫苗名称(Vaccine):</view>
			<input :value="ymDetail.ymName" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">疫苗类型:</view>
			<input :value="ymDetail.ymType" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">剂次:</view>
			<input :value="ymDetail.ymNumber" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">接种位置:</view>
			<input :value="ymDetail.injectPlace" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产时间:</view>
			<input placeholder="用户编号" :value="ymDetail.created_time" disabled></input>
		</view>

		<view class="c-title" style="margin-top: 30upx;">预约信息</view>
		<view class="cu-form-group">
			<view class="title">接种地点:</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择接种地点'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">预约时间:</view>
			<picker class="" mode="date" :value="date" start="1900-01-01" end="2022-10-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="loing_btn g-flex g-flex-center">
			<button class="cu-btn" @click="submitAppoinment">
				<text>
					提交预约
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
				ymDetail: {
					trueName: "",
					idNo: '',
					phone: "",
					ymType: '科兴', //疫苗类型
					ymName: '新冠疫苗(Vero细胞)', //疫苗名称
					injectPlace: "左臂", //接种位置
					ymNumber: '', //剂次
					created_time: '2022.05.05', //生产时间
					injectAddress: "", //接种地点
					injectDate: '', //接种时间
					openid: '',
					type: 'ym',
					status: '0'
				},

				date: '请选择时间',
				index: -1,
				picker: ['东南校区体育馆二楼', '青年公寓大厅', '西北校区实训大楼一楼'],
			}
		},
		onLoad(option) {
			if (option) {
				let params = JSON.parse(option.userInfo)
				console.log(params);
				this.ymDetail.openid = getOpenId().openid
				this.ymDetail.trueName = params.trueName
				this.ymDetail.idNo = params.idNo
				this.ymDetail.phone = params.phone
				this.ymDetail.ymNumber = params.type == '1' ? '第一针' : (params.type == '2' ? '第二针' : '第三针（加强针）')
			}
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
				this.ymDetail.injectDate = e.detail.value
				console.log(this.date);
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.ymDetail.injectAddress = this.picker[this.index]
			},
			validate() {
				if (!this.ymDetail.injectDate) {
					uni.showModal({
						title: "提示",
						content: '请选择接种时间',
						showCancel: false,
					});
					return
				}
				if (!this.ymDetail.injectAddress) {
					uni.showModal({
						title: "提示",
						content: '请选择接种地点',
						showCancel: false,
					});
					return
				}
				return true
			},
			//提交预约
			submitAppoinment() {
				if (!this.validate()) return
				this.$cloud({
					name: "ymAppoinment",
					data: {
						...this.ymDetail
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
