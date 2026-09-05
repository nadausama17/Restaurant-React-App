import { useEffect, useState } from "react";
import OrderHistoryCard from "../components/OrderHistoryCard";
import OrderHistoryDetailsModal from "../components/OrderHistoryDetailsModal";
import NoOrders from "../components/NoOrders";

export default function OrderHistoryPage() {
    // 1. STATE: Load and sort order history from localStorage
    // add the code in use state inside function to run once in the mount not every render
    const [orderHistory, setOrderHistory] = useState(() => {
        try {
            const orders = localStorage.getItem('orders') ?
                JSON.parse(localStorage.getItem('orders')) : []
            return orders;
        } catch {
            return []
        }
    }
    );
    const [searchOrder, setSearchOrder] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    const searchQueryNormalized = searchOrder.toLowerCase().trim();
    const filteredAndSortedOrders = [...orderHistory.filter((order) => {
        if (order.id?.toLowerCase().includes(searchQueryNormalized)) {
            return true;
        }

        const itemsMatched = order.items?.some((item) => item.name?.toLowerCase().includes(searchQueryNormalized));

        return itemsMatched;
    })].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.time).getTime() - new Date(a.time).getTime();
        } else if (sortBy === "oldest") {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
        } else if (sortBy === "highest") {
            return getOrderPrice(b.items) - getOrderPrice(a.items);
        } else if (sortBy === "lowest") {
            return getOrderPrice(a.items) - getOrderPrice(b.items);
        }

        return 0;
    });

    function getOrderPrice(items) {
        let itemsPrice = 0;
        for (let i = 0; i < items.length; i++) {
            itemsPrice = itemsPrice + ((items[i]?.prodCartQuantity ?? 0) * (items[i]?.price ?? 0));
        }

        return itemsPrice;
    }

    // 2. PAGINATION DERIVATIONS & STATE
    const [selectedOrder, setSelectedOrder] = useState(null);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    // 3. AUTO-RESET: Keep currentPage strictly valid when totalPages drops
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // 4. SLICING: Direct calculation using currentPage
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const currentPageOrders = totalPages > 0 ? filteredAndSortedOrders.slice(startIndex, endIndex) : [];

    // HELPER: Builds truncated pagination range
    function getPaginationRange() {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 2) {
            end = 4;
        } else if (currentPage >= totalPages - 1) {
            start = totalPages - 3;
        }

        const range = [1];
        if (start > 2) range.push("dots-left");

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < totalPages - 1) range.push("dots-right");
        range.push(totalPages);

        return range;
    }

    // HANDLERS: Direct updates on single state
    function clickOnPageHandler(currPage) {
        setCurrentPage(currPage);
    }

    function incrementHandler() {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }

    function decrementHandler() {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="w-120 max-w-xl mx-auto flex justify-between">
                <input
                    className="py-2 w-1/2 text-center outline-none border border-gray-300 shadow-md rounded-xl"
                    placeholder="Search by Order ID or Item"
                    type="text"
                    value={searchOrder}
                    onChange={(e) => {
                        setSearchOrder(e.target.value)
                        setCurrentPage(1)
                    }}
                />

                <select value={sortBy} onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                }}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="lowest">Price: Low to High</option>
                </select>

            </div>

            {filteredAndSortedOrders.length === 0 && <NoOrders />}
            {/* RENDER LIST */}
            {currentPageOrders.length > 0 && currentPageOrders.map((order) => (
                <OrderHistoryCard
                    key={order.id}
                    order={order}
                    onSelectOrder={(order) => setSelectedOrder(order)}
                />
            ))}

            {/* CONTROLS AREA */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={decrementHandler}
                        className="cursor-pointer w-10 h-10 bg-bistro-tomato/90 text-bistro-cream disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        -
                    </button>

                    {getPaginationRange().map((item, index) => {
                        if (typeof item === "string") {
                            return (
                                <span key={`${item}-${index}`} className="px-1 text-bistro-espresso font-bold select-none">
                                    ...
                                </span>
                            );
                        }

                        const isCurrent = item === currentPage;
                        const classes = isCurrent
                            ? "text-bistro-espresso border-2 border-bistro-espresso font-bold "
                            : "text-bistro-cream ";

                        return (
                            <button
                                key={item}
                                onClick={() => clickOnPageHandler(item)}
                                className={classes + "cursor-pointer w-10 h-10 bg-bistro-tomato/90"}
                            >
                                {item}
                            </button>
                        );
                    })}

                    <button
                        onClick={incrementHandler}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer w-10 h-10 bg-bistro-tomato/90 text-bistro-cream disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>
            )}

            {/* MODAL */}
            {selectedOrder && (
                <OrderHistoryDetailsModal
                    onCloseModal={() => setSelectedOrder(null)}
                    order={selectedOrder}
                />
            )}
        </div>
    );
}