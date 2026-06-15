import { Opening } from '../sections/Opening';
import { Reel } from '../sections/Reel';
import { Method } from '../sections/Method';
import { Proof } from '../sections/Proof';
import { Close } from '../sections/Close';

/* The five-act scroll */
export function Home() {
  return (
    <main>
      <Opening />
      <Reel />
      <Method />
      <Proof />
      <Close />
    </main>
  );
}
