import Cookies from 'js-cookie';
import { req, Common } from '@/utils';
import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const isLogin = () => Common.validString(Cookies.get('access-token'));

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/signin') {
    if (isLogin()) {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
    }
    return;
  }

  if ((to.path === '/404' || to.path === '/') && isLogin()) {
    next();
    return;
  }

  if (isLogin()) {
    next();
  } else {
    req.redirectToSso();
    Cookies.set('urlBeforeSso', to.fullPath);
    next();
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
