
myChart.on("georoam", function(params) {
					var option = myChart.getOption(); //获得option对象
					if (params.zoom != null && params.zoom != undefined) {
						//捕捉到缩放时
						let mo = option.geo[0].zoom
						option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
						option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
						// 改变标记点随地图放大缩小
						// console.log(option.series)
						let size = option.series[0].zoom/mo
						if(option.series[0].zoom>mo){
							// console.log(option.series)
							option.series[2].symbolSize = [option.series[2].symbolSize[0]*size,option.series[2].symbolSize[1]*size]
							option.series[1].symbolSize=option.series[1].symbolSize*size
							option.series[1].label.fontSize=option.series[1].label.fontSize*size
						}else{
							option.series[2].symbolSize = [option.series[2].symbolSize[0]*size,option.series[2].symbolSize[1]*size]
							option.series[1].symbolSize = option.series[1].symbolSize*size
							option.series[1].label.fontSize = option.series[1].label.fontSize*size
						}
						// 改变标记点end
					} else {
						//捕捉到拖曳时
						option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
					}
					// myChart.dispatchAction({ //来用程序主动渲染选框
					// 	type: "restore",
					// });
					myChart.setOption(option); //设置option

————————————————
版权声明：本文为CSDN博主「另一个自己IT」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_46408500/article/details/128282213
geo: [
    {
        // 其他配置...
        animationDurationUpdate: 0
    },
    // 其他 geo 层...
]
