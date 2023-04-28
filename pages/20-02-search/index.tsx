import { useQuery,gql } from "@apollo/client"
import styled from "@emotion/styled"
import { ChangeEvent, MouseEvent, useState } from "react"
import { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"
import _ from 'lodash'

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String){
        fetchBoards(page: $page,search: $search){
            _id
            writer
            title
            contents
        }
    }
`

export default function StaticRoutedPage(){
    
    const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
        void refetch({ page: Number(event.currentTarget.id) })
    }

    // const onClickSearch = () => {
    //     void refetch({ search, page: 1})
    // }

    const getDebounce = _.debounce((value) => {
        void refetch({ search: value, page:1 })
    }, 500)

    const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        // void refetch({search: event.target.value, page:1})
        getDebounce(event.target.value)
    }

    return (
        <>
        검색어 입력 : <input type="text" onChange={onChangeSearch}/>
        {/* <button onClick={onClickSearch}>검색하기</button> */}

        {data?.fetchBoards.map((el)=> (
        <div key={el._id}>
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