export default {
  template: `
    <div class="app">
      <transition name="fade" mode="out-in">
        <router-view class="main-view" />
      </transition>
    </div>
  `
};
