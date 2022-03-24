const handleAxiosError = (error) => {
    if (error.response) {
        if (error.response.data.message) {
            return error.response.data.message;
        }
        if (error.response.data.detail) {
            if (Array.isArray(error.response.data.detail)) {
                if (error.response.data.detail.length > 0) {
                    const errorMsg = [];
                    error.response.data.detail.map((error) => errorMsg.push(`${error.loc[1]} ${error.msg}`));
                    return errorMsg;
                }
            }

            return error.response.data.detail;
        }
        if (error.response.data.email) {
            return error.response.data.email;
        }
        if (error.response.data.username) {
            return error.response.data.username;
        }
        if (error.response.data.password) {
            return error.response.data.password;
        }

        const err = error.toJSON();
        return err.message;
    }
    if (error.request) {
        return error.toString();
    }
    return `Error : ${error.message}`;
};

export default handleAxiosError;
