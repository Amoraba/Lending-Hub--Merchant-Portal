# Merchant Portal

A premium, interactive digital portal designed for merchants in Riyadh and Saudi Arabia to secure and manage on-demand, revolving business credit lines in SAR. Fully aligned with the Saudi Central Bank (SAMA) regulations and certified under Unified Shariah Murabahah Standards.

## Core Features

- **Dynamic Shariah-Verified Revolving Ledger**: Instantly updates active outstanding balances and available draw limits upon simulated drawdowns or repayments.
- **Unified Settlement Ledger**: Displays complete digitized audit trails and SAMA central clearing house trace history with interactive filters and search.
- **Shariah-Compliant Disbursal Request Forms**: Seamless online workspace for Saudi Commercial Registration (CR) verification and automated business profile initialization.
- **Credit Line historical analytics**: High-fidelity charts visualization of utilization ratios and monthly peaks, built using lightweight and responsive SVG charting engines.
- **Adaptive Visual Identity**: Beautiful Swiss-Modern design built with a tailored high-contrast color scheme of deep emerald, regal gold, and soft cream.

## Technologies Used

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Visualization**: Recharts (for credit historical charts)
- **Animations**: Motion (for smooth screen entries and interactive transitions)

## Project Structure

- `src/App.tsx`: Main route and application state controller.
- `src/components/MarketingPage.tsx`: Elegant landing page showcasing the product benefits, pricing plans, and compliance details.
- `src/components/MerchantDashboard.tsx`: Feature-rich, highly interactive credit portfolio panel featuring real-time data visualizers and the active trace ledger.
- `src/components/RequestCreditForm.tsx`: Digitized onboarding form that verifies Saudi business details and issues active credit lines.
- `src/types.ts`: Universal TypeScript declarations, types, and contract structures.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your local environment.

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the development server locally:
   ```bash
   npm run dev
   ```

3. Build the application for production deployment:
   ```bash
   npm run build
   ```

4. Preview the production build locally:
   ```bash
   npm run preview
   ```

## License

This project is licensed under the Apache-2.0 License. All rights reserved.
