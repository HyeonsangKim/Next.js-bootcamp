import { useMutation,gql } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { IMutation, IMutationCreateBoardArgs } from "../../src/commons/types/generated/types"

const CREATE_BOARD = gql`
    mutation createBoard($writer:String, $title: String,$contents:String) { # 타입적는곳
        createBoard(writer: $writer, title:$title, contents:$contents){     # 실제 우리가 전달할 변수 적는 곳
            _id
            number
            message
        }
    }
`

export default function GraphMutationPage(){

    const [writer,setWriter] = useState<string>("")
    const [title,setTitle] = useState("")
    const [contents,setContents] = useState("")
    const [myFunction] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD)

    const router = useRouter()

    const onClickSubmit = async () => {
        const result =  await myFunction({
            variables: {
                writer: writer,
                title: title,
                contents: contents
            }
        })
        console.log(result);
        alert(result.data?.createBoard?.message)
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

    return (
        <>
            작성자: <input type="text" onChange={onChangeWriter} /><br/>
            제목: <input type="text" onChange={onChangeTitle} /><br/>
            내용: <input type="text" onChange={onChangeContents} /><br/>
            <button onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}