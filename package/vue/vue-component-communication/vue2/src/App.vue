<template>
    <div id="app">
        <div class="form">
            <h1 class="title">用户注册</h1>
            <o-form :model="model" :rules="rules" ref="form">
                <o-form-item label="邮箱" prop="email">
                    <o-input v-model="model.email" placeholder="请输入邮箱" type="email" @input="input"/>
                </o-form-item>
                <o-form-item label="密码" prop="password">
                    <o-input v-model="model.password" placeholder="请输入密码" type="password"/>
                </o-form-item>
                <o-form-item>
                    <button @click="register">注册</button>
                </o-form-item>
            </o-form>
        </div>
    </div>
</template>

<script>
import OForm from './components/OForm';
import OFormItem from "./components/OFormItem";
import OInput from "./components/OInput";

export default {
    name: 'App',
    components: {OForm, OFormItem, OInput},
    data() {
        return {
            model: {
                email: '',
                password: ''
            },
            // 不少于6位
            rules: {
                email: [
                    {required: true, message: "请输⼊邮箱"},  // 必填
                    {type: 'email', message: "请输⼊正确的邮箱"}   // 邮箱格式
                ],
                password: [
                    {required: true, message: "请输⼊密码"},   // 必填
                    {min: 6, message: "密码长度不少于6位"}   // 不少于6位
                ]
            }
        }
    },
    methods: {
        input(value) {
            console.log(`value = ${value}，this.model.email = ${this.model.email}`);
        },

        register() {
            this.$refs.form.validate(valid => valid ? alert('注册成功') : '');
        }
    },
}
</script>

<style>
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
