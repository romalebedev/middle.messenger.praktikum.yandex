import './index.scss';
import 'normalize.css';
import { Router } from './utils/Router';
import { ChatPage } from './pages/chat';
import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ProfilePage } from './pages/profile';
import { SettingsPage } from './pages/profile/change-profile';
import { ChagePasswordPage } from './pages/profile/change-password';

export const router = new Router('#root');

router
    .use('/messenger', ChatPage)
    .use('/', LoginPage)
    .use('/sign-up', RegistrationPage)
    .use('/profile', ProfilePage)
    .use('/settings', SettingsPage)
    .use('/change-password', ChagePasswordPage)
    .start();
