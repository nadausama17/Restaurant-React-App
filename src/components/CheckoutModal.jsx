export default function CheckoutModal({ onNoConfirm, onYesConfirm }) {
  return (
    /* 1. Backdrop Overlay (Darkens the background behind the modal) */
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">

      {/* 2. Centered Modal Box */}
      <div className="flex flex-col items-center justify-between p-6 w-96 h-48 bg-linear-to-b from-orange-200 to-bistro-terracotta rounded-xl shadow-2xl z-50 animate-fade-in text-bistro-espresso">

        <h3 className="text-lg font-bold text-center mt-2">
          Do you want to Confirm your Order?
        </h3>

        {/* Buttons Row Layout */}
        <div className="flex flex-row gap-4 w-full px-4 mb-2">
          <button onClick={onYesConfirm} className="cursor-pointer flex-1 bg-bistro-espresso text-bistro-cream py-2.5 rounded-md font-bold hover:opacity-90 active:scale-95 transition">
            Yes
          </button>
          <button onClick={onNoConfirm} className="cursor-pointer flex-1 bg-white border border-orange-300 text-bistro-espresso py-2.5 rounded-md font-bold hover:bg-orange-50 active:scale-95 transition">
            No
          </button>
        </div>

      </div>

    </div>
  );
}