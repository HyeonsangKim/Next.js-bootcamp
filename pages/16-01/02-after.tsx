import { useMutation,gql } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"

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
    const [inputs,setInputs] = useState({
        writer: "",
        title: "",
        contents: ""
    })
    // const [writer,setWriter] = useState("")
    // const [title,setTitle] = useState("")
    // const [contents,setContents] = useState("")
    const [myFunction] = useMutation(CREATE_BOARD)

    const router = useRouter()

    const onClickSubmit = async () => {
        const result =  await myFunction({
            variables: {...inputs}
            
        })
        console.log(result);
        alert(result.data.createBoard.message)
        router.push("/05-08-dynamic-routed-board-query/"+result.data.createBoard.number)
    }

    const onChangeInputs = (event) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value
        })
    }
    return (
        <>
            작성자: <input id="writer" type="text" onChange={onChangeInputs} /><br/>
            제목: <input id="title" type="text" onChange={onChangeInputs} /><br/>
            내용: <input id="contents" type="text" onChange={onChangeInputs} /><br/>
            <button onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}