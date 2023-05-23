
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

export const getNotificationMessage = (notification: any): string => {
  if (notification.type === "App\\Notifications\\AdCommented") {
    return "The ad "+notification?.data?.title+" has been commented";
  }
  if (notification.type === "App\\Notifications\\AdMatchingInterrestNotification") {
    return "An ad as one of the categories that you interest has been added ";
  }
  if (notification.type === "App\\Notifications\\AdStatusUpdated") {
    return "The status of your ad "+notification?.data?.title+ " has been "+statusToString(notification?.data?.status);
  }
  if (notification.type === "App\\Notifications\\RoleChangedNotification") {
    return "Your role on AnyPet has been changed to "+notification?.data?.role;
  }    return "";
};
