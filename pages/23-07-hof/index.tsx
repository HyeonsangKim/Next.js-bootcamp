import { useQuery,gql } from "@apollo/client"
import styled from "@emotion/styled"
import { MouseEvent } from "react"
import { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"

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

export default function StaticRoutedPage(){

    const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const onClickPage = (boardId: number) =>  (event: MouseEvent<HTMLSpanElement>) => {
        void refetch({ page: boardId })
    }

    return (
        <>
           {data?.fetchBoards.map((el)=> (
            <div key={el.number}>
                <span style={{margin: '10px'}}>{el.writer}</span>
                <span style={{margin: '10px'}}>{el.title}</span>
            </div>
           ))}

            {
                new Array(10).fill(1).map((el, index)=>(
                    <span key={index+1} onClick={onClickPage(index+1)}>
                        {index+1}
                    </span>
                ))
            }
        </>
    )
}

// const aaa = () => {

// }