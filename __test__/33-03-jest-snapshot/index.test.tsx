
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import JestUnitTestPage from '../../pages/33-03-jest-snapshot'

it('기존 사진이랑 바뀐게 없는지 비교해보자!! - 스냅샷',()=>{
    const result = render(<JestUnitTestPage />)
    expect(result.container).toMatchSnapshot()
})