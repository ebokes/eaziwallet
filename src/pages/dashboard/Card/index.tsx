import { Plus } from "lucide-react";
import React, { useState } from "react";
import { AddCardModal } from "../../../components/dashboard/card/AddCardModal";
import { CreditCard } from "../../../components/dashboard/card/CreditCard";
import { INITIAL_CARDS, type Card } from "../../../constants/constants";
import { QrCodeLine, RssLine } from "../../../components/common/icons/Icons";
import { Button } from "../../../components/common/Button";
import BackBtn from "../../../components/common/BackBtn";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 } as const,
  },
};

const DetailView: React.FC<{ card: Card }> = ({ card }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center w-full max-w-2xl mx-auto h-full"
  >
    <div className="w-full max-w-md flex justify-center mb-8 md:mb-12">
      <CreditCard {...card} img={card.img} />
    </div>

    <div className="flex-1 md:flex-none flex flex-col items-center justify-center mb-8 md:mb-12">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4 text-secondary"
      >
        <RssLine />
      </motion.div>
      <p className="text-R5 text-secondary text-center">
        Move near a device to pay
      </p>
    </div>

    <div className="w-full max-w-md mt-auto md:mt-0">
      <Button
        fullWidth
        className="h-14 text-lg font-bold flex items-center gap-2 justify-center"
      >
        <QrCodeLine /> QR Pay
      </Button>
    </div>
  </motion.div>
);

// Mock Data
export const Cards: React.FC = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleAddCard = (newCard: Card) => {
    setCards([...cards, newCard]);
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
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
        <AnimatePresence mode="wait">
          {selectedCard ? (
            <DetailView key="detail" card={selectedCard} />
          ) : (
            // Stacked List View
            <motion.div
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative h-[400px] flex justify-center pt-4"
            >
              {cards.map((card, index) => {
                const offset = index * 60; // Increased vertical offset
                return (
                  <motion.div
                    key={card.id}
                    variants={cardVariants}
                    className="absolute w-full max-w-[340px] cursor-pointer"
                    style={{
                      top: `${offset}px`,
                      zIndex: index,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(card)}
                  >
                    <CreditCard
                      {...card}
                      img={card.img}
                      className="shadow-[0_-5px_20px_rgba(0,0,0,0.1)]"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Views */}
      <div className="hidden md:block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div key={card.id} variants={cardVariants}>
              <CreditCard
                {...card}
                img={card.img}
                className="hover:shadow-2xl transition-shadow duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
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
