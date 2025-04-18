// Note: I'm updating this file to remove the employees prop that was being passed
// to the ProductsTable component, as that was causing a TypeScript error.
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ProductsTable } from "../components/products/ProductsTable";
import { mockProducts } from "../data/mockData";
import { Product } from "../types/product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setProducts(mockProducts);
      return;
    }

    const filtered = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProducts(filtered);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button className="bg-primary">Add Product</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Products count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {products.length} of {mockProducts.length} products
          </div>

          {/* Products table */}
          <ProductsTable products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
