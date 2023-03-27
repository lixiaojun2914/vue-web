<script setup lang="ts">
  import Icon from '@/components/Icon'
  Tools.LocalStorage.setItem('test_001', 'testvalue')
  console.log(lpk('Index'))

  let show: boolean = true
</script>

<template>
  <div>
    {{ app.getConfig('baseUrl') }}
    {{ Tools.LocalStorage.getItem('test_001') }}
    {{ lpk('Index') }}
    {{ lpk('Type', {index: 1}) }}
    <Icon icon="icon-time"/>
    <van-button type="primary">主要按钮</van-button>
    <!-- <van-calendar v-model:show="show"/> -->
    <div class="theme">
      <div class="theme-item" v-for="index in 3">{{ index }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme{
  display: flex;
  justify-content: space-between;
  .theme-item{
    margin: 10px 20px;
    width: 30%;
    padding: 50px 0px;
    text-align: center;
    // background: rgb(50, 200, 211);
    @include fontSize('big-size');
    @include bg();
    @include color('menu-text-color');
  }
}
</style>
