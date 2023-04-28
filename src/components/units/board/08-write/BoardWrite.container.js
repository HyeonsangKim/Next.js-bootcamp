import BoardWriteUI from "../08-write/BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries"

export default function BoardWrite(props){

    const router = useRouter()
    const [mycolor,setMycolor] = useState(false);
    // javascript 
    const [writer,setWriter] = useState("")
    const [title,setTitle] = useState("")
    const [contents,setContents] = useState("")
    const [myFunction] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

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
        router.push("/08-05/"+ result.data.createBoard.number)
    }

    const onClickUpdate = async () => {
        // 수정하기 mutation
        const result = await updateBoard({
            variables: {
                number: Number(router.query.number),
                writer,
                title,
                contents
            }
        })
        alert(result.data.updateBoard.message)
        router.push(`/08-05/${result.data.updateBoard.number}`)
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
            onClickUpdate={onClickUpdate}
            onChangeWriter={onChangeWriter}
            onChangeTitle={onChangeTitle}
            onChangeContents={onChangeContents}
            mycolor={mycolor}
            isEdit={props.isEdit}
        />
    )

}