// 제공자 일때

import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import {GraphQLClient} from 'graphql-request'

const FETCH_USEDITEM = gql`
    query fetchUseditem($useditemId: ID!){
        fetchUseditem(useditemId: $useditemId){
            _id
            name
            remarks
            images
        }
    }
`

export default function OpengraphProviderPage(props: any){
    const {data} = useQuery(FETCH_USEDITEM, {
        variables: { useditemId: "644b91f8aef9f000281ba4b1" },
    })

    return(
        <>
            <Head>
                <meta property='og:title' content={props?.qqq.name} />
                <meta property='og:description' content={props?.qqq.remarks} />
                <meta property='og:image' content={props?.qqq.images?.[0]}/>
            </Head>
            <div>어서오세요 (여기는 body)</div>
        </>
    )
}

// 1. getServerSideProps는 존재하는 단어이므로 변경 불가능
export const getServerSideProps = async ():Promise<any> => {
    const graphQLClient = new GraphQLClient(
        'https://backend-practice.codebootcamp.co.kr/graphql'
    )
    const result = await graphQLClient.request(FETCH_USEDITEM, {
        useditemId: "644b91f8aef9f000281ba4b1"
    })

    return {
        props: {
            qqq: {
                name: result.fetchUseditem.name,
                remarks: result.fetchUseditem.remarks,
                images: result.fetchUseditem.images,
            },
        },
    }
}