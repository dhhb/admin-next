import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';

export default {
  computed: {
    ...mapState([
      'articles'
    ])
  },

  methods: {
    ...mapActions([
      'requestArticles'
    ])
  },

  created() {
    this.requestArticles();
  },

  template: `
    <div class="articles-list">
      <div v-for="article in articles" :key="article.id">
        {{article.title}} / {{article.createdAt}}
      </div>
    </div>
  `
};
