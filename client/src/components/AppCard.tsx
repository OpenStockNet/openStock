import { Link } from 'react-router-dom';

import appIconPlaceholder from '../images/logoPlaceholder.svg';
import './AppCard.scss';

interface Props {
  appId:string,
  src: string,
  appName: string,
  appCategoryName: string,
}

const AppCard = ({
  appId, src, appName, appCategoryName,
} : Props) => (
  <div className="appCard" data-testid="app-card">
    <Link to={`/apps/${appId}`}>
      <img src={src || appIconPlaceholder} alt="" />
    </Link>
    <div>
      <Link to={`/apps/${appId}`}>
        <h3 className="highlight">{appName}</h3>
      </Link>
      <h6>{appCategoryName}</h6>
    </div>
  </div>
);

export default AppCard;
