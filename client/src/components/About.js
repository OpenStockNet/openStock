import React from 'react';
import './About.scss';
import './HomePage.scss';

const About = () => (
  <main id="about">
    <div>

      <h1 id="about-aTag">
        Openstock is a platform helps you find apps that respect your privacy.
      </h1>
      {' '}
      <h2>

        {'For software, free doesn\'t only mean \'free of charge\' but also \'freedom\'. We look into the sources of software that claim to be \'privacy-concerned\', and share those we use and trust.'}

      </h2>
      <h2>
        To reach out, find us at
        {' '}
        <a id="about-aTag" href="mailto:hello@yung-ting-chang.eu">email</a>
        {' '}
        or
        <a id="about-aTag" href="https://github.com/OpenStockNet/openStock" target="_blank" rel="noreferrer noopener">
          {' '}
          Github.
        </a>
      </h2>
    </div>
  </main>
);

export default About;
