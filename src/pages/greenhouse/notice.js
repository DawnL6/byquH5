
import Vue from 'vue'
import vHeader from '../../components/header.vue'
import vContent from '../../components/content.vue'
import './notice.less'

new Vue({
  el: '#notice',
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
