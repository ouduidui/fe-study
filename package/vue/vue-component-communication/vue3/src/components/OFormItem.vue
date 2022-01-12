<template>
  <div class="input-box">
    <p v-if="label" class="label">{{ label }}：</p>
    <slot></slot>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
  import { ref, provide, inject, onMounted, getCurrentInstance } from 'vue';
  import Schema from 'async-validator';
  import eventBus from '../utils/eventBus';

  export default {
    name: 'OFormItem',
    props: {
      prop: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      }
    },
    setup({ prop }) {
      // error响应式变量初始化
      const error = ref('');
      // 注入model和rules
      const model = inject('model');
      const rules = inject('rules');

      // 校验方法
      const validate = () => {
        // 获取对应的值和校验规则
        const value = model[prop];
        const rule = rules[prop];
        // 进行校验
        const schema = new Schema({ [prop]: rule });
        return schema.validate({ [prop]: value }, (errors) => {
          if (errors) {
            error.value = errors[0].message;
          } else {
            error.value = '';
          }
        });
      };

      // 提供validate方法
      provide('formItemValidate', validate);

      onMounted(() => {
        // 在mount周期派发collectContext，让OForm收集该组件上下文
        const instance = getCurrentInstance();
        eventBus.emit('collectContext', instance.ctx);
      });

      return {
        error,
        validate // 方法必须返回出去，反正OForm获取到的OFormItem实例无法调用该方法
      };
    }
  };
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
    margin: 0;
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
    color: #d66852;
    right: 50px;
  }
</style>
