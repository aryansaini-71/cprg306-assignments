import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="bg-black min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          Shopping List
        </h1>
        <ItemList />
      </div>
    </main>
  );
}