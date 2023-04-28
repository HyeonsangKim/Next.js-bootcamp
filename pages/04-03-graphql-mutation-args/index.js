import { useMutation,gql } from "@apollo/client"

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

    const [myFunction] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result =  await myFunction({
            variables: {
                writer: "Obiwan",
                title: "hello there",
                contents: "hello"
            }
        })
        console.log(result);
    }

    return (
        <>
            <button onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}