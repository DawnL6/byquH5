
import Vue from 'vue'
import vHeader from '../../components/header.vue'
import vContent from '../../components/content.vue'
import './index.less'

new Vue({
  el: '#complaint',
  data() {
    return {
      tabType: '',
      isClose: false
    }
  },
  components: {
    vHeader,
    vContent
  }
});
