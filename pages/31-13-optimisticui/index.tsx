import { gql, useMutation, useQuery } from "@apollo/client"
import type{ IMutation, IMutationLikeBoardArgs, IQuery, IQueryFetchBoardArgs } from "../../src/commons/types/generated/types"

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
            _id
            likeCount
        }
    }
`

const LIKE_BOARD = gql`
    mutation likeBoard($boardId: ID!){
        likeBoard(boardId: $boardId)
    }
`

export default function OptimisticUiPage(){
    
    const {data} = useQuery<Pick<IQuery,"fetchBoard">,IQueryFetchBoardArgs>(
        FETCH_BOARD,
        {variables: {boardId: '특정게시글 ID' },
    })
    
    const [likeBoard] = useMutation<Pick<IMutation, 'likeBoard'>,IMutationLikeBoardArgs>(LIKE_BOARD)

    const onClickLike = () => {
        void likeBoard({
            variables: {
                boardId: '특정게시글 ID',
            },
            // refetchQueries: [{}],
            optimisticResponse: {
                likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1
            },
            update: (cache, { data }) => {
                 // 좋아요
                cache.writeQuery({
                    query: FETCH_BOARD,
                    variables: {boardId: '특정게시글 ID'},
                    data: {
                        fetchBoard: {
                            _id: '특정게시글 ID',
                            _typename: 'Board',
                            likeCount: data?.likeBoard,
                        },
                    },
                })
            },
        })
    }

    return (
        <>
            <div>현재 카운트 : {data?.fetchBoard.likeCount} </div>
            <button onClick={onClickLike}>좋아요 올리기</button>
        </>
    )
}