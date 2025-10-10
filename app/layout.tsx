import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Scroggy's Casino - Spin to Win!",
  description: "The ultimate emoji slot machine casino game powered by ScroggyCoin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="en">
        <body className={nunito.className}>
          {/* RAINBOW FIBONACCI SPIRALS - 7 Perfect Spirals */}
          
          {/* 1. RED Fibonacci Spiral */}
          <div className="spiral-container-1">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(255,0,0,0.35)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(255,0,0,0.08)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 2. ORANGE Fibonacci Spiral */}
          <div className="spiral-container-2">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,0 1490,1500 A 10,10 0 0,0 1490,1490 A 20,20 0 0,0 1510,1490 A 30,30 0 0,0 1510,1520 A 50,50 0 0,0 1460,1520 A 80,80 0 0,0 1460,1440 A 130,130 0 0,0 1590,1440 A 210,210 0 0,0 1590,1650 A 340,340 0 0,0 1250,1650 A 550,550 0 0,0 1250,1100 A 890,890 0 0,0 2140,1100 A 1440,1440 0 0,0 2140,2540 A 2330,2330 0 0,0 -190,2540" 
                    stroke="rgba(255,127,0,0.35)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,0 1490,1500 A 10,10 0 0,0 1490,1490 A 20,20 0 0,0 1510,1490 A 30,30 0 0,0 1510,1520 A 50,50 0 0,0 1460,1520 A 80,80 0 0,0 1460,1440 A 130,130 0 0,0 1590,1440 A 210,210 0 0,0 1590,1650 A 340,340 0 0,0 1250,1650 A 550,550 0 0,0 1250,1100 A 890,890 0 0,0 2140,1100 A 1440,1440 0 0,0 2140,2540 A 2330,2330 0 0,0 -190,2540" 
                    stroke="rgba(255,127,0,0.08)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 3. YELLOW Fibonacci Spiral */}
          <div className="spiral-container-3">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(255,255,0,0.3)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(255,255,0,0.06)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 4. GREEN Fibonacci Spiral */}
          <div className="spiral-container-4">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,0 1490,1500 A 10,10 0 0,0 1490,1490 A 20,20 0 0,0 1510,1490 A 30,30 0 0,0 1510,1520 A 50,50 0 0,0 1460,1520 A 80,80 0 0,0 1460,1440 A 130,130 0 0,0 1590,1440 A 210,210 0 0,0 1590,1650 A 340,340 0 0,0 1250,1650 A 550,550 0 0,0 1250,1100 A 890,890 0 0,0 2140,1100 A 1440,1440 0 0,0 2140,2540 A 2330,2330 0 0,0 -190,2540" 
                    stroke="rgba(0,255,0,0.3)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,0 1490,1500 A 10,10 0 0,0 1490,1490 A 20,20 0 0,0 1510,1490 A 30,30 0 0,0 1510,1520 A 50,50 0 0,0 1460,1520 A 80,80 0 0,0 1460,1440 A 130,130 0 0,0 1590,1440 A 210,210 0 0,0 1590,1650 A 340,340 0 0,0 1250,1650 A 550,550 0 0,0 1250,1100 A 890,890 0 0,0 2140,1100 A 1440,1440 0 0,0 2140,2540 A 2330,2330 0 0,0 -190,2540" 
                    stroke="rgba(0,255,0,0.06)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 5. BLUE Fibonacci Spiral */}
          <div className="spiral-container-5">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(0,127,255,0.35)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(0,127,255,0.08)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 6. INDIGO Fibonacci Spiral */}
          <div className="spiral-container-6">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,0 1490,1500 A 10,10 0 0,0 1490,1490 A 20,20 0 0,0 1510,1490 A 30,30 0 0,0 1510,1520 A 50,50 0 0,0 1460,1520 A 80,80 0 0,0 1460,1440 A 130,130 0 0,0 1590,1440 A 210,210 0 0,0 1590,1650 A 340,340 0 0,0 1250,1650 A 550,550 0 0,0 1250,1100 A 890,890 0 0,0 2140,1100 A 1440,1440 0 0,0 2140,2540 A 2330,2330 0 0,0 -190,2540" 
                    stroke="rgba(75,0,130,0.4)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,0 1490,1500 A 10,10 0 0,0 1490,1490 A 20,20 0 0,0 1510,1490 A 30,30 0 0,0 1510,1520 A 50,50 0 0,0 1460,1520 A 80,80 0 0,0 1460,1440 A 130,130 0 0,0 1590,1440 A 210,210 0 0,0 1590,1650 A 340,340 0 0,0 1250,1650 A 550,550 0 0,0 1250,1100 A 890,890 0 0,0 2140,1100 A 1440,1440 0 0,0 2140,2540 A 2330,2330 0 0,0 -190,2540" 
                    stroke="rgba(75,0,130,0.1)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 7. VIOLET Fibonacci Spiral */}
          <div className="spiral-container-7">
            <svg className="spiral-svg" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(148,0,211,0.35)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 1500,1500 A 10,10 0 0,1 1510,1500 A 10,10 0 0,1 1510,1510 A 20,20 0 0,1 1490,1510 A 30,30 0 0,1 1490,1480 A 50,50 0 0,1 1540,1480 A 80,80 0 0,1 1540,1560 A 130,130 0 0,1 1410,1560 A 210,210 0 0,1 1410,1350 A 340,340 0 0,1 1750,1350 A 550,550 0 0,1 1750,1900 A 890,890 0 0,1 860,1900 A 1440,1440 0 0,1 860,460 A 2330,2330 0 0,1 3190,460" 
                    stroke="rgba(148,0,211,0.08)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Floating Stars and Moons */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Stars - Various sizes and positions */}
            <div className="star star-1">⭐</div>
            <div className="star star-2">✨</div>
            <div className="star star-3">⭐</div>
            <div className="star star-4">✨</div>
            <div className="star star-5">⭐</div>
            <div className="star star-6">✨</div>
            <div className="star star-7">⭐</div>
            <div className="star star-8">✨</div>
            <div className="star star-9">⭐</div>
            <div className="star star-10">✨</div>
            <div className="star star-11">⭐</div>
            <div className="star star-12">✨</div>
            
            {/* Moons - Various phases and positions */}
            <div className="moon moon-1">🌙</div>
            <div className="moon moon-2">🌛</div>
            <div className="moon moon-3">🌜</div>
            <div className="moon moon-4">🌙</div>
            <div className="moon moon-5">🌛</div>
            <div className="moon moon-6">🌜</div>
            <div className="moon moon-7">🌙</div>
            <div className="moon moon-8">🌛</div>
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

