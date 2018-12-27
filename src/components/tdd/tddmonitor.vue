<template>
  <el-row style="background: #34363b">
    <el-col :span="8" style=" height: calc(98vh - 60px);">
      <el-row>
        <el-col style="height: calc((98vh - 60px)/3);position: relative">
          <div class="mainPanel"
               style="background: linear-gradient(90deg,rgba(69,82,98,0.2) 10%,transparent 0),linear-gradient(rgba(43,43,43,0.2) 50%,transparent 0);background-size: 20px 20px;">
            <div id="charts1" class="firstPanel"></div>
            <div style="top:30%; position: absolute;">
                <span style="display:inline-block; margin-top: 20%;margin-left:15px">
                  <i style="font-size: 16px; color: #fff"> {{dispalyCharacter1}}万亩</i><br>
                  <span style="font-size: 12px;color: #fff;">"两区"总面积</span>
                </span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="height: calc((98vh - 60px)/3);">
          <div class="mainPanel2"
               style="background: linear-gradient(90deg,rgba(69,82,98,0.2) 10%,transparent 0),linear-gradient(rgba(43,43,43,0.2) 50%,transparent 0);background-size: 20px 20px;">
            <div id="charts2"
                 style=" position: absolute;background: red; width: calc(50% - 4px);height: calc(100% - 4px);"></div>
            <div id="charts3"
                 style=" position: absolute;background: #00db6b; left:calc(50%); width: calc(50% - 4px);height: calc(100% - 4px);"></div>
            <div style=" position: absolute;">
              <span style="line-height: 45px;padding: 15px; color:#FFF;">两区覆盖范围</span><br>
              <span style="line-height: 45px;font-size:14px;padding: 15px; color:#FFF;">覆盖乡镇数 <i
                style="font-size: 18px;color: #1E9FFF">{{dispalyCharacter2.current}}</i> / <i style="font-size: 12px">{{dispalyCharacter2.total}}</i></span>
            </div>
            <div style=" position: absolute;left: 50%">
              <span style="line-height: 45px;padding: 15px; ">&nbsp;</span><br>
              <span style="line-height: 45px;font-size:14px;padding: 15px; color:#FFF;">覆盖村庄数 <i
                style="font-size: 18px;color: #a52a2a">{{dispalyCharacter3.current}}</i> / <i style="font-size: 12px">{{dispalyCharacter3.total}}</i></span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="height: calc((98vh - 60px)/3);position: relative">
          <div class="mainPanel"
               style="background: linear-gradient(90deg,rgba(69,82,98,0.2) 10%,transparent 0),linear-gradient(rgba(43,43,43,0.2) 50%,transparent 0);background-size: 20px 20px;">
            <div id="charts4" class="firstPanel"></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="16" style="height:  calc(98vh - 60px);position: relative">
      <div class="mainPanel"
           style="background: linear-gradient(90deg,rgba(69,82,98,0.2) 10%,transparent 0),linear-gradient(rgba(43,43,43,0.2) 50%,transparent 0);background-size: 20px 20px;">
        <div id="charts5" class="firstPanel"></div>
        <div style="top:40px;left:20px;position: absolute;">
          <div class="digital">
            <span>5</span>
            <span>0</span>
            <span>0</span>
            <span>0</span> <span style="border: none">亩</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {bus} from "../../bus.js"
  import {getCode} from "../../assets/js/location_map_link.js"

  export default {
    data() {
      return {
        dispalyCharacter1: 0,
        dispalyCharacter2: {},
        dispalyCharacter3: {},
        areaCode: 100000,
        charts1: '',
        charts2: '',
        charts3: '',
        charts4: '',
        charts5: null,
      }
    },
    created: function () {
      let that = this;
      bus.$on('transmitArea', function (data) {
        that.areaCode = data.areaCode;
        if(this.charts5!=null){
          this.charts5.dispose();
          this.charts5 = null;
        }
        that.drawMaps();
      })
    },
    methods: {
      // 计算左侧两区总面积
      calculate: function (data) {
        var sum = 0;
        for (var i in data) {
          sum += data[i].value;
        }
        this.dispalyCharacter1 = sum;
      },
      drawChart1: function (data) {
        this.calculate(data);
        this.charts1 = this.$echarts.init(document.getElementById('charts1'))
        var option = {
          color: ['#c23531', '#38526d'],
          title: {
            text: '两区类型分布',
            textStyle: {
              color: '#FFF',
              fontSize: 15,
            },
            x: 'left',
            padding: 15,
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            y: 'bottom',
            orient: 'vertical',
            textStyle: {color: '#FFF'},
            padding: 15,
            left: 'left',
            data: ['功能区面积', '保护区面积'],
            formatter: function (name) {
              var total = 0;
              var target;
              for (var i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                  target = data[i].value;
                }
              }
              return name + ' ' + target + ' 万亩';
            }
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['65%', '50%'],
              data: data,
              labelLine: {
                normal: {
                  show: true,
                  /*  length:0.003,*/
                  lineStyle: {
                    color: '#FFF',
                  }
                },
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b} {d}%',
                    /* formatter: '{b}',*/
                    textStyle: {
                      color: '#FFF',
                    }
                  }
                }
              }
            }
          ]
        };
        this.charts1.setOption(option);
      },
      drawChart2: function (data) {
        this.dispalyCharacter2 = data[0];
        this.charts2 = this.$echarts.init(document.getElementById('charts2'))
        var option = {
          "toolbox": {
            "show": false,
            "feature": {
              "mark": {
                "show": true
              },
              "restore": {
                "show": true
              },
              "saveAsImage": {
                "show": true
              }
            }
          },
          "series": [{
            "name": "指标",
            "type": "gauge",
            "startAngle": 180, //总的360，设置180就是半圆
            "endAngle": 0,
            "center": ["50%", "80%"], //整体的位置设置
            /* "radius": 100,*/
            "axisLine": {
              "lineStyle": {
                "width": 20, //柱子的宽度
                "color": [[0.298, "#2d99e2"], [1, "#dce3ec"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
              }
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "show": false
            },
            "splitLine": {
              "show": false
            },
            "pointer": {
              "width": 10, //指针的宽度
              "length": "80%", //指针长度，按照半圆半径的百分比
              "color": "#2d99e2"
            },
            "title": {
              "show": true,
              "offsetCenter": [0, "25%"],  //标题位置设置
              "textStyle": { //标题样式设置
                "color": "#2d99e2",
                "fontSize": 15,
                "fontFamily": "微软雅黑",
                "fontWeight": "bold"
              }
            },
            "detail": {
              "show": false
            },
            "data": data
          }]
        };
        this.charts2.setOption(option);
      },
      drawChart3: function (data) {
        this.dispalyCharacter3 = data[0];
        this.charts3 = this.$echarts.init(document.getElementById('charts3'))
        var option = {
          "toolbox": {
            "show": false,
            "feature": {
              "mark": {
                "show": true
              },
              "restore": {
                "show": true
              },
              "saveAsImage": {
                "show": true
              }
            }
          },
          "series": [{
            "name": "指标",
            "type": "gauge",
            "startAngle": 180, //总的360，设置180就是半圆
            "endAngle": 0,
            "center": ["50%", "80%"], //整体的位置设置
            /* "radius": 100,*/
            "axisLine": {
              "lineStyle": {
                "width": 20, //柱子的宽度
                "color": [[0.298, "#A52A2A"], [1, "#dce3ec"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
              }
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "show": false
            },
            "splitLine": {
              "show": false
            },
            "pointer": {
              "width": 10, //指针的宽度
              "length": "80%", //指针长度，按照半圆半径的百分比
              "color": "#2d99e2"
            },
            "title": {
              "show": true,
              "offsetCenter": [0, "25%"], //标题位置设置
              "textStyle": { //标题样式设置
                "color": "#A52A2A",
                "fontSize": 15,
                "fontFamily": "微软雅黑",
                "fontWeight": "bold"
              }
            },
            "detail": {
              "show": false
            },
            "data": data
          }]
        };
        this.charts3.setOption(option);
      },
      drawChart4: function (data) {
        this.charts4 = this.$echarts.init(document.getElementById('charts4'))
        var option = {
          title: {
            text: '重要作物分布',
            textStyle: {
              color: '#FFF',
              fontSize: 15,
            },
            padding: 15,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{b}&nbsp;:&nbsp;{c}"
          },
          grid: {
            left: '1%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            "axisLabel": {
              "interval": 0,
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: data[0].label,
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            }
          },
          series: [{
            type: 'bar',
            data: data[0].value,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colors = [
                    "#ffff00", "#ffff00", "#ffff00", "#ffff00",
                  ];
                  return colors[params.dataIndex]
                }
              },
            },
          }]
        };
        this.charts4.setOption(option);
      },
      drawChart5: function (mapName, data) {
        let that = this;
        this.charts5 = "";
        this.charts5 = this.$echarts.init(document.getElementById('charts5'))
        var typeArr = ["功能区面积", "功能区面积",];
        var typeIndex = 1;
        var option = null;
        // var data = [];
        var geoCoordMap = {};
        // 地图特征
        var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
        mapFeatures.forEach(function (v) {
          // 地区名称
          var name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp;
         /* data.forEach(function (v) {
            if (name = v.name) {

            }
          })*/
        });

        /*变换地图数据（格式）：pie*/
        function convertMapDta(type, data) {
          var mapData = [];
          data.forEach(function (v) {
            v.value.forEach(function (v1) {
              if (String(v1.name) === String(type)) {
                mapData.push({
                  "name": v.name, "value": v1.value
                })
              }
            })
          });
          return mapData;
        };
        var flag = true;

        /*resetPie*/
        function resetPie(myChart, params, geoCoordMap, typeIndex) {
          flag = true;
          var op = myChart.getOption();
          var ops = op.series;
          ops.forEach(function (v, i) {
            if (i > 0) {
              var geoCoord = geoCoordMap[v.name];
              var p = myChart.convertToPixel({seriesIndex: 0}, geoCoord);
              /*   v.center = [p[0],p[1]+16];*/
              if (p) {
                v.center = [p[0], p[1] + 16];
              }
              if (params != 0 && params.zoom) {
                v.radius = 10;
              }
              if (params != 0 && params.selected) {
                var rangeFirstNumber = params.selected[0];
                var rangeSecondNumber = params.selected[1];
                var pd = v.data[typeIndex].value;
                if (pd < rangeFirstNumber || pd > rangeSecondNumber) {
                  v.itemStyle.normal.opacity = 0;
                } else {
                  v.itemStyle.normal.opacity = 1;
                }
              }
            }
          });
          myChart.setOption(op, true);
        };

        function addPie(chart, data) {
          var op = chart.getOption();
          var sd = option.series;
          for (var i = 0; i < data.length; i++) {
            var randomValue = Math.round(Math.random() * 30);
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              var vr = [];
              (data[i].value).map(function (v, j) {
                vr.push({name: v.name, value: v.value});
              });
              var p = chart.convertToPixel({seriesIndex: 0}, geoCoord);
              sd.push(
                {
                  name: data[i].name,
                  type: 'pie',
                  tooltip: {
                    formatter: function (params) {
                      return params.seriesName + "<br/>" + params.name + " : " + params.value;
                    }
                  },
                  radius: 10,
                  center: [p[0], p[1] - 16],
                  data: vr,
                  zlevel: 4,
                  label: {
                    normal: {
                      show: false,
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    mormal: {
                      opacity: 1
                    }
                  }
                }
              );
            }
          }
          return sd;
        };
        /* 指定图表的配置项和数据:pie*/
        var option = {
          title: {
            text: "“两区”划定面积",
            left: 'left',
            padding: 15,
            textStyle: {
              color: '#FFF',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.value) {
                /* return params.name + "两区面积<br/>" + typeArr[typeIndex] + ": " + params.value;*/
                return "<div style=\"\">" +
                  "<div style=\"background:black;\">&nbsp;"+params.name+"&nbsp;两区面积</div><div style=\"background:rgba(52, 54, 59, 0.64)\"><table width=\"100%\" style=\"border-collapse:collapse;\">" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>两区面积：123亩</td><td>功能区：123亩</td></tr>" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>保护区：123亩</td><td>水稻功能区：123亩</td></tr>" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>小麦和玉米复种区：123亩</td><td>棉花保护区：123亩</td></tr>" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>糖料蔗保护区：123亩</td><td>天然橡胶保护区：123亩</td>"+
                  "</table></div><div>";
              }
            }
          },
          series: [{
            name: 'chinaMap',
            type: 'map',
            mapType: mapName,
            roam: true,
            zoom: 1.2,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#eee',
                borderColor: '#4A5064',
                borderWidth: 2,
                shadowColor: '#9199b3',
                shadowBlur: 25
              }
            },
            data: convertMapDta(typeArr[typeIndex], data),
          }]
        };

        if (option && typeof option === "object") {
          this.charts5.setOption(option, true);
        }
        addPie(this.charts5, data);
        this.charts5.setOption(option, true);

        /*饼图跟着地图移动:pie*/
        this.charts5.on('georoam', function (params) {
          // 控制事件频率
          if (flag) {
            flag = false;
            setTimeout(function () {
              resetPie(that.charts5, params, geoCoordMap, typeIndex)
            }, 500)
          }
        });
        this.charts5.on('datarangeselected', function (params) {
          resetPie(that.charts5, params, geoCoordMap, typeIndex);
        });
        this.charts5.on('dblclick', function (params) {
          that.areaCode = getCode(params.name);
          that.drawMaps()
        });
        window.addEventListener("resize", function () {
          that.charts5.resize();
          resetPie(that.charts5, 0, geoCoordMap);
        })

      },
      drawMaps: function () {
        let that = this;
        if (that.areaCode == -1) {
          return;
        }
        var urlPath = "../../static/data/" + that.areaCode + ".json";
        var data = [{
          "name": "北京",
          "value": [
            {name: "功能区面积", value: Math.round(Math.random() * 100 + 10)},
            {name: "保护区面积", value: Math.round(Math.random() * 100 + 10)},
          ],
          "object":{mj:100}
        }, {
          "name": "上海",
          "value": [
            {name: "功能区面积", value: Math.round(Math.random() * 100 + 10)},
            {name: "保护区面积", value: Math.round(Math.random() * 100 + 10)},
          ],
          "object":{mj:100}
        }]
        $.get(urlPath, function (geoJson) {
          that.$echarts.registerMap(that.areaCode, geoJson);
          that.drawChart5(that.areaCode, data);
        });
      }
    },
    mounted() {
      const that = this
      // 窗口宽高发生改变时触发
      window.onresize = () => {
        return (() => {
          this.charts1.resize();
          this.charts2.resize();
          this.charts3.resize();
          this.charts4.resize();
        })()
      }
      var data = [
        {value: 100, name: '功能区面积'},
        {value: 335, name: '保护区面积'},
      ];
      var data2 = [{ //显示数据
        "value": 29.8,
        "name": "覆盖乡镇 29.8%",
        "total": 15,
        "current": 10
      }];
      var data3 = [{ //显示数据
        "value": 29.8,
        "name": "覆盖村庄 29.8%",
        "total": 15,
        "current": 10
      }]
      var data4 = [{
        label: ['小麦', '玉米', '大豆', '棉花'],
        value: ['56', '123', '232', '28']
      }];
      this.drawChart1(data);
      this.drawChart2(data2);
      this.drawChart3(data3);
      this.drawChart4(data4);
      this.drawMaps();
      /*  this.drawChart5('china');*/
    }
  }
</script>

<style scoped>
  .mainPanel {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    margin: 15px;
    position: absolute;
    border: 4px solid #455262;
  }

  .mainPanel2 {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    margin: 15px;
    position: relative;
    border: 4px solid #455262;
  }

  .firstPanel {
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
  }

  .digital span {
    color: #FFF;
    border: 2px solid #455262;
    margin: 1px;
    width: 20px;
    text-align: center;
    display: inline-block;
  }

</style>
