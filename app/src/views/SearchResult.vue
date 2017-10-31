<template>
  <div class="searchResult">
    <SideMenu></SideMenu>
    <div class="resultPanel">
      <div class="toolbar">
        <el-button-group class="toolbox">
          <el-button class="button">
            <img src="../assets/images/list.png" alt="列表式"></img>
          </el-button>
          <el-button class="button">
            <img src="../assets/images/table.png" alt="表格式"></img>
          </el-button>
        </el-button-group>
        <el-select class="sortSelection toolbox"
          size="small"
          v-model="sortSelected">
          <el-option
            v-for="(option, index) in sortOptions"
            :key="option.label"
            :label="option.label"
            :value="option.value">
            <img :src="option.imgUrl" alt="排序方向">
            <span>{{ option.label }}</span>
          </el-option>
        </el-select>
        <el-button class="toolbox button"
          v-for="(button, index) in buttons"
          :key="button.value"
          :style="buttonStyle(button.imgUrl)"
          @click="clickToolButton(button.value)">
          {{ button.name }}
        </el-button>
      </div>
      <div class="listPanel">
        <div class="selectAll">
          <el-checkbox v-model="selectAll">全选</el-checkbox>
        </div>
        <div class="patentList">
          <div class="patent"
            v-for="(patent, index) in patentList"
            :key="patent.patent_id">
            <el-checkbox v-model="patent.selected"></el-checkbox>
            <img :src="patent.src" class="thumbnail"></img>
            <div class="patentInfo">
              <div class="patentInfo__header">
                <span class="header__title">{{ patent.invention_title }}</span>
                <div class="header__tags">
                  <el-tag class="header__tag">存活期: {{ patent.maintenance_period }}年 </el-tag>
                  <el-tag class="header__tag header__tag-value">价值度: {{ patent.value_degree.value }}</el-tag>
                  <el-tag class="header__tag" v-if="patent.award">{{ patent.award }}</el-tag>
                </div>
              </div>
              <div class="patentInfo__info">
                <div class="info__item">申请人: <span class="info__link info__link-light">{{ patent.applicant_name }}</span></div>
                <div class="info__item">发明人:
                  <span class="info__link"
                    v-for="(inventor, index) in patent.inventor_list"
                    :key="inventor"
                    >{{ inventor }}
                  </span>
                </div>
                <div class="info__item">IPC分类号: <span class="info__link">{{ patent.ipc_main_classification_no }}</span></div>
              </div>
              <div class="patentInfo__info">
                <div class="info__item">申请日: <span>{{ patent.apply_date }}</span></div>
                <div class="info__item">申请号: <span>{{ patent.apply_no }}</span></div>
                <div class="info__item">公开日: <span>{{ patent.publish_date }}</span></div>
                <div class="info__item">公开号: <span>{{ patent.publish_no }}</span></div>
              </div>
              <div class="patentInfo__abstract">
                摘要: {{ patent.abstract_info }}
                <span class="abstract__button">更多</span>
              </div>
              <div class="patentInfo__links">
                <span class="info__link">申请人经营信息</span>
                <span class="info__link">相似专利</span>
                <span class="info__link">潜在卖家</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <span class="pagination__info">总计{{ }}</span>
          <el-pagination class="pagination__page"
            :page-size="10"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
      <div class="recommendPanel">
        <span class="panel__title">相关推荐</span>
        <div class="recommend__category" v-if="recommend_list.keyword_list.length">
          <span class="recommend__category-name">关键词</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(keyword, index) in recommend_list.keyword_list"
            :key="keyword"
            >{{ keyword }}
          </el-tag>
        </div>
        <div class="recommend__category" v-if="recommend_list.ipc_main_classification_list.length">
          <span class="recommend__category-name">IPC</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(ipc, index) in recommend_list.ipc_main_classification_list"
            :key="ipc"
            >{{ ipc }}
          </el-tag>
        </div>
        <div class="recommend__category" v-if="recommend_list.applicant_list.length">
          <span class="recommend__category-name">申请人</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(applicant, index) in recommend_list.applicant_list"
            :key="applicant"
            >{{ applicant }}
          </el-tag>
        </div>
        <div class="recommend__category" v-if="recommend_list.product_list.length">
          <span class="recommend__category-name">产品</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(product, index) in recommend_list.product_list"
            :key="product"
            >{{ applicant }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu'
import SearchList from '../components/SearchList'

export default {
  data () {
    return {
      sortSelected: '',
      sortOptions: [
        {
          imgUrl: require('../assets/images/down.png'),
          label: '相关度',
          value: '1',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '相关度',
          value: '2',
          direction: 'ascending'
        },
        {
          imgUrl: require('../assets/images/down.png'),
          label: '申请时间',
          value: '3',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '申请时间',
          value: '4',
          direction: 'ascending'
        },
        {
          imgUrl: require('../assets/images/down.png'),
          label: '价值度',
          value: '1',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '价值度',
          value: '2',
          direction: 'ascending'
        }
      ],
      buttons: [
        {
          name: '保存',
          value: 'save',
          imgUrl: require('../assets/images/save.png')
        },
        {
          name: '加入收藏',
          value: 'favor',
          imgUrl: require('../assets/images/favor.png')
        },
        {
          name: '加入分析库',
          value: '',
          imgUrl: require('../assets/images/analysis.png')
        }
      ],
      selectAll: false,
      patentList: [
        {
          'src': require('../assets/images/zl.png'),
          'patent_id': 'CN201020200598.6',
          'relevance_score': 8.595330238342285,
          'invention_title': '设备和通风设备',
          'applicant_name': '福迈克斯有限公司',
          'applicant_id': '5401655b-60bf-4320-bce9-684ecacceda5',
          'inventor_list': [
            '拉尔斯·赫德隆', '拉尔斯·卡兰德'
          ],
          'ipc_main_classification_no': 'F24F13/32',
          'apply_type': '实用新型专利',
          'apply_date': '2010-05-24',
          'apply_no': '201020200598.6',
          'publish_date': '2011-05-11',
          'publish_no': '201828002',
          'gazette_date': '2011-05-11',
          'area': null,
          'award': null,
          'application_time_span': 7,
          'maintenance_period': 6,
          'abstract_info': '本实用新型涉及一种设备(1)，被用在通风设备中以保持和控制空气通道(2)。设备(1)包括沿空气通道的外表面(2A)布置的单个臂构造(1.1)。臂构造(1.1)包括前后布置的两个臂部(3，4)，使第一臂部(3)与固定设备(6)结合的第一接头(5)固定和保持臂构造(1.1)的基本位置并且可以对臂构造(1.1)和空气通道(2)进行不同的定位、弯曲和拉伸，使第一臂部(3)与第二臂部(4)结合的第二接头(7)可以对臂构造(1.1)和空气通道(2)进行不同的定位、弯曲和拉伸。每个臂部(3，4)包括延长的铝质型面(8，9)。本实用新型还涉及包括所述设备(1)的通风设备。  ',
          'value_degree': {
            'value': 2.6,
            'degree': 0.13
          },
          'ipc_meta': {
            'neic_category_list': [
              'E'
            ],
            'ipc_main_classification_number': 'F24F13/32',
            'ipc_main_section': 'F',
            'ipc_main_class': 'F24',
            'ipc_main_subclass': 'F24F',
            'ipc_main_group_stroke_main': '13/00',
            'ipc_main_group_stroke_main_or_sub': '13/32'
          },
          'product_classification_list': [
            {
              'product_type': '412105  电影设备零件和附件',
              'similarity': 0.37161764478043346
            }
          ]
        }
      ],
      recommend_list: {
        'product_list': [],
        'keyword_list': [],
        'ipc_main_classification_list': [
          'H04W76/00',
          'H01R12/00',
          'B23K31/02',
          'H04B7/26',
          'B65H3/02',
          'G06F1/16',
          'H04L29/06',
          'F24F13/32',
          'F24F13/00'
        ],
        'applicant_list': [
          '英特尔IP公司',
          '株式会社东芝',
          '福迈克斯有限公司',
          '苹果公司',
          '西安鹏博金属科技有限公司',
          '英特尔公司',
          '诺基亚通信公司',
          '株式会社理光',
          '佳能株式会社'
        ]
      }
    }
  },
  methods: {
    buttonStyle (imgUrl) {
      return {
        background: 'url(' + imgUrl + ') no-repeat 5px center #fff',
        paddingLeft: '25px',
        paddingRight: '5px'
      }
    },
    clickToolButton (command) {
    }
  },
  components: {
    SideMenu, SearchList
  }
}
</script>

<style lang="scss">
  .searchResult {
    display: flex;
    min-height: calc(100% - 45px);
  }
  .resultPanel {
    width: calc(100% - 200px);
    padding: 10px;
    background: #eee;
  }
  .toolbar {
    display: flex;
    align-items: center;
  }
  .toolbox {
    height: 30px;
  }
  .button {
    padding: 5px 10px;
  }
  .sortSelection {
    width: 120px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .listPanel {
    background: #fff;
    margin-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .selectAll {
    border-bottom: 2px solid #e5e5e5;
  }
  .patentList {
    display: flex;
    flex-direction: column;
  }
  .patent {
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 2px solid #e5e5e5;
  }
  .thumbnail {
    width: 110px;
    height: 160px;
    margin-left: 5px;
  }
  .patentInfo {
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 5px;
    font-size: 14px;
  }
  .patentInfo__header {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .header__title {
      font-weight: 700;
    }
    .header__tag {
      background: #fff;
      color: #000;
      border-color: #dbdbdb;
    }
    .header__tag-value {
      cursor: pointer;
    }
  }
  .patentInfo__info {
    display: flex;
  }
  .info__item {
    margin-right: 30px;
  }
  .info__link {
    text-decoration: underline;
    cursor: pointer;
    color: #4cbaec;
  }
  .info__link-light {
    color: #ec0000;
  }
  .patentInfo__abstract {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    background: #f8f8f8;
    position: relative;
  }
  .abstract__button {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #b7b7b7;
    text-decoration: underline;
    cursor: pointer;
  }
  .patentInfo__links {
    .info__link {
      margin-right: 15px;
    }
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .recommendPanel {
    padding-top: 10px;
  }
  .panel__title {
    font-weight: 700;
  }
  .recommend__category {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    font-size: 14px;
    .recommend__category-name {
      flex-basis: 70px;
    }
    .recommend__category-tag {
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
