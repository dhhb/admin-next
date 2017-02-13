import './articles-item.scss';

import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        title: '',
        intro: '',
        content: '',
        cover: '',
        keywords: []
      },
      keywordInputValue: '',
      keywordInputVisible: false
    };
  },

  computed: {
    ...mapState([
      'selectedArticle'
    ]),

    routeArticleId() {
      return this.$route.params.id;
    },

    isNew() {
      return this.routeArticleId === 'new';
    },

    pageTitle() {
      if (this.isNew) {
        return this.$t('articles.newTitle');
      }

      return this.$t('articles.editTitle');
    }
  },

  watch: {
    selectedArticle(val, oldVal) {
      if (val !== oldVal) {
        Vue.set(this.form, 'title', val.title);
        Vue.set(this.form, 'intro', val.intro);
        Vue.set(this.form, 'content', val.content);
        Vue.set(this.form, 'keywords', val.keywords);
      }
    }
  },

  methods: {
    ...mapActions([
      'requestArticle',
      'createArticle',
      'updateArticle',
      'resetSelectedArticle'
    ]),

    handleCloseKeyword(keyword) {
      const index = this.form.keywords.indexOf(keyword);

      if (index > -1) {
        this.form.keywords.splice(index, 1);
      }
    },

    showKeywordInput() {
      this.keywordInputVisible = true;

      setTimeout(() => {
        this.$refs.keywordInput.$el.children[0].focus();
      }, 500);
    },

    handleKeywordInputConfirm() {
      const keywordInputValue = this.keywordInputValue;

      if (keywordInputValue) {
        this.form.keywords.push(keywordInputValue);
      }

      this.keywordInputVisible = false;
      this.keywordInputValue = '';
    },

    saveArticle() {
      if (this.isNew) {
        this.createArticle(this.form).then(article => {
          this.$message({
            type: 'success',
            message: this.$t('articles.createSuccess')
          });
          this.$router.replace(`/articles/drafts/${article.id}`);
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('articles.createFail')
          });
        });
      } else {
        this.updateArticle({
          data: this.form,
          id: this.selectedArticle.id
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('articles.saveSuccess')
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('articles.saveFail')
          });
        });
      }
    }
  },

  created() {
    if (!this.isNew) {
      this.requestArticle(this.routeArticleId);
    }
  },

  destroyed() {
    this.resetSelectedArticle();
  },

  template: `
    <div class="articles-item">
      <h2>{{pageTitle}}</h2>
      <div class="articles-edit-form">
        <el-form :model="form" ref="form" label-width="145px" label-position="left">
          <el-form-item :label="$t('articles.editForm.title')">
            <el-input
              type="text"
              v-model="form.title"
              auto-complete="off"
              :placeholder="$t('articles.editForm.titlePlaceholder')">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.intro')">
            <el-input
              type="textarea"
              :autosize="{minRows: 3, maxRows: 6}"
              v-model="form.intro"
              auto-complete="off"
              :placeholder="$t('articles.editForm.introPlaceholder')">
            </el-input>
          </el-form-item>
          <!-- el-form-item :label="$t('articles.editForm.cover')">
            <el-upload
              action="//jsonplaceholder.typicode.com/posts/"
              type="drag">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">Drop file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </el-form-item -->
          <el-form-item :label="$t('articles.editForm.content')">
            <el-input
              type="textarea"
              :autosize="{minRows: 10, maxRows: 30}"
              :rows="5"
              v-model="form.content"
              auto-complete="off"
              :placeholder="$t('articles.editForm.contentPlaceholder')">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.keywords')">
            <el-tag
              class="article-keyword"
              v-for="keyword in form.keywords"
              :closable="true"
              :close-transition="true"
              @close="handleCloseKeyword(keyword)">
              {{keyword}}
            </el-tag>
            <el-input
              class="article-input-new-keyword"
              v-show="keywordInputVisible"
              v-model="keywordInputValue"
              ref="keywordInput"
              size="mini"
              @keyup.enter.native="handleKeywordInputConfirm"
              @blur="handleKeywordInputConfirm">
            </el-input>
            <el-button
              class="article-button-new-keyword"
              v-show="!keywordInputVisible"
              size="small"
              icon="plus"
              @click="showKeywordInput">
              {{$t('articles.keywordBtn')}}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="save-btn" type="primary" @click="saveArticle">
              {{$t('articles.saveBtn')}}
            </el-button>
            <el-dropdown v-if="!isNew" split-button type="primary" trigger="click">
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
