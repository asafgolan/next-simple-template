import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/Banner'

export default function Home() {

  const handleOnBannerBtn = () => {
    console.log('Banner Button Clicked')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>coffee connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="explore nearby stores" handleOnClick={handleOnBannerBtn} />
      </main>
      <div className={styles.heroImage}>
        <Image src="/static/mega-creator.png" alt="coffee connoisseur logo" width={700} height={400}/>
      </div>
    </div>
  )
}
