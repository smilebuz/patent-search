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
      ]
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
</style>
