<template>
    <div>
        Topics Page
        <ul>
            <li>
                <router-link :to="{ name: 'topic', params: { id: 'rendering-with-vue'}}">
                    Rendering with Vue
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'topic', params: { id: 'components'}}">
                    Components
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'topic', params: { id: 'props-v-state'}}">
                    Props vs State
                </router-link>
            </li>
        </ul>

        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'TopicsPage'
}
</script>
