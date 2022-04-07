<template>
	<view class="detail-container">
		<view class="content-info ">
			<view class="tips-text g-flex g-flex-justify g-flex-align-center" style="height: 80rpx;">
				<view class="">
					报告单看不懂？点这里教你读懂报告单
				</view>
				<text class="cuIcon-pullright"></text>
			</view>
		</view>
		<view class="content-info" style="height: 500rpx;">
			<view class="info-title g-flex g-flex-center">
				检验报告
			</view>
			<view class="info-detail">
				<view class="info-name">
					{{detectionList.username}}
				</view>
				<view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						单号：
					</view>
					<text class="item-text">{{detectionList.no}}</text>
				</view>
				<view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						申请科室：
					</view>
					<text class="item-text">{{detectionList.departMent}}</text>
				</view>
				<view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						申请医生：
					</view>
					<text class="item-text">{{detectionList.applyDr}}</text>
				</view>
				<!-- <view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						检查日期：
					</view>
					<text class="item-text">{{item.detectionTime}}</text>
				</view> -->
				<view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						采样时间：
					</view>
					<text class="item-text">{{detectionList.date}}</text>
				</view>
				<view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						检测时间：
					</view>
					<text class="item-text">{{detectionList.detectionTime}}</text>
				</view>
				<view class="info-item g-flex g-flex-align-center">
					<view class="item-label">
						报告时间：
					</view>
					<text class="item-text">{{detectionList.reportDate}}</text>
				</view>
			</view>
		</view>
		<view class="content-info" style="height: 220rpx;">
			<view class="info-check g-flex g-flex-align-center g-flex-justify">
				<view class="">
					项目
				</view>
				<view class="">
					结果
				</view>
			</view>
			<view class="info-check-name g-flex g-flex-align-center g-flex-justify">
				<view class="">
					{{detectionList.detectionname}}
				</view>
				<view class="">
					{{detectionList.detectionRes}}
				</view>
			</view>
			<view class="info-check-desc g-flex g-flex-align-center">
				<view class="desc-label">
					参考范围：
				</view>
				<text>{{detectionList.detectionRes}}</text>
			</view>
		</view>
		<view class="endtips">
			此报告单仅作参考，以医院实际纸质报告为准
		</view>
	</view>
</template>
<script>
	export default {
		name: '',
		components: {

		},
		data() {
			return {
				detectionList:{}
			}
		},
		onLoad(options) {
			console.log(options);
			// console.log(JSON.parse(options.params));
			this.detectionList=JSON.parse(options.params)
		},
		computed: {
		
		},
		created() {

		},
		methods: {
		
		},
	}
</script>

<style lang='scss' scoped>
	.detail-container {
		.content-info {
			background-color: #fff;
			margin: 20rpx 20rpx;
			border-radius: 10rpx;
			.tips-text {
				color: #eb901a;
				margin: 0 10rpx;
			}
			.info-title {
				font-size: 36rpx;
				font-weight: bold;
				position: relative;
				top: 20rpx;
			}
			.info-detail {
				.info-name {
					margin: 20rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
				.info-item {
					margin: 16rpx;

					.item-label {
						color: #707070;
					}
				}
				.info-item:last-child {
					margin-bottom: 40rpx;
				}
			}
			
			.info-check{
				position: relative;
				top: 20rpx;
				margin: 20rpx 20rpx;
				padding-bottom: 50rpx;
				border-bottom: 1px solid #EEEEEE;
				
			}
			.info-check-name{
				font-weight: bold;
				/* margin: 10rpx 20rpx; */
				margin: 40rpx 20rpx 10rpx 20rpx;
			}
			.info-check-desc{
				color: #7f7f7f;
				margin: 10rpx 20rpx;
			}

		}
		.endtips{
			margin-top: 30rpx;
			font-size: 24rpx;
			text-align: center;
			color: #7f7f7f;
		}
	}
</style>
