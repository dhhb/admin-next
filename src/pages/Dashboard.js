import './dashboard.scss';
import Icons from '../components/Icons';

export default {
  components: {
    ...Icons
  },

  template: `
    <div class="dashboard">
      <header class="header">
        <el-menu
          theme="dark"
          mode="horizontal"
          :router="true"
          :default-active="$route.path">
          <el-menu-item index="/articles">
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
        </el-menu>
      </header>

      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  `
};
