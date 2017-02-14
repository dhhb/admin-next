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
    unpublishBtn: 'В черновики',
    deleteBtn: 'Удалить',
    duplicateBtn: 'Копировать',
    actionsBtn: 'Другое',
    keywordBtn: 'Добавить',
    editBtn: 'Редактировать',
    okBtn: 'Да',
    cancelBtn: 'Отмена',
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
      success: 'Удаление завершено',
      fail: 'Не удалось удалить статью'
    },
    publishConfirm: {
      title: 'Публикация',
      text: 'Вы уверенны, что хотите опубликовать статью "{title}"?',
      success: 'Статья опубликована',
      fail: 'Не удалось опубликовать статью'
    },
    unpublishConfirm: {
      title: 'В черновики',
      text: 'Вы уверенны, что хотите вернуть в черновики статью "{title}"?',
      success: 'Статья вернулась в черновики',
      fail: 'Не удалось вернуть статью в черновики'
    },
    createSuccess: 'Статья успешно создана',
    createFail: 'Ошибка при создании статьи',
    saveSuccess: 'Изменения сохранены',
    saveFail: 'Не удалось сохранить изменения',
    duplicateSuccess: 'Копия статьи успешно создана',
    duplicateFail: 'Не удалось создать копию статьи',
    duplicatePrefix: 'Копия'
  }
};
