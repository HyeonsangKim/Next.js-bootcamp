import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, fromPromise } from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { accessTokenState, restoreAccessTokenLoadable } from "../../../commons/store";
import {onError} from '@apollo/client/link/error'
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

const GLOBAL_STATE = new InMemoryCache()

interface IApolloSettingProps {
    children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps){
    const [accessToken,setAccessToken] = useRecoilState(accessTokenState)
    const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable)
    
    useEffect(()=>{
        // 1.기존방식(refresh token 이전)
        // const result = localStorage.getItem("accessToken")
        
        void aaa.toPromise().then((newAccessToken)=>{
            setAccessToken(newAccessToken ?? "")
        })
    },[])


    const errorLink = onError(({ graphQLErrors, operation, forward })=>{
        // 1. 에러를 캐치
        if(typeof graphQLErrors !== "undefined"){
            for(const err of graphQLErrors){
                // 1-2. 해당 에러가 토큰만료인지 체크함
                if(err.extensions.code === "UNAUTHENTICATED"){
                    return fromPromise(
                        // 2. refreshToken으로 accessToken을 재발급 받기
                        getAccessToken().then((newAccessToken) => {
                            setAccessToken(newAccessToken ?? "")

                            // 3. 재발급 받은 accessToken 으로 방금 실패한 쿼리 재요청하기
                            operation.setContext({
                                headers: {
                                    ...operation.getContext().headers, // Authorization: Bearer asdasl;dk;akls => 만료된 토큰이 추가되어 있는 상태
                                    Authorization: `Bearer ${newAccessToken}` // 3-2, 토큰만 새걸로 바꿔치기 하기
                                }
                            })
                        })
                    ).flatMap(()=> forward(operation))
                }
            }
        }
    })

    const uploadLink = createUploadLink({
        uri: 'https://backend-practice.codebootcamp.co.kr/graphql',
        headers: {Authorization: `Bearer ${accessToken}`},
        credentials: 'include'
    })

    const client = new ApolloClient({
        link: ApolloLink.from([errorLink, uploadLink]),
        cache: GLOBAL_STATE, // 나중에 하기
        connectToDevTools: true,
    });

    // prettier-ignore
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}