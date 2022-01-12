<template>
    <div class="form">
        <h1 class="title">用户注册</h1>
        <o-form :model="model" :rules="rules" ref="formRef">
            <o-form-item label="邮箱" prop="email">
                <o-input v-model="model.email" @input-event="input" placeholder="请输入邮箱" type="email" />
            </o-form-item>
            <o-form-item label="密码" prop="password">
                <o-input v-model="model.password" placeholder="请输入密码" type="password" />
            </o-form-item>
            <o-form-item>
                <button @click="register">注册</button>
            </o-form-item>
        </o-form>
    </div>
</template>

<script>
import OInput from "./components/OInput.vue";
import OFormItem from "./components/OFormItem.vue";
import OForm from "./components/OForm.vue";
import {ref, reactive} from "vue";

export default {
    name: 'App',
    components: {
        OInput,OFormItem,OForm
    },
    setup() {
        // 表单数据
        const model = reactive({
            email: '',
            password: ''
        })

        // 表单规则
        const rules = reactive({
            email: [
                {required: true, message: "请输⼊邮箱"},
                {type: 'email', message: "请输⼊正确的邮箱"}
            ],
            password: [
                {required: true, message: "请输⼊密码"},
                {min: 6, message: "密码长度不少于6位"}
            ]
        })

        // input方法
        const input = (value) => {
            console.log(`value = ${value}，model.email = ${model.email}`);
        }


        // 获取OForm的实例
        const formRef = ref();
        // 提交事件
        const register = () => {
            // 因为点击事件会发生在mounted生命周期后，因此formRef已经被赋值实例
            formRef.value.validate(valid => valid ? alert('注册成功') : '');
        }

        return {
            model,
            rules,
            input,
            register,
            formRef
        }
    }
}
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.form {
    box-shadow: 2px 2px 10px rgba(0,0,0,.3);
    width: 400px;
    padding: 20px 20px 30px;
    border-radius: 10px;
}
.title {
    width: 100%;
    text-align: center;
    font-weight: 300;
    font-size: 30px;
    letter-spacing: 10px;
    padding-left: 10px;
    box-sizing: border-box;
}
button {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: #222;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
}
</style>