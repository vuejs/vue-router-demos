<template>
  <span>{{ id }}</span>
</template>

<script>
export default {
    name: 'TopicPage',

    props: {
        id: {
            type: String,
            required: true
        }
    }
}
</script>
