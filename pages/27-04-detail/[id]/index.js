import { useQuery,gql } from "@apollo/client"
import { useRouter } from "next/router"
import Dompurify from "dompurify"

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
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
            boardId: router.query.id
        }
    })


    return (
        <>
           <div>작성자 : {data ? data.fetchBoard.writer:"Loading...."}</div>
           <div>제목 : {data && data.fetchBoard.title}</div>
           {/* <div>내용 : {data?.fetchBoard.contents}</div> */}
           {typeof window !== "undefined" && (
           <div dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard.contents)
           }}></div>
           )}
        </>
        )
}