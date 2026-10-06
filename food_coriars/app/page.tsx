import Hero from './components/Hero';
import Categories from './components/Categories';
import Deals from './components/Deals';
import FoodList from './components/FoodList';
import WhyChooseUs from './components/WhyChooseUs';
import TopRestaurants from './components/TopRestaurants';
import Reviews from './components/Reviews';
import AppCTA from './components/AppCTA';
import FAQ from './components/FAQ';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <Deals />
      <FoodList />
      <WhyChooseUs />
      <TopRestaurants />
      <Reviews />
      <AppCTA />
      <FAQ />
      <ContactUs />
      <Footer />
    </>
  );
}