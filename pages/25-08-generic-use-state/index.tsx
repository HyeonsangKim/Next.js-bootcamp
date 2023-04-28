export function useMyState<S>(aaa:S): [S, ()=> void]{
    const myState = aaa;

    const mySetState = (bbb) => {

    }
    return [myState,mySetState];
}
