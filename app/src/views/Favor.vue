<template lang="html">
  <div class="favor">
    <div class="favor__sidemenu">
      <div class="favor__toolbuttongroup" :class="{'favor__createItems': showCreateItems}">
        <el-input class="sidemenu-input"
          size="small"
          v-if="showCreateItems"
          v-model="createFavorParams.name">
        </el-input>
        <div class="folder__create">
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
            <!-- <img class="folder__img folder__img-tool"
              src="../assets/images/write.png"
              alt="编辑"
              v-if="!favor.editStatus"
              @click="showNameInput(index)">
            </img> -->
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
      <div v-if="this.favorList.length">
        <el-table
          border
          align="left"
          :data="patentListAfterPage"
          v-loading="loadingPatentTable"
          key="patentTable">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="apply_type" label="专利类型" width="120"></el-table-column>
          <el-table-column prop="publish_no" label="公开号" width="100"></el-table-column>
          <el-table-column prop="invention_title" label="专利名称"></el-table-column>
          <el-table-column prop="applicant_name" label="专利权人" width="200"></el-table-column>
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
        <div class="pagination">
          <span class="pagination__info">总计{{ patentPageInfo.total_item_number }}条记录</span>
          <el-pagination class="pagination__page"
            :page-size="10"
            :page-sizes="[1, 10, 20, 30]"
            :current-page="patentPageInfo.current_page"
            :page-count="patentPageInfo.total_page_number"
            @size-change="changePatentPageSize"
            @current-change="changePatentPageNum"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
      <div v-if="!this.favorList.length">
        <p>没有收藏夹</p>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '../components/Header'

// import state from '../state/searchResult/state.js'
import { sendRequest } from '../Api'

require('../assets/scss/favor.scss')

export default {
  data () {
    return {
      showCreateItems: false,
      showSearchItems: false,
      favorList: [],
      createFavorParams: {
        name: '',
        patent_id_list: []
      },
      getFavorParams: {
        per_page: 10,
        page: 1
      },
      favorPageInfo: {
        current_page: -1,
        total_page_number: -1,
        current_page_item_number: -1,
        total_item_number: -1
      },

      loadingPatentTable: false,
      patentParams: {
        per_page: 10,
        page: 1
      },
      patentList: [],
      patentListAfterPage: [],
      patentPageInfo: {
        current_page: -1,
        total_page_number: -1,
        current_page_item_number: -1,
        total_item_number: -1
      }
    }
  },
  methods: {
    submitCreateFavorParams () {
      sendRequest.createFavor.post(this.createFavorParams).then(data => {
        // debugger
        this.$message({
          message: '创建收藏夹成功',
          type: 'success'
        })
        sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
          // debugger
          this.favorList = data.favorite_list
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
        this.showCreateItems = false
      })
    },
    showNameInput (index) {
      let favor = this.favorList[index]
      favor.editStatus = true
      this.$set(this.favorList, index, favor)
    },
    getFavorPatents (favorId) {
      this.loadingPatentTable = true
      let ids = {
        favorId: favorId
      }
      sendRequest.getFavorInfo.get(null, ids).then(data => {
        this.patentList = data.patent_list
        this.patentPageInfo.current_page = this.patentParams.page
        this.patentPageInfo.total_item_number = data.patent_list.length
        this.patentPageInfo.current_page_item_number = this.patentParams.per_page
        this.patentPageInfo.total_page_number = Math.round(data.patent_list.length / this.patentParams.per_page)
        this.patentListAfterPage = this.filterPatentList()
        this.loadingPatentTable = false
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
        // debugger
        sendRequest.deleteFavor.delete(ids).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
            this.favorList = data.favorite_list
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

            if (this.favorList.length) {
              this.getFavorPatents(this.favorList[0].id)
            }
          })
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      })
    },

    filterPatentList () {
      return this.patentList.filter((el, index, arr) => {
        return index >= (this.patentParams.page - 1) * this.patentParams.per_page &&
          index < this.patentParams.page * this.patentParams.per_page
      })
    },
    changePatentPageSize (pageSize) {
      this.patentParams.per_page = pageSize
    },
    changePatentPageNum (pageNum) {
      this.patentParams.page = pageNum
    }
  },
  watch: {
    patentParams: {
      handler: function (newParams) {
        this.patentListAfterPage = this.filterPatentList()
      },
      deep: true
    }
  },
  created () {
    sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
      this.favorList = data.favorite_list
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

      if (this.favorList.length) {
        this.getFavorPatents(this.favorList[0].id)
      }
    })
    // for (let favor of this.favorList) {
    //   Object.assign(favor, {
    //     nameEdit: favor.name,
    //     editStatus: false
    //   })
    //   this.$set('nameEdit', favor.name)
    //   favor.$set('editStatus', false)
    // }
  },
  components: {
    myheader
  }
}
</script>

<style lang="scss">
</style>
