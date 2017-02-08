import './articles-list.scss';

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
    ]),

    sortTitleColumn(a, b) {
      return a.title.localeCompare(b.title);
    },

    sortAuthorColumn(a, b) {
      return a.author.name.localeCompare(b.author.name);
    }
  },

  created() {
    this.requestArticles();
  },

  template: `
    <div class="articles-list">
      <h2>{{pageTitle}}</h2>
      <el-table
        :data="articles"
        empty-text="—"
        style="width: 100%">
        <el-table-column
          prop="title"
          :label="$t('articles.tableHead.title')"
          :sort-method="sortTitleColumn"
          sortable>
        </el-table-column>

        <el-table-column
          prop="author.name"
          :label="$t('articles.tableHead.author')"
          :sort-method="sortAuthorColumn"
          sortable>
        </el-table-column>

        <el-table-column
          :label="$t('articles.tableHead.createdAt')"
          sortable>
          <template scope="prop">
            {{prop.createdAt | moment('llll')}}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('articles.tableHead.status')">
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
