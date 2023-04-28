// 1.HOF 일반타입
function first1(args:string){
    return function second(args2: number): [string,number]{
            return [args,args2]
        }
    const result = first1("영희")(8)
}

// 1.HOF any타입
function first2(args:any){
    return function second(args2: any): [any,any]{
            return [args,args2]
        }
    const result = first2("영희")(8)
}

// 1.HOF any타입
function first3<T>(args:T){
    return function second<U>(args2: U): [T,U]{
            return [args,args2]
        }
    const result = first3("영희")(8)
}

// 1.HOF any타입
function first3 = <T>(args:T) => <U>(args2: U): [T,U] => {
    return [args,args2];
    const result = first3("영희")(8)
}

// 5.HOF 컴포넌트에 응용
function withAuth = <C>(Component:C) => <P>(props: P): [C,P] => {
    return [Component,props];
}
const result = withAuth("Bbb")({qqq:"철수"})