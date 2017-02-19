import './articles-item.scss';

import Vue from 'vue';
import VueBase64FileUpload from 'vue-base64-file-upload';
import { mapState, mapActions } from 'vuex';
import VueSimpleMDE from 'vue-simplemde/src';
import Mousetrap from '../utils/mousetrap';

Vue.use(VueSimpleMDE);

export default {
  components: {
    VueBase64FileUpload
  },

  data() {
    return {
      form: {
        title: '',
        intro: '',
        content: '',
        keywords: []
      },
      coverUrl: null,
      keywordInputValue: '',
      keywordInputVisible: false,
      markdownEditorConfigs: {
        placeholder: this.$t('articles.editForm.contentPlaceholder'),
        spellChecker: false,
        forceSync: true,
        toolbarTips: false // TBD: enable when localized
      },
      markdownEditorContent: ''
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

    isDraft() {
      return this.selectedArticle && this.selectedArticle.draft;
    },

    pageTitle() {
      if (this.isNew) {
        return this.$t('articles.newTitle');
      }

      return this.$t('articles.editTitle');
    },

    publishTitle() {
      if (this.isDraft) {
        return this.$t('articles.publishBtn');
      }

      return this.$t('articles.unpublishBtn');
    }
  },

  watch: {
    selectedArticle(val, oldVal) {
      if (val !== oldVal) {
        Vue.set(this.form, 'title', val.title);
        Vue.set(this.form, 'intro', val.intro);
        Vue.set(this.form, 'content', val.content);
        Vue.set(this.form, 'keywords', val.keywords);
        Vue.set(this, 'coverUrl', val.coverUrl);
        Vue.set(this, 'markdownEditorContent', val.content || '');

        if (val.coverUrl) {
          Vue.delete(this.form, 'coverData');
        }
      }
    },

    markdownEditorContent(val, oldVal) {
      if (val !== oldVal) {
        Vue.set(this.form, 'content', val);
      }
    }
  },

  methods: {
    ...mapActions([
      'requestArticle',
      'createArticle',
      'updateArticle',
      'deleteArticle',
      'publishArticle',
      'unpublishArticle',
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
    },

    handleCommand(cmd) {
      if (cmd === 'delete') {
        return this.handleDelete();
      }

      if (cmd === 'duplicate') {
        return this.handleDuplicate();
      }
    },

    handlePublish() {
      this.$confirm(
        this.$t('articles.publishConfirm.text', {title: this.selectedArticle.title}),
        this.$t('articles.publishConfirm.title'), {
          confirmButtonText: this.$t('articles.okBtn'),
          cancelButtonText: this.$t('articles.cancelBtn'),
          type: 'warning'
        }).then(() => {
          this.publishArticle(this.selectedArticle.id)
            .then(() => {
              this.$message({
                type: 'success',
                message: this.$t('articles.publishConfirm.success')
              });
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: this.$t('articles.publishConfirm.fail')
              });
            });
        });
    },

    handleUnpublish() {
      this.$confirm(
        this.$t('articles.unpublishConfirm.text', {title: this.selectedArticle.title}),
        this.$t('articles.unpublishConfirm.title'), {
          confirmButtonText: this.$t('articles.okBtn'),
          cancelButtonText: this.$t('articles.cancelBtn'),
          type: 'warning'
        }).then(() => {
          this.unpublishArticle(this.selectedArticle.id)
            .then(() => {
              this.$message({
                type: 'success',
                message: this.$t('articles.unpublishConfirm.success')
              });
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: this.$t('articles.unpublishConfirm.fail')
              });
            });
        });
    },

    handleDelete() {
      this.$confirm(
        this.$t('articles.deleteConfirm.text', {title: this.selectedArticle.title}),
        this.$t('articles.deleteConfirm.title'), {
          confirmButtonText: this.$t('articles.okBtn'),
          cancelButtonText: this.$t('articles.cancelBtn'),
          type: 'warning'
        }).then(() => {
          this.deleteArticle(this.selectedArticle.id);
          this.$message({
            type: 'success',
            message: this.$t('articles.deleteConfirm.success')
          });
          this.$router.push('/articles');
        });
    },

    handleDuplicate() {
      this.createArticle({
        ...this.form,
        title: `${this.$t('articles.duplicatePrefix')} ${this.form.title}`
      }).then(article => {
        this.$message({
          type: 'success',
          message: this.$t('articles.duplicateSuccess')
        });
        this.$router.replace(`/articles/drafts/${article.id}`);
      }).catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('articles.duplicateFail')
        });
      });
    },

    handleAction() {
      if (this.selectedArticle.draft) {
        this.handlePublish();
      } else {
        this.handleUnpublish();
      }
    },

    handleCoverLoad(dataUri) {
      this.form.coverData = dataUri;
    }
  },

  created() {
    if (!this.isNew) {
      this.requestArticle(this.routeArticleId);
    }
  },

  mounted() {
    Vue.nextTick(() => {
      Mousetrap.bindGlobal(['ctrl+s', 'command+s'], e => {
        e.preventDefault();
        this.saveArticle();
      });
    });
  },

  destroyed() {
    this.resetSelectedArticle();
  },

  template: `
    <div class="articles-item">
      <el-row class="articles-item-sub-nav" :gutter="10">
        <el-col :span="16">
          <h2>{{pageTitle}}</h2>
        </el-col>
        <el-col :span="8">
          <div class="articles-item-actions">
            <el-button class="save-btn" type="primary" @click="saveArticle">
              {{$t('articles.saveBtn')}}
            </el-button>
            <el-dropdown
              v-if="!isNew"
              split-button
              type="primary"
              trigger="click"
              @click="handleAction"
              @command="handleCommand">
              {{publishTitle}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="preview">{{$t('articles.previewBtn')}}</el-dropdown-item>
                <el-dropdown-item command="duplicate">{{$t('articles.duplicateBtn')}}</el-dropdown-item>
                <el-dropdown-item command="delete">{{$t('articles.deleteBtn')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>

      <el-row class="articles-item-info" :gutter="10">
        <el-col :span="24">
          <div v-if="selectedArticle" class="updated">
            {{$t('articles.lastUpdate')}} {{selectedArticle.updatedAt | moment('llll')}}
          </div>
        </el-col>
      </el-row>

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
          <el-form-item :label="$t('articles.editForm.cover')">
            <vue-base64-file-upload
              input-class="el-input__inner"
              image-class="articles-item-cover-image"
              :default-preview="coverUrl"
              :placeholder="$t('articles.editForm.coverPlaceholder')"
              @load="handleCoverLoad" />
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.intro')">
            <el-input
              type="textarea"
              :autosize="{minRows: 5, maxRows: 10}"
              v-model="form.intro"
              auto-complete="off"
              :placeholder="$t('articles.editForm.introPlaceholder')">
            </el-input>
          </el-form-item>
          <el-form-item class="disable-lh" :label="$t('articles.editForm.content')">
            <markdown-editor
              v-model="markdownEditorContent"
              :configs="markdownEditorConfigs">
            </markdown-editor>
          </el-form-item>
          <el-form-item :label="$t('articles.editForm.keywords')">
            <el-tag
              class="article-keyword"
              v-for="keyword in form.keywords"
              type="primary"
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
        </el-form>
      </div>
    </div>
  `
};
