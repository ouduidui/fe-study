<template>
    <div>
        <!--    使用$attrs绑定input其它属性    -->
        <input :value="value" v-bind="$attrs" @input="input">
    </div>
</template>

<script>
export default {
    name: "OInput",
    inheritAttrs: false,  // 不继承默认属性
    props: {
        value: {   // Input值
            type: String
        }
    },
    methods: {
        input(e) {
            // 派发input事件
            this.$emit('input', e.target.value);
            this.$parent.$emit('validate');
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