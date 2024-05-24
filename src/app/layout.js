import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "./services/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "eSpark Talent Pool",
  description: "A form to collect candidate information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
