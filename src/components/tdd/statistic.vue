<template>
  <el-row class="warp"  style="height:calc(100vh - 61px);">
    <el-row style="line-height: 100px;">
      <el-button  round @click="otherHidden(1)">集体资产统计</el-button>
      <el-button round  @click="otherHidden(2)">集体资源统计</el-button>
      <el-button round @click="otherHidden(3)">资产负债统计</el-button>
    </el-row>
    <el-col :span="24" style="
    background: #ffffff;
    width: 100%;
    height: 10vh;
    line-height: 60px;
    text-align: center;
    color: #fff;" id="nav1" >
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 160px;">库存物资:<span style="font-size: 16px;font-style: oblique;"> {{codeData.kcwz}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 160px;">牲畜(禽):<span style="font-size: 16px;font-style: oblique;"> {{codeData.sc}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: 0 5px;font-size: 14px;max-width: 160px;">经营性固定资产:<span style="font-size: 14px;font-style: oblique;"> {{codeData.jyxgdzc}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 160px;">非经营性固定资产:<span style="font-size: 14px;font-style: oblique;"> {{codeData.fjyxgdzc}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 160px;">经营性在建工程:<span style="font-size: 14px;font-style: oblique;"> {{codeData.jyxzjgc}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">非经营性在建工程:<span style="font-size: 14px;font-style: oblique;"> {{codeData.fjyxzjgc}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 140px;">林木资产:<span style="font-size: 16px;font-style: oblique;"> {{codeData.lmzc}}</span>万</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 160px;">无形资产:<span style="font-size: 16px;font-style: oblique;"> {{codeData.wxzc}}</span>万</div></el-col>
    </el-col>
    <el-col :span="24" style="
    background: #ffffff;
    width: 100%;
    height: 10vh;
    line-height: 60px;
    text-align: center;
    color: #fff;
    display: none" id="nav2" >
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 140px;position: relative;top: 0;left: -5px;">耕地:<span style="font-size: 16px;font-style: oblique;">3000</span>亩</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 140px;position: relative;top: 0;left: -20px;">园地:<span style="font-size: 16px;font-style: oblique;">5600</span>亩</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 140px;position: relative;top: 0;left: -32px;">林地:<span style="font-size: 16px;font-style: oblique;">6000</span>亩</div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 140px;position: relative;top: 0;left: -34px;">草地:<span style="font-size: 16px;font-style: oblique;">300</span>亩</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 160px;position: relative;top: 0;left: -24px;">农田水利设施用地:<span style="font-size: 14px;font-style: oblique;">500</span>亩</div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple" style="margin: auto;font-size: 14px;max-width: 160px;position: relative;top: 0;left: -18px;">养殖水面:<span style="font-size: 14px;font-style: oblique;">850</span>亩</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 160px;position: relative;top: 0;left: -14px;">经营性建设用地:<span style="font-size: 16px;font-style: oblique;">4000</span>亩</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 160px;position: relative;top: 0;left: -10px;">非经营性建设用地:<span style="font-size: 16px;font-style: oblique;">2300</span>亩</div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 160px;">未利用地:<span style="font-size: 14px;font-style: oblique;">7500</span>亩</div></el-col>
    </el-col>
    <el-col :span="24" style="
    background: #ffffff;
    width: 100%;
    height: 10vh;
    line-height: 60px;
    text-align: center;
    color: #fff;
    display: none" id="nav3" >
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">资产总计:<span style="font-size: 14px;font-style: oblique;"> 5000</span>万</div></el-col>
      <!--<el-col :span="3" style="margin-left: 5px;width: 220px;"><div class="grid-content bg-purple" style="max-width:220px;margin: auto;font-size: 14px;">负债和所有债权益合计:<span style="font-size: 16px;font-style: oblique;"> 7500</span>万</div></el-col>-->
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="max-width:180px;margin: auto;font-size: 14px;">流动资产合计:<span style="font-size: 16px;font-style: oblique;"> 3000</span>万</div></el-col>
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">农业资产合计:<span style="font-size: 14px;font-style: oblique;"> 500</span>万</div></el-col>
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">长期资产合计:<span style="font-size: 14px;font-style: oblique;"> 100</span>万</div></el-col>
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">固定资产合计:<span style="font-size: 14px;font-style: oblique;"> 300</span>万</div></el-col>
      <!--<el-col :span="2" style="margin-left: 5px;width: 140px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 140px;max-width:120px;">其他资产:<span style="font-size: 14px;font-style: oblique;"> 500</span>万</div></el-col>-->
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">流动负债合计:<span style="font-size: 14px;font-style: oblique;"> 850</span>万</div></el-col>
      <el-col :span="2" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width: 180px;">长期负债合计:<span style="font-size: 14px;font-style: oblique;"> 400</span>万</div></el-col>
      <el-col :span="3" style="margin-left: 5px;width: 160px;"><div class="grid-content bg-purple" style="margin: auto;font-size: 12px;max-width:180px;">所有者权益合计:<span style="font-size: 14px;font-style: oblique;"> 2300</span>万</div></el-col>
    </el-col>
    <el-col :span="24" style="width: 100%;display: block;"  id="body1">
      <div id="myEchartLine1" style="width: 100%;height:40vh;display: block;" ></div>
    </el-col>
    <el-row style="height: 20px;display: block" id="foot1">
      <el-col style="float:left"><div class="" style="font-size:19px;font-family: 'Microsoft YaHei', serif;font-weight:bold;text-align: left;left: 50%;background: #ffffff;
    top: 50%;">资产统计表</div></el-col>
      <el-button style="float:right" size="mini" @click="myUpload()" type="primary" round>
        导出</el-button>
    </el-row>
    <el-col :span="24" id="footer1" style="text-align: center;display: block">
      <el-table
        :data="tableData1"
        style="width: 100%;height: 100%;text-align: center">
        <el-table-column style="text-align: right"
          prop="num"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="行政区名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="kcwz"
          label="库存物资">
        </el-table-column>
        <el-table-column
          prop="scqzc"
          label="牲畜(禽)资产">
        </el-table-column>
        <el-table-column
          prop="lmzc"
          label="林木资产">
        </el-table-column>
        <el-table-column
          prop="jyxgdzc"
          label="经营性固定资产">
        </el-table-column>
        <el-table-column
          prop="fjyxgdzc"
          label="非经营性固定资产">
        </el-table-column>
        <el-table-column
          prop="jyxzjgc"
          label="经营性在建工程">
        </el-table-column>
        <el-table-column
          prop="fjyxzjgc"
          label="非经营性在建工程">
        </el-table-column>
        <el-table-column
          prop="wxzc"
          label="无形资产">
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;padding-right: 30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="21">
        </el-pagination>
      </div>
    </el-col>
    <el-row style="height: 20px;display: none;position: relative" id="foot2">
      <el-col style="float:left"><div class="" style="font-size:19px;font-family: 'Microsoft YaHei', serif;font-weight:bold;text-align: left;left: 50%;background: #ffffff;
    top: 50%;">资源面积统计</div></el-col>
      <el-button style="float:right;position:absolute;right:0;top:0;" size="mini" @click="myUpload()" type="primary" round>
        导出</el-button>
    </el-row>
    <el-col :span="24" id="footer2" style="text-align: center;display: none;">
      <el-table
        :data="tableData2"
        style="width: 100%;height: 100%;text-align: center">
        <el-table-column style="text-align: right"
          prop="num"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="行政区名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gd"
          label="耕地">
        </el-table-column>
        <el-table-column
          prop="yd"
          label="园地">
        </el-table-column>
        <el-table-column
          prop="ld"
          label="林地">
        </el-table-column>
        <el-table-column
          prop="cd"
          label="草地">
        </el-table-column>
        <el-table-column
          prop="ncslss"
          label="农村水利设施">
        </el-table-column>
        <el-table-column
          prop="yzsm"
          label="养殖水面">
        </el-table-column>
        <el-table-column
          prop="jyxjsyd"
          label="经营性建设用地">
        </el-table-column>
        <el-table-column
          prop="fjyxjsyd"
          label="非经营性建设用地">
        </el-table-column>
        <el-table-column
          prop="wlyd"
          label="未利用地">
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;padding-right: 30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="21">
        </el-pagination>
      </div>
    </el-col>
    <el-row style="height: 20px;display: none;" id="foot3">
      <el-col style="float:left"><div class="" style="font-size:19px;font-family: 'Microsoft YaHei', serif;font-weight:bold;text-align: left;left: 50%;background: #ffffff;
    top: 50%;">资产负债统计表</div></el-col>
      <el-button style="float:right;" size="mini" @click="myUpload()" type="primary" round>
        导出</el-button>
    </el-row>
    <el-col :span="24" id="footer3" style="text-align: center;display: none;">
      <el-table
        :data="tableData3"
        style="width: 100%;height: 100%;text-align: center">
        <el-table-column style="text-align: right;"
          prop="num"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="行政区名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zczj"
          label="资产总计">
        </el-table-column>
       <!-- <el-table-column
          prop="fzzchj"
          label="负债和所有权益合计">
        </el-table-column>-->
        <el-table-column
          prop="ldzchj"
          label="流动资金合计">
        </el-table-column>
        <el-table-column
          prop="nyzchj"
          label="农业资产合计">
        </el-table-column>
        <el-table-column
          prop="cqzchj"
          label="长期资产合计">
        </el-table-column>
        <el-table-column
          prop="gdzchj"
          label="固定资产合计">
        </el-table-column>
        <!--<el-table-column
          prop="qtzchj"
          label="其他资产合计">
        </el-table-column>-->
        <el-table-column
          prop="cqfzhj"
          label="长期负债合计">
        </el-table-column>
        <el-table-column
          prop="syqyhj"
          label="所有权益合计">
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;padding-right: 30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="21">
        </el-pagination>
      </div>
    </el-col>
    <!--<div class="topNav">
      <el-row :gutter="24">
        <el-col :span="4"><div class="grid-content bg-purple"><span class="font-size">8000</span>流转土地面积</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span class="">5000</span>发包方</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span class="">3226</span>承包方</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span class="">2235</span>农户</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span class="">9858</span>承包合同</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span class="">23353</span>权证</div></el-col>
      </el-row>
    </div>
    <div class="centerContext">
      <div id="myEchartLine" class="centerContext-ech">
      </div>
    </div>
    <div class="footer">
      &lt;!&ndash;底部&ndash;&gt;
      <el-table
        :data="tableProvinceData"
        style="width: 100%;height: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>-->
  </el-row>

</template>

<script>
  import {bus} from "../../bus.js"
  import {getCode} from "../../assets/js/location_map_link.js"
  var chartProvinceLegend1 = require('../json/zc/chart460000Legend1.json');
  var chartProvinceXAxis1 = require('../json/zc/chart460000XAxis1.json');
  var chartProvinceSeries1 = require('../json/zc/chart460000Series1.json');
  var tableProvinceData1 = require('../json/zc/table460000Data1.json');
  var chartProvinceLegend2 = require('../json/zy/chart460000Legend2.json');
  var chartProvinceXAxis2 = require('../json/zy/chart460000XAxis2.json');
  var chartProvinceSeries2 = require('../json/zy/chart460000Series2.json');
  var tableProvinceData2 = require('../json/zy/table460000Data2.json');
  var chartProvinceLegend3 = require('../json/zj/chart460000Legend3.json');
  var chartProvinceXAxis3 = require('../json/zj/chart460000XAxis3.json');
  var chartProvinceSeries3 = require('../json/zj/chart460000Series3.json');
  var tableProvinceData3 = require('../json/zj/table460000Data3.json');
  var codeData = require('../json/codeData/code460000Data.json');



  export default {
    data() {
      return {
        chartLegend: chartProvinceLegend1,
        chartXAxis: chartProvinceXAxis1,
        chartSeries: chartProvinceSeries1,
        tableData1: tableProvinceData1,
        chartLegend2: chartProvinceLegend2,
        chartXAxis2: chartProvinceXAxis2,
        chartSeries2: chartProvinceSeries2,
        tableData2: tableProvinceData2,
        chartLegend3: chartProvinceLegend3,
        chartXAxis3: chartProvinceXAxis3,
        chartSeries3: chartProvinceSeries3,
        tableData3: tableProvinceData3,
        codeData: codeData,
        areaCode:"",
      }
    },
    created: function () {
      let that = this;
      bus.$on('transmitArea', function (data) {
        // alert("statistic" + data.areaCode + "-------" + data.text)
        that.areaCode = data.areaCode;
        if(this.charts5!=null){
          // this.charts5.dispose();
          // this.charts5 = null;

        }
        if(that.areaCode != null){
          // chartProvinceLegend1 = "../json/zc/chart"+that.areaCode+"Legend1.json";
          chartProvinceLegend1 = require("../json/zc/chart"+that.areaCode+"Legend1.json");
          chartProvinceXAxis1 = require("../json/zc/chart"+that.areaCode+"XAxis1.json");
          chartProvinceSeries1 = require("../json/zc/chart"+that.areaCode+"Series1.json");
          tableProvinceData1 = require("../json/zc/table"+that.areaCode+"Data1.json");
          chartProvinceLegend2 = require("../json/zy/chart"+that.areaCode+"Legend2.json");
          chartProvinceXAxis2 = require("../json/zy/chart"+that.areaCode+"XAxis2.json");
          chartProvinceSeries2 = require("../json/zy/chart"+that.areaCode+"Series2.json");
          tableProvinceData2 = require("../json/zy/table"+that.areaCode+"Data2.json");
          chartProvinceLegend3 = require("../json/zj/chart"+that.areaCode+"Legend3.json");
          chartProvinceXAxis3 = require("../json/zj/chart"+that.areaCode+"XAxis3.json");
          chartProvinceSeries3 = require("../json/zj/chart"+that.areaCode+"Series3.json");
          tableProvinceData3 = require("../json/zj/table"+that.areaCode+"Data3.json");
          that.codeData = require("../json/codeData/code"+that.areaCode+"Data.json");
          that.otherHidden(1);
        }
      })
    },
    methods: {
      otherHidden: function(flag){
        this.tableData1 = tableProvinceData1;
        this.tableData2 = tableProvinceData2;
        this.tableData3 = tableProvinceData3;
        if(flag == 1){
          document.getElementById('nav1').style.display='block';
          document.getElementById('nav2').style.display='none';
          document.getElementById('nav3').style.display='none';
          this.chartLegend = chartProvinceLegend1;
          this.chartXAxis = chartProvinceXAxis1;
          this.chartSeries = chartProvinceSeries1;
          document.getElementById('myEchartLine1').setAttribute('_echarts_instance_', '');
          this.drawEchartLine1();
          document.getElementById('foot1').style.display='block';
          document.getElementById('foot2').style.display='none';
          document.getElementById('foot3').style.display='none';
          document.getElementById('footer1').style.display='block';
          document.getElementById('footer2').style.display='none';
          document.getElementById('footer3').style.display='none';
        }
        if(flag == 2){
          document.getElementById('nav1').style.display='none';
          document.getElementById('nav2').style.display='block';
          document.getElementById('nav3').style.display='none';
          this.chartLegend = chartProvinceLegend2;
          this.chartXAxis = chartProvinceXAxis2;
          this.chartSeries = chartProvinceSeries2;
          document.getElementById('myEchartLine1').setAttribute('_echarts_instance_', '');
          this.drawEchartLine1();
          document.getElementById('foot1').style.display='none';
          document.getElementById('foot2').style.display='block';
          document.getElementById('foot3').style.display='none';
          document.getElementById('footer1').style.display='none';
          document.getElementById('footer2').style.display='block';
          document.getElementById('footer3').style.display='none';
        }
        if(flag == 3){
          document.getElementById('nav1').style.display='none';
          document.getElementById('nav2').style.display='none';
          document.getElementById('nav3').style.display='block';
          this.chartLegend = chartProvinceLegend3;
          this.chartXAxis = chartProvinceXAxis3;
          this.chartSeries = chartProvinceSeries3;
          document.getElementById('myEchartLine1').setAttribute('_echarts_instance_', '');
          this.drawEchartLine1();
          document.getElementById('foot1').style.display='none';
          document.getElementById('foot2').style.display='none';
          document.getElementById('foot3').style.display='block';
          document.getElementById('footer1').style.display='none';
          document.getElementById('footer2').style.display='none';
          document.getElementById('footer3').style.display='block';
        }
      },

      myUpload: function(){
        confirm("是否导出统计表为Excel格式");
      },
      drawEchartLine1: function () {
        let myChart1 = this.$echarts.init(document.getElementById('myEchartLine1'));
        var option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.chartLegend
          },
          toolbox: {
            show: false,
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          grid: {
            y2: 60
          },
          xAxis: [
            {
              type: 'category',
              data: this.chartXAxis,
              axisLabel:{
                interval:0,//横轴信息全部显示
                rotate:-30,//-30度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: this.chartSeries
        }
        myChart1.setOption(option);
      }

    },
    mounted() {
      this.drawEchartLine1();
    }
  }
</script>


<style scoped>
  html, body {
    margin: 0;
  }
  .cell {

  }
  .topNav {
    margin-top: 40px;
    border: solid 1px #eaebdf;
    background: #ffffff;
    position: absolute;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }

  .centerContext {
    border: solid 1px #f0f3f6;
    background: #ccc;
    position: absolute;
    width: 100%;
    top: 6.6vh;
    height: 48.5vh;
    text-align: center;
    color: #fff;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 10;
  }

  .footer {
    border: solid 1px green;
    background: green;
    height: 38%;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
  }

  .centerContext-ech {
    border: solid 1px #f0f3f6;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #38526d;
    z-index: 999;

  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }



  .right div {
    height: 1000px
  }
  .el-table th>.cell {
    text-align: center;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    text-align: center;
  }
  .bg-purple-dark {
    background: #eaebdf;
  }
  .bg-purple {
    background: #393c43;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    max-width: 220px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .font-size {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .has-gutter {
    text-align: center;
  }



</style>
