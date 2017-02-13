import './articles-list.scss';

import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';

export default {
  data() {
    return {
    };
  },

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
      'requestArticles',
      'deleteArticle'
    ]),

    sortTitleColumn(a, b) {
      return a.title.localeCompare(b.title);
    },

    sortAuthorColumn(a, b) {
      return a.author.name.localeCompare(b.author.name);
    },

    sortDataColumn(a, b) {

    },

    goToArticle(id, draft) {
      if (id) {
        const type = draft ? 'drafts' : 'published';

        this.$router.push(`/articles/${type}/${id}`);
      } else {
        this.$router.push('/articles/drafts/new');
      }
    },

    handleEdit(index, row) {
      this.goToArticle(row.id, row.draft);
    },

    handleDelete(index, row) {
      this.$confirm(
        this.$t('articles.deleteConfirm.text', {title: row.title}),
        this.$t('articles.deleteConfirm.title'), {
          confirmButtonText: this.$t('articles.deleteConfirm.okBtn'),
          cancelButtonText: this.$t('articles.deleteConfirm.cancelBtn'),
          type: 'warning'
        }).then(() => {
          this.deleteArticle(row.id);
          this.$message({
            type: 'success',
            message: this.$t('articles.deleteConfirm.success')
          });
        });
    }
  },

  watch: {
    $route(val) {
      this.requestArticles(val.params.type);
    }
  },

  created() {
    this.requestArticles(this.$route.params.type);
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

        <el-table-column
          :context="_self"
          :label="$t('articles.tableHead.actions')">
          <template scope="scope">
            <el-tooltip
              class="articles-actions-tooltip"
              effect="dark"
              placement="bottom"
              :content="$t('articles.editBtn')">
              <el-button
                type="primary"
                icon="edit"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="articles-actions-tooltip"
              effect="dark"
              placement="bottom"
              :content="$t('articles.deleteBtn')">
              <el-button
                type="danger"
                icon="delete"
                size="small"
                @click="handleDelete(scope.$index, scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  `
};
