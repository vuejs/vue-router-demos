<template>
<div class="columns app">
  <ul class="sidebar column is-1-desktop is-12-mobile">
    <li v-for="example in examples" :key="example">
      <router-link
       :to="{ name: 'example', params: { example: example.slug || example.name }}"
        active-class="is-active"
      >{{ example.name }}</router-link>
    </li>
  </ul>

  <div class="content column is-11-desktop">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import examples from '../examples'

Object.freeze(examples)

export default {
  name: 'ExampleExplorer',

  data: () => ({ examples }),
}
</script>

<style lang="scss">
@import '~bulma';

html, body {
  padding: 0;
  margin: 0;
  min-height: 100%;
}
</style>

<style>
.app {
  margin: 0 !important;
  min-height: 100vh;
}

.content {
  overflow: auto;
  padding-left: 0;
  background: rgb(45, 45, 45);
}

.is-active {
  color: black
}
</style>
