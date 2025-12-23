import { AppleIcon, FacebookIcon, GoogleIcon } from "../ui/SocialIcon";

const SocialIcons = () => {
  return (
    <div className="mt-6 text-center animate-fade-in">
      <p className="text-text-secondary text-sm mb-4">Or continue to using</p>
      <div className="flex justify-between gap-4 w-full">
        <button
          type="button"
          className="grid place-items-center p-3 border border-alice-blue w-full rounded-xl hover:bg-gray-50"
        >
          <FacebookIcon />
        </button>
        <button
          type="button"
          className="grid place-items-center p-3 border border-alice-blue w-full rounded-sm hover:bg-gray-50"
        >
          <GoogleIcon />
        </button>
        <button
          type="button"
          className="grid place-items-center p-3 border border-alice-blue w-full rounded-xl hover:bg-gray-50"
        >
          <AppleIcon />
        </button>
      </div>
    </div>
  );
};

export default SocialIcons;
