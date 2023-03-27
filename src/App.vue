<script setup lang="ts">
  Tools.LocalStorage.setItem('test_001', 'testvalue')

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
    font-size: var(--primary-size);
    background-color: var(--primary-bg);
    color: var(--primary-color);
    // background: rgb(50, 200, 211);
  //   @include fontSize('big-size');
  //   @include bg();
  //   @include color('menu-text-color');
  }
}
</style>
