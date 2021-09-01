import Router from './core/router';
import { NewsFeedView, NewsDetailView } from './page';
import { Store } from './store';

// import { Store } from './types';
// const store: Store = {
//   currentPage: 1,
//   feeds: []
// };

// // 타입스크립트에서 브라우저 전역 객체에 할당하는 방법 [[
// declare global {
//   interface Window {
//     store: Store;
//   }
// }
// window.store = store;
// // ]] 전역

const store = new Store();
const router: Router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);


router.route();