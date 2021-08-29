export const checkUserAuth = (): string | null => {
    return localStorage.getItem('isAuth');
};
