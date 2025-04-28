const routes = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "loading",
        path: '', component: () => import('pages/AppLoadingPage.vue')
      }
    ]
  },
  {
    path: '/courses',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "courses",
        path: '', component: () => import('pages/CoursesPage.vue')
      }
    ]
  },
  {
    path: '/course/:course_id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "course",
        path: '', component: () => import('pages/CoursePage.vue')
      }
    ]
  },

  {
    path: '/courseMembers/:course_id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: "courseMembers",
        path: '', component: () => import('pages/CourseMembersPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/registration',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'registration',
        path: '', component: () => import('pages/RegistrationPage.vue')
      }
    ]
  },
  {
    path: '/forgotPassword',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'forgotPassword',
        path: '', component: () => import('pages/ForgotPasswordPage.vue')
      }
    ]
  },
  {
    path: '/changePassword/:link',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'changePassword',
        path: '', component: () => import('pages/ChangePasswordPage.vue')
      }
    ]
  },
  {
    path: '/activation/:link',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'activation',
        path: '', component: () => import('pages/AccountActivationPage.vue')
      }
    ]
  },
  {
    path: '/mail-sent',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'mailSent',
        path: '', component: () => import('pages/MailSentPage.vue')
      }
    ]
  },

]

export default routes
