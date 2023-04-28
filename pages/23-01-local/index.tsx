import { gql, useMutation } from "@apollo/client";
import { async } from "@firebase/util";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import { IMutation, IMutationLoginUserArgs } from "../../src/commons/types/generated/types";

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email:$email, password: $password){
            accessToken
        }
    }
`

export default function LoginPage(){

    const router = useRouter();
    const [accessToken,setAccessToken] = useRecoilState(accessTokenState);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [loginUser] = useMutation<Pick<IMutation,"loginUser">,IMutationLoginUserArgs>(LOGIN_USER)

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value)
    }

    const onClickLogin = async (event: ChangeEvent<HTMLInputElement>) =>{
        try{
            const result = await loginUser({
                variables: {
                    email,
                    password,
                }
            })

            const accessToken = result.data?.loginUser.accessToken
            console.log(accessToken);

            if(!accessToken) {
                Modal.error({content: '로그인 실패. 재시도'})
                return ;
            }
            setAccessToken(accessToken)
            localStorage.setItem("accessToken",accessToken) // 임시 사용

            void router.push('/23-02-loginsuccess')
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