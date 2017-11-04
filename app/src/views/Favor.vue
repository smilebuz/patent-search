<template lang="html">
  <div class="favor">
    <div class="favor__sidemenu">
      <div class="favor__toolbuttongroup">
        <el-button class="button button-create">新建</el-button>
        <el-button class="button button-search">搜索</el-button>
      </div>
      <div class="folder__list">
        <div class="folder__item"
          v-for="(favor, index) in favorList"
          :key="favor.id">
          <div class="folder__info">
            <img src="../assets/images/folder.png" alt="文件夹" class="folder__img"></img>
            <span v-if="!favor.editStatus">{{ favor.name }}</span>
            <el-input class="folder__name-input"
              size="small"
              v-if="favor.editStatus"
              v-model="favor.nameEdit">
            </el-input>
            <img class="folder__img folder__img-tool"
              src="../assets/images/right.png"
              alt="保存修改"
              v-if="favor.editStatus">
            </img>
            <img class="folder__img folder__img-tool"
              src="../assets/images/not.png"
              alt="取消修改"
              v-if="favor.editStatus">
            </img>
          </div>
          <div class="folder__toolimg">
            <img class="folder__img folder__img-tool"
              src="../assets/images/write.png"
              alt="编辑"
              v-if="!favor.editStatus"
              @click="showNameInput(index)">
            </img>
            <img class="folder__img folder__img-tool"
              src="../assets/images/delete.png"
              alt="删除"
              v-if="!favor.editStatus"
              @click="deleteFavorFolder(favor.id)">
            </img>
          </div>
        </div>
      </div>
    </div>
    <div class="resultPanel">
      <div>
        <el-table
          border
          align="left"
          :data="patentList"
          key="patentTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="apply_type" label="专利类型" width="80"></el-table-column>
          <el-table-column prop="publish_no" label="公开号" width="100"></el-table-column>
          <el-table-column prop="invention_title" label="专利名称"></el-table-column>
          <el-table-column prop="applicant_name" label="专利权人" width="165"></el-table-column>
          <el-table-column label="发明人" width="180">
            <template slot-scope="scope">
              <span
                v-for="(inventor, index) in scope.row.inventor_list"
                :key="inventor"
                >{{ inventor }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="apply_date" label="申请日" width="100"></el-table-column>
          <el-table-column prop="publish_date" label="公开日" width="100"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '../components/Header'

import state from '../state/searchResult/state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      favorList: [
        {
          name: '发电机',
          id: 0
        },
        {
          name: '设备',
          id: 1
        }
      ],
      favors: [],
      favorTable: [],
      favorColumns: [
        {
          'prop': 'apply_type',
          'label': '专利类型'
        },
        {
          'prop': 'application_doc_number',
          'label': '申请号'
        },
        {
          'prop': 'invention_title',
          'label': '专利名称'
        },
        {
          'prop': 'applicant_name',
          'label': '申请人'
        },
        {
          'prop': 'inventor_list',
          'label': '发明人'
        },
        {
          'prop': 'apply_date',
          'label': '申请日'
        },
        {
          'prop': 'ipc_main_classification_no',
          'label': '分类号'
        }
      ],
      patentList: []
    }
  },
  methods: {
    showNameInput (index) {
      let favor = this.favorList[index]
      favor.editStatus = true
      this.$set(this.favorList, index, favor)
    },
    fetchFavorPatents (favorId) {
      state.set('favorId', favorId)
      let ids = {
        userId: state.get('userId'),
        favorId: state.get('favorId')
      }
      sendRequest.favorPatent.get(null, ids).then(data => {
        this.favorTable = [...data.patent_list]
      })
    },
    editFavorFolder (favor) {
    },
    deleteFavorFolder (favorId) {
    }
  },
  created () {
    for (let favor of this.favorList) {
      Object.assign(favor, {
        nameEdit: favor.name,
        editStatus: false
      })
      // this.$set('nameEdit', favor.name)
      // favor.$set('editStatus', false)
    }
  },
  /*
  mounted () {
    let ids = {
      userId: state.get('userId')
    }
    sendRequest.getFavor.get(null, ids).then(data => {
      this.favors = [...data]
    })
  },
  */
  components: {
    myheader
  }
}
</script>

<style lang="scss" scoped>
  .favor__sidemenu {
    width: 200px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
  }
  .favor__toolbuttongroup {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 2px solid #d7d7d7;
    .button {
      border-radius: 2px;
      color: #fff;
    }
    .button-create {
      border-color: #51b2b0;
      background: #51b2b0;
    }
    .button-search {
      border-color: #46b6e9;
      background: #46b6e9;
    }
  }
  .folder__list {
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .folder__item {
    display: flex;
    justify-content: space-between;
    height: 25px;
    padding: 5px;
  }
  .folder__info {
    display: flex;
    height: 25px;
  }
  .folder__img {
    margin-right: 5px;
    width: 16px;
    height: 12px;
  }
  .folder__img-tool {
    cursor: pointer;
    height: 16px;
  }
  .folder__name-input {
    height: 10px;
  }
</style>
