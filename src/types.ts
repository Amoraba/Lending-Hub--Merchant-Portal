/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  reference: string;
  date: string;
  type: 'Drawdown' | 'Repayment' | 'Fee Payment' | 'Refund';
  amount: number; // in SAR
  status: 'Completed' | 'Pending' | 'Failed';
  description: string;
}

export interface CreditLine {
  limit: number; // Max approved limit in SAR
  available: number; // Available to draw in SAR
  utilized: number; // Utilized amount in SAR
  interestRate: number; // e.g. 1.25% per month
  status: 'Active' | 'Suspended' | 'Under Review' | 'Approved';
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  business: string;
  avatarUrl?: string;
}

export interface PricingTier {
  name: string;
  volume: string;
  fee: string;
  features: string[];
  recommended: boolean;
}

export interface FeatureTile {
  title: string;
  description: string;
  iconName: string;
}

export interface MerchantDetails {
  companyName: string;
  crNumber: string; // Commercial Registration Number (Saudi CR)
  monthlyRevenue: number;
  requestedLimit: number;
  contactEmail: string;
  contactPhone: string;
}
