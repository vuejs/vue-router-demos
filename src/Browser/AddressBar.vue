<template>
    <div class="address-bar">
        <button class="button" :disabled="!prev" @click.prevent.stop="navigateBack">&lt;</button>
        <button class="button" :disabled="!next" @click.prevent.stop="navigateForward">&gt;</button>

        <input class="input" type="text" v-model="location">
    </div>
</template>

<script>
export default {
    name: 'AddressBar',

    model: {
        prop: 'address'
    },

    props: {
        address: {
            type: String,
            required: true,
        },
        next: {
            type: Boolean,
            required: true,
        },
        prev: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        location: {
            get () {
                return this.address
            },

            set (value) {
                this.$emit('input', value)
            }
        }
    },

    methods: {
        navigateBack () {
            if (this.prev) this.$emit('back')
        },

        navigateForward () {
            if (this.next) this.$emit('forward')
        }
    }
}
</script>

<style scoped>
.address-bar {
    border: 1px solid #ccc;
    padding: 5px;
}

.button, input {
    margin: 4px;
}
</style>
