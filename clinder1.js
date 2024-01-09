// 地图JSON
const mapJson = '/asset/get/areas_v3/province/130000_full.json'
/**
 * 地图用到的图片等静态数据
 * [{等级关键字: [等级名称, 图例图片, 地图点位默认图片, 地图点位放大图片]}, ...]
 */
const mapInfo = {
    high: [
        '高',
        '//img.isqqw.com/profile/upload/2023/07/28/fc5f5b7f-780f-4f23-803b-59a4b8d1d408.png',
        '//img.isqqw.com/profile/upload/2023/07/28/32d8713d-fffc-4c58-b43a-baf4aed06bd7.png',
        '//img.isqqw.com/profile/upload/2023/07/28/7ec469c8-e823-4970-98d4-74822f4edd8b.png'
    ],
    medium: [
        '中',
        '//img.isqqw.com/profile/upload/2023/07/28/cfc87aa7-4553-47d1-a508-9cf664de8022.png',
        '//img.isqqw.com/profile/upload/2023/07/28/755ff50f-5f42-4358-813c-67c6cb3dc25c.png',
        '//img.isqqw.com/profile/upload/2023/07/28/cf49cc3e-d06c-4faf-9bef-bb6d3377acbd.png'
    ],
    low: [
        '低',
        '//img.isqqw.com/profile/upload/2023/07/28/d263c0bd-7f16-40be-8c80-73f132f87ca9.png',
        '//img.isqqw.com/profile/upload/2023/07/28/1b264347-82a1-41bb-8bec-4563b6bfa9b3.png',
        '//img.isqqw.com/profile/upload/2023/07/28/ba4c559e-54a7-4eb9-be2f-6e6bd1cb4445.png'
    ],
    no: [
        '无',
        '//img.isqqw.com/profile/upload/2023/07/28/8b424dd7-fa23-4a3b-afc0-0d5e84f13888.png',
        '//img.isqqw.com/profile/upload/2023/07/28/4a7c8742-ce3f-442e-b651-402886d4e100.png',
        '//img.isqqw.com/profile/upload/2023/07/28/9c36c5d2-738e-48d5-bf7c-5ae44aeff1a6.png'
    ]
}
/**
 * 地图数据
 * [{value: [点位经度, 点位纬度, 分值, 点位名称, 点位等级关键字]}, ...]
 */
const mapData = [
    {
        value: [114.502461, 38.045474, 99, '石家庄市', 'high']
    },
    {
        value: [118.175393, 39.635113, 88, '唐山市', 'high']
    },
    {
        value: [119.586579, 39.942531, 77, '秦皇岛市', 'high']
    },
    {
        value: [114.490686, 36.612273, 66, '邯郸市', 'high']
    },
    {
        value: [114.508851, 37.0682, 55, '邢台市', 'medium']
    },
    {
        value: [115.482331, 38.867657, 44, '保定市', 'medium']
    },
    {
        value: [114.884091, 40.811901, 33, '张家口市', 'medium']
    },
    {
        value: [117.939152, 40.976204, 22, '承德市', 'low']
    },
    {
        value: [116.857461, 38.310582, 11, '沧州市', 'low']
    },
    {
        value: [116.704441, 39.523927, 0, '天津市和北京市两个直辖市中间的廊坊市', 'no']
    },
    {
        value: [115.665993, 37.735097, -1, '衡水市', 'no']
    }
]
$.getJSON(mapJson, geoJson => {
    // 注册地图-河北省
    echarts.registerMap('HeBei', geoJson);
    option = {
        // 默认背景色
        backgroundColor: '#2e8b57',
        // 视觉映射组件/图例
        visualMap: {
            // 分段型
            type: 'piecewise',
            // 自定义visualMapPiecewise的每一段的范围，以及每一段的文字，以及每一段的特别的样式
            pieces: [
                {
                    // 不指定 max，表示 max 为无限大（Infinity）
                    min: 60,
                    symbol: `image://${mapInfo.high[1]}`,
                    label: mapInfo.high[0]
                },
                {
                    min: 30,
                    max: 60,
                    symbol: `image://${mapInfo.medium[1]}`,
                    label: mapInfo.medium[0]
                },
                {
                    min: 0.01,
                    max: 30,
                    symbol: `image://${mapInfo.low[1]}`,
                    label: mapInfo.low[0]
                },
                {
                    // 不指定 min，表示 min 为无限大（-Infinity）
                    max: 0.01,
                    symbol: `image://${mapInfo.no[1]}`,
                    label: mapInfo.no[0]
                }
            ],
            // 图形的宽度，即每个小块的宽度
            itemWidth: 15,
            // 图形的高度，即每个小块的高度
            itemHeight: 21,
            // 不选中状态默认图片
            itemSymbol: `image:////img.isqqw.com/profile/upload/2023/07/28/575e0609-057f-4602-9516-1d9d909db748.png`,
            // 指定组件中图形（比如小方块）和文字的摆放关系,图形在左文字在右
            align: 'left',
            // 每两个图元之间的间隔距离，单位为px
            itemGap: 20,
            // 是否显示 visualMap-piecewise 组件。如果设置为 false，不会显示，但是数据映射的功能还存在
            show: true,
            // 指定用数据(series.data)的哪个维度，映射到视觉元素上。可以把 series.data 理解成一个二维数组，其中每个列是一个维度，默认取 data 中最后一个维度
            dimension: 2,
            // 指定取哪个系列的数据
            seriesIndex: 0,
            z: 99,
            // 离容器左侧的距离
            left: 20,
            // 离容器下侧的距离
            top: 20,
            textStyle: {
                // 文字的颜色
                color: '#fff',
                fontSize: 18
            }
        },
        // 必须有，否则点位提示不显示；但是如果定义在这里，地图块也会显示提示
        tooltip: {},
        geo: [
            {
                map: `HeBei`,
                // 开启缩放和平移
                roam: true,
                // 滚轮缩放的极限控制
                scaleLimit: {
                    min: 0.8,
                    max: 50
                },
                // 图形上的文本标签
                label: {
                    show: false
                },
                // 地图普通状态样式
                itemStyle: {
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    areaColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 700,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#1858b4' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#1fcdff' // 100% 处的颜色
                            }
                        ],
                        global: true // 整体渐变，缺省为 false，区块渐变
                    },
                    borderWidth: 1,
                    borderColor: '#00dcfe'
                },
                // 地图区块高量状态
                emphasis: {
                    disabled: true,
                    label: {
                        show: false
                    },
                    itemStyle: {
                        areaColor: null
                    }
                },
                z: 2,
                // 点位提示
                tooltip: {
                    show: true,
                    // 将 tooltip 框限制在图表的区域内
                    confine: true,
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderWidth: 0,
                    padding: 0,
                    formatter: params => {
                        let arr = params?.value ?? [];
                        if (Array.isArray(arr) && arr.length > 0) {
                            let myName = arr[3];
                            if (myName.length > 9) {
                                // 地图点位提示框内点位名称可换行，最多两行
                                let _s = 9;
                                if (myName.length > 18) {
                                    _s = Math.ceil(myName.length / 2);
                                }
                                let n1 = myName.substring(0, _s);
                                let n2 = myName.substring(_s);
                                myName = `${n1}<br/>${n2}`;
                            }
                            // 风险等级对应字体颜色
                            let riskColor = '';
                            if (arr[4] == 'high') {
                                riskColor = '#ff8000';
                            } else if (arr[4] == 'medium') {
                                riskColor = '#f3bb34';
                            } else if (arr[4] == 'low') {
                                riskColor = '#11c857';
                            } else {
                                riskColor = '#00ffff';
                            }
                            // 可在JS文件单独引入CSS文件(import 'xx.css';)，这里把CSS文件里定义的样式复制到style
                            let html = `<div class="custom-tooltip-box" style="width: 214px;height: 134px;font-size: 18px;padding: 20px;box-sizing: border-box;background-image: url('//img.isqqw.com/profile/upload/2023/07/28/be32d7e7-9051-4285-bab3-7be0cb2e4b3a.png');background-size: 100% 100%;">`;
                            html += `<div class="title" style="font-size: 20px;color: #fff;line-height: 25px;">${myName}</div>`;
                            html += `<div class="row" style="margin-top: 6px;">`;
                            html += `<span class="label" style="font-size: 18px;color: #fff;margin-right: 10px;">等级</span>`;
                            html += `<span style="color: ${riskColor}; font-size: 18px;" class="content">${mapInfo[arr[4]][0]}</span>`;
                            html += `</div>`;
                            html += `<div class="row" style="margin-top: 6px;">`;
                            html += `<span class="label" style="font-size: 18px;color: #fff;margin-right: 10px;">分数</span>`;
                            html += `<span style="color: ${riskColor}; font-size: 18px;" class="content">${Number(arr[2]).toString()}</span>`;
                            html += `</div>`;
                            html += `</div>`;
                            return html;
                        }
                    },
                    // 提示框浮层的位置，让提示框在鼠标正上方或正下方
                    position: (point, params, dom, rect, size) => {
                        // 当前鼠标位置
                        let pointX = point[0];
                        let pointY = point[1];
                        // 提示框大小
                        let boxWidth = size.contentSize[0];
                        let boxHeight = size.contentSize[1];
                        let x = pointX - boxWidth / 2; // X坐标位置
                        let y = 0; // Y坐标位置
                        // boxHeight > pointY 说明鼠标上边放不下提示框
                        if (boxHeight > pointY) {
                            y = pointY + 40;
                        } else {
                            y = pointY - boxHeight - 40;
                        }
                        return [x, y];
                    }
                }
            },
            {
                // 2层地图，实现阴影效果
                map: `HeBei`,
                // 开启缩放和平移
                roam: true,
                // 控制缩放
                scaleLimit: {
                    min: 0.8,
                    max: 20
                },
                // 图形上的文本标签
                label: {
                    show: false
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: '#217cc7',
                    borderWidth: 0,
                    shadowColor: '#217cc7',
                    shadowBlur: 1,
                    shadowOffsetX: 10,
                    shadowOffsetY: 15
                },
                emphasis: {
                    label: {
                        show: false
                    },
                    itemStyle: {
                        areaColor: null
                    }
                },
                silent: true
            }
        ],
        series: [
            {
                // 自定义系列, 实现地图点位跳动
                type: 'custom',
                // 该系列使用的坐标系
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 1,
                data: mapData,
                // 图形渲染逻辑
                renderItem(params, api) {
                    // 节点名称
                    let name = api.value(3, params.dataIndex);
                    // 等级关键字
                    let riskKey = api.value(4, params.dataIndex);
                    // 点位图片
                    let imgPath = mapInfo[riskKey][2];
                    // 点位图片-鼠标悬浮
                    let imgPathEmphasis = mapInfo[riskKey][3];
                    // 字体样式
                    let fontStyle = api.font({ fontStyle: 'normal', fontWeight: 400, fontSize: 18, fontFamily: 'Microsoft Yahei' });
                    // 获取点位经纬度
                    let coord = api.coord([api.value(0, params.dataIndex), api.value(1, params.dataIndex)]);
                    return {
                        type: 'group',
                        x: coord[0],
                        y: coord[1],
                        children: [
                            {
                                type: 'image',
                                style: {
                                    image: imgPath,
                                    x: -15,
                                    y: -41,
                                    width: 30,
                                    height: 41
                                },
                                // 关键帧动画 Jump animation.
                                keyframeAnimation: {
                                    duration: 1500,
                                    loop: true,
                                    delay: Math.random() * 3000,
                                    keyframes: [
                                        {
                                            y: -10,
                                            percent: 0.5,
                                            // 点位跳动状态，参考缓动示例
                                            easing: 'circularOut'
                                        },
                                        {
                                            y: 0,
                                            percent: 1,
                                            easing: 'quarticOut'
                                        }
                                    ]
                                },
                                // 高量状态
                                emphasis: {
                                    style: {
                                        image: imgPathEmphasis,
                                        x: -18,
                                        y: -49,
                                        width: 200,
                                        height: 49
                                    }
                                }
                            },
                            {
                                // 点位名称
                                type: 'text',
                                style: {
                                    text: name,
                                    x: 0,
                                    y: 15,
                                    font: fontStyle,
                                    fill: '#fff',
                                    textAlign: 'center',
                                    textVerticalAlign: 'middle'
                                }
                            }
                        ]
                    };
                }
            }
        ]
    };
    myChart.setOption(option, true);
    //捕捉georoam事件，使下层的geo随着上层的geo一起缩放拖曳
    myChart.on('georoam', params => {
        let myOption = myChart.getOption();
        if (params.zoom != null) {
            //捕捉到缩放时
            myOption.geo[1].zoom = myOption.geo[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
            myOption.geo[1].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else {
            //捕捉到拖曳时
            myOption.geo[1].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        myChart.setOption(myOption);
    });
    // selectDataRange 视觉映射组件中，range 值改变后触发的事件
    myChart.on('datarangeselected', params => {
        if (params.visualMapId == null || params.visualMapId == '') {
            return;
        }
        // selected 点位选择状态
        let selectedArr = params.selected;
        let display = {
            high: selectedArr[0],
            medium: selectedArr[1],
            low: selectedArr[2],
            no: selectedArr[3]
        };
        // 处理数据，selected为false类型的点位不显示
        let newSeriesArr = option.series.filter((serie, index) => {
            if (serie.type == 'custom') {
                let newData = mapData.filter(item => {
                    if (item.value[4]) {
                        let isShow = display[item.value[4]];
                        if (isShow) {
                            return item;
                        }
                    }
                });
                serie.data = JSON.parse(JSON.stringify(newData));
            }
            return serie;
        });
        // series重新赋值
        option.series = newSeriesArr;
        // 重新加载option
        myChart.setOption(option, true);
        // 给视觉映射组件赋值
        myChart.dispatchAction({
            type: 'selectDataRange',
            selected: selectedArr
        });
    });
})
// toolTip style
// .custom-tooltip-box {
//     width: 214px;
//     height: 134px;
//     font-size: 18px;
//     padding: 20px;
//     box-sizing: border-box;
//     background-image: url('//img.isqqw.com/profile/upload/2023/07/28/be32d7e7-9051-4285-bab3-7be0cb2e4b3a.png');
//     background-size: 100% 100%;
// }
// .custom-tooltip-box .title {
//     font-size: 20px;
//     color: #fff;
//     line-height: 25px;
// }
// .custom-tooltip-box .row {
//     margin-top: 6px;
// }
// .custom-tooltip-box .label {
//     font-size: 18px;
//     color: #fff;
//     margin-right: 10px;
// }
// .custom-tooltip-box .content {
//     font-size: 18px;
// }