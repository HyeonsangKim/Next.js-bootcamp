import { add } from "../../pages/33-01-jest"


it("더하기 잘되는지 테스트", () => {
    const result = add(3, 5)
    expect(result).toBe(8)
})

describe("나만의 테스트 그룹 만들기",()=>{
    
})