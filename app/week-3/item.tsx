// app/week-3/item.tsx

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="p-4 m-4 bg-slate-900 border-l-4 border-orange-500 rounded-md shadow-md max-w-md">
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <p className="text-sm text-slate-300">
        Buy {quantity} in <span className="italic font-semibold text-orange-400">{category}</span>
      </p>
    </li>
  );
}