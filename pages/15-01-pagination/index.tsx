import { useQuery,gql } from "@apollo/client"
import { useState } from "react"
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

    const [myIndex, setMyIndex] = useState(false,false,false,false,false,false,false,false,false,false)

    const {data} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const onClickEdit = (event: MouseEvent<HTMLButtonElement>) => {

        const qqq = myIndex
        qqq[event.currentTarget.id] = true

    }

    return (
        <>
           {data?.fetchBoards.map((el,index)=> (
            <div key={el.number}>
            {myIndex[index] ===false &&(
                <div key={el.number}>
                    <span style={{margin: '10px'}}>{el.writer}</span>
                    <span style={{margin: '10px'}}>{el.title}</span>
                    <button id={String(index)} onClick={onClickEdit}>수정하기</button>
            </div>
            )}
            {myIndex[index] === true && (
              <div>
                수정할 내용 <input type="text"/>
              </div>
                
            )}
            </div>
           ))}

        </>
    )
}