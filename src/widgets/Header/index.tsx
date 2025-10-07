import { Logo } from '../../shared/ui';
import style from './index.module.scss';
import { PersonIcon } from '../../shared/assets/';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const search = location.search;
  const { city } = useParams<{ city?: string }>();

  return (
    <div className={style.header}>
      <Logo />
      <ul>
        <li>
          <Link
            to={`/vacancies/${city ?? 'moscow'}${search}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <p>Вакансии FE</p>
            <div></div>
          </Link>
        </li>
        <li>
          <img src={PersonIcon} alt="PersonIcon" />
          <p>Обо мне</p>
        </li>
      </ul>
    </div>
  );
}
