import axios from "axios";
import { toast } from "react-toastify";
import { ProfileType, SignInType, SignUpType } from "../types";
import { logout } from "../store/userSlice";
import store from "../store";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const URL = `${BASE_URL ? BASE_URL : ""}/api/v1`;

const API = axios.create({ baseURL: URL, withCredentials: true });

API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";

    // console.log(token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  function (response) {
    // console.log(response);
    if (!response.data.error) {
      return response.data;
    } else {
      // console.log(response.data.msg);
      toast.error(response.data.msg);
      return Promise.reject(response.data);
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // console.log(error);
    if (error.response && error.response.status === 401) {
      logout()(store.dispatch);
    }
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log(error);

    if (error.response) {
      console.log(error.response, `${URL}/auth`);
      if (error?.response?.request.responseURL == `${URL}/auth`) {
      } else {
        toast.error(error.response.data?.msg);
      }
    } else {
      toast.error("Network Error: Please try again later.");
    }
    return Promise.reject(error);
  },
);

/* Auth API */
export const getDetails = () => API.get("/auth");
export const login = (signInData: SignInType) =>
  API.post("/auth/login", signInData);
export const register = (signUpData: SignUpType) =>
  API.post("/auth/register", signUpData);
export const signInGoogle = (tokenId: string) =>
  API.post("/auth/sign-in/google", { tokenId });
export const getProfile = () => API.get("/auth/profile");
export const signout = () => API.get("/auth/logout");
export const updateProfile = (profileData: ProfileType) =>
  API.put("/auth/profile", profileData);
export const uploadProfilePicture = (image: File) => {
  const formData = new FormData();
  formData.append("profileImage", image);
  return API.put("/auth/profile/picture", formData);
};
export const changePassword = (passwordData: {
  currentPassword: string;
  newPassword: string;
}) => API.put("/auth/password", passwordData);
// export const logout = () => API.get("/auth/logout");
// export const checkAuth = () => API.get("/auth/check");

/* Event API */
export const createEvent = (eventData: any) =>
  API.post("/event/createEvent", eventData);
export const getEvent = (eventId: string) => API.get(`/event/${eventId}`);
export const getAllEvent = () => API.get("/event/all");
export const getMyEvents = () => API.get("/event/myEvents");
export const getSubEvents = (eventId: string) =>
  API.get(`/event/${eventId}/subevents`);
export const getEventMembers = (eventId: string) =>
  API.get(`/event/${eventId}/members`);
export const createHost = (eventId: string, userId: string) =>
  API.put(`/event/createHost`, { hostId: userId, eventId: eventId });
export const removeHost = (eventId: string, userId: string) =>
  API.put(`/event/removeHost`, { hostId: userId, eventId: eventId });

// export const getMyHostEvents = () => API.get("/event/myHostEvents");
// export const getMyGuestEvents = () => API.get("/event/myGuestEvents");
export const getMyGuestEvents = () => API.get("/event/myGuestEvents");
export const getMyHostEvents = () => API.get("/event/myHostEvents");

/* Invite API */
export const createInvite = (inviteData: any) =>
  API.post("/invite/create", inviteData);
export const acceptInvite = (inviteId: string) =>
  API.post("/invite/join", { inviteCode: inviteId });
export const sendPersonalInvite = (inviteData: any) =>
  API.post("/invite/sendPersonalInvite", inviteData);
export const getAllPersonalInvites = () =>
  API.get("/invite/getAllPersonalInvitesReceived");
export const respondToPersonalInvite = (inviteId: string, response: string) =>
  API.post("/invite/respondToPersonalInvite", { inviteId, response });

/* subEvent API */
export const createSubEvent = (subEventData: any) =>
  API.post("/subEvent/createSubEvent", subEventData);
export const getAllChannels = (subEventId: any) =>
  API.get(`/subEvent/${subEventId}/getAllChannels`);
export const addMember = (eventId:any,subEventId: any, userId: any) =>
  API.patch(`/subEvent/addUser/${subEventId}/${eventId}`, { userId });
export const removeMember = (eventId:any,subEventId: any, userId: any) =>
  API.patch(`/subEvent/removeUser/${subEventId}/${eventId}`, { userId });
export const getMembersNotInSubEvent = (eventId: any, subEventId: any) =>
  API.get(`/subEvent/getMembersNotInSubEvent/${eventId}/${subEventId}`);
export const addChannelInSubEvent = (channelData: any) =>
  API.post(`/channel/createChannel`, channelData);
export const createAdmin = (subEventId: any, userId: any) =>
  API.put(`/subEvent/addAdmin`, { adminId: userId, subEventId: subEventId });
//search users
export const searchUsers = (searchUser: any) =>
  API.get(`/event/users/search?query=${searchUser}`);
export const searchVendorRoll = (subroll: any) =>
  API.get(`/event/vendor/searchVendor?query=${subroll}`);

//chats:-
export const getSingleChats = () => API.get("/group/getSingleChats");
export const getSingleChat = (otherUserId: any) =>
  API.get(`/group/getSingleChat/${otherUserId}`);
export const getGroupChat = () => API.get("getGroupChats");

//rsvp
export const acceptRejectRsvp = (subEventId: any, status: any) =>
  API.put(`/subEvent/acceptRejectRSVP/${subEventId}`, { status: status });
export const hasAccepted = (subEventId: any) =>
  API.get(`/subEvent/hasAccepted/${subEventId}`);
export const addRSVP = (subEventId: any, rsvpData: any) =>
  API.post(`/subEvent/addRSVP/${subEventId}`, rsvpData); //channels:-
export const getRSVPList = (subEventId: any) =>
  API.get(`/subEvent/getRSVPList/${subEventId}`);
export const getSingleChannel = (channelId: any) =>
  API.get(`/channel/getChannel/${channelId}`);

//message:-
export const sentMessage = (content: any, chatId: any) =>
  API.post(`/message/sendMessage`, {
    content: content,
    chatId: chatId,
  });

export const getMessage = (chatId: any) =>
  API.get(`/message/getMessage/${chatId}`);

//meeting
export const createMeeting = (meetingData: any) =>
  API.post(`/meeting/createMeeting`, { meetingData });

export const getMeeting = (meetingId: any) =>
  API.post(`/meeting/getMeeting/${meetingId}`);

export const updateMeeting = () => API.post(`/meeting/updateMeeting`);

export const getUserMeeting = (userId: any) =>
  API.get(`/meeting/getUserMeeting/${userId}`);


//notifications (user id)
export const getNotifications = () => API.get(`/notification/getNotifications`);
export const readNotification = (notificationId:any) => API.patch(`/notification/markNotificationAsRead/${notificationId}`);
