import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { CalculatorInstancesProvider } from "@/features/calculators/contexts/CalculatorInstancesContext"; // ADICIONE ESTA LINHA!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mol Wise",
  description:
    "This application is designed to help students and teachers with chemical calculations, data visualization, and content organization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          <CalculatorInstancesProvider>{children}</CalculatorInstancesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
