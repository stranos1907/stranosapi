import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'VİP Üyeler',
    icon: 'star',
    link: '/user/vip'
  },
  {
    label: 'Üyeler',
    icon: 'users',
    subItems: [
      {
        label: 'Ekle',
        link: '/user/create',
      },
      {
        label: 'Liste',
        link: '/user/list'
      },
    ]
  },
  {
    label: 'Fake Hesaplar',
    icon: 'users',
    subItems: [
      {
        label: 'Ekle',
        link: '/profile/create',
      },
      {
        label: 'Liste',
        link: '/profile/list'
      },
    ]
  },
  {
    label: 'Dialoglar',
    icon: 'mail',
    link: "/message/dialogs"
  },
  {
    label: 'Modlar',
    icon: 'key',
    link: "/user/mods"
  },
  {
    label: 'Mesaj Hediyeleri',
    icon: 'gift',
    subItems: [
      {
        label: 'Ekle',
        link: '/gift/create',
      },
      {
        label: 'Liste',
        link: '/gift/list'
      },
    ]
  },
  {
    label: 'Paketler',
    icon: 'box',
    subItems: [
      {
        label: 'Ekle',
        link: '/package/create',
      },
      {
        label: 'Jeton Paketleri',
        link: '/package/list'
      }
    ]
  },
  {
    label: 'Vip Paketler',
    icon: 'codesandbox',
    subItems: [
      {
        label: 'Ekle',
        link: '/vippackage/create',
      },
      {
        label: 'Vip Paketleri',
        link: '/vippackage/list'
      }
    ]
  },
  {
    label: 'Ödemeler',
    icon: 'bar-chart-2',
    subItems: [
      {
        label: 'Jeton Ödemeleri',
        link: '/payment/list',
      },
      {
        label: 'Vip Ödemeleri',
        link: '/payment/vippayments'
      },
    ]
  },
  {
    label: 'Slider',
    icon: 'tv',
    subItems: [
      {
        label: 'Ekle',
        link: '/slider/create',
      },
      {
        label: 'Liste',
        link: '/slider/list'
      },
    ]
  },
  {
    label: 'Vip Slider',
    icon: 'award',
    subItems: [
      {
        label: 'Ekle',
        link: '/vipslider/create',
      },
      {
        label: 'Liste',
        link: '/vipslider/list'
      },
    ]
  },
  {
    label: 'Otomatik Mesaj',
    icon: 'aperture',
    subItems: [
      {
        label: 'Ekle',
        link: '/jobs/create',
      },
      {
        label: 'Liste',
        link: '/jobs/list'
      },
    ]
  },
  {
    label: 'Hazır Mesajlar',
    icon: 'save',
    subItems: [
      {
        label: 'Ekle',
        link: '/message/add-template',
      },
      {
        label: 'Liste',
        link: '/message/templates'
      },
    ]
  },
  {
    label: 'Bildirimler Gönder',
    icon: 'list',
    link:'/notification'
  },
  {
    label: 'Hobiler',
    icon: 'users',
    subItems: [
      {
        label: 'Ekle',
        link: '/hobby/create',
      },
      {
        label: 'Liste',
        link: '/hobby/list'
      },
    ]
  },
  {
    label: 'Ayarlar',
    icon: 'settings',
    link:'/options'
  }/*
  {
    label: 'Chat',
    icon: 'message-square',
    link: '/apps/chat',
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'Event',
    }
  },
  {
    label: 'Components',
    isTitle: true
  },
  {
    label: 'UI Kit',
    icon: 'feather',
    subItems: [
      {
        label: 'Accordion',
        link: '/ui-components/accordion',
      },
      {
        label: 'Alerts',
        link: '/ui-components/alerts',
      },
      {
        label: 'Badges',
        link: '/ui-components/badges',
      },
      {
        label: 'Breadcrumbs',
        link: '/ui-components/breadcrumbs',
      },
      {
        label: 'Buttons',
        link: '/ui-components/buttons',
      },
      {
        label: 'Button group',
        link: '/ui-components/button-group',
      },
      {
        label: 'Cards',
        link: '/ui-components/cards',
      },
      {
        label: 'Carousel',
        link: '/ui-components/carousel',
      },
      {
        label: 'Collapse',
        link: '/ui-components/collapse',
      },
      {
        label: 'Datepicker',
        link: '/ui-components/datepicker',
      },
      {
        label: 'Dropdowns',
        link: '/ui-components/dropdowns',
      },
      {
        label: 'List group',
        link: '/ui-components/list-group',
      },
      {
        label: 'Media object',
        link: '/ui-components/media-object',
      },
      {
        label: 'Modal',
        link: '/ui-components/modal',
      },
      {
        label: 'Navs',
        link: '/ui-components/navs',
      },
      {
        label: 'Navbar',
        link: '/ui-components/navbar',
      },
      {
        label: 'Pagination',
        link: '/ui-components/pagination',
      },
      {
        label: 'Popovers',
        link: '/ui-components/popovers',
      },
      {
        label: 'Progress',
        link: '/ui-components/progress',
      },
      {
        label: 'Rating',
        link: '/ui-components/rating',
      },
      {
        label: 'Scrollbar',
        link: '/ui-components/scrollbar',
      },
      {
        label: 'Spinners',
        link: '/ui-components/spinners',
      },
      {
        label: 'Timepicker',
        link: '/ui-components/timepicker',
      },
      {
        label: 'Tooltips',
        link: '/ui-components/tooltips',
      },
      {
        label: 'Typeadhed',
        link: '/ui-components/typeahead',
      },
    ]
  },
  {
    label: 'Advanced UI',
    icon: 'anchor',
    subItems: [
      {
        label: 'Cropper',
        link: '/advanced-ui/cropper',
      },
      {
        label: 'Owl carousel',
        link: '/advanced-ui/owl-carousel',
      },
      {
        label: 'SortableJs',
        link: '/advanced-ui/sortablejs',
      },
      {
        label: 'Sweet alert',
        link: '/advanced-ui/sweet-alert',
      },
    ]
  },
  {
    label: 'Forms',
    icon: 'file-text',
    subItems: [
      {
        label: 'Basic elements',
        link: '/form-elements/basic-elements'
      },
      {
        label: 'Advanced elements',
        subItems: [
          {
            label: 'Form validation',
            link: '/advanced-form-elements/form-validation'
          },
          {
            label: 'Input mask',
            link: '/advanced-form-elements/input-mask'
          },
          {
            label: 'Ng-select',
            link: '/advanced-form-elements/ng-select'
          },
          {
            label: 'Ngx-chips',
            link: '/advanced-form-elements/ngx-chips'
          },
          {
            label: 'Ngx-color-picker',
            link: '/advanced-form-elements/ngx-color-picker'
          },
          {
            label: 'Ngx-dropzone',
            link: '/advanced-form-elements/ngx-dropzone-wrapper'
          },
        ]
      },
      {
        label: 'Editors',
        link: '/form-elements/editors'
      },
      {
        label: 'Wizard',
        link: '/form-elements/wizard'
      },
    ]
  },
  {
    label: 'Charts & graphs',
    icon: 'pie-chart',
    subItems: [
      {
        label: 'ApexCharts',
        link: '/charts-graphs/apexcharts',
      },
      {
        label: 'ChartJs',
        link: '/charts-graphs/chartjs',
      },
    ]
  },
  {
    label: 'Tables',
    icon: 'layout',
    subItems: [
      {
        label: 'Basic tables',
        link: '/tables/basic-table',
      },
      {
        label: 'Data table',
        link: '/tables/data-table',
      },
      {
        label: 'Ngx-datatable',
        link: '/tables/ngx-datatable'
      }
    ]
  },
  {
    label: 'Icons',
    icon: 'smile',
    subItems: [
      {
        label: 'Feather icons',
        link: '/icons/feather-icons',
      },
      {
        label: 'Mdi icons',
        link: '/icons/mdi-icons',
      }
    ]
  },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Special pages',
    icon: 'book',
    subItems: [
      {
        label: 'Blank page',
        link: '/general/blank-page',
      },
      {
        label: 'Faq',
        link: '/general/faq',
      },
      {
        label: 'Invoice',
        link: '/general/invoice',
      },
      {
        label: 'Profile',
        link: '/general/profile',
      },
      {
        label: 'Pricing',
        link: '/general/pricing',
      },
      {
        label: 'Timeline',
        link: '/general/timeline',
      }
    ]
  },
  {
    label: 'Authentication',
    icon: 'unlock',
    subItems: [
      {
        label: 'Login',
        link: '/auth/login',
      },
      {
        label: 'Register',
        link: '/auth/register',
      },
    ]
  },
  {
    label: 'Error',
    icon: 'cloud-off',
    subItems: [
      {
        label: '404',
        link: '/error/404',
      },
      {
        label: '500',
        link: '/error/500',
      },
    ]
  },*/
];
