import Cookies from 'js-cookie';

const useAuth = () => {
    if (Cookies.get('isLoggedIn') === undefined) {
        return { isLoggedIn: false };
    }
    return { isLoggedIn: true };
};

export default useAuth;
