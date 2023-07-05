export const endpoints = {
    
    loginUserUrl : "api/login",
    registreUserUrl: "api/register",
    logoutUserUrl: "api/auth/logout",
    profileUrl: "api/profile",
    UPDATEAVATAR: "api/avatar",
    forgotPasswordUrl: "api/forgot-password",
    resetPasswordUrl: "api/reset-password",
    emailVerificationUrl: "api/email/verify/",
    resendEmailVerificationUrl: "api/email/resend-verification",

    Categories: "categories/",


    AdsGlobal:"ads",
    Ads:"ads/",
    MYADS:"ads/myads/",
    ADMEDIA:"ads/media/",
    AdsByCategory:"ads/category/",
    AdsByDate:"ads/date/",
    AdsByStatus:"ads/status/",
    AdsByKey:"ads/search/",
    changeStatusAds:"ads/requestad",
    statsAds : "ads/stats",
    COUNTADSPERDATE : "ads/statsdate",
    SETASFAVORITE : "ads/setfavorite/",
    LISTFAVORITE : "ads/listfavorite/",


    USERS: "users",
    VERIFIEDUSERS: "users/verified",
    USERDETAILS: "users/",
    USERLISTNOTIFICATIONS: "users/notifications/",
    USERLISTUNREADNOTIFICATIONS: "users/notifications/unread/",
    MARKAllASREADNOTIFICATIONS: "users/notifications/readall",
    MESSAGES: "users/message/",
    CONVERSATION: "users/conversation/",
    CONVERSATIONSLIST: "users/conversations/list",

    SETADMIN: "role/setadmin/",
    REVOKEADMIN: "role/revokeadmin/",

    LISTCOMMENTS: "comment/",


    CREATERESERVATION: "reservation/create",
    GETMYRESERVATION: "reservation/show/myreservation",
    GETADRESERVATIONS: "reservation/show/ad",
    RESPONSERESERVATIONS: "reservation/response",


    PARTNERS : "partner/",
    GETPARTNERS : "partner/",
    ADDPARTNERS : "partner/",
    UPDATEPARTNERS : "partner/update/",
    SHOWPARTNER : "partner/",
    DELETEPARTNERS : "partner/",

}