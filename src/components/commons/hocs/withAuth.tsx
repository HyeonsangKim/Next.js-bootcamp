import { useRouter } from "next/router"
import {useEffect} from 'react'
import { getAccessToken } from "../../../commons/libraries/getAccessToken"
import { restoreAccessTokenLoadable } from "../../../commons/store";
import { useRecoilValueLoadable } from "recoil";

export const withAuth = (Component: any) => (props: any) => {

    const router = useRouter();
    const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

    // useEffect(()=>{
    //     if(localStorage.getItem('accessToken') === null){
    //         alert("로그인 후 이용 가능합니다.")
    //         void router.push('/23-03-logincheck')
    //     }
    // },[])

    // useEffect(()=>{
    //     void getAccessToken().then((newAccessToken)=>{
    //         if(newAccessToken === undefined){
    //             alert("로그인 후 이용 가능합니다.")
    //             void router.push('/23-03-logincheck')
    //         }
    //     })
    // },[])

    useEffect(()=>{
        void aaa.toPromise().then((newAccessToken)=>{
            if(newAccessToken === undefined){
                alert("로그인 후 이용 가능합니다.")
                void router.push('/23-03-logincheck')
            }
        })
    },[])

    return <Component {...props}/>
}