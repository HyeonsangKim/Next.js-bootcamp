import { useRouter } from "next/router"

export default function StaticRoutingPage(){
    const router = useRouter() 

    const onClickMove1 = async () => {
        router.push("/05-08-dynamic-routed-board-query/14157")
    }

    const onClickMove2 = async () => {
        router.push("/05-08-dynamic-routed-board-query/2")
    }

    const onClickMove3 = async () => {
        router.push("/05-08-dynamic-routed-board-query/3")
    }
    
    const onClickMove100 = async () => {
        router.push("/05-08-dynamic-routed-board-query/100")
    }

    return (
        <>
            <button onClick={onClickMove1}>14157번 게시글로 이동</button>
            <button onClick={onClickMove2}>2번 게시글로 이동</button>
            <button onClick={onClickMove3}>3번 게시글로 이동</button>
            <button onClick={onClickMove100}>100번 게시글로 이동</button>
        </>
    )
}