export default {
  data() {
    return {
      form: {}
    };
  },

  computed: {
    isNew() {
      return this.$route.params.id === 'new';
    },

    pageTitle() {
      if (this.isNew) {
        return this.$t('articles.newTitle');
      }

      return this.$t('articles.editTitle');
    }
  },

  methods: {

  },

  template: `
    <div class="articles-item">
      <h2>{{pageTitle}}</h2>
      <div>
        <el-form :model="form" ref="form" label-width="120px" label-position="left">
          <el-form-item label="Заголовок">
            <el-input type="text" v-model="form.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Вступление">
            <el-input type="textarea" :autosize="{minRows: 2, maxRows: 5}" v-model="form.intro" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Текст">
            <el-input type="textarea" :autosize="{minRows: 7, maxRows: 20}" :rows="5" v-model="form.content" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">Сохранить</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  `
};
