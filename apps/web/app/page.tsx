import { Header } from '../components/Header';
import { BrandGrid } from '../components/BrandGrid';
import { ALL_BRANDS } from '../lib/brands';

export default function Home() {
  // ALL_BRANDS is evaluated at module load via static imports — safe to use
  // in a Server Component to compute the brand count.
  return (
    <>
      <Header count={ALL_BRANDS.length} />
      <BrandGrid />
    </>
  );
}
