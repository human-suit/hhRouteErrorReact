import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ErrorPage, VacancyPage } from './pages';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter basename="/hhRouteErrorReact">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/vacancies/moscow" replace />}
          />
          <Route path="/vacancies/" element={<App />} />
          <Route path="/vacancies/:city" element={<App />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </Provider>
);
