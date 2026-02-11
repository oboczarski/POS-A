import StatCard from './StatCard.jsx';
import { getStatCards } from '../data/helpers.js';

export default function StatCardRow() {
  const cards = getStatCards();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
