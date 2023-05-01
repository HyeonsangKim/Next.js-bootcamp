import { ChangeEvent, useState } from "react"

export default function ImageUploadPage(): JSX.Element{

    const [imageUrl,setImageUrl] = useState("")
    
    const onChangeFile = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files?.[0] // multiple 속성으로 여러개 드래그 가능
        if(file === undefined) return;
        console.log(file);
        console.log('파일까지 나옴');

        // 1. 임시 url 생성 => (가짜 url - 내 브라우저에서만 접근 가능)
        // const result = URL.createObjectURL(file)
        // console.log(result);

        // 2. 임시 url 생성 => (진짜 url - 다른 브라우저에서도 접근 가능)
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = (event) => {
            console.log(event.target?.result); // 게시판에서 event.targer.id를 쓰면 eslint가 잡았던 이유 : event.targer은 태그만을 가르키지 않음.
            if(typeof event.target?.result === 'string')
                setImageUrl(event.target?.result)
            
        }
    }

    return(
        <>
             <input type="file" onChange={onChangeFile} />
             <img src={imageUrl} />
             {/* <img src={`https://storage.googleapis.com/${imageUrl}`}/> */}

        </>
    )
}