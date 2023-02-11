import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Phantazm Documentation!</h1>
        <p className="hero__subtitle">
          A Comprehensive Guide to Understanding and Using Phantazm Network
          Technologies
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="configurations/zombies/intro"
          >
            Create your own content in 5min ⏱️!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`Home`}>
      <HomepageHeader />
      <main>
        {/* <Head>
          <link
            type="application/json+oembed"
            href="https://docs.phantazm.org/oEmbed.json"
          />
        </Head> */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
