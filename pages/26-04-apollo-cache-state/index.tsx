import { useQuery,gql, useMutation } from "@apollo/client"
import styled from "@emotion/styled"
import { MouseEvent } from "react"
import { IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int){
        fetchBoards(page: $page){
            _id
            writer
            title
            contents
        }
    }
`;

const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!){
        deleteBoard(boardId: $boardId)
    }
`

const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!){
        createBoard(createBoardInput: $createBoardInput){
            _id
            writer
            title
            contents
        }
    }
`

export default function StaticRoutedPage(){

    const {data} = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS)

    const [deleteBoard] = useMutation(DELETE_BOARD)
    const [createBoard] = useMutation(CREATE_BOARD)

    const onClickDelete = (boardId: string) => () => {
        void deleteBoard({
            variables: {
                boardId,
            },
            update(cache, {data}){
                cache.modify({
                    fields: {
                        fetchBoards: (prev, {readField}) => {
                            const deletedId = data.deleteBoard
                            const filteredPrev = prev.filter(
                                (el) => readField("_id",el) !== deletedId
                                )
                            return [...filteredPrev]
                        }
                    }
                })
            },
        })
    }

    const onClickCreate = () => {
        void createBoard({
            variables: {
                createBoardInput: {
                    writer: "영희",
                    password: "1234",
                    title: "제목입니다.",
                    contents: "내용입니다.",
                }
            },
            update(cache, {data}){
                cache.modify({
                    fields: {
                        fetchBoards: (prev) => {
                            return [data.createBoard, ...prev]
                        }
                    }
                })
            },
        })
    }

    return (
        <>
           {data?.fetchBoards.map((el)=> (
            <div key={el._id}>
                <span style={{margin: '10px'}}>{el.writer}</span>
                <span style={{margin: '10px'}}>{el.title}</span>
                <button onClick={onClickDelete(el._id)}>삭제하기</button>
            </div>
           ))}
           <button onClick={onClickCreate}>등록하기</button>
        </>
    )
}