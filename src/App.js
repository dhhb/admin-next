import nprogress from 'nprogress';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'loading',
      'authenticated'
    ])
  },

  watch: {
    authenticated: 'redirectToAuth',

    loading(val) {
      if (val) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    }
  },

  methods: {
    redirectToAuth(val, oldVal) {
      if (val !== oldVal) {
        this.$router.replace(`/login?_r=${encodeURIComponent(window.location.pathname)}`);
      }
    }
  },

  template: `
    <div class="app">
      <transition name="fade" mode="out-in">
        <router-view class="main-view" />
      </transition>
    </div>
  `
};
