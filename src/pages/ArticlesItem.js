import './articles-item.scss';

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
      <div class="articles-edit-form">
        <el-form :model="form" ref="form" label-width="120px" label-position="left">
          <el-form-item :label="$t('articles.editForm.title')">
            <el-input type="text" v-model="form.title" auto-complete="off" placeholder=""></el-input>
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.intro')">
            <el-input type="textarea" :autosize="{minRows: 2, maxRows: 5}" v-model="form.intro" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.cover')">
            <el-upload
              action="//jsonplaceholder.typicode.com/posts/"
              type="drag">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">Drop file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.content')">
            <el-input type="textarea" :autosize="{minRows: 7, maxRows: 20}" :rows="5" v-model="form.content" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="save-btn" type="primary">{{$t('articles.saveBtn')}}</el-button>
            <el-dropdown split-button type="primary" trigger="click">
              {{$t('articles.actionsBtn')}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{$t('articles.publishBtn')}}</el-dropdown-item>
                <el-dropdown-item>{{$t('articles.previewBtn')}}</el-dropdown-item>
                <el-dropdown-item>{{$t('articles.duplicateBtn')}}</el-dropdown-item>
                <el-dropdown-item>{{$t('articles.deleteBtn')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </div>
    </div>
  `
};
