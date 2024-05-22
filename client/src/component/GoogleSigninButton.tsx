import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { loginGoogle } from "../store/userSlice";

function GoogleSigninButton() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const googleDataCallback = (res: any) => {
      console.log(res);
      dispatch(loginGoogle(res.credential));
    };
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    (window as any).continueWithGoogle = googleDataCallback;

    return () => {
      document.body.removeChild(script);
      (window as any).continueWithGoogle = null;
    };
  }, []);
  return (
    // className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-600 hover:border-slate-600 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-900 hover:shadow transition duration-150"
    <>
      <div
        id="g_id_onload"
        data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        data-context="use"
        data-ux_mode="popup"
        data-callback="continueWithGoogle"
        data-itp_support="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="center"
      ></div>
    </>
  );
}

export default GoogleSigninButton;
