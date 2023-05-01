import { useQuery,gql } from "@apollo/client"
import { useRouter } from "next/router"

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
            _id
            writer
            title
            contents
        }
    }
`

export default function StaticRoutedPage(){

    const router = useRouter()

    const {data} = useQuery(FETCH_BOARD,{
        variables: {
            number: {boardId: router.query.qqq}
        }
    })

    return (
        <>
           이동완료.<br/>
           <div>작성자 : {data?.fetchBoard?.writer}</div>
           <div>제목 : {data?.fetchBoard?.title}</div>
           <div>내용 : {data?.fetchBoard.contents}</div>
        </>
        )
}