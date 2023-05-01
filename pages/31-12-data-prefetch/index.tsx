import { useQuery,gql, useApolloClient } from "@apollo/client"
import type { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"
import { useRouter } from "next/router"

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int){
        fetchBoards(page: $page){
            number
            writer
            title
            contents
        }
    }
`

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

    const {data} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const router = useRouter()
    const client = useApolloClient()

    const prefetchBoard = (boardId: string) => async () => {
        await client.query({
            query: FETCH_BOARD,
            variables: { boardId },
        })
    }

    const onClickMove = (boardId:string) => () => {
        void router.push(`/31-12-data-prefetch-moved/${boardId}`)
    }

    return (
        <>
           {data?.fetchBoards.map((el) =>(
            <div key={el._id}>
                <span style={{margin: '10px'}} onMouseOver={prefetchBoard(el._id)} onClick={onClickMove(el._id)}>{el.title}</span>
                <span style={{margin: '10px'}}>{el.writer}</span>
            </div>
           ))}

        </>
    )
}