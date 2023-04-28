import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'

interface IPrevState {
    count: number;
}

export default function ClassCounterPage(){
   
    const [count,setCount] = useState(0)
    const router = useRouter();
    // componentDidMount(){

    // }
    
    // componentDidUpdate(){

    // }
 
    // componentDidUnmount(){

    // }
    useEffect(()=>{
        console.log('변경되고 나서 실행');
        
    },[])


    const onClickCountUp= () => {
        setCount(prev=>prev+1);
    }

    const onClickMove = () => {
        void router.push("/");
    }

    
    return (
        <>
            <div>{count}</div>
            <button onClick={onClickCountUp}>count up</button>
            <button onClick={onClickMove}>나가기</button>
        </>
    )
    

}