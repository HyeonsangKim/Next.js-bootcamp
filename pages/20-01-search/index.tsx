import { useQuery,gql } from "@apollo/client"
import styled from "@emotion/styled"
import { ChangeEvent, MouseEvent, useState } from "react"
import { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String){
        fetchBoards(page: $page,search: $search){
            number
            writer
            title
            contents
        }
    }
`

export default function StaticRoutedPage(){

    const [search, setSearch] = useState(""
    )
    const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
        void refetch({ search, page: Number(event.currentTarget.id) })
    }

    const onClickSearch = () => {
        void refetch({ search, page: 1})
    }

    const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <>
        검색어 입력 : <input type="text" onChange={onChangeSearch}/>
        <button onClick={onClickSearch}>검색하기</button>

        {data?.fetchBoards.map((el)=> (
        <div key={el.number}>
            <span style={{margin: '10px'}}>{el.writer}</span>
            <span style={{margin: '10px'}}>{el.title}</span>
        </div>
        ))}

        {
            new Array(10).fill(1).map((el, index)=>(
                <span key={index+1} id={String(index+1)} onClick={onClickPage}>
                    {index+1}
                </span>
            ))
        }

        </>
    )
}