<template>
    <input v-model="modelValue" v-bind="$attrs" @input="input">
</template>

<script>
import { inject } from 'vue'

export default {
    name: "OInput",
    props: {
        // Vue3中，v-model绑定的值默认为modelValue，而不再是value
        modelValue: {
            type: String
        }
    },
    setup(props, {emit}) {
        // 注入formItemValidate
        const validate = inject('formItemValidate');

        const input = (e) => {
            const value = e.target.value
            // 派发事件
            emit('inputEvent', value);
            // 调用数据检验
            validate();
        }

        return {
            input
        }
    }
}
</script>

<style scoped>
input {
    font-size: 16px;
    line-height: 1;
    font-weight: lighter !important;
    color: #333;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #222;
    outline: none;
    width: 200px;
}
</style>