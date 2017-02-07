export default {
  template: `
    <div class="articles">
      <el-menu theme="light" default-active="1" mode="horizontal">
        <el-menu-item index="1">Articles</el-menu-item>
        <el-menu-item index="2"><a href="https://google.com" target="_blank">Search</a></el-menu-item>
      </el-menu>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  `
};
