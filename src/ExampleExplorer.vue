<template>
<div class="examples">
  <ul>
    <li v-for="example in examples">
      <router-link :to="'/' + example">{{ example }}</router-link>
    </li>
  </ul>

  <router-view></router-view>
</div>
</template>

<script>
import examples from '../examples'

export default {
  name: 'ExampleExplorer',

  data: () => ({ examples: Object.keys(examples) }),
}
</script>