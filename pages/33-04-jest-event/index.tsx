import { useState } from "react";

export default function JestUnitTestPage(){
    const [count,setCount] = useState(0)

    const onClickCountUp = (): void=>{
        setCount((prev: number)=>prev+1);
    }

    return (
        <>
            <div role="count">{count}</div>
            <button role="count-button" onClick={onClickCountUp}>철수랑 놀러가기</button>
        </>
    )
}