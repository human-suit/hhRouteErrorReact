import { createRoot } from 'react-dom/client';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ErrorPage, VacancyPage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="/" element={<App />} />
      <Route path="/vacancies" element={<App />} />
      <Route path="/vacancies/city/:city" element={<App />} />
      <Route path="/vacancies/:id" element={<VacancyPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
