<template>
    <div class="input-box">
        <!--   label   -->
        <p v-if="label" class="label">{{ label }}：</p>
        <slot></slot>
        <!--   错误提示   -->
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import Schema from "async-validator";

export default {
    name: "OFormItem",
    inject: ['form'],  // 注入
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {  // 用于判断该item是哪个属性
            type: String,
            default: ''
        }
    },
    data() {
        return {
            error: ''  // 错误信息
        }
    },
    mounted() {
        this.$on('validate', () => {this.validate()});  // 监听
    },
    methods: {
        validate() {
            // 获取对应的值和规则
            const value = this.form.model[this.prop];
            const rules = this.form.rules[this.prop];

            // 创建规则实例
            const schema = new Schema({[this.prop]: rules});
            // 调用实例方法validate进行校验，该方法返回Promise
            return schema.validate({[this.prop]: value}, errors => {
                if (errors) {
                    // 显示错误信息
                    this.error = errors[0].message;
                } else {
                    this.error = '';
                }
            })
        }
    }
}
</script>

<style scoped>
.input-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-bottom: 30px;
    box-sizing: border-box;
}

p {
    margin: 0
}

.label {
    padding-right: 10px;
    font-weight: 300;
    font-size: 18px;
}

.error {
    position: absolute;
    font-size: 12px;
    bottom: 10px;
    color: #D66852;
    right: 50px;
}
</style>