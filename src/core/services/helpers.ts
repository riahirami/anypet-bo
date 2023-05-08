
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

  // hex to rgba converter
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

