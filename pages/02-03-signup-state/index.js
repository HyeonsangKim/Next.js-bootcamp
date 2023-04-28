import {useState} from 'react'

export default function SignupStatePage(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [emailError,setEmailError] = useState("")

    function onChangeEmail(event){
        setEmail(event.target.value);
    }

    function onChangePassword(event){
        setPassword(event.target.value);
    }

    function onClickSignup(event){
        if(email.includes("@")==false){
            setEmailError("이메일 올바르지 않습니다")
        }else{
            alert("congratulations")
        }
    }

    return (
        <>
            이메일 : <input type="text" onChange={onChangeEmail}/>
            <div>{emailError}</div>
            비밀번호: <input type="password" onChange={onChangePassword}/>
            <button onClick={onClickSignup}>회원가입</button>
        </>
    )

}