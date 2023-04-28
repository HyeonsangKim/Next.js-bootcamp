import { useQuery,gql } from "@apollo/client"
import styled from "@emotion/styled"
import { MouseEvent } from "react"
import InfiniteScroll from "react-infinite-scroller"
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

    const {data, fetchMore} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const onLoadMore = () => {
        if(data === undefined) return;

        void fetchMore({
            variables: {page: Math.ceil(data?.fetchBoards.length/10) +1 },
            updateQuery: (prev,{fetchMoreResult}) => {
                if(fetchMoreResult.fetchBoards === undefined){
                    return {
                        fetchBoard: [...prev.fetchBoards],
                    };
                }

                return {
                    fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards]
                };
            },
        })
    }

    return (
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
           {data?.fetchBoards.map((el)=> (
            <div key={el.number}>
                <span style={{margin: '10px'}}>{el.writer}</span>
                <span style={{margin: '10px'}}>{el.title}</span>
            </div>
           )) ?? <div></div>}

        </InfiniteScroll>
    )
}