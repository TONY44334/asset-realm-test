import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

// Cart item type
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// Context setup
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// Cart provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { currentUser } = useAuth();

  
  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.CartItems) {
            setCartItems(data.CartItems);
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    if (currentUser) {
      fetchCart();
    } else {
      setCartItems([]); // Clear if no user
    }
  }, [currentUser]);

  
  useEffect(() => {
    const saveCart = async () => {
      if (!currentUser) return;
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, { CartItems: cartItems }, { merge: true }); // merge to avoid overwriting
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    const timeout = setTimeout(saveCart, 800);
    return () => clearTimeout(timeout);
  }, [cartItems, currentUser]);

  // ➕ Add item
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

 
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

 
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
