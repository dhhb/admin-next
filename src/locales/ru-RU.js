export default {
  auth: {
    emailLabel: 'Электронный адрес',
    passwordLabel: 'Пароль',
    loginBtn: 'Авторизация'
  },
  menu: {
    allArticlesItem: 'Все статьи',
    draftsItem: 'Черновики',
    publishedItem: 'Опубликованное',
    settingsItem: 'Настройки'
  },
  articles: {
    tableHead: {
      title: 'Заголовок',
      author: 'Автор',
      createdAt: 'Обновлено',
      status: 'Статус',
      actions: 'Действия'
    },
    status: {
      published: 'Опубликованно',
      draft: 'Черновик'
    },
    createBtn: 'Создать статью',
    newTitle: 'Новая статья',
    editTitle: 'Редактировать статью',
    saveBtn: 'Сохранить',
    previewBtn: 'Посмотреть',
    publishBtn: 'Опубликовать',
    deleteBtn: 'Удалить',
    duplicateBtn: 'Копировать',
    actionsBtn: 'Другое',
    keywordBtn: 'Добавить',
    editBtn: 'Редактировать',
    editForm: {
      title: 'Заголовок',
      titlePlaceholder: 'к примеру: В России вырастили уникальный сталактит из фекалий',
      intro: 'Вступление',
      introPlaceholder: 'О чем эта статья? Небольшое превью перед основным текстом. Поле поддерживает Markdown.',
      content: 'Текст',
      contentPlaceholder: 'Раскройте тему статьи без каких либо ограничений! Поле также поддерживает Markdown.',
      cover: 'Обложка',
      keywords: 'Ключевые слова'
    },
    deleteConfirm: {
      title: 'Удаление',
      text: 'Вы уверенны, что хотите удалить статью "{title}"?',
      okBtn: 'Да',
      cancelBtn: 'Отмена',
      success: 'Удаление завершено'
    },
    createSuccess: 'Статья успешно создана',
    createFail: 'Ошибка при создании статьи',
    saveSuccess: 'Изменения сохранены',
    saveFail: 'Не удалось сохранить изменения'
  }
};
