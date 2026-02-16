import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { Filter } from "lucide-react";

const Shop = () => {
    const { products, loading } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Filters State
    const [filters, setFilters] = useState({
        brand: [],
        minPrice: 0,
        maxPrice: 1000000,
        ram: [],
        processor: []
    });

    const brands = ['ASUS', 'MSI', 'Dell', 'HP', 'Lenovo', 'Apple'];
    const ramOptions = ['8GB', '16GB', '32GB'];
    const processorOptions = ['i3', 'i5', 'i7', 'i9', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'M1', 'M2'];

    useEffect(() => {
        let result = products;

        // Brand Filter
        if (filters.brand.length > 0) {
            result = result.filter(p => filters.brand.includes(p.brand));
        }

        // Price Filter
        result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

        // RAM Filter (matches string in specs)
        if (filters.ram.length > 0) {
            result = result.filter(p => filters.ram.some(r => p.specs.ram.includes(r)));
        }

        // Processor Filter (fuzzy match)
        if (filters.processor.length > 0) {
            result = result.filter(p => filters.processor.some(proc => p.specs.processor.includes(proc) ||
                (proc.startsWith('M') && p.specs.processor.includes('Apple')) // Special case for Apple chips if needed simple
            ));
        }

        setFilteredProducts(result);
    }, [products, filters]);

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const current = prev[category];
            if (current.includes(value)) {
                return { ...prev, [category]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Mobile Filter Toggle */}
                <button
                    className="md:hidden flex items-center justify-center p-3 border rounded-lg bg-white shadow-sm"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="mr-2 h-5 w-5" /> Filters
                </button>

                {/* Sidebar Filters */}
                <div className={`w-full md:w-64 space-y-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 text-primary">Brand</h3>
                        <div className="space-y-2">
                            {brands.map(brand => (
                                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded text-secondary focus:ring-secondary"
                                        onChange={() => handleCheckboxChange('brand', brand)}
                                        checked={filters.brand.includes(brand)}
                                    />
                                    <span>{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 text-primary">Price Range</h3>
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="0"
                                max="500000"
                                step="5000"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                                className="w-full accent-secondary"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Rs. 0</span>
                                <span>Rs. {filters.maxPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 text-primary">RAM</h3>
                        <div className="space-y-2">
                            {ramOptions.map((ram) => (
                                <label key={ram} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded text-secondary focus:ring-secondary"
                                        onChange={() => handleCheckboxChange('ram', ram)}
                                        checked={filters.ram.includes(ram)}
                                    />
                                    <span>{ram}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">All Laptops ({filteredProducts.length})</h1>
                        <select className="border-gray-300 rounded-md text-sm focus:ring-secondary focus:border-secondary">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            No products found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
