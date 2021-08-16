import './index.scss';
import 'normalize.css';
import { Router } from './utils/Router';
import { ChatPage } from './pages/chat';
import { LoginPage } from './pages/login';
import { profilePage } from './pages/profile/change-profile';

export const router = new Router('#root');

router.use('/chat', ChatPage).use('/sign-in', LoginPage).start();

