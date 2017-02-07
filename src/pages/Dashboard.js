import './dashboard.scss';

export default {
  template: `
    <div class="dashboard">
      <header class="header">
        <el-menu
          theme="dark"
          mode="horizontal"
          :router="true"
          :default-active="$route.path">
          <el-menu-item index="/articles">
            <img src="/all-articles-icon.svg" />
            {{$t('menu.allArticlesItem')}}
          </el-menu-item>
          <el-menu-item index="/articles/drafts">
            <img src="/drafts-icon.svg" />
            {{$t('menu.draftsItem')}}
          </el-menu-item>
          <el-menu-item index="/articles/published">
            <img src="/published-icon.svg" />
            {{$t('menu.publishedItem')}}
          </el-menu-item>
          <el-menu-item index="/settings">
            <img src="/settings-icon.svg" />
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
