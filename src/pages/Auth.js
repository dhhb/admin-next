import './auth.scss';

import {
  mapActions,
  mapMutations
} from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },

  methods: {
    ...mapActions([
      'authorize'
    ]),

    login() {
      const { _r } = this.$route.query;
      const path = _r ? decodeURIComponent(_r) : '/articles';

      this.authorize(this.form)
        .then(() => {
          this.$router.push(path);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  template: `
    <div class="auth-view">
      <div class="auth-login-form">
        <el-form :model="form" ref="form" label-width="120px" label-position="top">
          <el-form-item :label="$t('auth.emailLabel')">
            <el-input type="email" v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('auth.passwordLabel')">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">{{$t('auth.loginBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  `
};
