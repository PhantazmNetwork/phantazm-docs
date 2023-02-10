import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: "Developers",
    Svg: require("@site/static/img/developer.svg").default,
    description: (
      <>
        Start with the <a href="devman/server/intro">Developer</a> section for
        in-depth server code documentation, including the Zombies minigame and
        more. Get a full understanding of the technologies used in Phantazm
        Network.
      </>
    ),
  },
  {
    title: "Game Designers",
    Svg: require("@site/static/img/config.svg").default,
    description: (
      <>
        The <a href="configurations/zombies/intro">Configuration</a> section is
        the place to go for information on creating custom content with Phantazm
        software. Get started on designing and building your own unique
        minigames with Phantazm.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
