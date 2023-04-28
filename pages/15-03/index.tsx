import { useQuery,gql } from "@apollo/client"
import { useState } from "react"
import { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"
import BoardCommentItem from "../../src/components/units/15-board"

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

    const {data} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    return (
        <>
           {data?.fetchBoards.map((el,index)=> (
                <BoardCommentItem key={el.number} el={el}/>
           ))}
        </>
    );
}