
import Vue from 'vue'
import dayjs from 'dayjs'
import vHeader from '../../components/header.vue'
import vContent from '../../components/content.vue'
import './addCoupon.less'
import { DatetimePicker, Popup, Toast } from 'vant';

Vue.use(DatetimePicker);
Vue.use(Popup)
Vue.use(Toast)
new Vue({
  el: '#addCoupon',
  data() {
    return {
      currentDate: dayjs().$d,
      minDate: dayjs().$d,//默认最小选择时间
      maxDate: dayjs().add(10, 'year').$d,//默认是最小选择时间的一年
      startTime: '',
      endTime: '',
      show: false,
      type: null
    }
  },
  components: {
    vHeader,
    vContent,
  },
  methods: {
    openPicker(type) {
      this.type = type
      if (this.type === 'star') {
        this.minDate = dayjs().$d//默认最小选择时间
        this.maxDate = dayjs().add(10, 'year').$d//默认是最小选择时间的一年
      }
      if (this.type === 'end' && !this.startTime) {
        Toast({ duration: '1000', message: '请先选择开始时间' });
        return
      }
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    confirm(value) {
      if (this.type === 'star') {
        this.startTime = dayjs(value).format('YYYY年MM月DD日')
        this.minDate = dayjs(value).add(7, 'days').$d
        this.maxDate = dayjs(value).add(60, 'days').$d
        this.endTime = ''
      } else if (this.type === 'end') {
        this.endTime = dayjs(value).format('YYYY年MM月DD日')
      }
      this.cancel()
    }
    // handleConfirm(value) {
    //   this.startTime = value
    //   console.log(value)
    // }
  }
});
