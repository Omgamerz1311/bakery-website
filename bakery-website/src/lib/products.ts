import croissant from "@/assets/p-croissant.jpg";
import sourdough from "@/assets/p-sourdough.jpg";
import cake from "@/assets/p-cake.jpg";
import cupcake from "@/assets/p-cupcake.jpg";
import cinnamon from "@/assets/p-cinnamon.jpg";
import baguette from "@/assets/p-baguette.jpg";

export type Category = "Pastries" | "Bread" | "Cakes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
  ingredients: string[];
  allergens: string[];
  featured?: boolean;
}

export const categories: Category[] = ["Pastries", "Bread", "Cakes"];

export const products: Product[] = [
  { id: "1", name: "Chocolate Croissant", description: "Buttery layers with premium dark chocolate", price: 4.99, category: "Pastries", image: croissant, stock: 25, ingredients: ["Flour", "Butter", "Dark Chocolate", "Sugar", "Yeast"], allergens: ["Wheat", "Dairy"], featured: true },
  { id: "2", name: "Artisan Sourdough", description: "24-hour fermented, crispy golden crust", price: 6.99, category: "Bread", image: sourdough, stock: 15, ingredients: ["Organic Flour", "Sourdough Starter", "Sea Salt", "Water"], allergens: ["Gluten"], featured: true },
  { id: "3", name: "Vanilla Cupcake", description: "Moist vanilla cake, cream cheese frosting", price: 3.99, category: "Cakes", image: cupcake, stock: 30, ingredients: ["Vanilla Extract", "Butter", "Sugar", "Cream Cheese", "Flour"], allergens: ["Gluten", "Dairy", "Eggs"], featured: true },
  { id: "4", name: "Almond Croissant", description: "Flaky pastry filled with almond cream", price: 5.49, category: "Pastries", image: croissant, stock: 20, ingredients: ["Almonds", "Butter", "Flour", "Sugar", "Eggs"], allergens: ["Gluten", "Dairy", "Eggs", "Nuts"] },
  { id: "5", name: "Whole Grain Bread", description: "Nutritious multigrain loaf", price: 5.99, category: "Bread", image: sourdough, stock: 18, ingredients: ["Whole Wheat Flour", "Oats", "Sunflower Seeds", "Honey", "Yeast"], allergens: ["Gluten"] },
  { id: "6", name: "Red Velvet Cupcake", description: "Rich cocoa cake with cream cheese frosting", price: 4.49, category: "Cakes", image: cupcake, stock: 25, ingredients: ["Cocoa", "Buttermilk", "Cream Cheese", "Vanilla"], allergens: ["Gluten", "Dairy", "Eggs"] },
  { id: "7", name: "Cinnamon Roll", description: "Swirled cinnamon sugar with cream cheese icing", price: 4.99, category: "Pastries", image: cinnamon, stock: 22, ingredients: ["Cinnamon", "Brown Sugar", "Butter", "Cream Cheese", "Flour"], allergens: ["Gluten", "Dairy", "Eggs"], featured: true },
  { id: "8", name: "French Baguette", description: "Classic French bread with crispy crust", price: 3.99, category: "Bread", image: baguette, stock: 28, ingredients: ["French Flour", "Water", "Salt", "Yeast"], allergens: ["Gluten"], featured: true },
  { id: "9", name: "Chocolate Cake", description: "Decadent triple-layer chocolate cake", price: 6.99, category: "Cakes", image: cake, stock: 12, ingredients: ["Dark Chocolate", "Cocoa Powder", "Butter", "Sugar", "Eggs"], allergens: ["Gluten", "Dairy", "Eggs"], featured: true },
  { id: "10", name: "Assorted Pastries", description: "Mix of flaky pastries with powdered sugar", price: 3.49, category: "Pastries", image: cinnamon, stock: 35, ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla"], allergens: ["Gluten", "Dairy", "Eggs"] },
  { id: "11", name: "Artisan Baguette", description: "Hearty European-style baguette", price: 5.49, category: "Bread", image: baguette, stock: 16, ingredients: ["Wheat Flour", "Water", "Salt", "Yeast"], allergens: ["Gluten"] },
  { id: "12", name: "Midnight Fudge Slice", description: "Dense ganache-glazed chocolate slice", price: 5.99, category: "Cakes", image: cake, stock: 14, ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Cream"], allergens: ["Gluten", "Dairy", "Eggs"] },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
