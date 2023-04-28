import ChildPage from "./02-child";

export default function ParentPage(){

    return <div>
        <ChildPage count={3}/>
    </div>
}