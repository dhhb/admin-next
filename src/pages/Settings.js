import './settings.scss';

import Vue from 'vue';
import VueBase64FileUpload from 'vue-base64-file-upload';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    VueBase64FileUpload
  },

  data() {
    return {
      userForm: {
        email: '',
        name: ''
      },
      pictureUrl: null,
      categoriesFormList: [],
      categoryInputValue: '',
      categoryInputVisible: false
    };
  },

  computed: {
    ...mapState([
      'user',
      'categories'
    ])
  },

  watch: {
    user(val) {
      Vue.set(this.userForm, 'email', val.email);
      Vue.set(this.userForm, 'name', val.name);
      Vue.set(this, 'pictureUrl', val.pictureUrl);

      if (val.pictureUrl) {
        Vue.delete(this.userForm, 'pictureData');
      }
    },

    categories(val) {
      Vue.set(this, 'categoriesFormList', val);
    }
  },

  methods: {
    ...mapActions([
      'updateUser',
      'requestUser',
      'requestCategories',
      'createCategory',
      'deleteCategory'
    ]),

    handlePictureLoad(dataUri) {
      this.userForm.pictureData = dataUri;
    },

    handleUpdateUser() {
      this.updateUser(this.userForm)
        .then(() => {
          this.$message({
            type: 'success',
            message: this.$t('settings.updateSuccess')
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('settings.updateFail')
          });
        });
    },

    handleDeleteCategory(category) {
      this.deleteCategory(category.id);
    },

    showCategoryInput() {
      this.categoryInputVisible = true;

      setTimeout(() => {
        this.$refs.categoryInput.$el.children[0].focus();
      }, 500);
    },

    handleCategoryInputConfirm() {
      const value = this.categoryInputValue;

      if (value) {
        this.createCategory(value);
      }

      this.categoryInputVisible = false;
      this.categoryInputValue = '';
    }
  },

  created() {
    this.requestUser();
    this.requestCategories();
  },

  template: `
    <div class="settings">
      <el-row :gutter="10">
        <el-col>
          <h2>{{$t('settings.title')}}</h2>
        </el-col>
      </el-row>
      <hr />
      <el-row class="settings-sub-nav" :gutter="10">
        <el-col>
          <h3>{{$t('settings.profileTitle')}}</h3>
        </el-col>
      </el-row>
      <div class="settings-form">
        <el-form :model="userForm" ref="userForm" label-width="165px" label-position="left">
          <el-form-item :label="$t('settings.editForm.picture')">
            <vue-base64-file-upload
              input-class="el-input__inner"
              image-class="settings-picture-image"
              :default-preview="pictureUrl"
              :placeholder="$t('settings.editForm.picturePlaceholder')"
              @load="handlePictureLoad" />
          </el-form-item>
          <el-form-item :label="$t('settings.editForm.email')">
            <el-tooltip
              content="Изменить электронный адрес невозможно"
              :visible-arrow="false"
              :openDelay="1000"
              placement="bottom-start"
              effect="dark">
              <el-input
                type="email"
                v-model="userForm.email"
                auto-complete="off"
                disabled>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item :label="$t('settings.editForm.name')">
            <el-input
              type="text"
              v-model="userForm.name"
              auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="save-btn" type="primary" @click="handleUpdateUser">
              {{$t('settings.updateBtn')}}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <hr />
      <el-row class="settings-sub-nav" :gutter="10">
        <el-col>
          <h3>{{$t('settings.categoriesTitle')}}</h3>
          <div class="settings-categories">
            <el-tag
              class="category-item"
              v-for="category in categories"
              type="success"
              :closable="true"
              :close-transition="true"
              @close="handleDeleteCategory(category)">
              {{category.title}}
            </el-tag>
            <el-input
              class="input-new-category"
              v-show="categoryInputVisible"
              v-model="categoryInputValue"
              ref="categoryInput"
              size="small"
              @keyup.enter.native="handleCategoryInputConfirm"
              @blur="handleCategoryInputConfirm">
            </el-input>
            <el-button
              v-show="!categoryInputVisible"
              class="button-new-category"
              icon="plus"
              size="small"
              @click="showCategoryInput">
              {{$t('settings.categoryBtn')}}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <hr />
      <el-row class="settings-sub-nav" :gutter="10">
        <el-col>
          <h3>{{$t('settings.statsTitle')}}</h3>
        </el-col>
      </el-row>
    </div>
  `
};
