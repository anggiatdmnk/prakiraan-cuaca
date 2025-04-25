export default function Container({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <header className="bg-gray-900 py-4 shadow-md text-center">
        <h1 className="text-2xl font-bold">5 Titik Kecamatan di Kota Malang</h1>
      </header>

      <main className="flex-1 relative">
        <div className="absolute inset-0">{children}</div>
      </main>

      <footer className="bg-gray-900 py-3 text-center text-sm">
        Dibuat oleh Anggiat Damanik - Sistem Integrasi 2025
      </footer>
    </div>
  );
}
