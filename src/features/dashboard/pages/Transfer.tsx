import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ahmed from "../../../assets/dashboard/ahmed.png";
import ali from "../../../assets/dashboard/ali.png";
import steve from "../../../assets/dashboard/steve.png";
import { ArrowRightSLine } from "../../../components/icons/Icons";
import BackBtn from "../../../components/ui/BackBtn";

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  frequent: boolean;
}

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
        <h1 className="text-3xl font-bold mb-8">Transfer to</h1>

        {/* New Contact Button */}
        <button className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm mb-4 hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
            <Plus className="w-6 h-6 text-ocean-blue" />
          </div>
          <span className="font-medium text-gray-900">New contact</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="w-full border-alice-blue" />
          <div className="text-center text-slate-gray text-sm my-6">or</div>
          <hr className="w-full border-alice-blue" />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contact"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-alice-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
          />
        </div>

        {/* Frequent Contacts */}
        {frequentContacts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-slate-gray mb-4">
              Frequent contacts
            </h2>
            <div className="space-y-3">
              {frequentContacts.map((contact) => (
                <div key={`frequent-${contact.id}`}>
                  <button
                    onClick={() => handleContactClick(contact)}
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
                      <p className="font-medium text-gray-900">
                        {contact.name}
                      </p>
                      <p className="text-sm text-slate-gray">{contact.phone}</p>
                    </div>
                    <ArrowRightSLine className="w-5 h-5 text-gray-400" />
                  </button>
                  <hr className="w-full border-alice-blue" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Contacts */}
        {allContacts.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-medium text-slate-gray mb-4">
              All contacts
            </h2>
            <div className="space-y-3">
              {allContacts.map((contact) => (
                <div key={`all-${contact.id}`}>
                  <button
                    onClick={() => handleContactClick(contact)}
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
                      <p className="font-medium text-gray-900">
                        {contact.name}
                      </p>
                      <p className="text-sm text-slate-gray">{contact.phone}</p>
                    </div>
                    <ArrowRightSLine className="w-5 h-5 text-gray-400" />
                  </button>
                  <hr className="w-full border-alice-blue" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;
