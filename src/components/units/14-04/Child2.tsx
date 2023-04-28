import { useState } from "react"

export default function Child2(props: any){

    return(
       <>
           <div>자식2이 카운트: {props.count}</div>
           <button onClick={props.onClickCountUp}>count up</button>
       </>
    )
}