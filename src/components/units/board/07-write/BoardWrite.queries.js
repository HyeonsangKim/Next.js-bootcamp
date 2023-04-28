import { gql } from "@apollo/client"

export const CREATE_BOARD = gql`
    mutation createBoard($writer:String, $title: String,$contents:String) { # 타입적는곳
        createBoard(writer: $writer, title:$title, contents:$contents){     # 실제 우리가 전달할 변수 적는 곳
            _id
            number
            message
        }
    }
`