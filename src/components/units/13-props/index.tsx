interface IProps{
    school: string;
    children: JSX.Element;
}

export default function Layout(props: IProps){
    return (
        <>
            <div>hi i'm kim</div>
            <div>{props.school}</div>
            <div>{props.children}</div>
            <div>hi i'm lee</div>
        </>
        
    )
}