import { useMutation,gql } from "@apollo/client"
import { useRouter } from "next/router"
import { Modal } from "antd"
import { ChangeEvent, useRef, useState } from "react"
import { checkValidationFile } from "../../src/commons/libraries/validationFile"
import { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types"


const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) { # 타입적는곳
        createBoard(createBoardInput: $createBoardInput){     # 실제 우리가 전달할 변수 적는 곳
            _id
        }
    }
`

const UPLOAD_FILE = gql`
    mutation uploadfile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }    

`

export default function GraphMutationPage(){

    const fileRef = useRef<HTMLInputElement>(null)
    const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">,IMutationUploadFileArgs>(UPLOAD_FILE)
    const [imageUrl,setImageUrl] = useState("")

    const [writer,setWriter] = useState("")
    const [title,setTitle] = useState("")
    const [contents,setContents] = useState("")
    const [myFunction] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result =  await myFunction({
            variables: {
                createBoardInput: {
                    writer: writer,
                    password: '1234',
                    title: title,
                    contents: contents,
                    images: [imageUrl]
                }
            }
        })
        console.log(result);
        // alert(result.data.createBoard.message)
    }

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] // multiple 속성으로 여러개 드래그 가능
       
        const isValid = checkValidationFile(file)
        if(!isValid) return;

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

    return (
        <>
            작성자: <input type="text" onChange={onChangeWriter} /><br/>
            제목: <input type="text" onChange={onChangeTitle} /><br/>
            내용: <input type="text" onChange={onChangeContents} /><br/>
            <div style={{width: "50px", height: "50px", backgroundColor: "gray"}} onClick={onClickImage}>이미지 선택</div>
             <input style={{display: "none"}} type="file" onChange={onChangeFile} ref={fileRef} accept="image/jpeg"/>
             <img src={`https://storage.googleapis.com/${imageUrl}`}/>
            <button onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}