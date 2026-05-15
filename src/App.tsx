import { Hero } from './sections/Hero';
import { SelectedWorks } from './sections/SelectedWorks';
import { Journal } from './sections/Journal';
import { Explorations } from './sections/Explorations';
import { Contact } from './sections/Contact';

function App() {
  return (
    <main>
      <Hero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Contact />
    </main>
  );
}

export default App;
