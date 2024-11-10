import { Josefin_Sans, josefin_Sans } from "next/font/google";
import "@/app/_styles/global.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
})

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The World Oasis"
  },
  desciption: "the lexury"
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen`}>
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
        </div>

        <footer>Copy Rights</footer>
      </body>
    </html>
  );
}