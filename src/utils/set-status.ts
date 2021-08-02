export const setStatus = (isValid: boolean) => {
    return { status: isValid ? '' : 'error' };
};
