<template>
    <i :class="`iconfont ${icon}`"></i>
</template>

<script setup lang="ts">
    interface IIconProps {
        icon: string
    }

    // 初始化
    const props = defineProps<IIconProps>()
    const { icon } = toRefs(props)
</script>

<style lang="scss" scoped>

</style>