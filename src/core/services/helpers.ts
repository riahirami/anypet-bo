import { StateTunisia } from "core/constant/StateTunisia";

export const statusToString = (status: string | number | undefined) => {
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

export function ReservationDateTime(dateTime: string): string {
  const year = dateTime.substring(0, 4);
  const month = dateTime.substring(4, 6);
  const day = dateTime.substring(6, 8);
  const time = dateTime.substring(9); // assuming the time format is always "HH:mm:ss"
  
  const formattedDateTime = `${year}-${month}-${day} at ${time}`;
  return formattedDateTime;
}

// hex to rgba converter
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getNotificationMessage = (notification: any): string => {
  if (notification.type === "App\\Notifications\\AdCommented") {
    return "The ad " + notification?.data?.title + " has been commented";
  }
  if (notification.type === "App\\Notifications\\AdMatchingInterrestNotification") {
    return "An ad as one of the categories that you interest has been added ";
  }
  if (notification.type === "App\\Notifications\\AdStatusUpdated") {
    return "The status of your ad " + notification?.data?.title + " has been " + statusToString(notification?.data?.status);
  }
  if (notification.type === "App\\Notifications\\RoleChangedNotification") {
    return "Your role on AnyPet has been changed to " + notification?.data?.role;
  }
  if (notification.type === "App\\Notifications\\MessageNotification") {
    return "You have a new message from " + notification?.data?.sender;
  }
  if (notification.type === "App\\Notifications\\ReservationNotification") {
    return "You get an reservation request for the advertisement  " + notification?.data?.ad + " from user"+ notification?.data?.sender?.firstname     ;
  }
  if (notification.type === "App\\Notifications\\RespondOnReservationNotification") {
    return "You reservation on the advertise " + notification?.data?.ad + " has been updated";
  }
  return "";
};


export const getState= (idState: any) => {

  const state = StateTunisia.find((item) => item.id === idState)
  return state?.name ;
}