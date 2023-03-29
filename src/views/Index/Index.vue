<template>
    <div class="index-w">
        <div class="title">Index.vue</div>
        <router-view/>

        <ul class="g-flex-rsbc">
            <li>
                <router-link :to="{name: 'home'}">{{ lpk('page.index.Title') }}</router-link>
            </li>
            <li>
                <router-link :to="{name: 'blogIndex'}">{{ lpk('Blog') }}</router-link>
            </li>
            <li>
                <router-link :to="{name: 'my'}">{{ lpk('page.my.Title') }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.index-w{
    background: #FF0;
    .title{
        margin: 30px;
    }
}
</style>