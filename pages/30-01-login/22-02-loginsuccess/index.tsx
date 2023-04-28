import { gql, useApolloClient } from "@apollo/client"

const FETCH_USER_LOGGED_IN = gql`
    query fetchUserLoggedIn {
        fetchUserLoggedIn {
            email
            name
        }
    }    
`

export default function LoginSuccessPage(){
    // 1. 페이지에 접속하면 자동으로 data에 받아지고(data는 글로벌스테이트 저장), 리렌더링됨
    // const {data} = useQuery<Pick<IQuery,"fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

    // 2. 버튼 클릭시 data에 받아지고(data는 글로벌스테이트 저장), 리렌더링됨
    // const [myFuntion,{ data }] = useLazyQuery(FETCH_USER_LOGGED_IN)
    
    // 3. axios 처럼 사용하는 방법 (data는 글로벌스테이트 저장)
    // const client = useApolloClient()
    // client.query()

    const client = useApolloClient()

    const onClickButton = async () => {
        const result = await client.query({
            query: FETCH_USER_LOGGED_IN
        })
        console.log(result);
        
    }

    return <button onClick={onClickButton}>click this button</button>
    // return <>{data?.fetchUserLoggedIn.name}님 환영합니다</>
}