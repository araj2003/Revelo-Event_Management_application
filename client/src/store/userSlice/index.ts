import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignInType, SignUpType } from "../../types";
import { getDetails, login, register, signInGoogle, signout } from "../../api";
import { toast } from "react-toastify";

export interface LoginState {
  loadingUser: boolean;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  name?: string;
  profilePicture?: string;
  isAdministrator?: boolean;
}

const initialState: LoginState = {
  loadingUser: true,
  isAuthenticated: false,
  isDarkMode:
    localStorage.getItem("isDarkMode") !== null
      ? localStorage.getItem("isDarkMode") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  name: "",
  profilePicture: "",
  isAdministrator: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    TOGGLE_DARK_MODE(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", state.isDarkMode.toString());
    },
    SET_USER_DATA(state, action) {
      const { name, isAdministrator, profilePicture } = action.payload;
      // console.log(name, isAdministrator,profilePicture);
      state.isAuthenticated = true;
      state.name = name;
      state.isAdministrator = isAdministrator;
      state.profilePicture = profilePicture;
      // console.log(state.name, state.isAdministrator);
    },
    SET_PROFILE_PICTURE(state, action) {
      state.profilePicture = action.payload;
    },
    LOGOUT(state) {
      state.name = "";
      state.isAdministrator = false;
      state.isAuthenticated = false;
      state.profilePicture = "";
    },
    SET_LOADING_USER_TRUE(state) {
      state.loadingUser = true;
    },
    SET_LOADING_USER_FALSE(state) {
      state.loadingUser = false;
    },
  },
});

export const signIn =
  (signInData: SignInType) => async (dispatch: Dispatch) => {
    console.log(signInData);
    if (!signInData.email || !signInData.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data: any = await login(signInData);
      console.log(data);
      if (data.name) {
        dispatch(SET_USER_DATA(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const signUp =
  (signUpData: SignUpType) => async (dispatch: Dispatch) => {
    console.log(signUpData);
    if (!signUpData.email || !signUpData.password || !signUpData.name) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data: any = await register(signUpData);

      if (data.name) {
        dispatch(SET_USER_DATA(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getUserData = () => async (dispatch: Dispatch) => {
  try {
    const data: any = await getDetails();
    if (data.name) {
      dispatch(SET_USER_DATA(data));
    } else {
      dispatch(SET_LOADING_USER_FALSE());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(SET_LOADING_USER_FALSE());
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    const data: any = await signout();
    if (data.msg) {
      dispatch(LOGOUT());
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginGoogle = (token: string) => async (dispatch: any) => {
  dispatch(SET_LOADING_USER_TRUE());
  signInGoogle(token)
    .then((_) => dispatch(getUserData()))
    .catch((err) => console.log(err))
    .finally(() => dispatch(SET_LOADING_USER_FALSE()));
};

export const {
  TOGGLE_DARK_MODE,
  SET_USER_DATA,
  LOGOUT,
  SET_PROFILE_PICTURE,
  SET_LOADING_USER_TRUE,
  SET_LOADING_USER_FALSE,
} = userSlice.actions;
export default userSlice.reducer;
// export const { setDarkMode } = userSlice.actions;
