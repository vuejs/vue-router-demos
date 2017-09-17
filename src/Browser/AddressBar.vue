<template>
    <div class="address-bar">
        <button class="button" :disabled="!prev" @click.prevent.stop="navigateBack">
            <svg height="1em" width="1em" fill="currentColor" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" style="vertical-align: middle; margin-top: -3px;">
                <path d="m28.3 18.3h-12.6l3.8-3.8c0.7-0.6 0.7-1.7 0-2.3s-1.7-0.7-2.3 0l-7.9 7.8 7.9 7.8c0.3 0.4 0.7 0.5 1.1 0.5s0.9-0.1 1.2-0.5c0.7-0.6 0.7-1.7 0-2.3l-3.8-3.8h12.6c1 0 1.7-0.8 1.7-1.7s-0.8-1.7-1.7-1.7z"/>
            </svg>
        </button>
        <button class="button" :disabled="!next" @click.prevent.stop="navigateForward">
            <svg height="1em" width="1em" fill="currentColor" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" style="vertical-align: middle; margin-top: -3px;">
                <path d="m22.2 12.2c-0.7 0.6-0.7 1.7 0 2.3l3.8 3.8h-12.7c-0.9 0-1.6 0.8-1.6 1.7s0.7 1.7 1.6 1.7h12.7l-3.8 3.8c-0.7 0.6-0.7 1.7 0 2.3 0.3 0.4 0.7 0.5 1.1 0.5s0.9-0.1 1.2-0.5l7.9-7.8-7.9-7.8c-0.6-0.7-1.7-0.7-2.3 0z"/>
            </svg>
        </button>

        <div class="input-wrapper">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" style="vertical-align: middle; margin-top: -5px;">
                <path d="m16.3 15l-6.3 6.3 6.3 6.2 2.5-2.5-3.8-3.7 3.8-3.8-2.5-2.5z m5 2.5l3.7 3.8-3.7 3.7 2.5 2.5 6.2-6.2-6.2-6.3-2.5 2.5z m6.2-15h-22.5v35h30v-27.5l-7.5-7.5z m5 32.5h-25v-30h17.5l7.5 7.5v22.5z"/>
            </svg>
            <input class="input" type="text" v-model="locationValue" @keypress.enter="$emit('input', locationValue)" autocomplete="off" spellcheck="off">
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddressBar',

    model: {
        prop: 'address'
    },

    data() {
        return {
            locationValue: this.address
        }
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

    methods: {
        navigateBack () {
            if (this.prev) this.$emit('back')
        },

        navigateForward () {
            if (this.next) this.$emit('forward')
        }
    },

    watch: {
        address (val) {
            this.locationValue = val
        }
    }
}
</script>

<style lang="scss" scoped>
.address-bar {
    flex-direction: row;
    background: #eee;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border: none;
    align-items: center;
    border-bottom: solid 1px #ccc;
    padding: 0 10px;
    display: flex;
}

.button, .input {
    margin: 4px;
}

.button {
    border: none;
    background: transparent !important;
    padding: 0;
    color: #000;
    opacity: 1 !important;

    > svg {
        transform: scale(2);
    }
}

.button:disabled {
    color: #aaa;
}

.button:focus {
    outline: none;
}

.input, .input:focus {
    flex: 1;
    border: none;
    font-size: 14px;
    font-weight: light;
    color: hsl(0, 0%, 32%);
    background: transparent;
    width: auto;
    min-width: 0;
    padding: 0;
    border: 0;
    outline: none;
    box-shadow: none;
}

.input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid hsl(0%, 0%, 90%);
    border-radius: 2px;
    padding: 0 8px;
    margin: 8px 0 8px 8px;
}
</style>
