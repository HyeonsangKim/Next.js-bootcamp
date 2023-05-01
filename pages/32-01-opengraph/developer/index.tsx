
// 개발자 일때 

import axios from 'axios'

export default function OpengraphDeveloperPage(){
    
    const onClickEnter = async (): Promise<void> => {
        // 1. 채팅 데이터에 주소가 있는지 찾기(ex, http~ 로 시작하는 것)

        // 2. 해당 주소로 스크래핑 하기
        const result =  await axios.get('https://www.naver.com')

        // 3. 메타태그에서 오픈그래프 (og:) 찾기
        result.data.split("<meta").filter((el: string) => el.includes('og:'))
    }

    return (
        <button onClick={onClickEnter}> 채팅 입력 후 엔터치기 </button>
    )
}