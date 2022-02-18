import {useRouter} from "next/router";
import Head from "next/head";

const Dynamic =()=>{
    const router = useRouter()
    const {dynamic} = router.query
    console.log(dynamic);
    return(
        <div>
            <Head>
                <title>Dynamic {dynamic}</title>
            </Head>
            <h1>Dynamic Page</h1>
            <p>Dynamic Page: {dynamic}</p>
        </div>
    )
}
export default Dynamic;
