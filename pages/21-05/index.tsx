import { gql, useQuery } from "@apollo/client"
import { useState } from "react";
import PolicyExam from "../../src/components/units/21-fetch-policy";

const FETCH_BOARDS = gql`
    query fetchBoards {
        fetchBoards {
            _id
            writer
            title
            contents
        }
    }
`

export default function GlobalStatePage(){
    
    const [isOpen,setIsOpen] = useState(false)
    const {data} = useQuery(FETCH_BOARDS);
    
    const onClickIsOpen = () => {
        setIsOpen(true)
    }

    return (
    <>
        <button onClick={onClickIsOpen}>click button new components</button> 
        {isOpen && <PolicyExam/>}
    </>
    )
}