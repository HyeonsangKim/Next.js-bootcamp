import axios from "axios"
import { useState } from "react";

export default function RestGetPage(){

    const [title,setTitle] = useState("")

    const onClickAsync = () => {
        const data= axios.get("https://koreanjson.com/posts/1")
        console.log(data);
    }

    const onClickSync = async () => {
        const data= await axios.get("https://koreanjson.com/posts/1")
        console.log(data);
        setTitle(data.data.title)
    }

    return (
        <>
            <button onClick={onClickAsync}>REST API 비동기 요청하기</button>
            <button onClick={onClickSync}>REST API 동기 요청하기</button>
            <div>{title}</div>
        </>
    )

}