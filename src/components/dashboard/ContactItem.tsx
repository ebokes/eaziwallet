import React from "react";
import { ArrowRightSLine } from "../icons/Icons";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  frequent: boolean;
}

interface ContactItemProps {
  contact: Contact;
  onClick: (contact: Contact) => void;
  showDivider?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onClick,
  showDivider = true,
}) => {
  return (
    <div>
      <button
        onClick={() => onClick(contact)}
        className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-colors"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <p className="text-B7 md:text-B6 text-gray-900">{contact.name}</p>
          <p className="text-R7 text-slate-gray">{contact.phone}</p>
        </div>
        <ArrowRightSLine className="w-5 h-5 text-gray-400" />
      </button>
      {showDivider && <hr className="w-full border-alice-blue" />}
    </div>
  );
};
