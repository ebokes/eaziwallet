import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Country {
  name: string;
  code: string;
  flag: string;
  placeholder: string;
}

const COUNTRIES: Country[] = [
  { name: "Jordan", code: "+962", flag: "🇯🇴", placeholder: "7X-XXXXXXX" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", placeholder: "80X XXXX XXXX" },
  {
    name: "United States",
    code: "+1",
    flag: "🇺🇸",
    placeholder: "(XXX) XXX-XXXX",
  },
  {
    name: "United Kingdom",
    code: "+44",
    flag: "🇬🇧",
    placeholder: "7XXX XXXXXX",
  },
  { name: "Ghana", code: "+233", flag: "🇬🇭", placeholder: "XX XXX XXXX" },
  { name: "Kenya", code: "+254", flag: "🇰🇪", placeholder: "7XX XXX XXX" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", placeholder: "XX XXX XXXX" },
  {
    name: "United Arab Emirates",
    code: "+971",
    flag: "🇦🇪",
    placeholder: "5X XXX XXXX",
  },
];

interface PhoneInputProps {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  value = "",
  onChange,
  className = "",
}) => {
  // Find initial country from value or default to Jordan
  const initialCountry =
    COUNTRIES.find((c) => value.startsWith(c.code)) || COUNTRIES[0];

  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [phoneNumber, setPhoneNumber] = useState(
    value.startsWith(initialCountry.code)
      ? value.slice(initialCountry.code.length)
      : ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal state when value changes externally
  useEffect(() => {
    if (value) {
      const country = COUNTRIES.find((c) => value.startsWith(c.code));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.slice(country.code.length));
      }
    } else {
      setPhoneNumber("");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    if (onChange) {
      onChange(`${country.code}${phoneNumber}`);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Keep only digits
    setPhoneNumber(value);
    if (onChange) {
      onChange(`${selectedCountry.code}${value}`);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-R7 text-slate-gray">{label}</label>}

      <div
        className={`
        flex items-center gap-2 px-3 py-1 rounded-lg border-2 transition-colors duration-200 bg-primary
        ${
          error
            ? "border-golden-gate-bridge"
            : "border-soft focus-within:border-ocean-blue"
        }
      `}
      >
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 py-2 px-1 hover:bg-secondary rounded transition-colors"
          >
            <span className="text-2xl leading-none">
              {selectedCountry.flag}
            </span>
            <span className="text-R6 font-medium text-primary">
              {selectedCountry.code}
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-gray transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-primary border-2 border-soft rounded-lg shadow-xl z-50 animate-fade-in">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary transition-colors border-b border-soft last:border-b-0"
                >
                  <span className="text-2xl leading-none">{country.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-primary">
                      {country.name}
                    </span>
                    <span className="text-xs text-secondary">
                      {country.code}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-[1.5px] border border-soft mx-1" />

        {/* Phone Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={selectedCountry.placeholder}
          className="flex-1 px-3 py-2 bg-primary border-none outline-none text-R6 text-primary placeholder:text-soft focus:ring-0"
        />
      </div>

      {error && <p className="text-R7 text-golden-gate-bridge">{error}</p>}
    </div>
  );
};
