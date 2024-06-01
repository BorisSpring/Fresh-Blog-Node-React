import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ForgotPasswordChangePassword from './components/ForgotPasswordChangePassword';
import ForgotPasswordRequestRequest from './components/ForgotPasswordRequestRequest';
import DashboardComments from './components/DashboardComments';
import DashboardBlogs from './components/DashboardBlogs';
import DashboardMessages from './components/DashboardMessages';
import DashboardStandard from './components/DashboardStandard';
import DashboardUsers from './components/DashboardUsers';
import DashboardSettings from './components/DashboardSettings';

// pages
import MainPage from './pages/MainPage';
import SingleBlogPage from './pages/SingleBlogPage';
import SignUpLoginPage from './pages/SignUpLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import DashboardCategories from './components/DashboardCategories';
import DashboardTags from './components/DashboardTags';
import FrecentlyAskedQuestionPage from './pages/FrecentlyAskedQuestionPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreateBlogPage from './pages/CreateBlogPage';
import NotFound from './components/NotFound';
import ErrorFallback from './components/ErrorFallback';

const pathToExcludeFooter = ['/signup', '/signin'];
const dashboardPrefix = '/dashboard';

const shouldExcludeFooter = (pathname) => {
  return (
    pathname.startsWith(dashboardPrefix) ||
    pathname.startsWith('/error/404') ||
    pathToExcludeFooter.includes(pathname)
  );
};

const App = () => {
  const location = useLocation();
  const [isShowFooterAndNav, setIsShowFooterAndNav] = useState({
    showFooter: true,
    showNav: true,
  });

  useEffect(() => {
    const showNav = !location.pathname.startsWith(dashboardPrefix);
    const showFooter = !shouldExcludeFooter(location.pathname);

    window.scrollTo(0, 0);

    setIsShowFooterAndNav(() => ({ showFooter, showNav }));
  }, [location]);

  return (
    <>
      {isShowFooterAndNav.showNav && <Navigation />}
      <Routes>
        <Route path='' element={<MainPage />} />
        <Route path='/blog/:blogSlug' element={<SingleBlogPage />} />
        <Route path='/signup' element={<SignUpLoginPage />} />
        <Route path='/signin' element={<SignUpLoginPage />} />
        <Route path='faq' element={<FrecentlyAskedQuestionPage />} />
        <Route path='error/404' element={<NotFound />} />
        <Route path='/forgotpassword' element={<ForgotPasswordPage />}>
          <Route path='reset' element={<ForgotPasswordRequestRequest />} />
          <Route path=':token' element={<ForgotPasswordChangePassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />}>
            <Route path='addBlog/:blogSlug?' element={<CreateBlogPage />} />
            <Route path='settings/:token?' element={<DashboardSettings />} />
            <Route path='comments' element={<DashboardComments />} />
            <Route path='blogs' element={<DashboardBlogs />} />
            <Route path='statistics' element={<DashboardStandard />} />
            <Route path='users' element={<DashboardUsers />} />
            <Route path='messages' element={<DashboardMessages />} />
            <Route path='categories' element={<DashboardCategories />} />
            <Route path='tags' element={<DashboardTags />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {isShowFooterAndNav.showFooter === true && <Footer />}
    </>
  );
};

export default App;
