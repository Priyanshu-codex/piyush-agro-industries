export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 font-rajdhani font-semibold text-sm">
          Loading Service Details...
        </p>
      </div>
    </div>
  );
}
