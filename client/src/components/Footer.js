import React from 'react';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <p>
      Made with
      {' '}
      <span role="img" aria-label="green-heart">💚</span>
      {' '}
      by
      {' '}
      <a href="https://github.com/yung-ting" target="_blank" rel="noreferrer noopener">
        Yung-Ting
      </a>
      ,
      {' '}
      <a href="https://github.com/clarafmiranda" target="_blank" rel="noreferrer noopener">
        Clara
      </a>
      {' '}
      and
      {' '}
      <a href="https://github.com/mariamuga" target="_blank" rel="noreferrer noopener">
        Maria
      </a>
    </p>
    <p>© 2020</p>
  </footer>
);

export default Footer;
