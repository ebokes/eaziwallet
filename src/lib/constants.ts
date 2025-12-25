import wallmart from "../assets/dashboard/Wallmart.png";
import topup from "../assets/dashboard/Topup.png";
import netflix from "../assets/dashboard/Netflix.png";
import amazon from "../assets/dashboard/Amazon.png";
import nike from "../assets/dashboard/Nike.png";
import homeDepot from "../assets/dashboard/The home depot.png";
import ali from "../assets/dashboard/ali.png";
import apple from "../assets/dashboard/Apple.png";
import { getMockDate } from "./utils";

export interface Card {
  id: number;
  name: string;
  cardNumber: string;
  expiry: string;
  balance: string;
  variant: "primary" | "secondary" | "dark";
}


export interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  currency: string;
  name: string;
  logo: string;
  date: string;
  status: "completed" | "pending" | "failed";
  transactionNo: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    logo: wallmart,
    type: "sent",
    amount: 35.23,
    currency: "USD",
    name: "Walmart",
    date: getMockDate(0, 12, 32),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "2",
    logo: topup,
    type: "received",
    amount: 430.0,
    currency: "USD",
    name: "Top up",
    date: getMockDate(1, 2, 12),
    status: "completed",
    transactionNo: "23010986462431",
  },
  {
    id: "10",
    logo: topup,
    type: "received",
    amount: 430.0,
    currency: "USD",
    name: "Top up",
    date: getMockDate(1, 2, 12),
    status: "completed",
    transactionNo: "23010986462431",
  },
  {
    id: "3",
    logo: netflix,
    type: "sent",
    amount: 12.99,
    currency: "USD",
    name: "Netflix",
    date: getMockDate(2, 13, 53),
    status: "pending",
    transactionNo: "23010412432431",
  },
  {
    id: "4",
    logo: amazon,
    type: "sent",
    amount: 50.0,
    currency: "USD",
    name: "Amazon",
    date: getMockDate(3, 10, 0),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "5",
    logo: nike,
    type: "sent",
    amount: 150.0,
    currency: "USD",
    name: "Nike",
    date: getMockDate(4, 15, 30),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "6",
    logo: ali,
    type: "received",
    amount: 300.0,
    currency: "USD",
    name: "Ali Transfer",
    date: getMockDate(5, 9, 15),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "7",
    logo: apple,
    type: "sent",
    amount: 45.2,
    currency: "USD",
    name: "Apple Store",
    date: getMockDate(6, 18, 45),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "8",
    logo: homeDepot,
    type: "sent",
    amount: 200.0,
    currency: "USD",
    name: "The Home Depot",
    date: getMockDate(10, 11, 20),
    status: "completed",
    transactionNo: "23010412432431",
  },
];

export const INITIAL_CARDS: Card[] = [
  {
    id: 1,
    name: "Abdullah Ghatasheh",
    cardNumber: "1234567890123245",
    expiry: "12/24",
    balance: "2,354",
    variant: "primary",
  },
  {
    id: 2,
    name: "Abdullah Ghatasheh",
    cardNumber: "9876543210987654",
    expiry: "09/25",
    balance: "5,120",
    variant: "secondary",
  },
  {
    id: 3,
    name: "Abdullah Ghatasheh",
    cardNumber: "4561237894561234",
    expiry: "11/26",
    balance: "1,200",
    variant: "dark",
  },
];

