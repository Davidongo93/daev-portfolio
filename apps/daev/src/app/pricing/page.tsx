import PricingSection from '../../components/PricingSection/PricingSection';
import { getTrm } from './trm';

export default async function PricingPage() {
  const trm = await getTrm();
  return <PricingSection trm={trm.value} trmDate={trm.date} trmLive={trm.live} />;
}
