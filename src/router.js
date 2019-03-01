import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login.vue'
import user from './components/user.vue'
import dashboard from '@/components/dashboard.vue'
import notFound from '@/components/notFound.vue'
import me from '@/components/me.vue'
import upload from '@/components/upload.vue'
import addAccount from '@/components/addAccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'dashboard',
      component: dashboard,
      props: true,
      beforeEnter: (to, from, next) => {
        const publicPages = ['/login'];
        const authRequired = !publicPages.includes(to.path);
        const loggedIn = localStorage.getItem('token');

        if (authRequired && !loggedIn) {
          return next('/login');
        }

        next();
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        const loggedIn = localStorage.getItem('token');

        if (loggedIn) {
          return next('/');
        }

        next();
      }
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      beforeEnter: (to, from, next) => {
        const publicPages = ['/login'];
        const authRequired = !publicPages.includes(to.path);
        const loggedIn = localStorage.getItem('token');

        if (authRequired && !loggedIn) {
          return next('/login');
        }

        next();
      }
    },
    {
      path: '/addaccount',
      name: 'addAccount',
      component: addAccount,
      beforeEnter: (to, from, next) => {
        const loggedIn = localStorage.getItem('token');
        const admin = localStorage.getItem('topSecret') == "true";

        if (loggedIn) {
          if (!admin)
            return next('/');
        } else {
          return next('/login');
        }

        next();
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: user,
      beforeEnter: (to, from, next) => {
        const publicPages = ['/login'];
        const authRequired = !publicPages.includes(to.path);
        const loggedIn = localStorage.getItem('token');

        if (authRequired && !loggedIn) {
          return next('/login');
        }

        next();
      }
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: notFound,
      beforeEnter: (to, from, next) => {
        const publicPages = ['/login'];
        const authRequired = !publicPages.includes(to.path);
        const loggedIn = localStorage.getItem('token');

        if (authRequired && !loggedIn) {
          return next('/login');
        }

        next();
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload,
      beforeEnter: (to, from, next) => {
        const publicPages = ['/login'];
        const authRequired = !publicPages.includes(to.path);
        const loggedIn = localStorage.getItem('token');

        if (authRequired && !loggedIn) {
          return next('/login');
        }

        next();
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: function () {
    //     return import( /* webpackChunkName: "about" */ './views/About.vue')
    //   },
    {
      path: '*',
      redirect: '/'
    }
  ]
})