<template lang="html">
  <div>
    <myheader></myheader>

    <div class="search">
      <searchbar></searchbar>
      <!--el-row>
        <span>首页n条专利，共n条相关专利</span>
      </el-row-->
    </div>

    <div class="toolbar">
      <el-row>
        <el-col :span="4">
          <div class="tab-group">
            <div class="tab" @click="switchSidebar('filter')">过滤</div>
            <div class="tab" @click="switchSidebar('recentSearch')">最近搜索</div>
            <router-link to="CategoryNav" class="tab" tag="span">分类导航</router-link>
          </div>
        </el-col>

        <el-col :span="8" :offset="2">
          <div class="tab-group">
            <div class="tab" @click="toggleDisplayType('abstract')">摘要式</div>
            <div class="tab" @click="toggleDisplayType('table')">表格式</div>

            <el-popover ref="popoverSave" placement="top" width="400" trigger="click" v-model="savePopover" v-on:hide="resetSavePopover">
              <h3>保存范围:</h3>
              <div class="save-choice">
                <el-checkbox v-model="savePatent.saveChecked">勾选的专利</el-checkbox>
              </div>
              <div class="save-choice">
                <el-checkbox v-model="savePatent.savePage">
                  从<el-input class="page-input" size="mini" v-model="savePatent.pageStart" :disabled="!savePatent.savePage"></el-input>页到<el-input class="page-input" size="mini" v-model="savePatent.pageEnd" :disabled="!savePatent.savePage"></el-input>页
                </el-checkbox>
              </div>
              <div class="popover-button">
                <el-button size="small">保存</el-button>
                <el-button size="small" @click="hideSavePopover">取消</el-button>
              </div>
            </el-popover>

            <el-popover ref="popoverFavor" placement="top" width="400" trigger="click" v-model="favorPopover" v-on:hide="resetFavorPopover">
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="6">
                  <h3>收藏夹名称:</h3>
                </el-col>
                <el-col :span="10">
                  <el-input size="small"></el-input>
                </el-col>
                <el-col :span="6" :offset="2">
                  <el-button size="small">创建并加入</el-button>
                </el-col>
              </el-row>
              <el-table :data="favorTable" border class="popover-table">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="collection" label="收藏夹"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="编辑">
                  <template scope="scope">
                    <div class="popover-cell">
                      <el-button size="mini">收藏</el-button>
                      <el-button size="mini">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="popover-button">
                <el-button size="small">保存</el-button>
                <el-button size="small" @click="hideFavorPopover">取消</el-button>
              </div>
            </el-popover>

            <div class="tab" v-popover:popoverSave>保存</div>
            <div class="tab" v-popover:popoverFavor>加入收藏</div>
            <div class="tab">加入分析库</div>
          </div>
        </el-col>

        <el-col :span="8" :offset="1">
          <div class="tab-group">
            <div class="tab tab-order" v-for="(value, key) in sorts" :key="key" @click="sort(key, value.direction)">
              {{ value.message }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="main">
      <el-row>
        <el-col :span="4">
          <myfilter v-if="sideBarSelected === 'filter'"></myfilter>
          <div v-else-if="sideBarSelected === 'recentSearch'" id="recentSearch">
            <p v-for="item, index in recentSearch" @click="search(item.message)">{{ item.message }}</p>
          </div>
          <sideNav v-else></sideNav>
        </el-col>

        <el-col :span="17" :offset="2">
          <searchlist :displayType="displayType"></searchlist>
          <recommend></recommend>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import bus from '../bus.js'
import state from '../state.js'
import {sendRequest} from '../Api'

import myheader from '../components/Header'
import myfilter from '../components/Filter'
import searchlist from '../components/SearchList'
import recommend from '../components/Recommend'
import searchbar from '../components/SearchBar'
import sideNav from '../components/sideNav'

export default {
  data () {
    return {
      sideBarSelected: 'filter',
      displayType: 'abstract',
      sorts: {
        relevance: {
          message: '相关度',
          direction: 'decending'
        },
        apply_type: {
          message: '申请时间',
          direction: 'decending'
        },
        value_degree: {
          message: '价值度',
          direction: 'decending'
        },
        potential_buyer_number: {
          message: '潜在买家数',
          direction: 'decending'
        },
        similar_patent_number: {
          message: '相似专利数',
          direction: 'decending'
        }
      },
      recentSearch: [
        {
          message: '电力载波技术'
        },
        {
          message: '制冷装置'
        },
        {
          message: '国网冀北电力'
        }
      ],
      savePopover: false,
      savePatent: {
        saveChecked: false,
        savePage: false,
        pageStart: '',
        pageEnd: ''
      },
      favorPopover: false,
      favorTable: [
        {
          collection: 'vue',
          createTime: '2016-02-18'
        },
        {
          collection: 'react',
          createTime: '2016-02-18'
        }
      ]
    }
  },
  methods: {
    sort (target, direction) {
      let params = {
        target: target,
        direction: direction,
        session_id: state.get('session_id'),
        per_page: state.get('per_page'),
        page: state.get('page')
      }
      this.sorts[target].direction === 'decending' ? this.sorts[target].direction = 'ascending' : this.sorts[target].direction = 'decending'
      sendRequest.sort.post(params).then((data) => {
        state.set('patentList', data.patent_list)
      })
    },
    toggleDisplayType: function (type) {
      this.displayType = type
    },
    switchSidebar: function (type) {
      this.sideBarSelected = type
    },
    search: function (keyword) {
      // 点击最近搜索
      state.setSearchParams('query', keyword)
      sendRequest.search.post(state.get('searchParams')).then((data) => {
        this.sideBarSelected = 'filter'
        bus.$emit('search', data)
      })
    },
    hideSavePopover: function () {
      this.savePopover = false
    },
    resetSavePopover: function () {
      this.savePatent.saveChecked = false
      this.savePatent.savePage = false
    },
    hideFavorPopover: function () {
      this.favorPopover = false
    },
    resetFavorPopover: function () {

    }
  },
  watch: {
    sideBarSelected: function (type) {
      switch (type) {
        case 'recentSearch':
          /*
          this.$http.get('')
            .then((response) => {

            })
            .catch((error) => {
              console.log(error)
            })
          */
          break
        default:
          break
      }
    }
  },
  created () {
  },
  components: {
    myheader, myfilter, searchlist, recommend, searchbar, sideNav
  }
}
</script>

<style lang="scss" scoped>
  .tab-group {
    display: flex;
    justify-content: space-between;
    .tab {
      flex: 1;
      border: 1px solid #000;
      border-right: none;
      padding-top: .5em;
      padding-bottom: .5em;
      cursor: default;
      &:last-child {
        border-right: 1px solid #000;
      }
    }
    .tab-order {
    }
  }
  .page-input {
    width: 10%;
  }
  .save-choice {
    margin-top: 1em;
  }
  .popover-header {
    display: flex;
    input {
      width: 50%;
    }
  }
  .popover-button {
    display: flex;
    justify-content: flex-end;
  }
  .popover-cell {
    display: flex;
    justify-content: space-around;
  }
  .popover-table {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .toolbar {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  #recentSearch {
    text-align: left;
    padding-left: 1em;
    border: 1px solid #000;
    p {
      cursor: pointer;
    }
  }
</style>
