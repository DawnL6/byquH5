<template>
    <header>
        <div class="cc">
            <slot name="left">
                <div></div>
            </slot>
            <div>
                {{title}}
            </div>
            <slot name="right">
                <div></div>
            </slot>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            default: '我是标题',
            type: String
        }
    },
    data() {
        return {
            hello: 'hello'
        }
    }
}
</script>
<style>

</style>

<style lang="less" scoped>
header {
  position: fixed;
  height: 44px;
  width: 100%;
  background-color: #fff;
  z-index: 10;
  border-bottom: 1px solid #d9d9d9;
}

header .cc {
  display: flex;
}
header .cc div {
  flex: 1;
  line-height: 44px;
  color: #333;
}

header .cc div:nth-child(2){
    flex: 8;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
}
</style>



