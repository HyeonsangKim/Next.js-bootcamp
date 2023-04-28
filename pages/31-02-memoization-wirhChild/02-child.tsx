import {memo} from 'react'

function MemorizationWithChildPage(): JSX.Element{
    console.log('child will be rendered');
    
    return (
        <>
            <h1>I'm a child</h1>
        </>
    )
}

export default memo(MemorizationWithChildPage)