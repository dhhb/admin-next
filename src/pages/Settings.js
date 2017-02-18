import './settings.scss';

import Vue from 'vue';
import VueBase64FileUpload from 'vue-base64-file-upload';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    VueBase64FileUpload
  },

  data() {
    console.log(this.user)
    return {
      form: {
        email: '',
        name: ''
      },
      pictureUrl: null
    };
  },

  computed: {
    ...mapState([
      'user'
    ])
  },

  watch: {
    user(val) {
      Vue.set(this.form, 'email', val.email);
      Vue.set(this.form, 'name', val.name);
      Vue.set(this, 'pictureUrl', val.pictureUrl);

      if (val.pictureUrl) {
        Vue.delete(this.form, 'pictureData');
      }
    }
  },

  methods: {
    ...mapActions([
      'updateUser',
      'requestUser'
    ]),

    handlePictureLoad(dataUri) {
      this.form.pictureData = dataUri;
    },

    handleUpdateUser() {
      this.updateUser(this.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: this.$t('settings.updateSuccess')
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('settings.updateFail')
          });
        });
    }
  },

  created() {
    this.requestUser();
  },

  template: `
    <div class="settings">
      <el-row class="settings-sub-nav" :gutter="10">
        <el-col :span="16">
          <h2>{{$t('settings.title')}}</h2>
        </el-col>
        <el-col :span="8">
          <div class="settings-actions">
            <el-button class="save-btn" type="primary" @click="handleUpdateUser">
              {{$t('settings.updateBtn')}}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div class="settings-form">
        <el-form :model="form" ref="form" label-width="165px" label-position="left">
          <el-form-item :label="$t('settings.editForm.picture')">
            <vue-base64-file-upload
              input-class="el-input__inner"
              image-class="settings-picture-image"
              :default-preview="pictureUrl"
              :placeholder="$t('settings.editForm.picturePlaceholder')"
              @load="handlePictureLoad" />
          </el-form-item>
          <el-form-item :label="$t('settings.editForm.email')">
            <el-input
              type="email"
              v-model="form.email"
              auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('settings.editForm.name')">
            <el-input
              type="text"
              v-model="form.name"
              auto-complete="off">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  `
};
