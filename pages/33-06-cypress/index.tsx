import { useRouter } from "next/router"

export default function CypressE2ETestPage(){
    const router = useRouter()

    const onClickMove = () => {
        router.push("/33-06-cypress-moved")
    }

    return <button onClick={onClickMove}>철수랑 놀러가기</button>
}