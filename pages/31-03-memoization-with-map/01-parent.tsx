import Word from "./02-child"

export default function MemoizationParentWithMapPage(): JSX.Element{
 const [data,setData] = useState('철수는 오늘 점심을 맛있게 먹었습니다.')

 return (
    <>
        {data.split(' ').map((el) => (
            <Word el={el} />
        ))}
    </>
 )
}
