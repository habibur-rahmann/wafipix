import { FC } from "react";
import HeroCarousel from "../../carousel/hero-carousel";
import {videoData } from "@/data";
import MissionTaglineSection from "./mission-tagline-section";
import HeroAboutSection from "./hero-about-section";
import SectionSeparator from "@/components/global/section-separator";
import VideoPlayer from "../../global/video-player";
import HomeServiceSection, { ServiceForCard } from "./home-service-section";
import HomeContactSection from "./home-contact-section";
import FeaturedProjectsCardCarousel from "@/components/carousel/featured-projects-card-carousel/featured-projects-card-carousel";
import Testimonials from "./testimonials";

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = ({}) => {
  return (
    <section className="h-full w-full flex flex-col relative">
      <section className="h-full w-full">
        {/* Hero carousel */}
        <section className="h-full md:max-h-[75vh] bg-background">
          <HeroCarousel/>
        </section>

        <SectionSeparator />

        {/* Featured Projects card carousel */}
        <FeaturedProjectsCardCarousel />

        <SectionSeparator />

        {/* Mission Tagline Section */}
        <MissionTaglineSection />

        <SectionSeparator />

        {/* About Section */}
        <HeroAboutSection />

        <SectionSeparator />
        {/* Testimonials Section */}

        <Testimonials />

        <SectionSeparator />

        {/* advertise vido */}
        <VideoPlayer sources={videoData.advertiseVideo} />

        <SectionSeparator />

        {/* service section */}
        <HomeServiceSection/>
        
        <div className="lg:hidden">
          <SectionSeparator />
        </div>

        <HomeContactSection />

        <div className="lg:hidden">
          <SectionSeparator />
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
