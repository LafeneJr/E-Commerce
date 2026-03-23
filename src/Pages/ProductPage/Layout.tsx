import { useState } from "react";
import { Filters } from "../../Pages/ProductPage/Filters";
import { TopSellers } from "../../Pages/ProductPage/TopSellers";
import { Products } from "../../Pages/ProductPage/Products";
import { BlogPost } from "../../Pages/ProductPage/BlogPost";
import { FiFilter, FiX, FiChevronLeft } from "react-icons/fi";

export const Layout = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen mt-15">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <FiFilter className="text-xl" />
        </button>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-200"
        >
          <FiChevronLeft className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Mobile Filters Overlay */}
        {isFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-opacity-50">
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="h-full overflow-y-auto">
                <Filters />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-opacity-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold">More</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="h-full overflow-y-auto p-4 space-y-6">
                <TopSellers />
                <BlogPost />
              </div>
            </div>
          </div>
        )}

        {/* Left Sidebar - Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-15 h-screen">
            <Filters />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-3 lg:p-3">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFiltersOpen(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <FiFilter className="text-sm" />
                    Filters
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
            <Products />
          </main>
        </div>

        {/* Right Sidebar - Top Sellers & Blog - Desktop */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-15 h-screen space-y-4 p-3 mt-9">
            <TopSellers />
            <BlogPost />
          </div>
        </aside>
      </div>
    </div>
  );
};