import { gql, useMutation } from "@apollo/client";
import { async } from "@firebase/util";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/store";
import { IMutation, IMutationLoginUserExampleArgs } from "../../../src/commons/types/generated/types";

const LOGIN_USER = gql`
    mutation loginUserExample($email: String!, $password: String!){
        loginUserExample(email:$email, password: $password){
            accessToken
        }
    }
`

export default function LoginPage(){

    const router = useRouter();
    const [accessToken,setAccessToken] = useRecoilState(accessTokenState);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [loginUserExample] = useMutation<Pick<IMutation,"loginUserExample">,IMutationLoginUserExampleArgs>(LOGIN_USER)

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value)
    }

    const onClickLogin = async (event: ChangeEvent<HTMLInputElement>) =>{
        try{
            const result = await loginUserExample({
                variables: {
                    email,
                    password,
                }
            })

            const accessToken = result.data?.loginUserExample.accessToken
            console.log(accessToken);

            if(accessToken === undefined) {
                Modal.error({content: '로그인 실패. 재시도'})
                return ;
            }
            setAccessToken(accessToken)

            void router.push('/30-01-login/22-02-loginsuccess')
        }catch(error){
            if(error instanceof Error) Modal.error({content: error.message})
        }
        
    }

    return (
        <>
            이메일 : <input type ="text" onChange={onChangeEmail}/>
            비밀번호 : <input type ="password" onChange={onChangePassword}/>
            <button onClick={onClickLogin}>로그인하기</button>
        </>
    );
}