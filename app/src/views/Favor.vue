<template lang="html">
  <div class="favor">
    <div class="favor__sidemenu">
      <div class="favor__toolbuttongroup" :class="{'favor__createItems': showCreateItems}">
        <el-input class="sidemenu-input"
          size="small"
          v-if="showCreateItems"
          v-model="createFavorParams.name">
        </el-input>
        <div>
          <img class="folder__img folder__img-tool"
            src="../assets/images/right.png"
            alt="创建收藏夹"
            v-if="showCreateItems"
            @click="submitCreateFavorParams">
          </img>
          <img class="folder__img folder__img-tool"
            src="../assets/images/not.png"
            alt="取消操作"
            v-if="showCreateItems"
            @click="showCreateItems = false">
          </img>
        </div>
        <el-button class="button button-create"
          v-if="!showCreateItems"
          @click="showCreateItems = true">新建
        </el-button>
        <el-button class="button button-search"
          v-if="!showCreateItems"
          @click="">搜索
        </el-button>
      </div>
      <div class="folder__list">
        <div class="folder__item"
          v-for="(favor, index) in favorList"
          :key="favor.id">
          <div class="folder__info">
            <img src="../assets/images/folder.png" alt="文件夹" class="folder__img"></img>
            <span class="folder__name"
              v-if="!favor.editStatus"
              @click="getFavorPatents(favor.id)"
              >{{ favor.name }}
            </span>
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
      <div class="pagination sidemenu-pagination">
        <span class="pagination__info">总计{{ favorPageInfo.total_item_number }}条记录</span>
        <el-pagination
          small
          layout="prev, next"
          :current-page="favorPageInfo.current_page"
          :page-size="getFavorParams.per_page"
          :page-count="favorPageInfo.total_page_number"
          @current-change="changeFavorPageNum">
        </el-pagination>
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

// import state from '../state/searchResult/state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      showCreateItems: false,
      showSearchItems: false,
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
      createFavorParams: {
        name: '',
        patent_id_list: []
      },
      getFavorParams: {
        per_page: 10,
        page: 1
      },
      favorPageInfo: {
        current_page: 1,
        total_page_number: 1,
        current_page_item_number: 2,
        total_item_number: 2
      },

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
    submitCreateFavorParams () {
      sendRequest.createFavor.post(this.createFavorParams).then(data => {
        this.$message({
          message: '创建收藏夹成功',
          type: 'success'
        })
        this.showCreateItems = false
      })
      console.log(this.createFavorParams)
      // debugger
    },
    showNameInput (index) {
      let favor = this.favorList[index]
      favor.editStatus = true
      this.$set(this.favorList, index, favor)
    },
    getFavorPatents (favorId) {
      let ids = {
        favorId: favorId
      }
      sendRequest.getFavorInfo.get(null, ids).then(data => {
        this.favorTable = data.patent_id_list
      })
    },
    changeFavorPageNum (pageNum) {
      this.getFavorParams.page = pageNum
    },
    editFavorFolder (favor) {
    },
    deleteFavorFolder (favorId) {
      this.$confirm('确定删除收藏夹？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = {
          favorId: favorId
        }
        sendRequest.deleteFavor.delete(ids).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      })
    }
  },
  created () {
    /*
    sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
      this.favorList = data.favor_list
      for (let prop in this.favorPageInfo) {
        if (this.favorPageInfo.hasOwnProperty(prop)) {
          this.favorPageInfo[prop] = data[prop]
        }
      }
      for (let favor of this.favorList) {
        Object.assign(favor, {
          nameEdit: favor.name,
          editStatus: false
        })
      }
    })
    */
    for (let favor of this.favorList) {
      Object.assign(favor, {
        nameEdit: favor.name,
        editStatus: false
      })
      // this.$set('nameEdit', favor.name)
      // favor.$set('editStatus', false)
    }
  },
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
  .sidemenu-input {
    flex-basis: 120px;
  }
  .sidemenu-pagination {
    padding-left: 5px;
    padding-right: 5px;
  }
  .favor__createItems {
    justify-content: space-around!important;
  }
  .favor__toolbuttongroup {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
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
  .folder__name {
    cursor: pointer;
  }
  .folder__name-input {
    height: 10px;
  }
</style>
