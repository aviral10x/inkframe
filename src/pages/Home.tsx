import { Opening } from '../sections/Opening';
import { Reel } from '../sections/Reel';
import { Interlude } from '../sections/Interlude';
import { Method } from '../sections/Method';
import { Proof } from '../sections/Proof';
import { Close } from '../sections/Close';

/* The five-act scroll, with one interlude between the reel and the method */
export function Home() {
  return (
    <main>
      <Opening />
      <Reel />
      <Interlude />
      <Method />
      <Proof />
      <Close />
    </main>
  );
}
