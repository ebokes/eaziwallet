import React from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../components/ui/BackBtn";

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-6 md:px-8 md:py-8">
        {/* Back Button */}
        {/* <Button variant="ghost" size="xs" className="mb-8"> */}
        <div className="mb-8">
          <BackBtn onClick={handleBack}/>
        </div>
        {/* </Button> */}

        {/* Title */}
        <h1 className="text-R2 mb-6">About eWallet</h1>

        {/* Content */}
        <div className="space-y-4 text-slate-gray text-R7 md:text-R6 leading-relaxed">
          <p>
            Our app allows you to easily store, manage, and spend your money on
            the go. With our secure platform, you can make transactions, check
            your balance, and track your spending all in one place.
          </p>

          <p>
            Whether you're paying bills, shopping online, or sending money to
            friends and family, our app makes it easy and convenient to do so.
            Plus, with our various promotions and discounts, you can save even
            more while using our app.
          </p>

          <p>
            Thank you for choosing us as your preferred e-wallet solution. If
            you have any questions or feedback, please don't hesitate to contact
            us. We're always here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
