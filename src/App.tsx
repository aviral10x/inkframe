import { useState } from 'react';
import { LoadingScreen } from './sections/LoadingScreen';
import { Hero } from './sections/Hero';
import { SelectedWorks } from './sections/SelectedWorks';
import { Journal } from './sections/Journal';
import { Explorations } from './sections/Explorations';
import { Contact } from './sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Contact />
      </main>
    </>
  );
}

export default App;
