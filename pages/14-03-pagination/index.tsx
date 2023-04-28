import { useQuery,gql } from "@apollo/client"
import styled from "@emotion/styled"
import { MouseEvent, useState } from "react"
import { IQuery, IQueryFetchBoardArgs, IQueryFetchBoardsCountArgs } from "../../src/commons/types/generated/types"

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

const FETCH_BOARDS_COUNT = gql`
    query fetchBoardsCount{
        fetchBoardsCount 
    }
`

export default function StaticRoutedPage(){

    const [startPage,setStartPage] = useState(1)

    const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const {data: dataBoardCount} = useQuery<Pick<IQuery,"fetchBoardsCount">, IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT)

    const lastPage = 
    dataBoardCount != null 
        ? Math.ceil(dataBoardCount.fetchBoardsCount/10) : 0

    const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
        void refetch({ page: Number(event.currentTarget.id) })
    }

    const onClickPrevPage = () => {
        if(startPage===1) return 
        setStartPage(startPage-10);
        void refetch({page: startPage-10})
    };

    const onClickNextPage = () => {
        if(startPage + 10 <= lastPage){
            setStartPage(startPage+10);
            void refetch({page: startPage+10});
        }
    };

    return (
        <>
           {data?.fetchBoards.map((el)=> (
            <div key={el.number}>
                <span style={{margin: '10px'}}>{el.writer}</span>
                <span style={{margin: '10px'}}>{el.title}</span>
            </div>
           ))}

            <span onClick={onClickPrevPage}> 이전페이지 </span>
            {
                new Array(10).fill(1).map((_, index) =>
                    index + startPage <= lastPage && (
                        <span key={startPage+index} id={String(index+startPage)} onClick={onClickPage} style={{margin:"10px"}}>
                            {index+startPage}
                        </span>
                    )
                )}
            <span onClick={onClickNextPage}> 다음페이지 </span>

            {/* <span onClick={onClickPrevPage}> 이전페이지 </span>
            {
                new Array(10).fill(1).map((el, index)=>{
                    if(index + startPage <= lastPage){
                        return (
                            <span key={startPage+index} id={String(index+startPage)} onClick={onClickPage} style={{margin:"10px"}}>
                                {index+startPage}
                            </span>
                        )
                    }else{
                        return (
                            <span>
                            </span>
                        )
                    }
                })
            }
            <span onClick={onClickNextPage}> 다음페이지 </span> */}
            {/* {
                [1,2,3,4,5,6,7,8,9,10].map((el, index)=>(
                    <span key={index+1} id={String(index+1)} onClick={onClickPage}>
                        {index+1}
                    </span>
                ))
            } */}

            {/* {
                [1,2,3,4,5,6,7,8,9,10].map((el)=>(
                    <span key={el} id={String(el)} onClick={onClickPage}>
                        {el}
                    </span>
                ))
            } */}

        </>
    )
}