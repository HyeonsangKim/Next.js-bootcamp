import { useCallback, useMemo, useState } from "react";
import MemorizationWithChildPage from "./02-child";

export default function MemoizationPage(): JSX.Element{

    let countLet = 0;
    const [countState,setCountState] = useState(0);

    const aaa = useMemo(()=>{
        return Math.random();
    },[]) 

    const onClickCountState = useCallback((): void => {
        setCountState((prev)=> prev+1);
    },[]);

    const onClickCountState2 = useMemo(() => {
        return (): void => {
            setCountState(countState+1)
        }
    },[]);

    const onClickCountLet = (): void => {
        countLet += 1;
    }

    return (
        <>
            <div>카운트(let) : {countLet}</div>
            <button onClick={onClickCountLet}>카운트(let) + 1 올리기</button>

            <div>카운트(state) : {countState}</div>
            <button onClick={onClickCountState}>카운트(state) + 1 올리기</button>
        
            <div>카운트(state) : {countState}</div>
            <button onClick={onClickCountState}>카운트(state) + 1 올리기</button>
            
            <MemorizationWithChildPage />
        </>
        
    )

}