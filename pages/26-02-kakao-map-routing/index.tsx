import Link from "next/link";
import { useRouter } from "next/router"

export default function KakaoMapPage(){
    
    const router = useRouter()

    const onClickMoveToMap = () => {
        void router.push("26-03-kakao-map-routed");
    }

    return (
        <>
            {/* <a href="/26-03-kakao-map-routed">웹 으로 이동</a>
            <button onClick={onClickMoveToMap}>웹으로 이동하기!!</button> */}
            <Link href="/26-03-kakao-map-routed">
                맵으로 이동
            </Link>
        </>
    )
}