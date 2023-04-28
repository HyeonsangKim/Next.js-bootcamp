import Child1 from "../../src/components/units/14-04/Child1";
import Child2 from "../../src/components/units/14-04/Child2";
import { useState } from "react"

export default function LiftingStateUpPage(){

    const [count,setCount] = useState(0);

    const onClickCountUp = () => {
        setCount(prev=>prev+1)
    }

    return (
        <>
            <Child1 count={count} onClickCountUp={onClickCountUp} setCount={setCount}/>
            <div>===================</div>
            <Child2 count={count} onClickCountUp={onClickCountUp} setCount={setCount} />
        </>
    )

}