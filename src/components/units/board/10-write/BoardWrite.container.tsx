import BoardWriteUI from "../10-write/BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries"
import { IBoardWriteUIProps, IMyvariables } from "./BoardWrite.types"



export default function BoardWrite(props: IBoardWriteUIProps){
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
        
        const myvariables: IMyvariables = {
            number: Number(router.query.number)
        }
        if(writer) myvariables.writer = writer
        if(title) myvariables.title = title
        if(contents) myvariables.contents = contents

        // 수정하기 mutation
        const result = await updateBoard({
            variables: myvariables
        })
        alert(result.data.updateBoard.message)
        router.push(`/08-05/${result.data.updateBoard.number}`)
    }

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value)
        if(writer && title && contents){
            setMycolor(true)
        }
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        if(writer && title && contents){
            setMycolor(true)
        }
    }

    const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
        if(writer && title && contents){
            setMycolor(true)
        }
    }

    // html 영역(return 아래)
    return (
        <>
            {BoardWriteUI({
            onClickSubmit: onClickSubmit,
            onClickUpdate: onClickUpdate,
            onChangeWriter: onChangeWriter,
            onChangeTitle: onChangeTitle,
            onChangeContents: onChangeContents,
            mycolor: mycolor,
            isEdit: props.isEdit,
            data: props.data
        })}
        </>
        
        // <BoardWriteUI 
        //     onClickSubmit={onClickSubmit}
        //     onClickUpdate={onClickUpdate}
        //     onChangeWriter={onChangeWriter}
        //     onChangeTitle={onChangeTitle}
        //     onChangeContents={onChangeContents}
        //     mycolor={mycolor}
        //     isEdit={props.isEdit}
        //     data={props.data}
        // />
    )
    
}