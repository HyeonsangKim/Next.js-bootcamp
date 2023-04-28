import { useMutation,gql } from "@apollo/client"

const CREATE_BOARD = gql`
    mutation{
        createBoard(writer: "R2D2", title:"Droid", contents:"Contents"){
            _id
            number
            message
        }
    }
`

export default function GraphMutationPage(){

    const [myFunction] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result =  await myFunction()
        console.log(result)
        alert(result.data.createBoard.message)
    }

    return (
        <>
            <button onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}