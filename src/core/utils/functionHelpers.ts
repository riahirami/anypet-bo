export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    try {
        if (user === "null") return null;
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
};

export const getToken = () => {
    
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user).token : "null";
    } catch (e) {
        return null;
    }
};