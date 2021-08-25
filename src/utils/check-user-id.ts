export const checkUserId = (first: number | string, second: number | string): boolean => {
    return Number(first) === Number(second);
};
