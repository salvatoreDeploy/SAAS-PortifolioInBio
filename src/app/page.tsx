import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import VideoExplanation from "./components/VideoExplanation";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Header />
      <VideoExplanation />
      <Pricing />
      {/* 
    
    <Faq /> */}
    </div>
  );
}
