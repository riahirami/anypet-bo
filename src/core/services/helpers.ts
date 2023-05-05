
export const statusToString = (status: string | undefined) => {
    if (status == "0") return "Waiting";
    else if (status == "1") return "Canceled";
    else if (status == "2") return "Validated";
    else return "Unknown Status";
  };

export const formaDateTime = (dateString: any) => {
    const date = dateString.substr(0, 10);
    const time = dateString.substr(11, 5);
    return `${date} at ${time}`;
  };  

 
    
