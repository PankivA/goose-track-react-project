import { ThemeProvider } from 'styled-components';
import { useState, lazy } from 'react';
import { GlobalStyle, lightTheme, darkTheme } from 'UI';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout, ToastContainerWrapper, RestrictedRoute } from 'components';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { MainPage } from 'pages/MainPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const StatisticsPage = lazy(() => import('../pages/StatisticsPage'));
const CalendarPage = lazy(()=> import('../pages/CalendarPage'))

export const App = () => {
  const [theme, setTheme] = useState('light');
  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<Layout currentTheme={theme} switchTheme={switchTheme} />}
        >
          <Route index element={<MainPage />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/calendar/month"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/calendar/month"
                component={<RegisterPage />}
              />
            }
          />
          <Route path="/account" element={<div>AccountPage</div>} />
          <Route path="/calendar" element={<CalendarPage/>}>
            <Route path="day/" element={<div>ChoosedDay</div>} />
            <Route path="month/" element={<div>ChoosedMonth</div>} />
          </Route>
          <Route path="/statistics" element={<StatisticsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ToastContainerWrapper />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
