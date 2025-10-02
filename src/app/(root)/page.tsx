import Header from "@/components/customized/Header";
import TradingViewWidget from "@/components/customized/TradingViewWidget";
import Screener from "@/components/customized/Screener";
import Tickers from "@/components/customized/Tickers";
import News from "@/components/customized/News";
import Footer from "@/components/customized/Footer";
export default function Home() {
  return(
    <>
    <Header/>
    <div className="flex flex-col h-[700px] gap-5 p-4">
      <h1 className="text-2xl font-bold text-yellow-400">Market overview</h1>
      <TradingViewWidget/>
      <Screener/>
    </div>
    <div className="flex flex-col h-[400px] gap-5 max-w-[400px] p-4 text-2">
      <h1 className="text-2xl font-bold text-yellow-400 mt-22">News</h1>
      <News/>
    </div>
    <div className="flex flex-col gap-5 p-4  text-2 mt-20">
      <Tickers/>
    </div>
    <Footer/>
    </>
  )
}
