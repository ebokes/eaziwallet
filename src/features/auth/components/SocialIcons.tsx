import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "../../../components/ui/icons/Icons";

const SocialIcons = () => {
  return (
    <div className="mt-6 text-center animate-fade-in">
      <div className="flex items-center justify-center mt-7 mb-5 gap-3">
        <hr className="w-1/4 flex-1 mb-3 border border-light" />
        <p className="text-slate-gray text-R7 mb-3">or continue to using</p>
        <hr className="w-1/4 flex-1 mb-3 border border-light" />
      </div>
      <div className="flex justify-between gap-4 w-full">
        <button
          type="button"
          className="grid place-items-center p-3 border border-light w-full rounded-xl hover:bg-gray-50"
        >
          <FacebookIcon />
        </button>
        <button
          type="button"
          className="grid place-items-center p-3 border border-light w-full rounded-xl hover:bg-gray-50"
        >
          <GoogleIcon />
        </button>
        <button
          type="button"
          className="grid place-items-center p-3 border border-light w-full rounded-xl hover:bg-gray-50"
        >
          <AppleIcon />
        </button>
      </div>
    </div>
  );
};

export default SocialIcons;
