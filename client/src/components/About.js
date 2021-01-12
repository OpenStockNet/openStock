import React from 'react';
import './About.scss';

const About = () => (
  <main id="about">
    <div className="about-container">

      <h1 id="about-aTag">
        Openstock is a platform helping you find apps that respect your privacy.
      </h1>
      {' '}
      <h2>

        {'For software, free doesn\'t only mean \'free of charge\' but also means \'freedom\'. We share the software we use and trust, and welcome everyone who holds the same concerns to share on this platform.'}

      </h2>
      <h2>
        Happy to connect via
        {' '}
        <a id="about-aTag" href="mailto:hello@yung-ting-chang.eu">email</a>
        {' '}
        or
        <a id="about-aTag" href="https://github.com/OpenStockNet/openStock" target="_blank" rel="noreferrer noopener">
          {' '}
          Github
        </a>
        .
      </h2>
    </div>
  </main>
);

export default About;
