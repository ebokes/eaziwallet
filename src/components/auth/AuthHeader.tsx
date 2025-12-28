import BackBtn from "../common/BackBtn";
import TapNPayLogo from "../../assets/auth/tap-n-pay-violet.webp";

const AuthHeader = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 md:px-8">
      <div className="flex justify-start">
        <BackBtn onClick={onClick} />
      </div>
      <img src={TapNPayLogo} alt="TapNPay Logo" className="w-24 md:w-32" />
      <div />
    </div>
  );
};

export default AuthHeader;
