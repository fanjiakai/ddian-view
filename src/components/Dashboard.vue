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
                  <i style="font-size: 16px; color: #fff"> {{dispalyCharacter1}}万元</i><br>
                  <span style="font-size: 12px;color: #fff;">资产总价值</span>
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
                 style=" position: absolute;background: red; width: calc(100% - 4px);height: calc(100% - 4px);"></div>
            <div id="charts3"
                 style=" position: absolute;background: #00db6b; left:calc(50%); width: calc(50% - 4px);height: calc(100% - 4px);display: none"></div>
            <div style=" position: absolute;">
              <span style="line-height: 45px;padding: 15px; color:#FFF;">固定资产覆盖总资产范围</span><br>
              <span style="line-height: 45px;font-size:14px;padding: 15px; color:#FFF;"> <i
                style="font-size: 18px;color: #1E9FFF">{{dispalyCharacter2.current}}</i> / <i style="font-size: 12px">{{dispalyCharacter2.total}}</i></span>
            </div>
            <div style=" position: absolute;left: 50%;display: none">
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
            <span>4</span>
            <span>5</span>
            <span>0</span>
            <span>0</span> <span>0</span> <span>0</span> <span style="border: none">亩</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {bus} from "../bus.js"
  import {getCode} from "../assets/js/location_map_link.js"
  var chartJson1 = require('./json/dashboard/charts1/draw460000Chart1.json');
  var chartJson2 = require('./json/dashboard/charts2/draw460000Chart2.json');
  var chartJson3 = require('./json/dashboard/charts3/draw460000Chart3.json');
  var chartJson4 = require('./json/dashboard/charts4/draw460000Chart4.json');
  var chartJson5 = require('./json/addPie/addPie460000.json');
  export default {
    data() {
      return {
        dispalyCharacter1: 0,
        dispalyCharacter2: {},
        dispalyCharacter3: {},
        areaCode: 460000,
        charts1: '',
        charts2: '',
        charts3: '',
        charts4: '',
        charts5: null,
        myCode: '',
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
        // that.drawChart1(that.drawData);
        that.codeChange(that.areaCode);
      })
    },
    methods: {
      // 计算左侧两区总面积
      calculate: function (data) {
        var sum = 0;
        for (var i in data) {
          sum += data[i].value;
          // sum = sum + data[i].value;
          // num=sum.toFixed(2);
        }
        this.dispalyCharacter1 = sum;
      },
      codeChange: function(code){
        if(code != null){
          chartJson1 = require("./json/dashboard/charts1/draw"+code+"Chart1.json");
          chartJson2 = require("./json/dashboard/charts2/draw"+code+"Chart2.json");
          chartJson3 = require("./json/dashboard/charts3/draw"+code+"Chart3.json");
          chartJson4 = require("./json/dashboard/charts4/draw"+code+"Chart4.json");
          chartJson5 = require("./json/addPie/addPie"+code+".json");
          this.drawChart1(chartJson1);
          this.drawChart2(chartJson2);
          this.drawChart3(chartJson3);
          this.drawChart4(chartJson4);
          this.drawChart5(chartJson5);
        }
      },
      drawChart1: function (data) {
        this.calculate(data);
        this.charts1 = this.$echarts.init(document.getElementById('charts1'))
        var option = {
          color: ['#c23531', '#38526d'],
          title: {
            text: '资产价值分析',
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
            data: ['经营性资产', '非经营性资产'],
            formatter: function (name) {
              var total = 0;
              var target;
              for (var i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                  target = data[i].value;
                }
              }
              return name + ' ' + target + ' 万元';
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
        console.log(data)
        this.charts4 = this.$echarts.init(document.getElementById('charts4'))
        var option = {
          title: {
            text: '资产价值TOP 5 排行榜',
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
        this.charts5 = this.$echarts.init(document.getElementById('charts5'));
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
          // alert(geoCoordMap[name])
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
           /* alert(geoCoord)*/
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
                  radius: 20,
                  center: [p[0], p[1] - 25],
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
            text: "资源性资产总面积",
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
              /*var textCode = this.$echarts.getMap(mapName).geoJson.features.id;
              alert(textCode);*/
              var thisCode = getCode(params.name);
              var addPie = require('./json/addPie/textPie/textPie'+thisCode+'.json');

              // if (params.value) {
                /* return params.name + "两区面积<br/>" + typeArr[typeIndex] + ": " + params.value;*/
                return "<div style=\"\">" +
                  "<div style=\"background:black;\">&nbsp;"+params.name+"&nbsp;两区面积</div><div style=\"background:rgba(52, 54, 59, 0.64)\"><table width=\"100%\" style=\"border-collapse:collapse;\">" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>资产总价值："+addPie.zczjz+"万</td></tr>" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>经营性资产价值："+addPie.jyxzcjz+"万</td></tr>" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>非经营性资产价值："+addPie.fjyxzcjz+"万</td></tr>" +
                  "<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>资源性资产："+addPie.zyxzc+"亩</td>"+
                  /*"<tr style=\"border-bottom: 1px dashed  #FFF;\"><td height='40px;'>非资源性资产："+addPie.fzyxzc+"</td>"+*/
                  "</table></div><div>";
              // }
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
          that.drawMaps();
          var data = require("./json/dashboard/charts1/draw"+that.areaCode+"Chart1.json");
          var data2 = require("./json/dashboard/charts2/draw"+that.areaCode+"Chart2.json");
          var data3 = require("./json/dashboard/charts2/draw"+that.areaCode+"Chart2.json");
          var data4 = require("./json/dashboard/charts4/draw"+that.areaCode+"Chart4.json");
          var data5 =  require("./json/addPie/addPie"+that.areaCode+".json");
          that.drawChart1(data);
          that.drawChart2(data2);
          that.drawChart3(data3);
          that.drawChart4(data4);
          that.drawChart5(data5);
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
        var data = require("./json/addPie/addPie"+that.areaCode+".json");
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
      /*bus.$on('transmitArea', function (data) {
        alert(data.areaCode)
      })*/
      var chartCode = this.areaCode;
      var data = require("./json/dashboard/charts1/draw"+chartCode+"Chart1.json");
      var data2 = require("./json/dashboard/charts2/draw"+chartCode+"Chart2.json");
      var data3 = require("./json/dashboard/charts2/draw"+chartCode+"Chart2.json");
      var data4 = require("./json/dashboard/charts4/draw"+chartCode+"Chart4.json");
      var data5 =  require("./json/addPie/addPie"+chartCode+".json");
      this.drawChart1(data);
      this.drawChart2(data2);
      this.drawChart3(data3);
      this.drawChart4(data4);
      this.drawMaps();
      this.drawChart5(data5);
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
