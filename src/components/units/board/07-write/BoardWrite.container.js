import BoardWriteUI from "../07-write/BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { CREATE_BOARD } from "./BoardWrite.queries"

export default function BoardWrite(){

    const [mycolor,setMycolor] = useState(false);
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
        if(writer && title && contents){
            setMycolor(true)
        }
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
        if(writer && title && contents){
            setMycolor(true)
        }
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
        if(writer && title && contents){
            setMycolor(true)
        }
    }

    // html 영역(return 아래)
    return (
        <BoardWriteUI 
            onClickSubmit={onClickSubmit}
            onChangeWriter={onChangeWriter}
            onChangeTitle={onChangeTitle}
            onChangeContents={onChangeContents}
            mycolor={mycolor}
        />
    )

}