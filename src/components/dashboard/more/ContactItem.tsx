import React from "react";
import { ArrowRightSLine } from "../../ui/icons/Icons";

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
        className="w-full flex items-center gap-4 p-4 bg-primary rounded-2xl shadow-sm hover:bg-secondary transition-colors"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <p className="text-B7 md:text-B6 text-primary">{contact.name}</p>
          <p className="text-R7 text-secondary">{contact.phone}</p>
        </div>
        <ArrowRightSLine className="w-5 h-5 text-primary" />
      </button>
      {showDivider && <hr className="w-full border-light" />}
    </div>
  );
};
