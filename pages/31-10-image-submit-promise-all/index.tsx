import { gql, useMutation } from "@apollo/client"
import { ChangeEvent, useState } from "react"
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

export default function ImageUploadPage() :JSX.Element{

    const [imageUrls,setImageUrls] = useState(["","",""])
    const [files,setFiles] = useState<File[]>([])

    const [myFunction] = useMutation(CREATE_BOARD)
    const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">,IMutationUploadFileArgs>(UPLOAD_FILE)
    
    const onClickSubmit = async (): Promise<void> => {
        // 1-1 안좋은 예재 - await 를 매번 기다림 => for문 사용해도 마찬가지 ( 이유: i 값에 의존하기 때문에 )
        // const resultFile0 = await uploadFile({variables: { file: files[0] }})
        // const resultFile1 = await uploadFile({variables: { file: files[1] }})
        // const resultFile2 = await uploadFile({variables: { file: files[2] }})
        // const url0 = resultFile0.data?.uploadFile.url 
        // const url1 = resultFile1.data?.uploadFile.url 
        // const url2 = resultFile2.data?.uploadFile.url
        // const resultUrls = [url0,url1,url2] 

        // 1-2 좋은 예재 - Promise All 사용 
        // const results = await Promise.all([
        //     uploadFile({variables: { file: files[0] }}),
        //     uploadFile({variables: { file: files[1] }}),
        //     uploadFile({variables: { file: files[2] }}),
        // ])
        // const resultUrls = results.map(el=> el.data?.uploadFile.url)

        // 1-3 좋은 예제 - Promise.all 사용 => 리팩토링
        // const files = [File0, File1, File2]
        // files.map(el=>uploadFile({variables: {file: el}}))
        const results = await Promise.all(
            files.map(async (el) => await uploadFile({variables: { file: el }}))
        )
        const resultUrls = results.map((el)=> el.data?.uploadFile.url)
        

        const result =  await myFunction({
            variables: {
                createBoardInput: {
                    writer: 'writer',
                    password: '1234',
                    title: 'title',
                    contents: 'contents',
                    images: resultUrls
                }
            }
        })
        console.log(result);
        
    }

    const onChangeFile = (index: number) => async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
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
                const tempUrls = [...imageUrls]
                tempUrls[index] = event.target?.result
                setImageUrls(tempUrls)

                const tempFiles = [...files]
                tempFiles[index] = file
                setFiles(tempFiles)
            }
        }
    }

    return(
        <>
             <input type="file" onChange={onChangeFile(0)} />
             <input type="file" onChange={onChangeFile(1)} />
             <input type="file" onChange={onChangeFile(2)} />
             <img src={imageUrls[0]} />
             <img src={imageUrls[1]} />
             <img src={imageUrls[2]} />
             {/* <img src={`https://storage.googleapis.com/${imageUrl}`}/> */}
            <button onClick={onClickSubmit}>게시글 등록</button>
        </>
    )
}