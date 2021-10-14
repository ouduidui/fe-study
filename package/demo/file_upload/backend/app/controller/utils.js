'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class UtilsController extends Controller {
    // 验证码
    async captcha() {
        const captcha = svgCaptcha.create({
            size: 4, // 字符串长度
            fontSize: 50,
            width: 100,
            height: 40,
            noise: 3  // 干扰
        });

        this.ctx.session.captcha = captcha.text;  // 对应文本
        this.ctx.response.type='image/svg+xml';
        this.ctx.body = captcha.data;
    }
}

module.exports = UtilsController;
