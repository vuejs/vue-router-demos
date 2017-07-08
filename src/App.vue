<template>
<div class="examples">
  <ul class="sidebar">
    <li v-for="example in examples" :key="example">
      <router-link :to="{ name: 'example', params: { example: example.slug || example.name }}">{{ example.name }}</router-link>
    </li>
  </ul>

  <div class="content">
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

<style>
html, body {
  padding: 0;
  margin: 0;
  min-height: 100%;
}

.examples {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.sidebar {
  margin-right: 15px;
}

.content {
  flex: 1;
  background: rgb(45, 45, 45);
  padding: 0 15px;
}
</style>
