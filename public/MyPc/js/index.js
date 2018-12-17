$(function () {
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));
    var option1 = {
        title: {
            text: '2017年注册人数',
        },
        tooltip: {},
        legend: {
            data: ['人数', '销量']
        },
        xAxis: [
            {
                data: ['1月', '2月', '3月', '4月', '5月', '6月']
            }
        ],
        yAxis: {},
        series: [
            {
                name: '人数',
                type: 'bar',
                data: [500, 400, 1000, 600, 700, 400],

            }, {
                name: '销量',
                type: 'bar',
                data: [1500, 700, 400, 550, 400, 700]
            }
        ]
    };
    echarts_left.setOption(option1);

    var echarts_right = echarts.init(document.querySelector(".echarts_right"));
    var option2 = {
      title : {
        text: '热门品牌销售',
        subtext: '2018年12月',
        x:'center',
        textStyle: {
          color: "red",
          fontSize: 30
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','阿迪王','老北京','老奶奶']
      },
      series : [
        {
          name: '热门品牌',
          type: 'pie',   // 饼图
          radius : '55%', // 圆的大小
          center: ['50%', '60%'],  // 圆心位置
          data:[
            {value:335, name:'耐克'},
            {value:310, name:'阿迪'},
            {value:234, name:'阿迪王'},
            {value:135, name:'老北京'},
            {value:1548, name:'老奶奶'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 100,
              shadowOffsetX: 0,
              shadowColor: 'yellow'
            }
          }
        }
      ]
    };
  
    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);
})