import type { Transaction } from "../../../constants/constants";
import { useCopy } from "../../../hooks/useCopy";
import { formatDetailedDate } from "../../../utils/utils";
import { Button } from "../../common/Button";
import { CheckLine, FileCopyLine, FlagLine } from "../../common/icons/Icons";
import { ResponsiveModal } from "../../common/ResponsiveModal";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  selectedTransaction,
}) => {
  const { copied, handleCopy } = useCopy();
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      bold={false}
      title={
        selectedTransaction ? (
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={selectedTransaction.logo}
                alt={selectedTransaction.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-primary text-B4">
                {selectedTransaction.name}
              </h3>
              <span className="text-secondary text-lg">
                Retailer corporation
              </span>{" "}
            </div>
          </div>
        ) : null
      }
    >
      {selectedTransaction && (
        <div className="flex flex-col gap-6">
          {/* Amount Box */}
          <div
            className={`rounded-xl py-6 flex items-center justify-center text-center  ${
              selectedTransaction.type === "received"
                ? "bg-shamrock/10"
                : "bg-golden-gate-bridge/10"
            }`}
          >
            <span
              className={`text-S2 ${
                selectedTransaction.type === "received"
                  ? "text-shamrock"
                  : "text-golden-gate-bridge"
              }`}
            >
              {selectedTransaction.type === "received" ? "+" : "-"}$
              {selectedTransaction.amount.toFixed(2)}
            </span>
          </div>

          {/* Date Details */}
          <div className="border border-light rounded-xl p-4">
            <span className="text-R6 text-secondary block mb-1">
              {formatDetailedDate(selectedTransaction.date).label}
            </span>
            <span className="text-R5 text-primary">
              {formatDetailedDate(selectedTransaction.date).fullDateTime}
            </span>
          </div>

          {/* Transaction No */}
          <div className="border border-light rounded-xl p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-R6 text-secondary block mb-1">
                Transaction no.
              </span>
              <span className="text-R5 text-primary">
                {selectedTransaction.transactionNo}
              </span>
            </div>
            <button
              onClick={() => handleCopy(selectedTransaction.transactionNo)}
              className="text-secondary hover:text-primary transition-colors p-0"
            >
              {copied ? (
                <CheckLine className="w-5 h-5 text-shamrock" />
              ) : (
                <FileCopyLine className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button variant="tertiary-warning" leftIcon={<FlagLine />}>
            Report a problem
          </Button>
        </div>
      )}
    </ResponsiveModal>
  );
};

export default TransactionModal;
