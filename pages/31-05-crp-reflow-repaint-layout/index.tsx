import { useQuery,gql } from "@apollo/client"
import type { MouseEvent } from "react"
import type { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int){
        fetchBoards(page: $page){
            _id
            writer
            title
            contents
        }
    }
`

export default function StaticRoutedPage(): JSX.Element{

    const {data, refetch} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const onClickEdit = (event: MouseEvent<HTMLSpanElement>): void => {
        void refetch({ page: Number(event.currentTarget.id) });
    }

    console.log(data);
    
    return (
        <>
           {(data?.fetchBoards?? new Array(10).fill(1)).map((el) => (
                <div key={el._id} style={{ height: "30px" }}> 
                    <span style={{margin: '10px'}}>{el.title}</span>
                    <span style={{margin: '10px'}}>{el.writer}</span>
                </div>
           ))}
           {new Array(10).fill('철수').map((_,index)=>(
            <span key={index+1} id={String(index+1)} onClick={onClickEdit}>
                {index + 1}
            </span>
           ))}

        </>
    )
}