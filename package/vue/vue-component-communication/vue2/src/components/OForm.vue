<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "OForm",
    provide() {
        return {
            form: this  // 返回整个实例
        }
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object
        }
    },
    methods: {
        validate(cb) {
            const tasks = this.$children
                .filter(item => item.prop)  // 遍历$children，筛选掉没有prop值的实例
                .map(item => item.validate());  // 调用子组件的validate方法

            Promise.all(tasks)  // 因为OFormItem的validate方法返回的是Promise，因此通过Promise.all判断是否全都通过
                .then(() => cb(true))
                .catch(() => cb(false))
        }
    }
}
</script>

<style scoped>

</style>