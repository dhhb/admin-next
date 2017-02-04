export default {
  template: `
    <div class="articles">
      <div>Navigation</div>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  `
};
