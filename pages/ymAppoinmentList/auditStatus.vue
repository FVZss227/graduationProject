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
			<input placeholder="用户编号" :value="ymDetail.injectAddress" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">预约时间:</view>
			<input placeholder="用户编号" :value="ymDetail.injectDate" disabled></input>
		</view>
		
		<view class="c-title" style="margin-top: 30upx;">接种信息</view>
		<view class="cu-form-group">
			<view class="title">实际接种时间:</view>
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
				ymDetail: {
					ymTrueDate:""
				},
				
				date: '请选择时间',
				
			}
		},
		onLoad(option) {
			if (option) {
				let params=JSON.parse(option.params)
				console.log(params);
				this.ymDetail=params
				
			}
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
				this.ymDetail.ymTrueDate = e.detail.value
				console.log(this.date);
			},
			
			validate(){
				if(!this.ymDetail.ymTrueDate){
					uni.showToast({
						title: "请选择实际接种时间！",
						
					});
					return
				}
				return true
			},
			submitAppoinment() {
				if(!this.validate()) return
				this.$cloud({
					name: "changeYmStatus",
					data: {
						ymTrueDate:this.ymDetail.ymTrueDate,
						_id:this.ymDetail._id
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
