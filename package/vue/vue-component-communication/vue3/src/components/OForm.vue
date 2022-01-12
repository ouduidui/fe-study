<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import { provide } from 'vue';
  import eventBus from '../utils/eventBus';

  export default {
    name: 'OForm',
    props: {
      model: {
        type: Object,
        required: true
      },
      rules: {
        type: Object,
        default: {}
      }
    },
    setup({ model, rules }) {
      // 向下提供model和rules，此时model和rules本身就是响应式数据，因此子组件注入的时候也是响应式数据
      provide('model', model);
      provide('rules', rules);

      // 在mount声明之前收集collectContext事件
      const formItemContext = [];
      eventBus.on('collectContext', (instance) => formItemContext.push(instance));

      const validate = (cb) => {
        // 遍历收集到的子组件上下文，调用其校验方法
        const tasks = formItemContext.filter((item) => item.prop).map((item) => item.validate());

        Promise.all(tasks)
          .then(() => cb(true))
          .catch(() => cb(false));
      };

      return {
        validate
      };
    }
  };
</script>
