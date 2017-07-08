<template>
  <div style="padding: 10px">
        <h1>SFC</h1>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
            <li>
                <router-link to="/topics">Topics</router-link>
            </li>
        </ul>

        <hr/>

        <router-view>
            <div>WHy?</div>
        </router-view>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
