import Head from 'next/head'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'


export default function CoffeStore() {
    const router = useRouter()
    const {id} = router.query

    return (
        <div>
            <Head>
                <title>coffee store</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div> Coffee Store {id}</div>
            <Link href="/" scroll={false}>
                <a>Home</a>
            </Link>
        </div>
    )
}
