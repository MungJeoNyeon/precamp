// 1. 문자/숫자/불린 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
    return [arg3, arg2, arg1];
};
const result = getPrimitive("철수", 123, true);

