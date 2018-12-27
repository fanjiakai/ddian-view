<template>
  <el-row>
    <div id="map" style="width:100%;height:calc(100vh - 61px)"></div>
    <div class="mapType-wrapper">
      <div class="dt pull-left mapTypeVec" @click="switchMapType('vec')">
        <div>矢量</div>
      </div>
      <div class="dt pull-left mapTypeImg" @click="switchMapType('img')">
        <div>地球</div>
      </div>
    </div>
    <div class="search-panel">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.keys" placeholder="请输入搜索内容" style="min-width: 276px;"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: -18px;">
          <el-button type="primary" @click="handleSearch"
                     style="border:1px solid #428bca; color: #FFF; border-radius:0;"
                     icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
      <div id="search-content" class="search-content">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-rewrite">
          <el-tab-pane label="　　两区　" name="first">
            <div style=" overflow-y:auto; height:65vh;">
              <div style="color: #d08686;font-size: 12px">为您找到相关结果&nbsp;{{total}}&nbsp;个</div>
              <div class="gritter-item-wrapper" style="" v-for="item in data"
                   @click="fittoMap(item.lqdm,'2','LQDM',13)">
                <div style="padding:0 18px">
                  <el-row style="color: #FFF;font-size: 12px;line-height: 24px;">
                    <el-col :span="24">两区代码：{{item.lqdm}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区名称：{{item.lqmc}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区类型：{{item.lqlxmc}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区面积（㎡）：?</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区面积（亩）：{{item.lqmj}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">划定时间：{{item.fromDate}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">
                      <el-button size="mini" @click="openLqpkTable(item.lqdm)"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">
                        两区片块
                      </el-button>
                      <el-button size="mini" @click="openLqdkTable(item.lqdm)"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">
                        两区地块
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="block">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" v-if="total > 0"
                               :page-size="3"
                               :total="total"
                               style="float:right;">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="两区片块" name="second">
            <div style=" overflow-y:auto; height:65vh;">
              <div style="color: #d08686;font-size: 12px">为您找到相关结果&nbsp;{{total2}}&nbsp;个</div>
              <div class="gritter-item-wrapper" style="" v-for="item in data2"
                   @click="fittoMap(item.lqpkdm,'3','LQPKDM',14)">
                <div style="padding:0 18px">
                  <el-row style="color: #FFF;font-size: 12px;line-height: 24px;">
                    <el-col :span="24">两区片块代码：{{item.lqpkdm}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区片块名称：{{item.lqpkmc}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">高标准农田占比：{{item.gbzntzb}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">责任主体类型：{{item.zrztlc}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">责任主体名称：{{item.zrztmc}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区片块面积（亩）：{{item.lqpkmjm}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">
                      <el-button size="mini" @click="openLqByPkTable(item.lqpkdm)"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">
                        两区
                      </el-button>
                      <el-button size="mini" @click="openLqdkTable(item.lqdm)"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">
                        两区地块
                      </el-button>
                      <el-button size="mini" @click="openPriture('qz')"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">公示图
                      </el-button>

                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="block">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange2" v-if="total2 > 0"
                               :page-size="3"
                               :total="total2"
                               style="float:right;">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="两区地块" name="third">
            <div style=" overflow-y:auto; height:65vh;">
              <div style="color: #d08686;font-size: 12px">为您找到相关结果&nbsp;{{total1}}&nbsp;个</div>
              <div class="gritter-item-wrapper" style="" v-for="item in data1"
                   @click="fittoMap(item.lqdkdm,'4','LQDKDM',15)">
                <div style="padding:0 18px">
                  <el-row style="color: #FFF;font-size: 12px;line-height: 24px;">
                    <el-col :span="24">两区地块代码：{{item.lqdkdm}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区地块名称：{{item.lqdkmc}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">是否高标准农田：{{item.sfgbznt}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">质量等级代码：{{item.zldjdm}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">经营主体类型：{{item.jyztlx}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">两区地块面积（亩）：{{item.lqdkmjm}}</el-col>
                  </el-row>
                  <el-row style="color: #FFF;font-size: 12px;line-height: 22px;">
                    <el-col :span="24">
                      <el-button size="mini" @click="openLqByDkTable(item.lqdkdm)"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">
                        两区
                      </el-button>
                      <el-button size="mini" @click="openLqpkTable(item.lqdkdm)"
                                 style="background: black;border: black; padding: 3px 7px;margin-left:2px">
                        两区片块
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="block">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange1" v-if="total1 > 0"
                               :page-size="3"
                               :total="total1"
                               style="float:right;">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="menus-panel">
      <dl>
        <dd class="i1" style="border-top: 1px solid #FFF">
          <span>资产分布</span>
          <div class="floating_left">
            <div class="title">图层控制</div>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:6080/arcgis/rest/services/HNZCYZT1/MapServer')">资产一张图</h4>
            <ul>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/1.png" width="20" height="12"
                       style=""/>&nbsp;乘凉亭
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/2.png" width="20" height="12"
                       style=""/>&nbsp;停车场
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/3.png" width="20" height="12"
                       style=""/>&nbsp;公庙
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/4.png" width="20" height="12"
                       style=""/>&nbsp;加冬树
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/5.png" width="20" height="12"
                       style=""/>&nbsp;会议室、文化室
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/6.png" width="20" height="12"
                       style=""/>&nbsp;文化室停车场
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/7.png" width="20" height="12"
                       style=""/>&nbsp;榕树
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/8.png" width="20" height="12"
                       style=""/>&nbsp;污水池
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/9.png" width="20" height="12"
                       style=""/>&nbsp;集体地
              </li>
              <li><img src="../../assets/images/tuli/zcfb/zcyzt/10.png" width="20" height="12"
                       style=""/>&nbsp;鱼塘
              </li>
            </ul>
            <!--<h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/CBDFBd/MapServer')">两区区块</h4>
            <ul>
              <li><img src="../../assets/images/tuli/lq/lqqk/01.png" width="20" height="12"
                       style=""/>&nbsp;功能区
              </li>
              <li><img src="../../assets/images/tuli/lq/lqqk/02.png" width="20" height="12"
                       style=""/>&nbsp;保护区
              </li>
            </ul>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:6080/arcgis/rest/services/HNZCYZT/MapServer')">两区片块
            </h4>
            <ul>
              <li><img src="../../assets/images/tuli/cbdfx/cbdyt/1.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;功能区
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/cbdyt/2.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;保护区
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/cbdyt/3.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;重叠区
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/cbdyt/4.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;其他
              </li>
            </ul>

            <h4><input type="radio" @click="addLayer('http://gykj123.cn:6080/arcgis/rest/services/HNZCYZT/MapServer')"
                       name="cbdfx">两区地块</h4>
            <ul>
              <li><img src="../../assets/images/tuli/cbdfx/dldj/1.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;水稻
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/dldj/2.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;小麦
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/dldj/3.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;小麦玉米
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/dldj/4.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;大豆
              </li>
              <li><img src="../../assets/images/tuli/cbdfx/dldj/5.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;小麦大豆

              </li>
            </ul>-->
          </div>
        </dd>
        <dd class="i2">
          <span>基本农田</span>
          <div class="floating_left">
            <div class="title">图层控制</div>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:6080/arcgis/rest/services/HNJBNTGH/MapServer')">规划基本农田</h4>
            <ul>
              <li><img src="../../assets/images/tuli/jbnt/ghjbnt/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;基本农田
              </li>
              <li><img src="../../assets/images/tuli/jbnt/ghjbnt/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;承包地
              </li>
              <li><img src="../../assets/images/tuli/jbnt/ghjbnt/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;村级行政区
              </li>
            </ul>
            <!--<h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/QQQGd/MapServer')">确权确股分析</h4>
            <ul>
              <li><img src="../../assets/images/tuli/qqfx/qqqg/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;确权确地
              </li>
              <li><img src="../../assets/images/tuli/qqfx/qqqg/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;确权确股不确地
              </li>
            </ul>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/SCMJYQQMJd/MapServer')">&nbsp;实测与确权面积差异
            </h4>
            <ul>
              <li><img src="../../assets/images/tuli/qqfx/scyqqmhcz/1.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;0~2
              </li>
              <li><img src="../../assets/images/tuli/qqfx/scyqqmhcz/2.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;2~5
              </li>
              <li><img src="../../assets/images/tuli/qqfx/scyqqmhcz/3.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;5~15
              </li>
              <li><img src="../../assets/images/tuli/qqfx/scyqqmhcz/4.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;15~20
              </li>
              <li><img src="../../assets/images/tuli/qqfx/scyqqmhcz/5.png" style="border: 1px solid black" width="20"
                       height="12"/>&nbsp;>20
              </li>
            </ul>-->
          </div>
        </dd>
        <dd class="i2">
          <span>承包地分布</span>
          <div class="floating_left">
            <div class="title">图层控制</div>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:6080/arcgis/rest/services/HNCBD/MapServer')">承包地分布</h4>
            <ul>
              <li><img src="../../assets/images/tuli/cbdfb/cbdfb/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;承包地
              </li>
              <li><img src="../../assets/images/tuli/cbdfb/cbdfb/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;村级行政区
              </li>
            </ul>
            <!--<h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/NHFBd/MapServer')">农户分布情况分析</h4>
            <ul>
              <li><img src="../../assets/images/tuli/nhfbqk/nhfbqkfx/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;100~299
              </li>
              <li><img src="../../assets/images/tuli/nhfbqk/nhfbqkfx/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;300~499
              </li>
              <li><img src="../../assets/images/tuli/nhfbqk/nhfbqkfx/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;500~699
              </li>
            </ul>-->
          </div>
        </dd>
        <dd class="i2">
          <span>林权发证</span>
          <div class="floating_left">
            <div class="title">图层控制</div>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:6080/arcgis/rest/services/HNLQFZ/MapServer')">林证发证情况
            </h4>
            <ul>
              <li><img src="../../assets/images/tuli/lzfz/lzfzqk/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;已发证
              </li>
              <li><img src="../../assets/images/tuli/lzfz/lzfzqk/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;未发证
              </li>
              <li><img src="../../assets/images/tuli/lzfz/lzfzqk/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;村级行政区
              </li>
            </ul>
            <!--<h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/RJCBDMJd/MapServer')">人均承包地面积水平
            </h4>
            <ul>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;0~1
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;1~2
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;3~4
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/4.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;4~5
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/5.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;>5
              </li>
            </ul>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/JYQQDFSd/MapServer')">经营权取得方式</h4>
            <ul>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;家庭承包
              </li>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;其他方式承包
              </li>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;转让
              </li>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/4.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;互换
              </li>
            </ul>-->
          </div>
        </dd>
        <dd class="i2">
          <span>其他</span>
          <!--<div class="floating_left">
            <div class="title">图层控制</div>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/RJCBDMJd/MapServer')">人均承包地面积水平
            </h4>
            <ul>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;0~1
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;1~2
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;3~4
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/4.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;4~5
              </li>
              <li><img src="../../assets/images/tuli/qtfx/rjcbdmj/5.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;>5
              </li>
            </ul>
            <h4><input type="radio" name="cbdfx"
                       @click="addLayer('http://gykj123.cn:2096/arcgis/rest/services/JYQQDFSd/MapServer')">经营权取得方式</h4>
            <ul>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/1.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;家庭承包
              </li>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/2.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;其他方式承包
              </li>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/3.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;转让
              </li>
              <li><img src="../../assets/images/tuli/qtfx/jqqqdfs/4.png" width="20" height="12"
                       style="border: 1px solid black"/>&nbsp;互换
              </li>
            </ul>
          </div>-->
        </dd>
      </dl>
    </div>
    <!--<el-row style="position: absolute;left: 30vw;right: 30vw; z-index: 999;top: 65px;">
      <el-col :span="6" style="">
        <div class="report-panel bg-green">保护区面积
          <div class="value">5000亩</div>
        </div>
      </el-col>
      <el-col :span="6" style="">
        <div class="report-panel bg-blue">保护区个数
          <div class="value">5个</div>
        </div>
      </el-col>
      <el-col :span="6" style="">
        <div class="report-panel bg-violet">保护区片块数
          <div class="value">500个</div>
        </div>
      </el-col>
      <el-col :span="6" style="">
        <div class="report-panel bg-yellow">保护区图斑数
          <div class="value">2000万个</div>
        </div>
      </el-col>
    </el-row>-->
    <el-row id="qz" style="position: absolute;left: 40vw; z-index: 999;top: 65px; display: none">
      <div style="position: absolute;z-index:9999;right: 0px;"><a href="javascript:void(0);"
                                                                  style="background: black;color: #FFF;"
                                                                  @click="closeImgPanel('qz')">[x]</a></div>
      <ul id="qz-pic">
        <li><img src="../../assets/images/511702201203080036J/1.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/2.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/3.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/4.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/5.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/6.png"/></li>
      </ul>
      <!-- <div id="l1" >Image 1 of 6</div>-->
    </el-row>
    <el-row id="djb" style="position: absolute;left: 40vw; z-index: 999;top: 65px; display: none">
      <div style="position: absolute;z-index:9999;right: 0px;"><a href="javascript:void(0);" style="background: black;color: #FFF;" @click="closeImgPanel('djb')">[x]</a></div>
      <ul id="djb-pic">
        <li><img src="../../assets/images/511702201203080036J/21.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/22.png"/></li>
        <li><img src="../../assets/images/511702201203080036J/23.png"/></li>
      </ul>
      <!-- <div id="l1" >Image 1 of 6</div>-->
    </el-row>
    <div class="toolBar">
      <el-button-group id="btn-group" v-show="toolbarShow" v-model="isShow">
        <el-button @click="zoomin" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-zoom-in" size="small">放大
        </el-button>
        <el-button @click="zoomout" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-zoom-out" size="small">缩小
        </el-button>
        <el-button @click="fitto" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">全图
        </el-button>
        <el-button @click="measureLine" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">测距
        </el-button>
        <el-button @click="measureArea" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">测面
        </el-button>
        <el-button @click="properties(1)" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">属性
        </el-button>
        <!--<el-button @click="properties(2)" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">两区属性
        </el-button>
        <el-button @click="properties(3)" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">片块属性
        </el-button>
        <el-button @click="properties(4)" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-refresh" size="small">地块属性
        </el-button>-->
        <el-button @click="clean" style="background: #455262;color: #fff;border: 1px solid #353f4a"
                   icon="el-icon-delete" size="small">清除
        </el-button>
      </el-button-group>
      <el-button style="background: #455262;color: #fff;border: 1px solid #353f4a" @click="switchToolPanel"
                 icon="el-icon-check" circle size="small"></el-button>
    </div>
    <div id="openBook" v-show="isShow" style="position: absolute;;z-index: 9999; width: auto; top:20%;left:25%;">
      <div style="position:relative; border:1px solid #000;">
        <div style="position: absolute;left:200px; top:520px; width:800px; z-index: 2">
          <nav>
            <ul>
              <li><a id='first' href="#" title='首页'></a></li>
              <li><a id='back' href="#" title='上一页'></a></li>
              <li><a id='next' href="#" title='下一页'></a></li>
              <li><a id='last' href="#" title='尾页'></a></li>
              <li><a id='zoomin' href="#" title='放大'></a></li>
              <li><a id='zoomout' href="#" title='缩小'></a></li>
              <li><a id='slideshow' href="#" title='自动播放'></a></li>
              <li><a id='flipsound' href="#" title='开启声音'></a></li>
              <li><a id='fullscreen' href="#" title='全屏'></a></li>
              <li><a id='thumbs' @click="closePriture" href="javascript:voir(0)" title='关闭'></a></li>
            </ul>
          </nav>
        </div>
        <div id="preview" style="position: absolute;left:30px; top:30px;z-index: 1;">
        </div>
      </div>
    </div>
    <el-dialog title="两区地块表" :visible.sync="lqdkparam.dialogVisible" width="540px" top="28vh">
      <div style="height: 450px;">
        <el-table :data="lqdkparam.data" style="width: 100%">
          <el-table-column
            prop="lqdkdm"
            label="两区地块编码"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="lqdkmc"
            label="两区地块名称"
            width="110">
          </el-table-column>
          <el-table-column
            prop="jyztlxZ"
            label="经营主体类型"
            width="110">
          </el-table-column>
          <el-table-column
            prop="lqdkmjm"
            label="地块面积（亩）"
            width="120">
          </el-table-column>
        </el-table>
        <template>
          <div class="block" style="margin: 15px">
            <span class="demonstration">共计&nbsp;{{lqdkparam.total}}&nbsp;条记录.</span>
            <el-pagination layout="prev, pager, next" @current-change="lqdkHandleCurrentChange"
                           :page-size="8"
                           :total="lqdkparam.total"
                           style="float:right;">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
    <el-dialog title="两区片块表" :visible.sync="lqpkparam.dialogVisible" width="540px" top="28vh">
      <div style="height: 450px;">
        <el-table :data="lqpkparam.data" style="width: 100%">
          <el-table-column
            prop="lqpkdm"
            label="两区片块编码"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="lqpkmc"
            label="两区片块名称"
            width="110">
          </el-table-column>
          <el-table-column
            prop="zrztlxZ"
            label="责任主体类型"
            width="110">
          </el-table-column>
          <el-table-column
            prop="lqpkmjm"
            label="片块面积（亩）"
            width="120">
          </el-table-column>
        </el-table>
        <template>
          <div class="block" style="margin: 15px">
            <span class="demonstration">共计&nbsp;{{lqpkparam.total}}&nbsp;条记录.</span>
            <el-pagination layout="prev, pager, next" @current-change="lqpkHandleCurrentChange"
                           :page-size="8"
                           :total="lqpkparam.total"
                           style="float:right;">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
    <el-dialog title="两区信息" :visible.sync="lqparam.dialogVisible" width="300px" top="28vh">
      <div style="height: 240px;">
        <ul v-for="item in lqparam.data">
          <li>两区代码：{{item.lqdm}}</li>
          <li>两区名称：{{item.lqmc}}</li>
          <li>片块数：{{item.pks}}</li>
          <li>地块数：{{item.dks}}</li>
          <li>两区类型：{{item.lqlx}}</li>
          <li>两区面积（亩）：{{item.lqmj}}</li>
          <li>划定时间：{{item.fromDate}}</li>
        </ul>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import API from "../../api/api_ztts";
  import '@/assets/plug-in/leaflet-measure-path-master/leaflet-measure-path.css';
  import '@/assets/plug-in/leaflet-measure-path-master/leaflet-measure-path';

  export default {
    components: {ElRow},
    data() {
      return {
        filters: {
          name: ""
        },
        map: "",
        vecLayer: "",
        cvaLayer: "",
        imgLayer: "",
        ciaLayer: "",
        cuLayer: "",
        points: [],
        color: "red",
        layers: L.layerGroup(),
        polygon: null,
        areaMeasure: "",
        activeName: 'first',
        total: 0,
        total1: 0,
        total2: 0,
        queryFlag: true,
        page: 1,
        page1: 1,
        page2: 1,
        limit: 0,
        limit1: 0,
        limit2: 0,
        data: [],
        data1: [],
        data2: [],
        isShow: false,
        toolbarShow: true,
        pictures: [],
        lqdkparam: {dialogVisible: false, page: 1, total: 0, limit: 8, lqdm: "", data: []},
        lqpkparam: {dialogVisible: false, page: 1, total: 0, limit: 8, lqdm: "", data: []},
        lqparam: {dialogVisible: false, page: 1, total: 0, limit: 8, lqdkdm: "", lqpkdm: "", data: []},
        queryPolygon: [],
        propertiesFlag: -1,
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },


//===================================================
//      综合查询事件处理
//===================================================
      handleCurrentChange(val) {
        this.queryFlag = false;
        this.page = val;
        this.search();
      },
      handleCurrentChange1(val) {
        this.queryFlag = false;
        this.page1 = val;
        this.search1();
      },
      handleCurrentChange2(val) {
        this.queryFlag = false;
        this.page2 = val;
        this.search2();
      },
      handleSearch() {
        this.total = 0;
        this.page = 1;
        this.total1 = 0;
        this.page1 = 1;
        this.search();
        this.search1();
        this.search2();
        if (this.queryFlag) {
          $("#search-content").slideToggle("slow");
          this.queryFlag = false;
        }
      },
      search: function () {
        let that = this;
        let params = {
          page: that.page,
          limit: 3,
          keys: that.filters.keys
        };
        API.list(params)
          .then(
            function (result) {
              if (result && result.page && result.page.rows) {
                that.total = result.page.total;
                that.data = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });

      },
      search1: function () {
        let that = this;
        let params = {
          page: that.page1,
          limit: 3,
          keys: that.filters.keys
        };
        API.list1(params)
          .then(
            function (result) {
              console.log(result)
              if (result && result.page && result.page.rows) {
                that.total1 = result.page.total;
                that.data1 = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });

      },
      search2: function () {
        let that = this;
        let params = {
          page: that.page2,
          limit: 3,
          keys: that.filters.keys
        };
        API.list2(params)
          .then(
            function (result) {
              if (result && result.page && result.page.rows) {
                that.total2 = result.page.total;
                that.data2 = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });

      },

      // 查询结果按钮相关点击事件
      openLqdkTable: function (code) {
        let that = this;
        that.lqdkparam.dialogVisible = true;
        that.lqdkparam.lqdm = code;
        let params = {
          page: that.lqdkparam.page,
          limit: that.lqdkparam.limit,
          lqdm: that.lqdkparam.lqdm
        };
        API.lqdkTableList(params)
          .then(
            function (result) {
              console.log(result);
              if (result && result.page && result.page.rows) {
                that.lqdkparam.total = result.page.total;
                that.lqdkparam.data = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });
      },
      openLqpkTable: function (code) {
        let that = this;
        that.lqpkparam.dialogVisible = true;
        that.lqpkparam.lqdm = code;
        let params = {
          page: that.lqpkparam.page,
          limit: that.lqpkparam.limit,
          lqdm: that.lqpkparam.lqdm
        };
        API.lqpkTableList(params)
          .then(
            function (result) {
              if (result && result.page && result.page.rows) {
                that.lqpkparam.total = result.page.total;
                that.lqpkparam.data = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });
      },
      openLqByDkTable: function (code) {
        let that = this;
        that.lqparam.dialogVisible = true;
        that.lqparam.data = [];
        that.lqparam.lqdkdm = code;
        let params = {
          page: 1,
          limit: 1,
          lqdkdm: that.lqparam.lqdkdm
        };

        API.lqTableList(params)
          .then(
            function (result) {
              if (result && result.page && result.page.rows) {
                that.lqparam.data = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });
      },
      openLqByPkTable: function (code) {
        let that = this;
        that.lqparam.data = [];
        that.lqparam.dialogVisible = true;
        that.lqparam.lqpkdm = code;
        let params = {
          page: 1,
          limit: 100,
          lqpkdm: that.lqparam.lqpkdm
        };

        API.lqTableList(params)
          .then(
            function (result) {
              if (result && result.page && result.page.rows) {
                that.lqparam.data = result.page.rows;
              }
            },
            function (err) {
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          )
          .catch(function (error) {
            console.log(error);
            that.$message.error({
              showClose: true,
              message: "请求出现异常",
              duration: 2000
            });
          });
      },
      lqdkHandleCurrentChange: function (val) {
        var lqdm = this.lqdkparam.lqdm;
        this.lqdkparam.page = val;
        this.openLqdkTable(lqdm);
      },
      lqpkHandleCurrentChange: function (val) {
        var lqdm = this.lqpkparam.lqdm;
        this.lqpkparam.page = val;
        this.openLqpkTable(lqdm);
      },

      // 片块打开附件图片
      openPriture: function (type) {
        this.isShow = true;
        var html = "<div><img width=\"100%\" height=\"100%\" src=\"http://127.0.0.1:9999/images/cover.jpg\"/></div>";
        html += "<div><img width=\"100%\" height=\"100%\" src=\"http://127.0.0.1:9999/images/design.png\"/></div>";
        html += "<div><img width=\"100%\" height=\"100%\" src=\"http://127.0.0.1:9999/images/easy.png\"/></div>";
        html += "<div><img width=\"100%\" height=\"100%\" src=\"http://127.0.0.1:9999/images/cover_last.png\"/></div>";
        $('#preview').html(html);
        $('#preview').wowBook({
          width: 800,
          height: 500,
          hardcovers: true,
          controls: {
            zoomIn: '#zoomin',
            zoomOut: '#zoomout',
            next: '#next',
            back: '#back',
            first: '#first',
            last: '#last',
            slideShow: '#slideshow',
            flipSound: '#flipsound',
            fullscreen: '#fullscreen'
          }
        });
      },
      closePriture: function () {
        this.isShow = false;
      },

//===================================================
//      地图专题图相关事件处理
//===================================================
      initMap: function () {
        var vecLayer; // 矢量底图
        var cvaLayer; // 矢量地标
        var imgLayer; // 影像底图
        var ciaLayer; // 影像地标
        this.map = L.map("map", {
          //center: [57.69, 11.9],
          //  center: [31.317434, 107.497724],  //达州
          //  center: [35.8425,114.1458 ],
          // center: [37.950588, 115.224251],
          center: [19.592662, 109.550795],
          zoom: 15,
          zoomControl: false
        });

        L.control.scale().addTo(this.map);  // 比例尺
        this.vecLayer = L.tileLayer("http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}", {
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
        }).addTo(this.map);
        this.vecLayer = L.tileLayer("http://t{s}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}", {
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
        }).addTo(this.map);
      },

      // 测量距离工具
      measureLine: function () {
        this.points = [];
        this.map.on('click', this.measureLineClick).on('dblclick', this.measureLineDblclick);
      },
      measureLineClick: function (e) {
        this.map.doubleClickZoom.disable();
        this.points.push(e.latlng);
        this.map.on('mousemove', this.measureLineMousemove);
      },
      measureLineMousemove: function (e) {
        this.points.push(e.latlng);
        if (this.polygon)
          this.map.removeLayer(this.polygon);
        this.polygon = L.polyline(this.points, {showMeasurements: true, color: 'blue'});
        this.polygon.addTo(this.layers);
        this.layers.addTo(this.map);
        this.points.pop();
      },
      measureLineDblclick: function () {
        this.map.off('click', this.measureLineClick);
        this.map.off('mousemove', this.measureLineMousemove);
        this.map.off('dblclick', this.measureLineDblclick);
      },
      //侧面
      measureArea: function () {
        this.points = [];
        this.map.on('click', this.measureClick).on('dblclick', this.measureDblclick);
        ;
      },
      measureClick: function (e) {
        this.map.doubleClickZoom.disable();
        this.points.push(e.latlng);
        this.map.on('mousemove', this.measureMousemove);
      },
      measureMousemove: function (e) {
        this.points.push(e.latlng);
        if (this.polygon)
          this.map.removeLayer(this.polygon);
        this.polygon = L.polygon(this.points, {showMeasurements: true, color: 'blue'});

        this.polygon.addTo(this.map);
        this.points.pop();
      },
      measureDblclick: function (e) { // 双击结束
        this.map.off('click', this.measureClick)
        this.map.off('mousemove', this.measureMousemove);
        this.map.off('dblclick', this.measureDblclick);
      },
      addLayer: function (url) {
        let that = this;
        try {
          if (this.map.hasLayer(this.cuLayer)) {
            this.map.removeLayer(this.cuLayer);

            // alert(this.map.removeLayer(this.cuLayer));
            // console.log(this.map.removeLayer(this.cuLayer));
          }
        } catch (e) {
        }
        this.cuLayer = L.esri.dynamicMapLayer({
          // url: "http://192.168.1.66:6080/arcgis/rest/services/LQCS/MapServer",

          // url: "http://gykj123.cn:6080/arcgis/rest/services/HNED/MapServer",
          // url: "http://gykj123.cn:6080/arcgis/rest/services/HNZCYZT1/MapServer",
          url: url,
          opacity: 0.8
        });
        this.cuLayer.bindPopup(
          function (err, featureCollection, response) {
            console.log(err);
            console.log(response)
            console.log(featureCollection);
            console.log(featureCollection.features);
            var features = featureCollection.features;
            // console.log(features);
            var flag = that.propertiesFlag;
            // console.log(flag);
            var currentFeature = {};
            var coordinatesPolygon = {};
            if (that.propertiesFlag != 0) {
              for (var i in features) {
                if (features[i].layerId == flag) {
                  currentFeature = features[i].properties;
                  console.log(currentFeature);
                  coordinatesPolygon = features[i].geometry.coordinates[0];
                  ;
                  break;
                }
              }
              if (that.propertiesFlag == 2) {  //两区属性
                that.drawyPolygon(coordinatesPolygon);
                console.log(currentFeature);
                /*var html = "<ul>";
                html += "<li>两区代码:" + currentFeature.LQDM + "</li>";
                html += "<li>两区名称:" + currentFeature.LQMC + "</li>";
                html += "<li>片块数:?</li>";
                html += "<li>地块数:?</li>";
                html += "<li>两区类型:" + currentFeature.LQLX + "</li>";
                html += "<li>两区面积(亩):" + currentFeature.LQMJM + "</li>";
                html += "<li>划定时间:" + currentFeature.FROM_DATE + "</li>";
                html += "</ul>";*/
                var html = "<ul>";
                html += "<li>两区代码:" + currentFeature.LQDM + "</li>";
                html += "<li>两区名称:" + currentFeature.LQMC + "</li>";
                html += "<li>片块数:?</li>";
                html += "<li>地块数:?</li>";
                html += "<li>两区类型:" + currentFeature.LQLX + "</li>";
                html += "<li>两区面积(亩):" + currentFeature.LQMJM + "</li>";
                html += "<li>划定时间:" + currentFeature.FROM_DATE + "</li>";
                html += "</ul>";
                return html;
              }else if (that.propertiesFlag == 1) {  //两区片块属性
                that.drawyPolygon(coordinatesPolygon);
                var html = "<ul>";
                html += "<li>村组:" + currentFeature.村组 + "</li>";
                html += "<li>地块名称:" + currentFeature.地块名称 + "</li>";
                html += "<li>备注:" + currentFeature.备注 + "</li>";
                html += "<li>面积:" + currentFeature.面积 + "</li>";
                html += "</ul>";
                return html;
              } else if (that.propertiesFlag == 3) {  //两区片块属性
                that.drawyPolygon(coordinatesPolygon);
                var html = "<ul>";
                html += "<li>两区片块代码:" + currentFeature.LQPKDM + "</li>";
                html += "<li>两区片块名称:" + currentFeature.LQPKCM + "</li>";
                html += "<li>高标准基本农田建设情况:XXXXXX</li>";
                html += "<li>高标准基本农田占比:XXX</li>";
                html += "<li>责任主体代表名称:XXXXXX</li>";
                html += "<li>责任主体代表证件号码:1231322323</li>";
                html += "<li>涉及行政村:A村、B村:</li>";
                html += "<li>起止时间:" + currentFeature.FROM_DATE + "</li>";
                html += "</ul>";
                return html;
              } else if (that.propertiesFlag == 4) {  //两区地块属性
                that.drawyPolygon(coordinatesPolygon);
                var html = "<ul>";
                html += "<li>两区地块代码:" + currentFeature.LQDKDM + "</li>";
                html += "<li>两区地块名称:" + currentFeature.LQDKCM + "</li>";
                html += "<li>质量等级:XXXXXX</li>";
                html += "<li>是否高标准基本农田:XXX</li>";
                html += "<li>经营主体名称:XXXXXX</li>";
                html += "<li>两区地块面积（亩）:1231322323</li>";
                html += "<li>划分区域:xxxxx</li>";
                html += "</ul>";
                return html;
              }
            }
          });
        this.map.addLayer(this.cuLayer);

      },

      drawyPolygon: function (coordinatesPolygon) {
        let that = this;
        if (that.map.hasLayer(that.queryPolygon)) {
          that.map.removeLayer(that.queryPolygon);
          that.queryPolygon = [];
        }
        for (var i = 0; i < coordinatesPolygon.length; i++) {
          var temp = [];
          temp.push(coordinatesPolygon[i][1])
          temp.push(coordinatesPolygon[i][0])
          that.queryPolygon.push(temp)
        }

        that.queryPolygon = L.polygon(that.queryPolygon, {
          showMeasurements: false,
          color: '#3300ff',
          measurementOptions: {imperial: true}
        })
          .addTo(that.map);
      },
      fittoMap: function (text, layers, fields, zoom) {
        let that = this;
        if (!this.cuLayer) {
          alert("图层未打开");
          return;
        }
        this.cuLayer.find()
          .layers(layers)
          .text(text)
          .fields(fields)
          .run(function (error, featureCollection) {
            console.log(featureCollection);
            var coordinatesPolygon = featureCollection.features[0].geometry.coordinates[0];
            that.drawyPolygon(coordinatesPolygon);
            that.map.flyTo({
              lat: featureCollection.features[0].geometry.coordinates[0][0][1],
              lng: featureCollection.features[0].geometry.coordinates[0][0][0]
            }, zoom);
          });
      },

      //清除底图图层
      cleanLayers: function () {
        if (this.map.hasLayer(this.vecLayer)) {
          this.map.removeLayer(this.vecLayer);
        }
        if (this.map.hasLayer(this.cvaLayer)) {
          this.map.removeLayer(this.cvaLayer);
        }
        if (this.map.hasLayer(this.imgLayer)) {
          this.map.removeLayer(this.imgLayer);
        }
        if (this.map.hasLayer(this.ciaLayer)) {
          this.map.removeLayer(this.ciaLayer);
        }
      },
      // 底图切换
      switchMapType: function (mapType) {
        if (mapType == 'img') {
          this.cleanLayers();
          this.imgLayer = L.tileLayer("http://t{s}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
          }).addTo(this.map);
          this.ciaLayer = L.tileLayer("http://t{s}.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
          }).addTo(this.map);
        } else {
          this.cleanLayers();
          this.vecLayer = L.tileLayer("http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
          }).addTo(this.map);
          this.cvaLayer = L.tileLayer("http://t{s}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
          }).addTo(this.map);
        }
      },

      // 顶部按钮组
      zoomin: function () {
        var zoom = this.map.getZoom();
        this.map.setZoom(zoom + 1, {});
      },
      zoomout: function () {
        var zoom = this.map.getZoom();
        this.map.setZoom(zoom - 1, {});
      },
      fitto: function () {
        this.map.flyTo({
          lat: 31.337516,
          lng: 107.490562
        }, 13);
      },
      properties: function (flag) {
        this.propertiesFlag = flag;
      },
      clean: function () {
        this.points = [];
        this.propertiesFlag = -1;
        if (this.polygon) {
          this.map.removeLayer(this.polygon);
        }
        if (this.map.hasLayer(this.queryPolygon)) {
          this.map.removeLayer(this.queryPolygon);
          this.queryPolygon = [];
        }
      },
      switchToolPanel: function () {
        if (this.toolbarShow) {
          this.toolbarShow = false;
        } else {
          this.toolbarShow = true;
        }
      }
    },
    mounted() {
      this.initMap();
    /*  this.aaa();*/
      //  this.addLayer('http://gykj123.cn:2096/arcgis/rest/services/CBDFBd/MapServer');
    }
  }
</script>
<style>
  .toolBar {
    width: auto;
    height: 38px;
    line-height: 34px;
    /*  background: #455262;*/
    right: 20px;
    z-index: 999;
    top: 30px;
    position: absolute;
    box-shadow: 1px 2px 50px rgba(0, 0, 0, .15);
    border-radius: 3px;
  }

  .toolBar .item {
    float: left;
    height: auto;
    width: 60px;
    padding: 0 5px;
    font-size: 14px;
    border-left: 1px #dbdee2 dashed;
    vertical-align: middle;
    cursor: pointer;
    overflow: visible;
    color: #FFF;
  }

  .report-panel {
    /*padding: 20px;*/
    /*  height: 120px;
      margin: 10px;
      text-align: center;*/
    border-radius: 4px;
    padding: 20px;
    font-size: 16px;
    font-family: "微软雅黑";
    margin: 5px;
    height: 90px;
    box-sizing: border-box;
    color: #fff;
  }

  .search-content {
    padding: 10px;
    background: rgba(0, 0, 0, 0.75);
    height: 70vh;
    display: none;
    -webkit-transition: border linear .2s, -webkit-box-shadow linear .5s;
    border-color: rgba(141, 39, 142, .75);
    -webkit-box-shadow: 0 0 20px rgb(23, 21, 22);
  }

  /* 搜索结果框 TAB 样式重写 */
  .tab-rewrite {
    /*background: red;*/
    padding: 0 0;
  }

  .gritter-item-wrapper {
    /* margin-top: 10px;*/
    position: relative;
    width: 100%;
    height: 180px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
  }

  .report-panel .value {
    font-size: 16px;
    line-height: 24px;
  }

  .bg-blue {
    background-color: #409eff;
    color: #FFF;
  }

  .bg-green {
    background-color: #00db6b;
    color: #FFF;
  }

  .bg-violet {
    background-color: #a872f9;
    color: #FFF;
  }

  .bg-yellow {
    background-color: #ec971f;
    color: #FFF;
  }

  .mapType-wrapper {
    position: absolute;
    bottom: 1px;
    right: 0px;
    z-index: 9999;
    width: 190px;
    height: 68px;
    background: #FFF;
  }

  .mapType-wrapper .dt {
    width: 84px;
    height: 59px;
    margin: 5px;
    color: #fff;
    cursor: pointer;
    background-image: url(//webmap1.bdimg.com/wolfman/static/common/images/new/maptype_8a68f95.png);
  }

  .mapType-wrapper .dt:hover {
    margin: 4px;
    border: 1px solid #337ab7;
  }

  .mapType-wrapper .dt div {
    position: absolute;
    width: auto;
    top: 45px;
    font-size: 14px;
    background: #337ab7;
  }

  .mapTypeVec {
    background-position: 0 0;
  }

  .mapTypeImg {
    background-position: 0 -181px;
  }

  .search-panel {
    position: absolute;
    width: 360px;
    height: 80vh;
    left: 25px;
    z-index: 999;
    top: 26px;
  }

  .menus-panel {
    position: absolute;
    right: 20px;
    top: 30%;
    z-index: 999;
  }

  .menus-panel dl dd {
    position: relative;
    width: 72px;
    height: 72px;
    border-left: 1px solid #FFF;
    border-right: 1px solid #FFF;
    border-bottom: 1px solid #FFF;
    font-size: 12px;
    background-color: rgba(69, 82, 98, 0.8);
    /* border-bottom: solid 1px #555666;*/
    text-align: center;
    background-repeat: no-repeat;
    background-position: center 20%;
    cursor: pointer;
  }

  .menus-panel dl dd:hover {
    /* background-color: #e40231;
     border-bottom: solid 1px #a40324;*/
  }

  .menus-panel dl dd:hover .floating_left {
    display: block;
  }

  .menus-panel dl dd .floating_left .title {
    width: 100%;
    padding: 0px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #fff;
    color: grey;
    font-weight: 600;
  }

  .consult, .i1 {
    background-image: url(../../assets/images/i1.png);
    background-size: 34px 34px;

  }

  .i2 {
    background-image: url(../../assets/images/i2.png);
    background-size: 32px 32px;
  }

  .qrcord {
    /*  background-image: url(images/icon0701/erweima.png);*/
  }

  .return {
    /* background-image: url(images/icon0701/fanhui.png);*/
  }

  .menus-panel dd span {
    color: #fff;
    display: block;
    padding-top: 50px;
  }

  .floating_left {
    color: #FFF;
    position: absolute;
    text-align: left;
    left: -162px;
    top: -1px;
    width: 160px;
    min-height: 289px;
    background-color: rgba(69, 82, 98, 0.8);
    border-bottom: solid 1px #fff;
    border-top: solid 1px #fff;
    border-left: solid 1px #fff;
    border-right: solid 1px #fff;
    display: none;
  }

  .floating_left h4 {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 0px;
    line-height: 0;
  }

  .floating_left ul {
    margin-left: 20px;
    margin-top: 5px;
  }

  .floating_left ul li {
    list-style-type: none;
  }

  .floating_left a {
    color: #fff;
    line-height: 80px;
  }

  .floating_ewm {
    height: 260px;
    top: -180px;
  }

  .floating_ewm i {
    /*background-image: url(images/erweima.png);*/
    display: block;
    width: 145px;
    height: 145px;
    margin: auto;
    margin-top: 7px;
  }

  .floating_ewm p {
    color: #fff;
    margin-top: 5px;
  }

  .floating_ewm .qrcord_p01 {
    font-size: 12px;
    line-height: 20px;
  }

  .floating_ewm .qrcord_p02 {
    font-size: 18px;
  }

  /* book 插件操作按钮组   */
  nav li {
    float: left;
    bborder-left: 1px solid #d2d2d2;
    list-style-type: none;
  }


</style>
