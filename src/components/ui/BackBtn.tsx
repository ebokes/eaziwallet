import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackBtn = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full gap-2 mt-2 text-celtic-blue font-medium">
      <button
        type="button"
        onClick={onClick || (() => navigate(-1))}
        className="flex items-center text-sm text-text-secondary hover:text-primary transition-colors"
      >
        <ChevronLeft size={16} className="mr-1 flex justify-self-start" /> Back
      </button>
    </div>
  );
};

export default BackBtn;
