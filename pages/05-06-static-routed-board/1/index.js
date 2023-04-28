import { useQuery,gql } from "@apollo/client"

const FETCH_BOARD = gql`
    query fetchBoard($number: Int){
        fetchBoard(number: $number){
            writer
            title
            contents
        }
    }
`

export default function StaticRoutedPage(){

    const {data} = useQuery(FETCH_BOARD,{
        variables: {
            number: 14157
        }
    })

    return (
        <>
           1 이동완료.<br/>
           <div>작성자 : {data ? data.fetchBoard.writer:"Loading...."}</div>
           <div>제목 : {data && data.fetchBoard.title}</div>
           <div>내용 : {data?.fetchBoard.contents}</div> // 옵셔널 체이닝
        </>
        )
}