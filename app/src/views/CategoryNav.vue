<template lang="html">
  <div>
    <myheader></myheader>

    <div class="toolbar">
      <el-row>
        <el-col :span="4">
          <el-button-group>
            <el-button @click="routeSearch">过滤</el-button>
            <el-button @click="routeSearch">最近搜索</el-button>
            <el-button>分类导航</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>

    <div class="main">
      <el-row>
        <el-col :span="4">
          <sideNav></sideNav>
        </el-col>

        <el-col :span="17" :offset="2">
          <el-tree :data="navObj" :props="navProps" class="nav-tree" @node-click="searchFromNode"></el-tree>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import myheader from '../components/Header'
import sideNav from '../components/sideNav'
import bus from '../bus.js'

export default {
  data () {
    return {
      navObj: [],
      navProps: {
        label: 'label',
        children: 'children'
      }
    }
  },
  methods: {
    routeSearch () {
      this.$router.push('/Search')
    },
    searchFromNode (data) {
      // 根据expanded和有没有expanded判断是否进行搜索
      data.expanded = !data.expanded
      console.log(this.navObj)
    }
  },
  created () {
    bus.$on('getNavObj', (root) => {
      this.navObj.splice(0, this.navObj.length)
      this.navObj.push({
        label: '国网江苏省供电公司',
        expanded: false,
        children: [
          {
            label: '国网江苏省电力公司南京供电公司'
          },
          {
            label: '国网江苏省电力公司苏州供电公司'
          },
          {
            label: '国网江苏省电力公司徐州供电公司'
          }
        ]
      })
    })
  },
  components: {
    myheader, sideNav
  }
}
</script>

<style lang="scss">
  .tab-group {
    display: flex;
    justify-content: space-between;
    .tab {
      flex: 1;
      border: 1px solid #000;
      border-right: none;
      padding-top: .5em;
      padding-bottom: .5em;
      cursor: pointer;
      &:last-child {
        border-right: 1px solid #000;
      }
    }
    .tab-order {
    }
  }
  /*
  .toolbar {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  */
  .nav-tree {
    text-align: left;
  }
</style>
