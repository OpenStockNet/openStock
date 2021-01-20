import React from 'react';
import './About.scss';

const About = () => (
  <main id="about">
    <div className="about-container">

      <h1 id="about-aTag">
        Find apps that respect your privacy
      </h1>
      {' '}
      <h2>

        {'In software, free doesn\'t only mean \'free of charge\' but also means \'freedom\'. OpenStock is an opensource project, with a goal to help everyone find reliable apps that respect our privacy at ease. '}

      </h2>
      <h2>
        Help us to improve via
        <a id="about-aTag" href="https://github.com/OpenStockNet/openStock" target="_blank" rel="noreferrer noopener">
          {' '}
          Github
        </a>
        {' '}
        or
        {' '}
        <a id="about-aTag" href="mailto:hello@yung-ting-chang.eu">Email</a>
        {' '}
        {' '}
        ❤
      </h2>
    </div>
  </main>
);

export default About;
