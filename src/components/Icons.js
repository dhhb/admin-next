const AllArticlesIcon = {
  name: 'all-articles-icon',

  template: `
    <svg class="all-articles-icon" width="28" height="27" viewBox="-1 -1 30 29" xmlns="http://www.w3.org/2000/svg">
      <path d="M.389 18.892c-.518-.309-.519-.809 0-1.117l12.673-7.544c.518-.308 1.358-.308 1.876 0l12.673 7.544c.518.308.519.808 0 1.117l-12.673 7.543c-.518.309-1.358.309-1.876 0L.39 18.892z"></path><path d="M.389 13.892c-.518-.309-.519-.809 0-1.117l12.673-7.544c.518-.308 1.358-.308 1.876 0l12.673 7.544c.518.308.519.808 0 1.117l-12.673 7.543c-.518.309-1.358.309-1.876 0L.39 13.892z"></path><path d="M.389 8.892c-.518-.309-.519-.809 0-1.117L13.062.231c.518-.308 1.358-.308 1.876 0L27.61 7.775c.518.308.519.808 0 1.117l-12.673 7.543c-.518.309-1.358.309-1.876 0L.39 8.892z">
      </path>
    </svg>
  `
};

const DraftsIcon = {
  name: 'drafts-icon',

  template: `
    <svg class="drafts-icon" width="30" height="26" viewBox="-1 -1 32 28" xmlns="http://www.w3.org/2000/svg">
      <rect stroke-width="1.5" width="20.25" height="26" rx="2"></rect>
      <g transform="rotate(45 6.656 27.76)">
        <path d="M6 20.58L.294 11.31l2.18-3.742h7.053l2.18 3.741L6 20.58z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <rect stroke-width="1.5" x=".75" y="4.541" width="10.5" height="3.784" rx="2"></rect>
        <path d="M2.25 4.919L1.5 0M9.75 4.919L10.5 0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6 20.045v-5.352" stroke-linecap="square"></path>
        <ellipse cx="6" cy="12.8" rx="1.125" ry="1.135"></ellipse>
      </g>
      <path d="M5 5h11M5 9h8.515M5 13h5.523M5 17h4.528" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `
};

const MediaIcon = {
  name: 'media-icon',

  template: `
    <svg class="media-icon" width="27" height="27" viewBox="-1 -1 29 29" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" width="22.256" height="22.475" rx="2"></rect>
      <rect y="4" width="22.256" height="22.475" rx="2"></rect>
      <path d="M.718 18.3l7.18-5.8 9.333 13.05" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M13.641 18.909l2.872-2.784L21 18.909" stroke-linecap="round" stroke-linejoin="round"></path>
      <ellipse cx="14.718" cy="10.688" rx="1.795" ry="1.813"></ellipse>
    </svg>
  `
};

const PublishedIcon = {
  name: 'published-icon',

  template: `
    <svg class="published-icon" width="32" height="25" viewBox="-1 -1 34 27" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.63 13.103h4.323l9.596 10.29-2.823-.098a.77.77 0 1 0-.054 1.54l4.701.165a.77.77 0 0 0 .797-.744l.178-5.073a.77.77 0 0 0-1.541-.054l-.113 3.232-8.633-9.258h14.502l-2.131 2.131a.77.77 0 1 0 1.09 1.09l3.59-3.59a.77.77 0 0 0 0-1.09L27.784 8.32a.77.77 0 0 0-1.09 1.09l2.153 2.153H14.376l8.318-8.921.113 3.23a.77.77 0 1 0 1.54-.054L24.17.744A.77.77 0 0 0 23.373 0l-4.7.165a.77.77 0 0 0 .053 1.54l2.825-.098-9.283 9.955H7.63a3.855 3.855 0 0 0-7.631.77 3.854 3.854 0 0 0 7.63.771zm-6.088-.77a2.312 2.312 0 1 1 4.624 0 2.312 2.312 0 0 1-4.624 0z"></path>
    </svg>
  `
};

const SettingsIcon = {
  name: 'settings-icon',

  template: `
    <svg class="settings-icon" width="27" height="27" viewBox="-1 -1 29 29" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.013 10.527a12.758 12.758 0 0 0-1.47-3.638l-3.421.687-1.627-1.627.692-3.452a12.754 12.754 0 0 0-3.598-1.493L14.65 3.916h-2.3l-1.933-2.904c-1.253.31-2.469.812-3.6 1.504l.688 3.433-1.627 1.627-3.403-.683a12.8 12.8 0 0 0-1.48 3.64l2.856 1.9v2.302l-2.824 1.88c.315 1.269.827 2.5 1.535 3.643l3.316-.666 1.627 1.628-.658 3.277a12.757 12.757 0 0 0 3.676 1.499l1.826-2.743h2.301l1.821 2.735a12.8 12.8 0 0 0 3.678-1.51l-.654-3.258 1.627-1.628 3.296.662a12.796 12.796 0 0 0 1.546-3.645l-2.815-1.874v-2.301l2.864-1.907zM13.5 18.759a5.269 5.269 0 0 0 5.264-5.273A5.269 5.269 0 0 0 13.5 8.213a5.269 5.269 0 0 0-5.265 5.273A5.269 5.269 0 0 0 13.5 18.76z"></path>
    </svg>
  `
};

export default {
  AllArticlesIcon,
  DraftsIcon,
  MediaIcon,
  PublishedIcon,
  SettingsIcon
};
