import './dashboard.scss';

import { mapState, mapActions } from 'vuex';
import Icons from '../components/Icons';

export default {
  components: {
    ...Icons
  },

  computed: {
    ...mapState([
      'user'
    ])
  },

  methods: {
    ...mapActions([
      'requestUser'
    ])
  },

  created() {
    this.requestUser();
  },

  template: `
    <div class="dashboard">
      <header class="header">
        <div class="header-inner">
          <el-menu
            theme="dark"
            mode="horizontal"
            :router="true"
            :default-active="$route.path">
            <el-menu-item index="/articles/all">
              <all-articles-icon />
              {{$t('menu.allArticlesItem')}}
            </el-menu-item>
            <el-menu-item index="/articles/drafts">
              <drafts-icon />
              {{$t('menu.draftsItem')}}
            </el-menu-item>
            <el-menu-item index="/articles/published">
              <published-icon />
              {{$t('menu.publishedItem')}}
            </el-menu-item>
            <el-menu-item index="/settings">
              <settings-icon />
              {{$t('menu.settingsItem')}}
            </el-menu-item>
            <div class="avatar">
              <el-tooltip effect="dark" placement="bottom-end">
                <div class="avatar-tooltip" slot="content">
                  {{user.name}}<br/>{{user.email}}
                </div>
                <img :src="user.pictureUrl" width="80" />
              </el-tooltip>
            </div>
          </el-menu>
        </div>
      </header>

      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  `
};
