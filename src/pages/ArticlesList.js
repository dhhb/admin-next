import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';

export default {
  computed: {
    ...mapState([
      'articles'
    ]),

    pageTitle() {
      const { params } = this.$route;

      if (params.type === 'drafts') {
        return this.$t('menu.draftsItem');
      }

      if (params.type === 'published') {
        return this.$t('menu.publishedItem');
      }

      return this.$t('menu.allArticlesItem');
    }
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
      <h2>{{pageTitle}}</h2>
      <el-table
        :data="articles"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          :label="$t('articles.tableHead.title')"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="author.name"
          :label="$t('articles.tableHead.author')"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          :label="$t('articles.tableHead.createdAt')"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          :label="$t('articles.tableHead.status')"
          sortable>
          <template scope="prop">
            {{prop.row.draft ?
              $t('articles.status.draft') :
              $t('articles.status.published')}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  `
};
