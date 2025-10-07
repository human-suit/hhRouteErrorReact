import { Tabs } from '@mantine/core';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import style from './index.module.scss';

export const VacancyTabs = () => {
  const navigate = useNavigate();
  const { city } = useParams<{ city?: string }>();
  const location = useLocation();

  useEffect(() => {
    if (!city)
      navigate('/vacancies/moscow' + location.search, { replace: true });
  }, [city, navigate, location.search]);

  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate(`/vacancies/${value}${location.search}`);
    }
  };

  return (
    <Tabs
      value={city || 'moscow'}
      onChange={handleTabChange}
      className={style.tabs}
      keepMounted={false}
    >
      <Tabs.List>
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
