<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <!-- <van-icon name="phone-o"> -->
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        label="手机号"
        placeholder="请输入手机号"
        v-validate="'required'"
        name="mobile"
        :error-message="errors.first('mobile')"
      />
      <!-- <van-icon name="envelop-o"> -->
      <van-field
        v-model="user.code"
        left-icon="envelop-o"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        v-validate="'required'"
        name="验证码"
        :error-message="errors.first('验证码')"
      >
        <van-button slot="button" size="small" color="#ddd" round>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-button">
      <van-button type="info" :loading="isLoading" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '15139859633',
        code: '246810'
      },
      isLoading: false
    }
  },
  created () {
    this.customLoadingMessage()
  },
  methods: {
    ...mapMutations(['setUser']),
    async onLogin () {
      try {
        // this.$validator.validate().then(async valid => {
        const isValid = await this.$validator.validate()
        if (!isValid) {
          return
        }

        // 提交表单 让登录按钮loading
        this.isLoading = true
        const { data } = await login(this.user)
        console.log(data)

        this.setUser(data.data) // 得到token值传入state
        // 跳到首页
        // this.$router.push({ name: 'home' })
        // 登录成功 让登录按钮loading取消
        this.isLoading = false
      } catch (err) {
        // console.dir(err)
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码有错误')
        } else {
          this.$toast.fail('程序异常请稍后重试')
        }
        // 错误时候也取消
        this.isLoading = false
      }
    },
    customLoadingMessage () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          }
          // code: {
          //   required: () => 'Your name is empty'
          // }
        }
      }
      this.$validator.localize('zh_CN', dict)
    }
  }
}
</script>

<style lang="less" scoped>
.login-button {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
