import { gql, useMutation } from "@apollo/client"
import { Modal } from "antd"
import { ChangeEvent, useRef, useState } from "react"
import { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types"

const UPLOAD_FILE = gql`
    mutation uploadfile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }    

`

export default function ImageUploadPage(){

    const fileRef = useRef<HTMLInputElement>(null)
    const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">,IMutationUploadFileArgs>(UPLOAD_FILE)
    const [imageUrl,setImageUrl] = useState("")
    
    const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] // multiple 속성으로 여러개 드래그 가능
    
        try{
            const result = await uploadFile({
                variables: {file}
            })
            setImageUrl(result.data?.uploadFile.url ?? "")
            
        }catch(error){
            if(error instanceof Error){
                Modal.error({content: error.message})
            }
            
        }
        
    }

    const onClickImage = () => {
        fileRef.current?.click();
    }

    return(
        <>
            <div style={{width: "50px", height: "50px", backgroundColor: "gray"}} onClick={onClickImage}>이미지 선택</div>
             <input style={{display: "none"}} type="file" onChange={onChangeFile} ref={fileRef}/>
             <img src={`https://storage.googleapis.com/${imageUrl}`}/>
        </>
    )
}