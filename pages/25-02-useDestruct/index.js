import {useState} from 'react'

export default function CounterStatePage(){
 
    const result = useState(0);

    function onClickCountUp(){
        result[1][6];
    }

    return (
        <div>
            <div>{result[0]}</div>
            <button onClick={onClickCountUp}>카운트 올리기</button>
        </div>
    )
}