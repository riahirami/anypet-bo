import { useEffect, useState } from "react";
import { useDeleteAdMutation } from "../redux/api/adsApi";

const useDeleteAd = () => {
    const [
        deletAd,
        { data: deletData, isSuccess: isSuccessDelete, isLoading: loadingDelete },
    ] = useDeleteAdMutation();


    // TODO: add alert on success 
    function handleDeleteAd(id: string) {
        deletAd(id).unwrap();
    }
    return {
        handleDeleteAd
    }
}

export default useDeleteAd