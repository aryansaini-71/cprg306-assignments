
interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="p-2 m-4 bg-slate-900 max-w-sm border-2 border-slate-800 rounded-md ">
      <h2 className="text-xl font-bold text-white capitalize ">{name}</h2>
      <div className="text-sm text-slate-300">
        Buy {quantity} in <span className="italic">{category}</span>
      </div>
    </li>
  );
}