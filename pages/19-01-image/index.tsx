import { gql, useMutation } from "@apollo/client"
import { Modal } from "antd"
import { ChangeEvent, useState } from "react"
import { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types"

const UPLOAD_FILE = gql`
    mutation uploadfile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }    

`

export default function ImageUploadPage(){

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

    return(
        <>
             <input type="file" onChange={onChangeFile} />
             <img src={`https://storage.googleapis.com/${imageUrl}`}/>
        </>
    )
}