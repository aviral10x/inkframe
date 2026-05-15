import { Hero } from './sections/Hero';
import { SelectedWorks } from './sections/SelectedWorks';
import { Journal } from './sections/Journal';
import { Explorations } from './sections/Explorations';
import { Contact } from './sections/Contact';
import { FloatingCTA } from './sections/FloatingCTA';

function App() {
  return (
    <>
      <main>
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Contact />
      </main>
      <FloatingCTA />
    </>
  );
}

export default App;
