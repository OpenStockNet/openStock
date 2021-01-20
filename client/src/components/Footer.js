import React from 'react';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div>
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
        {' '}
        &middot;  © 2020 - 2021
      </p>

    </div>
    <p>
      Icons made by {' '}
      <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect" target="_blank" rel="noreferrer noopener">Pixel perfect</a>
    </p>

  </footer>
);

export default Footer;
