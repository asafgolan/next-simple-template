import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner'
import Card from '../components/card'
import useTrackLocation from '../hooks/use-track-location';

import {fetchCoffeeStores} from '../lib/coffee-stores.js'
import {useState, useEffect, useContext} from "react";
import {ACTION_TYPES, StoreContext} from "../store/store-context";

export async function getStaticProps(context) {
    const coffeeStores = await fetchCoffeeStores()
    return {
        props: {
            coffeeStores,
        },
    }
}



export default function Home(props) {
    const {handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation()
    //const[coffeeStores, setCoffeeStores] = useState('')
    const[coffeeStoresError, setCoffeeStoresError] = useState('')
    const {dispatch, state} = useContext(StoreContext);
    const {coffeeStores, latLong} = state;

    useEffect(async () => {
        if (latLong) {
            try {
                const fetchedCoffeeStores = await fetch( `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=6`);
                const coffeeStores  = await fetchedCoffeeStores.json();
                console.log(coffeeStores)
                //setCoffeeStores(fetchedCoffeeStores);
                dispatch({
                    type: ACTION_TYPES.SET_COFFEE_STORES,
                    payload: coffeeStores
                });
                setCoffeeStoresError('');
            } catch (error) {
                //todo handle error
                setCoffeeStoresError(error.message);
                console.log({error});
            }
        }
    }, [latLong])

    const handleOnBannerBtn = () => {
        handleTrackLocation();
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>coffee connoisseur</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Banner buttonText={isFindingLocation ? "locating..." : "explore nearby stores"}
                        handleOnClick={handleOnBannerBtn}/>
                {locationErrorMsg && <p>{locationErrorMsg}</p>}
                {coffeeStoresError && <p>{coffeeStoresError}</p>}
            </main>
            <div className={styles.heroImage}>
                <Image src="/static/mega-creator.png" alt="coffee connoisseur logo" width={700} height={400}/>
            </div>
            {coffeeStores.length > 0 &&
                <div className={styles.sectionWrapper}>
                    <h2>Nearby coffee stores</h2>
                    <div className={styles.cardLayout}>
                        {coffeeStores.map(coffeeStore => (
                            <Card
                                key={coffeeStore.id}
                                className={styles.card}
                                href={`/coffee-store/${coffeeStore.id}`}
                                imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                                name={coffeeStore.name}
                                altName={coffeeStore.name}
                            />
                        ))}
                    </div>
                </div>
            }
            {props.coffeeStores.length > 0 &&
                <div className={styles.sectionWrapper}>
                    <h2>Toronto coffee stores</h2>
                    <div className={styles.cardLayout}>
                        {props.coffeeStores.map(coffeeStore => (
                            <Card
                                key={coffeeStore.id}
                                className={styles.card}
                                href={`/coffee-store/${coffeeStore.id}`}
                                imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                                name={coffeeStore.name}
                                altName={coffeeStore.name}
                            />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
