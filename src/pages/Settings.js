import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'user'
    ])
  },

  template: `
    <div class="settings">
      <el-row class="settings-sub-nav" :gutter="10">
        <el-col :span="16">
          <h2>{{$t('settings.title')}}</h2>
        </el-col>
      </el-row>
      <div class="settings-form">
        {{user.pictureUrl}}
        {{user.name}}
        {{user.email}}
      </div>
    </div>
  `
};
