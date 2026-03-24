interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: (name: string) => void; 
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (

    <li 
      onClick={() => onSelect(name)}
      className="p-4 m-2 bg-slate-900 border-2 border-slate-800 rounded-md cursor-pointer hover:bg-orange-700 transition-all"
    >
      <h2 className="text-xl font-bold text-white capitalize ">{name}</h2>
      <div className="text-sm text-slate-300">
        Buy {quantity} in <span className="italic">{category}</span>
      </div>
    </li>
  );
}