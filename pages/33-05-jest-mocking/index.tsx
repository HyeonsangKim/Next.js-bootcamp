import { useQuery,gql, useMutation } from "@apollo/client"
import styled from "@emotion/styled"
import { ChangeEvent, MouseEvent, useState } from "react"
import { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"
import { useRouter } from "next/router"


const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!){
        createBoard(createBoardInput: $createBoardInput){
            _id
            writer
            title
            contents
        }
    }`

export default function StaticRoutingMovedPage(){

    const [writer,setWriter] = useState("")
    const [title,setTitle] = useState("")
    const [contents,setContents] = useState("")

    const [myFunction] = useMutation(CREATE_BOARD)

    const router = useRouter()

    const onClickSubmit = async ():Promise<void> => {
        const result =  await myFunction({
            variables: {
                createBoardInput: {
                    writer: writer,
                    title: title,
                    contents: contents,
                    password:"1234",
                }
            }
        })
        console.log(result);
        const boardId = result.data.createBoard._id
        void router.push(`/boards/${boardId}`)
    }

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>): void => {
        setWriter(event.target.value)
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
    }

    return (
        <>
            작성자: <input role="input-writer" type="text" onChange={onChangeWriter} /><br/>
            제목: <input role="input-title" type="text" onChange={onChangeTitle} /><br/>
            내용: <input role="input-contents" type="text" onChange={onChangeContents} /><br/>
            <button role="submit-button" onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}