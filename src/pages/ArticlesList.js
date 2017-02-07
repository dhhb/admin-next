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
      <el-table
        :data="articles"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          :label="$t('articles.tableHead.title')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="author.name"
          :label="$t('articles.tableHead.author')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          :label="$t('articles.tableHead.createdAt')"
          width="180">
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
