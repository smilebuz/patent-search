<template lang="html">
  <div>
    <myheader></myheader>
    <searchbar></searchbar>
    <el-row>
      <el-col :span="4" class="collapse">
        <p class="collapse-item" :class="{ selected: item.isSelected }" v-for="item in collapse" :key="item.value" @click="selectItem(item)">{{ item.label }}</p>
      </el-col>
      <el-col :span="17" :offset="2">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myheader from '../components/Header'
import searchbar from '../components/SearchBar'

export default {
  data () {
    return {
      collapse: [
        {
          label: '用户管理',
          value: 'userManagement',
          isSelected: false
        },
        {
          label: '个人资料',
          value: 'personalProfile',
          isSelected: false
        },
        {
          label: '权限分配',
          value: 'permissionAssign',
          isSelected: false
        }
      ]
    }
  },
  methods: {
    selectItem (item) {
      this.collapse.forEach((el, i, arr) => {
        el.isSelected = false
      })
      item.isSelected = true
    }
  },
  components: {
    myheader, searchbar
  }
}
</script>

<style lang="scss" scoped>
  .collapse {
    .collapse-item {
      width: 90%;
      margin: 0 auto;
      padding-top: .5em;
      padding-bottom: .5em;
      border: 1px solid #008080;
      border-bottom: none;
      cursor: pointer;
    }
    .collapse-item:last-child {
      border-bottom: 1px solid #008080;
    }
    .selected {
      color: #fff;
      background: #008080;
    }
  }
</style>
