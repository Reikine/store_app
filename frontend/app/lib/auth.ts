import toast from "react-hot-toast";
export const logoutAction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Berhasil Keluar, Byeee");
    window.location.href = "/login";
};