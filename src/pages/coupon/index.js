
import Vue from 'vue'
import vHeader from '../../components/header.vue'
import vContent from '../../components/content.vue'
import vMessage from '../../components/message.vue'
import './index.less'

new Vue({
  el: '#coupon',
  data() {
    return {
      tabType: '',
      isShow: false,
      title: '456'
    }
  },
  components: {
    vHeader,
    vContent,
    vMessage
  },
  methods: {
    more() {
      this.isShow = true
    },
    close() {
      this.isShow = false
    }
  }
});
