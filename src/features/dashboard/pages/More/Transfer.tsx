import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ahmed from "../../../../assets/dashboard/ahmed.png";
import ali from "../../../../assets/dashboard/ali.png";
import steve from "../../../../assets/dashboard/steve.png";
import {
  ContactItem,
  type Contact,
} from "../../../../components/dashboard/more/ContactItem";
import BackBtn from "../../../../components/ui/BackBtn";
import { SearchBar } from "../../../../components/ui/SearchBar";

const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Ali Ahmed",
    phone: "+1-300-555-0161",
    avatar: ali,
    frequent: true,
  },
  {
    id: "2",
    name: "Steve Gates",
    phone: "+1-300-555-0119",
    avatar: steve,
    frequent: true,
  },
  {
    id: "3",
    name: "Elon Jobs",
    phone: "+1-202-555-0171",
    avatar: ahmed,
    frequent: true,
  },
  {
    id: "4",
    name: "Ali Ahmed",
    phone: "+1-300-555-0161",
    avatar: ali,
    frequent: false,
  },
  {
    id: "5",
    name: "Steve Gates",
    phone: "+1-300-555-0119",
    avatar: steve,
    frequent: false,
  },
];

const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleContactClick = (contact: Contact) => {
    navigate("/transfer-amount", { state: { contact } });
  };

  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const frequentContacts = filteredContacts.filter((c) => c.frequent);
  const allContacts = filteredContacts.filter((c) => !c.frequent);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-6 md:px-8 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <BackBtn onClick={handleBack} />
        </div>

        {/* Title */}
        <h1 className="text-R2  mb-8">Transfer to</h1>

        {/* New Contact Button */}
        <button className="w-full flex items-center gap-4 p-4 bg-primary rounded-2xl shadow-sm mb-4 hover:bg-secondary transition-colors">
          <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
            <Plus className="w-6 h-6 text-ocean-blue" />
          </div>
          <span className="text-R7 md:text-R6 text-primary">
            New contact
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="w-full border-light" />
          <div className="text-center text-secondary text-sm my-6">or</div>
          <hr className="w-full border-light" />
        </div>

        {/* Search */}
        <SearchBar
          placeholder="Search contact"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />

        {/* Frequent Contacts */}
        {frequentContacts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-R7 md:text-R6 text-primary mb-4">
              Frequent contacts
            </h2>
            <div className="space-y-3">
              {frequentContacts.map((contact) => (
                <ContactItem
                  key={`frequent-${contact.id}`}
                  contact={contact}
                  onClick={handleContactClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Contacts */}
        {allContacts.length > 0 && (
          <div className="mb-4">
            <h2 className="text-R7 md:text-R6 text-primary mb-4">
              All contacts
            </h2>
            <div className="space-y-3">
              {allContacts.map((contact) => (
                <ContactItem
                  key={`all-${contact.id}`}
                  contact={contact}
                  onClick={handleContactClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;
