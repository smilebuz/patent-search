<template>
  <div class="sideMenu">
    <div class="buttongroup">
      <div class="buttongroup__button"
        v-for="(item, index) in navGroup"
        :key="item.value">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navGroup: [
        {
          name: '过滤',
          value: 'filter'
        },
        {
          name: '最近搜索',
          value: 'recentSearch'
        },
        {
          name: '分类导航',
          value: 'categroyNav'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .sideMenu {
    width: 200px;
    display: flex;
    flex-direction: column;
  }
  .buttongroup {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e8e8e8;
    .buttongroup__button {
      //border-right: 1px solid #e8e8e8;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #46b6e9;
        color: #fff;
      }
      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        flex: 2;
      }
      &:nth-child(3) {
        flex: 2;
      }
    }
  }
</style>
