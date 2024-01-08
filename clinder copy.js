var option = {
   backgroundColor: 'rgba(0,0,0,0)',
   tooltip: {
       trigger: 'axis',
       backgroundColor: "rgba(1, 13, 19, 0.5)",
       borderWidth: 0,
       axisPointer: { // 坐标轴指示器，坐标轴触发有效
           type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
       },
       textStyle: {
           color: "rgba(212, 232, 254, 1)",
           // fontSize: fontChart(0.24),
       },
       confine: true
   },
   grid: {
       top: '25%',
       left: '5%',
       right: '5%',
       bottom: '8%',
       containLabel: true,
   },

   xAxis: {
       type: 'category',
       show: true,
       data: ['考勤', '技能达标', '参与度', '贡献度'],
       axisLine: {
           lineStyle: {
               color: "#fff"
           }
       },
       axisTick: {
           show: false
       },
       axisLabel: {
           // interval: 0,
           // rotate: 40,
           show: true,
           textStyle: {
               fontFamily: 'Microsoft YaHei',
               color: '#fff'
           }
       },
   },

   yAxis: {
       name: '(100%)',
       show: true,
       nameTextStyle: {
           color: "#fff",
           fontFamily: "Alibaba PuHuiTi",
           fontSize: 11,
           fontWeight: 400,
           padding: [0, 0, -10, -30]
       },
       nameGap: 25,  // 表现为上下位置
       type: 'value',
       //max:'5000',
       splitLine: {
           show: false,
           lineStyle: {
               color: '#eff6ff'
           }
       },
       axisTick: {

       },
       axisLine: {
           // 显示y轴
           show: true,
           lineStyle: {
               color: "#fff",
           },
           // onZero: false,
           // symbol:['rect','rect'], // 表示Y轴起始位子设置为块装
           // symbolSize:[1,30]       // 表示延伸位置宽度为 1px ,延伸长度为100px

       },
       axisLabel: {
           show: true,
           textStyle: {
               fontFamily: 'Microsoft YaHei',
               color: '#fff',
               fontSize: 11,

           },
           // interval:2
       }
   },
   series: [{
       name: '课中学习情况',
       type: 'bar',
       barWidth: '25',
       stack: 'chart',
       showBackground: true,
       backgroundStyle: {
           color: '#5A85B5'
       },
       barWidth: 15,
       itemStyle: {
           normal: {
               // 柱子的颜色
               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                   // 进度是0的时候柱子颜色
                   offset: 0,
                   color: '#2a77ea'
               }, {
                   // 进度是100%的时候
                   offset: 1,
                   color: '#01DCD6'
               }]),

           },

       },
       // 鼠标放到柱子上显示数据
       tooltip: {
           valueFormatter: function (value) {
               return value + '%';
           }
       },
       // 数据在柱子上方显示
       label: {
           show: true, //开启显示
           position: 'top', //在上方显示
           textStyle: {
               color: '#3b6ebf',
               fontSize: 12,
               fontWeight: 400,
           },
           //数值样式
           formatter: '{c}%',
       },
       data: [100, 95, 95, 95]
   },
   ]
};


nameTextStyle 属性用于设置坐标轴名称的文本样式。除了之前提到的 color、fontFamily、fontSize、fontWeight 和 padding 之外，nameTextStyle 还可以包含其他样式设置，例如：

align: 设置文本的水平对齐方式，可以是 'left'、'center' 或 'right'。
verticalAlign: 设置文本的垂直对齐方式，可以是 'top'、'middle' 或 'bottom'。
textBorderColor: 设置文本的边框颜色。
textBorderWidth: 设置文本的边框宽度。
textBorderType: 设置文本的边框类型，例如 'solid'、'dashed' 或 'dotted'。
textShadowColor: 设置文本的阴影颜色。
textShadowBlur: 设置文本的阴影模糊程度。
textShadowOffsetX: 设置文本阴影的水平偏移量。
textShadowOffsetY: 设置文本阴影的垂直偏移量。
这些属性可以进一步定制坐标轴名称的文本样式，以满足特定的设计需求。




textStyle: 用于设置文本的样式，包括颜色、字体、字号、字重等。
lineStyle: 用于定义线条的样式，可以设置线条的颜色、宽度、类型等。
itemStyle: 用于设置图表元素的样式，比如柱状图、折线图等元素的颜色、透明度等。
label: 用于控制标签的显示和样式。
areaStyle: 用于设置区域的填充样式，适用于面积图等。
splitLine: 用于控制坐标轴的分隔线样式。
axisLine: 用于设置坐标轴线的样式，包括颜色、宽度等。
axisLabel: 用于设置坐标轴刻度标签的样式，包括颜色、字体、间隔等。





const data = [
   { name: '原料11111', value: 0 },
   { name: '原料222222', value: 100 },
   { name: '原料333333', value: 150 },
   { name: '原料44444', value: 200 },
   { name: '原料55555', value: 500 },
   { name: '原料55556', value: 550 },
   { name: '原料77777', value: 1000 },
]


// 底部立体柱子
let bottomBar = data.map((item, index) => {
   return {
      value: item.value,
      itemStyle: {
         normal: {
            color: {
               x: 0,
               y: 0,
               x2: 0,
               y2: 1,
               type: 'linear',
               global: false,
               colorStops: [
                  {
                     offset: 0,
                     color: 'rgba(23, 131, 246,.7)',
                  },
                  {
                     offset: 0.5,
                     color: 'rgba(8, 97, 131,.7)',
                  },
                  {
                     offset: 0.99,
                     color: 'rgba(3, 57, 110,.7)',
                  },
                  {
                     offset: 1,
                     color: 'rgba(3, 57, 110,0)',
                  },
               ],
            },
         },
      },
   };
});
// 中间圆片
let middleCircle = data.map((item, index) => {
   return {
      name: '',
      value: item.value,
      symbolPosition: 'end',
      symbolSize: item.value === 0 ? 0 : [40, 8], // 当数值为0时，消失
      itemStyle: {
         color: 'rgba(83, 232, 240)',
      },
   };
});

option = {
   backgroundColor: 'rgba(0, 55, 107)',
   tooltip: {
      trigger: 'axis',
      axisPointer: {
         type: 'none'
      },
      backgroundColor: 'rgba(1, 65, 122,0.5)',
      borderWidth: 0,
      padding: 5,
      textStyle: {
         color: 'rgba(255,255,255)',
         fontSize: 18,
      },
      formatter: function (item) {
         return `<div style="position: relative;padding-left:20px"><div style="position: absolute;left:3px;top:50%;transform: translateY(-50%);width:2px;height:33px;background-color:rgba(28, 205, 255)"></div>${item[0].name} </br> 日产量:  ${item[0].value} kg </div>`
      },
   },
   grid: {
      bottom: '10%',
      top: '20%',
      right: '10%',
      left: '10%',
      containLabel: false, // 让图表内容完全显示，并且在 4 边留下边距。
      axisPointer: {
         shadowStyle: {
            color: 'rgba(135, 206, 235, 0.5)',
         },
      },
   },
   xAxis: {
      type: 'category',
      boundaryGap: true,//两侧留白
      axisLine: {
         lineStyle: {
            color: 'rgba(2, 119, 175)',
            width: 2,
            type: 'solid',
         },
         show: true,
         onZero: false // 将 x 轴坐标轴置于最低刻度上
      },
      axisPointer: {
         show: true, // 显示坐标轴指示器
         type: 'none', // shadow设置为阴影类型
         snap: true,
         label: {
            show: false // 不显示文本标签
         },
         shadowStyle: {
            color: 'rgba(12, 116, 166,.5)', // 设置阴影颜色
         }
      },
      axisLabel: {
         interval: 0,
         color: 'rgba(255,255,255)', //更改坐标轴文字颜色
         fontSize: 12, //更改坐标轴文字大小
         margin: 20
      },
      axisTick: {
         show: true,
         alignWithLabel: true,
         lineStyle: {
            color: 'rgba(2, 119, 175)', // 刻度线颜色
            width: 2, // 刻度线宽度
         },
         length: 6, // 刻度线的长度
      },
      data: data.map(v => v.name)
   },
   yAxis: {
      // name: '温度',
      type: 'value',
      min: "0",
      // max: 100,
      splitLine: {
         interval: 0,
         show: true, // 开启分割线
         lineStyle: {
            color: 'rgba(6, 88, 142)',
            width: 2,
            type: [6, 3],
         },
      },
      axisTick: {
         show: false
      },
      axisLine: {
         show: false
      },
      axisLabel: {
         color: 'rgba(207, 219, 230)'
      },
   },
   series: [
      //底部立体柱
      {
         z: 30,
         stack: '1',
         type: 'bar',
         silent: true,
         barWidth: 40,
         data: bottomBar,
         label: {
            show: true, // 显示标签
            position: 'top', // 标签位置
            color: 'rgba(255, 255, 255)', // 标签颜色
            textStyle: {
               color: 'rgba(28, 205, 255)', // 标签颜色
               fontStyle: 'normal', // 字体风格
               fontWeight: 'normal', // 字体粗细
               fontFamily: 'sans-serif', // 字体系列
               fontSize: 12, // 字体大小
               lineHeight: 24, // 行高
            },
         },
         itemStyle: {
            color: '#000',
            emphasis: {
               // 普通图表的高亮颜色
               // color: 'rgba(38, 207, 254)',
               color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [
                     {
                        offset: 0,
                        color: 'rgba(38, 207, 254,.7)',
                     },
                     {
                        offset: 0.5,
                        color: 'rgba(18, 151, 173,.7)',
                     },
                     {
                        offset: 0.99,
                        color: 'rgba(3, 57, 110,.7)',
                     },
                     {
                        offset: 1,
                        color: 'rgba(3, 57, 110,0)',
                     },
                  ],
               },
               borderWidth: 1,
               borderColor: 'rgba(70, 215, 255)'
            }
         },
      },
      // 中间圆片
      {
         name: '',
         z: 100,
         type: 'pictorialBar',
         symbolSize: [40, 10],
         symbolOffset: [0, -5],
         data: middleCircle,
      },
   ],
};



var liftMonthDtoList=[
   {month:1,thisYear:30,lastYear:33},
   {month:2,thisYear:32,lastYear:38},
   {month:3,thisYear:31,lastYear:30},
   {month:4,thisYear:30,lastYear:36},
]
var data=[],year=[],lastYear=[];
liftMonthDtoList.forEach((item) => {
   data.push(item.month + "月");
   year.push(Number(item.thisYear).toFixed(2));
   lastYear.push(Number(item.lastYear).toFixed(2));
 })
 option = {
   backgroundColor: '#000',
   tooltip: {
     trigger: 'axis',
     axisPointer: {
       type: 'shadow'
     }
   },
   grid: {
     top: '14%',
     right: '3%',
     left: '7%',
     bottom: '20%'
   },
   legend: {
     top: '-3%',
     itemWidth: 10,
     itemHeight: 10,
     textStyle: {
       color: "#ffffff",
       fontSize: 15
     },
     data: ['用水量', '去年同期'],

   },
   xAxis: [{
     type: 'category',
     data: data,
     axisLine: {
       lineStyle: {
         color: 'rgba(255,255,255,1)'
       }
     },
     axisLabel: {
       margin: 10,
       color: '#e2e9ff',
     },
   }],
   yAxis: [{
     name: '万m³',
     boundaryGap: ['0%', '20%'],
     nameTextStyle: {
       verticalAlign: 'middle',
       align: "right"
     },
     axisLabel: {
       formatter: '{value}',
       color: '#e2e9ff',
     },
     axisLine: {
       show: false,
       lineStyle: {
         color: 'rgba(255,255,255,1)'
       }
     },
     splitLine: {
       lineStyle: {
         color: 'rgba(255,255,255,0.12)'
       }
     }
   }],
   series: [{
     name: "用水量",
     type: 'bar',
     data: year,
     barWidth: '12px',
     itemStyle: {
       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
         offset: 0,
         color: 'rgba(4, 187, 255, 1)' // 0% 处的颜色
       }, {
         offset: 1,
         color: 'rgba(4, 187, 255, 1)' // 100% 处的颜色
       }], false),
       borderRadius: [5, 5, 0, 0],
       shadowColor: 'rgba(0,160,221,1)',
       shadowBlur: 4,
     }
   }, {
     name: "去年同期",
     type: 'bar',
     data: lastYear,
     barWidth: '12px',
     itemStyle: {
       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
         offset: 0,
         color: 'rgba(250, 201, 87, 1)' // 0% 处的颜色
       }, {
         offset: 1,
         color: 'rgba(250, 201, 87, 1)' // 100% 处的颜色
       }], false),
       borderRadius: [5, 5, 0, 0],
       shadowColor: 'rgba(0,160,221,1)',
       shadowBlur: 4,
     }
   }]
 };


 User
option = {
  // ... 其他配置
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    axisLabel: {
      formatter: function (value) {
        if (value === 'B') {
          return '{a|' + value + '}';
        } else {
          return value;
        }
      },
      rich: {
        a: {
          color: 'red',
          fontSize: 14,
          // 其他样式设置
        }
      }
    },
    // 其他 xAxis 相关配置
  },
  // ... 其他配置
}; 可以这么设置吗 有相关说明吗





var liftMonthDtoList=[
   {month:1,thisYear:30,lastYear:33},
   {month:2,thisYear:32,lastYear:38},
   {month:3,thisYear:31,lastYear:30},
   {month:4,thisYear:30,lastYear:36},
]
var data=[],year=[],lastYear=[];
liftMonthDtoList.forEach((item) => {
   data.push(item.month + "月");
   year.push(Number(item.thisYear).toFixed(2));
   lastYear.push(Number(item.lastYear).toFixed(2));
 })
 option = {
   backgroundColor: '#000',
   tooltip: {
     trigger: 'axis',
  axisPointer: {
         show: true,
         type: 'shadow',
         label: {
             show: true,
             formatter: function (params) {
                 return params.value;
             },
             // 当前选中时的标签样式
             color: 'red' ,
             backgroundColor:'red'
         }
     }
   },
   grid: {
     top: '14%',
     right: '3%',
     left: '7%',
     bottom: '20%'
   },
   legend: {
     top: '-3%',
     itemWidth: 10,
     itemHeight: 10,
     textStyle: {
       color: "#ffffff",
       fontSize: 15
     },
     data: ['用水量', '去年同期'],

   },
   xAxis: [{
     type: 'category',
     data: data,
     axisLine: {
       lineStyle: {
         color: 'rgba(255,255,255,1)'
       }
     },
     axisLabel: {
       margin: 10,
       color: '#e2e9ff',
     },
   }],
   yAxis: [{
     name: '万m³',
     boundaryGap: ['0%', '20%'],
     nameTextStyle: {
       verticalAlign: 'middle',
       align: "right"
     },
     axisLabel: {
       formatter: '{value}',
       color: '#e2e9ff',
     },
     axisLine: {
       show: false,
       lineStyle: {
         color: 'rgba(255,255,255,1)'
       }
     },
     splitLine: {
       lineStyle: {
         color: 'rgba(255,255,255,0.12)'
       }
     }
   }],
   series: [{
     name: "用水量",
     type: 'bar',
     data: year,
     barWidth: '12px',
     itemStyle: {
       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
         offset: 0,
         color: 'rgba(4, 187, 255, 1)' // 0% 处的颜色
       }, {
         offset: 1,
         color: 'rgba(4, 187, 255, 1)' // 100% 处的颜色
       }], false),
       borderRadius: [5, 5, 0, 0],
       shadowColor: 'rgba(0,160,221,1)',
       shadowBlur: 4,
     }
   }, {
     name: "去年同期",
     type: 'bar',
     data: lastYear,
     barWidth: '12px',
     
     itemStyle: {
       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
         offset: 0,
         color: 'rgba(250, 201, 87, 1)' // 0% 处的颜色
       }, {
         offset: 1,
         color: 'rgba(250, 201, 87, 1)' // 100% 处的颜色
       }], false),
       borderRadius: [5, 5, 0, 0],
       shadowColor: 'rgba(0,160,221,1)',
       shadowBlur: 4,
     }
   }]
 };


 label: {
   show: true,
   formatter: function (params) {
       return params.value;
   },
   // 当前选中时的标签样式
   color: 'blue' 
} 还有什么设置项

ChatGPT
在 ECharts 的 label 配置中，除了 show、formatter 和 color 这些基本属性外，还有许多其他设置项可以用来定制标签的外观和行为。以下是一些常见的 label 配置项：

position：设置标签的位置。常用的值包括 'top', 'left', 'right', 'bottom', 'inside', 'insideLeft', 'insideRight', 'insideTop', 'insideBottom', 'insideTopLeft', 'insideBottomLeft', 'insideTopRight', 'insideBottomRight' 等。

distance：设置标签与图表元素（如柱状图的柱子）之间的距离，通常以像素为单位。

rotate：设置标签的旋转角度。值可以是从 -90 到 90 的任意数字，表示旋转的度数。

align：设置文本的水平对齐方式。可能的值有 'left', 'center', 'right'。

verticalAlign：设置文本的垂直对齐方式。可能的值有 'top', 'middle', 'bottom'。

padding：设置标签内边距。可以是一个数字（应用于所有四边），也可以是一个数组 [top, right, bottom, left]。

backgroundColor：设置标签的背景颜色。

borderColor：设置标签边框的颜色。

borderWidth：设置标签边框的宽度。

borderRadius：设置标签边框的圆角大小。

shadowColor：设置标签的阴影颜色。

shadowBlur：设置标签阴影的模糊大小。

shadowOffsetX、shadowOffsetY：设置标签阴影的水平和垂直偏移量。

textStyle：用于设置标签文本的样式，如 fontSize、fontWeight、fontFamily 等。

这些配置项可以组合使用，以实现复杂和精细的标签定制。具体使用哪些配置项取决于您的具体需求和您想要达到的效果。为了更深入地了解这些配置项和它们的具体用法，您可以参考 ECharts 的官方文档，尤其是关于 label 配置的部分。