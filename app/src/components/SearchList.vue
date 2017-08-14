<template lang="html">
  <div>
    <div v-for='item, index in patents' :key='index' class='list-item'>
      <div>
        <router-link to='PatentInfo' tag='span'>{{ item.invention_title }}</router-link>
        <span class="degree">价值度:{{ item.value_degree.value }} <i v-for='n in item.value_degree.degree' class='el-icon-star-off'></i> </span>
      </div>
      <div>
        申请人:<span>{{ item.applicant_name }}</span> 发明人:<span v-for='inventor, index in item.inventor_list' :key='index'>{{ inventor }} </span> IPC分类号:<span>{{ item.ipc_main_classification }}</span>
      </div>
      <div>
        申请日:<span>{{ item.apply_date }}</span> 申请号:<span>{{ item.apply_no }}</span> 公开日:<span>{{ item.publish_date }}</span> 公开号:<span>{{ item.publish_no }}</span>
      </div>
      <div>
        {{ item.abstract }}
      </div>
      <div>
        <router-link to='home' tag='span'>申请人信息</router-link> ——
        <router-link to='home' tag='span'>申请人购买力</router-link> ——
        <router-link to='home' tag='span'>申请人主营产品</router-link> ——
        <router-link to='home' tag='span'>相似专利</router-link> ——
        <router-link to='home' tag='span'>潜在买家</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      patents: [
        {
          invention_title: '基于电力载波技术的电力设备远程监测系统',
          applicant_name: '国网冀北电力有限公司信息通信分公司',
          inventor_list: ['王思明', '王思宇'],
          ipc_main_classification: 'G08C19/00',
          apply_date: '2015-09-08',
          apply_no: '201510601367.3',
          publish_date: '2015-09-08',
          publish_no: '2015-09-08',
          abstract: '本发明涉及电力载波通信技术领域，特别是基于电力载波技术的电力设备远程监测系统，包括信号发生器和信号接收器，所述信号发生器通过信号调制模块与电力线一端相连接，所述电力线另一端通过信号解调模块与信号接收器相连接；所述电力线上间隔设置若干通信安全检测模块，所述通信安全检测模块与远程监控模块无线通信连接。采用上述结构后，本发明通过设置在电力线上的通信安全监测模块检测电力载波通信中信号的衰减，然后将检测到的数据发送给远程监控模块，从而判断信号衰减是否正常；另外，通过电力变送器检测判断电力载波通信是否正常。',
          value_degree: {
            value: 78.2,
            degree: 3
          }
        },
        {
          invention_title: '基于电力载波技术的电力设备远程监测系统',
          applicant_name: '国网冀北电力有限公司信息通信分公司',
          inventor_list: ['王思明', '王思宇'],
          ipc_main_classification: 'G08C19/00',
          apply_date: '2015-09-08',
          apply_no: '201510601367.3',
          publish_date: '2015-09-08',
          publish_no: '2015-09-08',
          abstract: '本发明涉及电力载波通信技术领域，特别是基于电力载波技术的电力设备远程监测系统，包括信号发生器和信号接收器，所述信号发生器通过信号调制模块与电力线一端相连接，所述电力线另一端通过信号解调模块与信号接收器相连接；所述电力线上间隔设置若干通信安全检测模块，所述通信安全检测模块与远程监控模块无线通信连接。采用上述结构后，本发明通过设置在电力线上的通信安全监测模块检测电力载波通信中信号的衰减，然后将检测到的数据发送给远程监控模块，从而判断信号衰减是否正常；另外，通过电力变送器检测判断电力载波通信是否正常。',
          value_degree: {
            value: 83.4,
            degree: 4
          }
        }
      ]
    }
  },
  methods: {
    fillList: (patents) => {
      let patent = {
      }
      this.patents.push(patent)
    }
  },
  mounted: function () {
  }
}
</script>

<style lang="scss">
  .list-item {
    margin-bottom: 1em;
    text-align: left;
    > div {
      margin-bottom: .5em;
    }
  }
</style>
