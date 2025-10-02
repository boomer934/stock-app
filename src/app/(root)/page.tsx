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
      <h1 className="text-2xl font-bold text-yellow-400 ">News</h1>
      <News/>
      <Tickers/>
      <Footer/>
    </div>
    </>
  )
}
