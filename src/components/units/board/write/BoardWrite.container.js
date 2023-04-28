import BoardWriteUI from "../write/BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { CREATE_BOARD } from "./BoardWrite.queries"

export default function BoardWrite(){

    // javascript 
    const [writer,setWriter] = useState("")
    const [title,setTitle] = useState("")
    const [contents,setContents] = useState("")
    const [myFunction] = useMutation(CREATE_BOARD)

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
        alert(result.data.createBoard.message)
        router.push("/05-08-dynamic-routed-board-query/"+result.data.createBoard.number)
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

    // html 영역(return 아래)
    return (
        <BoardWriteUI 
            onClickSubmit={onClickSubmit}
            onChangeWriter={onChangeWriter}
            onChangeTitle={onChangeTitle}
            onChangeContents={onChangeContents}
        />
    )

}