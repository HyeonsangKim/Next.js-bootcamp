import styled from "@emotion/styled";
import { Rate } from "antd";

const MyStar = styled(Rate)`
    color: red;
    font-size: 30px
`

export default function LibIconPage(){
    return(
        <>
            <MyStar />
        </>
    )
}