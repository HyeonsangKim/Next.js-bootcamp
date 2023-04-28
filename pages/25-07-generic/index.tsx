// 1. 문자/숫자/불린(primitive) 타입
const getPrimitive = (args1: string, args2: number, args3: boolean): [boolean, number, string] => {
  return [args3, args2, args1];
};
const result = getPrimitive("철수", 123, true);

//2. any 타입
const getPrimitive = (args1: any, args2: any, args3: any): [any, any, any] => {
  return [args3, args2, args1];
};
const result = getPrimitive("철수", 123, true);

//3. unknown 타입
const getUnknown = (args1: unknown, args2: unknown, args3: unknown): [unknown, unknown, unknown] => {
  if (typeof args1 === "number") console.log("dd");

  // unknown은 사용할 때, 타입을 가장하여 사용해야 함
  return [args3, args2, args1];
};
const result = getUnknown("철수", 123, true);

//4. generic 타입
function getGeneric<MyType1, MyType2, MyType3>(args1: MyType1, args2: MyType2, args3: MyType3): [MyType3, MyType2, MyType1] {
  return [args3, args2, args1];
}
const result = getGeneric("철수", 123, true);

//5. generic2 타입
function getGeneric2<T1, T2, T3>(args1: T1, args2: T2, args3: T3): [T3, T2, T1] {
  return [args3, args2, args1];
}
const result = getGeneric2("철수", 123, true);

//6. generic3 타입
function getGeneric2<T, U, V>(args1: T, args2: U, args3: V): [V, U, T] {
  return [args3, args2, args1];
}
const result = getGeneric2("철수", 123, true);

//7. generic4 타입
const getGeneric2 = <T, U, V>(args1: T, args2: U, args3: V): [V, U, T] => {
  return [args3, args2, args1];
};
const result = getGeneric2("철수", 123, true);
