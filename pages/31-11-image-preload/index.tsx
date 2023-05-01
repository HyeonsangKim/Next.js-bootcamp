import { useRouter } from "next/router"
import { useEffect } from "react"

const qqq = []

export default function ImagePreloadPage(){
    const router = useRouter()

    useEffect(()=>{
        const img = new Image()
        img.src = 'img1.png'
        img.onload = () => {
            qqq.push(img)
        }
    },[])

    const onClickMove = () => {
        void router.push("/31-11-image-preload-moved")
    }

    return (
        <>
            <button onClick={onClickMove}>페이지 이동</button>
        </>
    )
}