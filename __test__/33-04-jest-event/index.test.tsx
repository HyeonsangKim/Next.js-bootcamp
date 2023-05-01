
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import JestUnitTestPage from '../../pages/33-04-jest-event'

it('버튼을 눌렀을 대, 제대로 작동하는지 테스트하자!',()=>{
    render(<JestUnitTestPage />)

    screen.getByRole("count-button")

    fireEvent.click(screen.getByRole("count-button"))

    expect(screen.getByRole("count")).toHaveTextContent("1")
})