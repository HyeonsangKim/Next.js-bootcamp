interface IWorldProps {
    el: string;
}

export default function Word(props: IWorldProps): JSX.Element{
    return (
        <>
            <span>{props.el}</span>
        </>
    )
}
