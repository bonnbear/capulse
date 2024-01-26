
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
    var uploadedDataURL = "/asset/get/s/data-1602465184603-MDCI9F57V.json";
    var geoCoordMap = {
      广州市: [113.507649675, 23.3200491021],
      东莞市: [113.863433991, 22.9430238154],
      中山市: [113.422060021, 22.5451775145],
      云浮市: [111.750945959, 22.9379756855],
      佛山市: [113.034025635, 23.0350948405],
      惠州市: [114.41065808, 23.1135398524],
      揭阳市: [116.079500855, 23.3479994669],
      梅州市: [116.126403098, 24.304570606],
      汕头市: [116.588650288, 23.2839084533],
      汕尾市: [115.572924289, 22.9787305002],
      江门市: [112.678125341, 22.2751167835],
      河源市: [114.913721476, 23.9572508505],
      深圳市: [114.025973657, 22.5960535462],
      清远市: [113.040773349, 23.9984685504],
      湛江市: [110.165067263, 21.2574631038],
      潮州市: [116.830075991, 23.7618116765],
      珠海市: [113.262447026, 22.1369146461],
      肇庆市: [112.37965337, 23.5786632829],
      茂名市: [110.931245331, 21.9682257188],
      阳江市: [111.777009756, 21.9715173045],
      韶关市: [113.594461107, 24.8029603119]
    }
    var customerBatteryCityData = [
        {name: "阳江市", value: 2},
        {name: "茂名市", value: 2},
        {name: "广州市", value: 181},
        {name: "河源市", value: 9},
        {name: "湛江市", value: 8},
        {name: "潮州市", value: 48},
        {name: "东莞市", value: 15},
        {name: "深圳市", value: 137},
        {name: "清远市", value: 9},
        {name: "韶关市", value: 5},
        {name: "云浮市", value: 2},
        {name: "惠州市", value: 13},
        {name: "汕头市", value: 76},
        {name: "揭阳市", value: 13},
        {name: "中山市", value: 9},
        {name: "肇庆市", value: 6},
        {name: "珠海市", value: 29},
        {name: "汕尾市", value: 4},
        {name: "江门市", value: 7},
        {name: "梅州市", value: 9},
        {name: "佛山市", value: 24}
    ]
    $.getJSON(uploadedDataURL, function(geoJson) {
        echarts.registerMap('guangdong', geoJson);
        option = {
            backgroundColor: '#131C38',
            tooltip: {
                // borderWidth: 0,
                trigger: 'item',
                show: true,
                enterable: true,
                textStyle:{
                    fontSize:20,
                    color: '#fff'
                },
                backgroundColor: 'rgba(0,2,89,0.8)',
                formatter: '{b}<br />{c}'
            },
            geo: [
              {
                map: 'guangdong',
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: 1.2, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                itemStyle: {
                  normal: {
                    areaColor: {
                      type: 'linear-gradient',
                      x: 0,
                      y: 400,
                      x2: 0,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                      }],
                      global: true // 缺省为 false
                    },
                    borderColor: '#4ecee6',
                    borderWidth: 1
                  },
                  emphasis: {
                    areaColor: {
                      type: 'linear-gradient',
                      x: 0,
                      y: 300,
                      x2: 0,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(37,108,190,1)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(15,169,195,1)' // 50% 处的颜色
                      }],
                      global: true // 缺省为 false
                    }
                  }
                },
                emphasis: {
                  itemStyle: {
                    areaColor: '#0160AD'
                  },
                  label: {
                    show: 0,
                    color: '#fff'
                  }
                },
                zlevel: 3
              },
              {
                map: 'guangdong',
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: 1.2, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(192,245,249,.6)',
                    borderWidth: 2,
                    shadowColor: '#2C99F6',
                    shadowOffsetY: 0,
                    shadowBlur: 120,
                    areaColor: 'rgba(29,85,139,.2)'
                  }
                },
                zlevel: 2,
                silent: true
              },
              {
                map: 'guangdong',
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: 1.2, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '51.5%'],
                itemStyle: {
                  // areaColor: '#005DDC',
                  areaColor: 'rgba(0,27,95,0.4)',
                  borderColor: '#004db5',
                  borderWidth: 1
                },
                zlevel: 1,
                silent: true
              }
            ],
            series: [
              {
                geoIndex: 0,
                // coordinateSystem: 'geo',
                showLegendSymbol: true,
                type: 'map',
                roam: true,
                label: {
                  normal: {
                    show: false,
                    textStyle: {
                      color: '#fff'
                    }
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
    
                itemStyle: {
                  normal: {
                    borderColor: '#2ab8ff',
                    borderWidth: 1.5,
                    areaColor: '#12235c'
                  },
                  emphasis: {
                    areaColor: '#2AB8FF',
                    borderWidth: 0,
                    color: 'red'
                  }
                },
                map: 'guangdong', // 使用
                data: customerBatteryCityData
                // data: this.difficultData //热力图数据   不同区域 不同的底色
              },
              {
                type: 'lines',
                zlevel: 5,
                effect: {
                  show: false,
                  // period: 4, //箭头指向速度，值越小速度越快
                  // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                  // symbol: 'arrow', //箭头图标
                  // symbol: imgDatUrl,
                  symbolSize: 5 // 图标大小
                },
                lineStyle: {
                  width: 17, // 尾迹线条宽度
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgb(199,145,41)' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: 'rgb(199,145,41)' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: 'rgb(223,176,32)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgb(223,176,32)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgb(199,145,41)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  opacity: 1, // 尾迹线条透明度
                  curveness: 0 // 尾迹线条曲直度
                },
                label: {
                  show: 0,
                  position: 'end',
                  formatter: '245'
                },
                silent: true,
                data: lineData()
              },
              {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 5,
                label: {
                  show: false,
                  position: 'bottom',
                  formatter: (params) => this.data[params.dataIndex].value,
                  padding: [4, 8],
                  backgroundColor: '#003F5E',
                  borderRadius: 5,
                  borderColor: '#67F0EF',
                  borderWidth: 1,
                  color: '#67F0EF'
                },
                symbol: 'diamond',
                symbolSize: [17, 8],
                itemStyle: {
                  color: '#ffd133',
                  opacity: 1
                },
                silent: true,
                data: scatterData()
              },
              {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 4,
                label: {
                  formatter: '{b}',
                  position: 'bottom',
                  color: '#fff',
                  fontSize: 12,
                  distance: 10,
                  show: true
                },
                symbol: 'diamond',
                symbolSize: [17, 8],
                itemStyle: {
                  // color: '#F7AF21',
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgb(199,145,41)' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: 'rgb(199,145,41)' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: 'rgb(223,176,32)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgb(223,176,32)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgb(199,145,41)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  opacity: 1
                  // shadowColor: '#fff',
                  // shadowBlur: 5,
                  // shadowOffsetY: 2
                },
                silent: true,
                data: scatterData2()
              }
              // {
              //   type: 'effectScatter',
              //   coordinateSystem: 'geo',
              //   geoIndex: 0,
              //   symbol: 'circle',
              //   symbolSize: 4,
              //   showEffectOn: 'render',
              //   rippleEffect: {
              //     brushType: 'fill',
              //     scale: 10
              //   },
              //   hoverAnimation: true,
              //   label: {
              //     // formatter: (p) => {
              //     //   console.log(p, 99999)
              //     //   return p.data[2]
              //     // },
              //     formatter: '{b}',
              //     position: 'bottom',
              //     color: '#fff',
              //     fontSize: 14,
              //     distance: 10,
              //     show: true
              //   },
              //   itemStyle: {
              //     color: '#bacac6'
              //   },
              //   zlevel: 5,
              //   data: this.scatterData2
              // }
            ]
          }
       myChart.setOption(option);
    })

      
    // 动态计算柱形图的高度（定一个max）
    function lineMaxHeight () {
        const maxValue = Math.max(...customerBatteryCityData.map(item => item.value))
        return 0.9/maxValue
    }
        // 柱状体的主干
    function lineData () {
        return customerBatteryCityData.map((item) => {
          return {
            coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()]]
          }
        })
    }
    // 柱状体的顶部
    function scatterData () {
        return customerBatteryCityData.map((item) => {
          return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()]
        })
    }
    // 柱状体的底部
    function scatterData2 () {
        return customerBatteryCityData.map((item) => {
          return {
            name: item.name,
            value: geoCoordMap[item.name]
          }
        })
    }
