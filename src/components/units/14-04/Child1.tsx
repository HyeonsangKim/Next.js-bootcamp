export default function Child1(props: any){

    // const onClickCountUp = () => {
    //     setCount(prev=>prev+1)
    // }

     return(
        <>
            <div>자식1이 카운트 : {props.count}</div>
            <button onClick={props.onClickCountUp}>count up</button>
        </>
     )
}