import type { Transaction } from "../constants/constants";

export const getMockDate = (
  daysOffset: number,
  hours: number,
  minutes: number
) => {
  const date = new Date();
  date.setDate(date.getDate() - daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {};

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedTransactions.forEach((t) => {
    const date = new Date(t.date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let key = "";
    const tDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (tDate.getTime() === today.getTime()) {
      key = "Today";
    } else if (tDate.getTime() === yesterday.getTime()) {
      key = "Yesterday";
    } else {
      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      key = `${weekday}\n${month} ${day}, ${year}`;
    }

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(t);
  });

  return grouped;
};

export const formatTransactionDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today ${time}`;
  }
  if (isYesterday) {
    return `Yesterday ${time}`;
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day} ${time}`;
};

export const formatDetailedDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const fullDateTime = `${date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} - ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  let label = "";
  if (isToday) {
    label = "Today";
  } else if (isYesterday) {
    label = "Yesterday";
  } else {
    label = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return { label, fullDateTime };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
