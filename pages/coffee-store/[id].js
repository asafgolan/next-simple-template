import Head from 'next/head'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import classNames from "classnames";

import styles from '../../styles/coffee-store.module.css'
import coffeeStoresData from '../../data/coffee-stores.json'
import {fetchCoffeeStores} from '../../lib/coffee-stores'
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../store/store-context";
import {isEmpty} from "../../utils";

export async function getStaticProps(staticProps) {
    const params = staticProps.params
    const coffeeStores = await fetchCoffeeStores();
    console.log('params',coffeeStores)
    const findCoffeeStores = coffeeStores.filter(coffeeStore => coffeeStore.id === params.id)[0]
    console.log('findCoffeeStores',findCoffeeStores)
    return {
        props: {
            coffeeStore: findCoffeeStores ? findCoffeeStores : {},
        },
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    return {
        paths: coffeeStores.map(store => ({
            params: {
                id: store.id.toString()
            }
        })),
        fallback: true
    }
}

const handleUpVoteButton = (e) => {
    e.preventDefault()
    console.log('handleUpVoteButton')
}

export default function CoffeStore(initialProps) {
    const router = useRouter()
    const {id} = router.query
    const [coffeeStore,setCoffeeStore] = useState(initialProps.coffeeStore)
    const  {
        state: {
            coffeeStores
        }
    } = useContext(StoreContext);

    useEffect(()=>{
        if(isEmpty(initialProps.coffeeStore)){
            if(coffeeStores.length > 0 ){
                const findCoffeeStoreById = coffeeStores.find((coffeeStore)=>{
                    return coffeeStore.id === id
                })
                setCoffeeStore(findCoffeeStoreById);
            }

        }
    }, [id])
    //console.log('prop', props)

    if(router.isFallback) {
        return <div>Loading...</div>
    }
    const {address,neighborhood, name, imgUrl} = coffeeStore
    //const {address, imgUrl} = props.coffeeStore.location
    //const neighbourhood = props.coffeeStore.location.neighborhood;
    console.log('neighbourhood', address,neighborhood, name, imgUrl)
    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/" scroll={false}>
                            <a>←Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" } alt={name} width={600} height={300} className={styles.storeImg} alt={name}/>
                </div>
                <div className={classNames("glass" ,styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/icons/places.svg" width="24" height="24" alt="address-icon"/>
                        <p className={styles.text}>{address}</p>
                    </div>
                    { neighborhood &&
                        <div className={styles.iconWrapper}>
                            <Image src="/icons/nearMe.svg" width="24" height="24" alt="neighbourhood-icon"/>
                            <p className={styles.text}>{neighborhood}</p>
                        </div>
                    }
                    <div className={styles.iconWrapper}>
                        <Image src="/icons/star.svg" width="24" height="24" alt="address-icon"/>
                        <p className={styles.text}>1</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpVoteButton}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    )
}
