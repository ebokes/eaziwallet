import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatCurrency,
  formatTransactionDate,
  groupTransactionsByDate,
} from "../utils";
import type { Transaction } from "../constants";

describe("utils", () => {
  describe("formatCurrency", () => {
    it("formats numbers as USD currency", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
      expect(formatCurrency(0)).toBe("$0.00");
      expect(formatCurrency(-10)).toBe("-$10.00");
    });
  });

  describe("formatTransactionDate", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2023-10-27T12:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("formats today's date correctly", () => {
      const today = new Date("2023-10-27T10:30:00Z").toISOString();
      expect(formatTransactionDate(today)).toContain("Today");
      expect(formatTransactionDate(today)).toContain("10:30");
    });

    it("formats yesterday's date correctly", () => {
      const yesterday = new Date("2023-10-26T15:45:00Z").toISOString();
      expect(formatTransactionDate(yesterday)).toContain("Yesterday");
      expect(formatTransactionDate(yesterday)).toContain("15:45");
    });

    it("formats older dates correctly", () => {
      const older = new Date("2023-10-25T09:15:00Z").toISOString();
      expect(formatTransactionDate(older)).toBe("Oct 25 09:15");
    });
  });

  describe("groupTransactionsByDate", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2023-10-27T12:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("groups transactions by Today, Yesterday, and older dates", () => {
      const transactions: Transaction[] = [
        {
          id: "1",
          type: "sent",
          amount: 10,
          currency: "USD",
          name: "Test 1",
          logo: "",
          date: new Date("2023-10-27T10:00:00Z").toISOString(),
          status: "completed",
          transactionNo: "123",
        },
        {
          id: "2",
          type: "received",
          amount: 20,
          currency: "USD",
          name: "Test 2",
          logo: "",
          date: new Date("2023-10-26T10:00:00Z").toISOString(),
          status: "completed",
          transactionNo: "456",
        },
        {
          id: "3",
          type: "sent",
          amount: 30,
          currency: "USD",
          name: "Test 3",
          logo: "",
          date: new Date("2023-10-25T10:00:00Z").toISOString(),
          status: "completed",
          transactionNo: "789",
        },
      ];

      const grouped = groupTransactionsByDate(transactions);
      expect(grouped).toHaveProperty("Today");
      expect(grouped).toHaveProperty("Yesterday");
      expect(grouped["Today"]).toHaveLength(1);
      expect(grouped["Yesterday"]).toHaveLength(1);

      // Older date key format might depend on locale, but let's check it's there
      const keys = Object.keys(grouped);
      expect(keys).toContain("Today");
      expect(keys).toContain("Yesterday");
      expect(keys.length).toBe(3);
    });
  });
});
