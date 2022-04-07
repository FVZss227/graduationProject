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

		<view class="c-title" style="margin-top: 30upx;">核酸检测信息</view>
		<view class="cu-form-group">
			<view class="title">核酸名称(Vaccine):</view>
			<input :value="hsDetail.hsName" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检测类型:</view>
			<input :value="hsDetail.hsType" disabled></input>
		</view>


		<view class="c-title" style="margin-top: 30upx;">预约信息</view>
		<view class="cu-form-group">
			<view class="title">检测地点:</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择检测地点'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">预约时间:</view>
			<picker class="" mode="date" :value="date" start="2022-01-01" end="2023-10-01" @change="DateChange">
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
				hsDetail: {
					openid:"",
					hsType: '咽拭子', //检测类型
					hsName: '新冠单采', //疫苗名称,
					hsDate:'', //检测时间
					hsAddress:'' //检测地点
				},
				date: '请选择时间',
				index: -1,
				picker: ['东南校区体育馆二楼', '青年公寓大厅', '西北校区实训大楼一楼'],
			}
		},
		onLoad(option) {
			if (option) {
				let params=JSON.parse(option.userInfo)
				console.log(params);
				this.hsDetail.openid=getOpenId().openid
				this.hsDetail.trueName=params.trueName
				this.hsDetail.idNo=params.idNo
				this.hsDetail.hsName=params.type=='personal'?'核酸检测单检':'核酸检测混检'
			}
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
				this.hsDetail.hsDate = e.detail.value
				console.log(this.date);
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.hsDetail.hsAddress = this.picker[this.index]
			},
			validate(){
				if(!this.hsDetail.hsDate){
					uni.showToast({
						title: "请选择检测时间！",
					});
					return
				}
				if(!this.hsDetail.hsAddress){
					uni.showToast({
						title:'请选择检测地点'
					})
					return
				}
				return true
			},
			submitAppoinment() {
				if(!this.validate()) return
				this.$cloud({
					name: "hsAppoinment",
					data: {
						...this.hsDetail
					}
				}).then(res => {
					console.log(res, 'wwxxxxxxxxxxxxx');
					
					if(res.code==0){
			
						uni.showModal({
							title: "提示",
							content: res.msg,
							showCancel: false,
						});
						uni.navigateBack({
							delta:1
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
