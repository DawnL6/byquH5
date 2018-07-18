<template>
  <section class="message" v-show="isShow">
    <div class="content">
      <p class="title">{{title}}</p>
      <div class="detail">
        <slot name="text"></slot>
      </div>
      <div class="but" @click="close">{{but}}</div>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    title: {
      default: '我是标题',
      type: String
    },
    but: {
      default: '确定',
      type: String
    },
    isShow: {
      default: false,
      type: Boolean
    },
  },
  methods: {
    close() {
       this.$emit('close')
    }
  }
}
</script>
<style>
</style>

<style lang="less" scoped>
.message {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 72%;
    background-color: #fff;
    border-radius: 4px;
    .title {
      text-align: center;
      font-size: 17px;
      padding-top: 20px;
    }
    .detail {
      padding: 10px 20px;
    }
    .but {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #2dcd64;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
  }
}
</style>



