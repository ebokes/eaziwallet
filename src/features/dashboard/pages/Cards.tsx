import { Plus } from "lucide-react";
import React, { useState } from "react";
import { AddCardModal } from "../../../components/dashboard/AddCardModal";
import { CreditCard } from "../../../components/dashboard/CreditCard";
import { QrCodeLine, RssLine } from "../../../components/icons/Icons";
import BackBtn from "../../../components/ui/BackBtn";
import { Button } from "../../../components/ui/Button";
import { INITIAL_CARDS, type Card } from "../../../lib/constants";

// Mock Data
export const Cards: React.FC = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleAddCard = (newCard: Card) => {
    setCards([...cards, newCard]);
  };

  const handleCardClick = (card: Card) => {
    // Only relevant for mobile view detail toggle
    if (window.innerWidth < 768) {
      setSelectedCard(card);
    }
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          {selectedCard && <BackBtn onClick={handleBack} />}
          {!selectedCard && <h1 className="text-2xl font-bold">My Cards</h1>}
        </div>

        {!selectedCard && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-celtic-blue font-medium flex items-center gap-1 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
          >
            Add card <Plus size={18} />
          </button>
        )}
      </div>

      {/* Mobile Views */}
      <div className="md:hidden h-[calc(100vh-200px)] flex flex-col">
        {selectedCard ? (
          // Detail View
          <div className="animate-fade-in flex flex-col h-full">
            <div className="flex justify-center mb-8">
              <CreditCard
                {...selectedCard}
                variant={selectedCard.variant}
                className="shadow-[0_10px_30px_rgba(0,0,0,0.15)] max-w-[340px]"
              />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="mb-4 text-slate-gray animate-pulse">
                <RssLine />
              </div>
              <p className="font-medium text-lg text-slate-gray text-center">
                Move near a device to pay
              </p>
            </div>

            <div className="mt-auto pt-4">
              <Button
                fullWidth
                className="h-14 text-lg font-bold flex items-center gap-2 justify-center"
              >
                <QrCodeLine /> QR Pay
              </Button>
            </div>
          </div>
        ) : (
          // Stacked List View
          <div className="relative h-[400px] flex justify-center pt-4">
            {cards.map((card, index) => {
              const offset = index * 60; // Increased vertical offset
              return (
                <div
                  key={card.id}
                  className="absolute w-full max-w-[340px] transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                  style={{
                    top: `${offset}px`,
                    zIndex: index,
                  }}
                  onClick={() => handleCardClick(card)}
                >
                  <CreditCard
                    {...card}
                    variant={card.variant}
                    className="shadow-[0_-5px_20px_rgba(0,0,0,0.1)]"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <CreditCard
            key={card.id}
            {...card}
            variant={card.variant}
            className="hover:shadow-2xl transition-shadow duration-300"
          />
        ))}

        {/* Add New Card Placeholder */}
        <div
          onClick={() => setIsAddModalOpen(true)}
          className="aspect-[1.586/1] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Add New Card</span>
        </div>
      </div>

      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCard}
      />
    </div>
  );
};

export default Cards;
