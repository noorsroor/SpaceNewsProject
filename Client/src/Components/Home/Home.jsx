import React from 'react'
import HeroSection from './HeroSection'
import CtaSection from './CtaSection'
import VideoSection from './VideoSection'
import Categories from './Categories'
import FeaturedSection from './FeaturedSection'
import Articleone from './articleOne'
import ArticleTwo from './articleTwo'

function Home() {
  return (
    <>
    <HeroSection/>
    <FeaturedSection/>
    <Articleone/>
    <Categories/>
    <VideoSection/>
    <ArticleTwo/>
    <CtaSection/>
    </>
  )
}

export default Home