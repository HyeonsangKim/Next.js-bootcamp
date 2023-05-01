import { gql, useMutation } from "@apollo/client"
import { ChangeEvent, useState } from "react"
import { IMutation, IMutationUploadFileArgs } from "../../src/commons/types/generated/types"
import { log } from "console"

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

export default function ImageUploadPage() :JSX.Element{

    const [imageUrl,setImageUrl] = useState("")
    const [file,setFile] = useState<File>()

    const [myFunction] = useMutation(CREATE_BOARD)
    const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">,IMutationUploadFileArgs>(UPLOAD_FILE)
    
    const onClickSubmit = async (): Promise<void> => {
        const resultFile = await uploadFile({variables: {file}})
        const url = resultFile.data?.uploadFile.url 

        const result =  await myFunction({
            variables: {
                createBoardInput: {
                    writer: 'writer',
                    password: '1234',
                    title: 'title',
                    contents: 'contents',
                    images: [url]
                }
            }
        })
        console.log(result);
        
    }

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
            if(typeof event.target?.result === 'string'){
                setImageUrl(event.target?.result)
                setFile(file)
            }
        }
    }

    return(
        <>
             <input type="file" onChange={onChangeFile} />
             <img src={imageUrl} />
             {/* <img src={`https://storage.googleapis.com/${imageUrl}`}/> */}
            <button onClick={onClickSubmit}>게시글 등록</button>
        </>
    )
}