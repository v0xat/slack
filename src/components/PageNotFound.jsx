import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('global.pageNotFound')}</h1>
      <Link to="/">
        {t('global.backToHome')}
      </Link>
    </div>
  );
};

export default PageNotFound;
