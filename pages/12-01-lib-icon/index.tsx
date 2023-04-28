import { PlayCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const MyIcon = styled(PlayCircleOutlined)`
    color: red;
    font-size: 30px
`

export default function LibIconPage(){
    return(
        <>
            <MyIcon/>
        </>
    )
}