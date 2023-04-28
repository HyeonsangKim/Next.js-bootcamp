import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router";
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
    
    const router = useRouter();
    const [isOpen,setIsOpen] = useState(false)
    const {data} = useQuery(FETCH_BOARDS);
    
    const onClickIsOpen = () => {
        setIsOpen(true)
    };

    const onClickMove = () => {
        router.push("/21-05")
    }

    return (
    <>
        <button onClick={onClickIsOpen}>click button new components</button> 
        {isOpen && <PolicyExam/>}
        <button onClick={onClickMove}>page move</button>
    </>
    )
}