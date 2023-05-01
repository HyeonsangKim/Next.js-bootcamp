// 제공자 일때

import Head from 'next/head'

export default function OpengraphProviderPage(){
    return(
        <>
            <Head>
                <meta property='og:title' content="중고마켓" />
                <meta property='og:description' content='나의 중고마켓에 오신 것을 환영합니다' />
                <meta property='og:image' content='http://~~~~'/>
            </Head>
            <div>어서오세요 (여기는 body)</div>
        </>
    )
}