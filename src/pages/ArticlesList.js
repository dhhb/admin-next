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
    },

    sortDataColumn(a, b) {

    },

    goToArticle(id) {
      if (id) {
        this.$router.push(`/articles/${this.$route.params.type}/${id}`);
      } else {
        this.$router.push('/articles/drafts/new');
      }
    }
  },

  created() {
    this.requestArticles();
  },

  template: `
    <div class="articles-list">
      <el-row class="articles-list-sub-nav" :gutter="10">
        <el-col :span="16">
          <h2>{{pageTitle}}</h2>
        </el-col>
        <el-col :span="8">
          <el-button class="create-article-btn" type="primary" icon="plus" @click="goToArticle()">
            {{$t('articles.createBtn')}}
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="articles"
        empty-text="—"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

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
          :sort-method="sortDataColumn"
          sortable>
          <template scope="prop">
            {{prop.updatedAt | moment('llll')}}
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
