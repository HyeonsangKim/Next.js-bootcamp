export default function CounterLetDocumentPage(){
 
    function onClickCountUp(){

    }

    function onClickCountDown(){

    }

    return (
        <div>
            <div>0</div>
            <button onClick={onClickCountUp}>카운트 올리기</button>
            <button onClick={onClickCountDown}>카운트 내리기</button>
        </div>
    )
}