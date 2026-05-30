import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface MenuItem { id: string; name: string; description: string; price: number; calories: number; image: string; category: string; badge?: string; modifiers?: Modifier[]; }
export interface Modifier { id: string; name: string; options: ModifierOption[]; required?: boolean; }
export interface ModifierOption { id: string; name: string; price: number; }
export interface CartItem { id: string; menuItem: MenuItem; quantity: number; selectedModifiers: Record<string, string>; totalPrice: number; }
export type Screen = 'home' | 'item-detail' | 'cart' | 'checkout' | 'order-tracking' | 'tv-menu' | 'admin' | 'admin-products' | 'admin-orders';
export interface Order { id: string; items: CartItem[]; total: number; tax: number; status: 'preparing' | 'ready' | 'completed' | 'cancelled'; timestamp: number; customerName: string; paymentMethod: string; }

interface AppState { screen: Screen; prevScreen: Screen | null; selectedItem: MenuItem | null; cart: CartItem[]; activeCategory: string; searchQuery: string; orderStatus: 'idle' | 'preparing' | 'ready' | 'completed'; orders: Order[]; adminTab: string; }

type AppAction = { type: 'NAVIGATE'; screen: Screen } | { type: 'SELECT_ITEM'; item: MenuItem } | { type: 'SET_CATEGORY'; category: string } | { type: 'SET_SEARCH'; query: string } | { type: 'ADD_TO_CART'; item: CartItem } | { type: 'REMOVE_FROM_CART'; cartItemId: string } | { type: 'UPDATE_QUANTITY'; cartItemId: string; quantity: number } | { type: 'CLEAR_CART' } | { type: 'PLACE_ORDER'; order: Order } | { type: 'UPDATE_ORDER_STATUS'; orderId: string; status: Order['status'] } | { type: 'GO_BACK' } | { type: 'SET_ADMIN_TAB'; tab: string };

const initialState: AppState = { screen: 'home', prevScreen: null, selectedItem: null, cart: [], activeCategory: 'All', searchQuery: '', orderStatus: 'idle', orders: [{ id: 'DS-1084', items: [], total: 24.97, tax: 2.18, status: 'ready', timestamp: Date.now() - 1000 * 60 * 12, customerName: 'Walk-in', paymentMethod: 'card' }, { id: 'DS-1083', items: [], total: 18.47, tax: 1.62, status: 'completed', timestamp: Date.now() - 1000 * 60 * 38, customerName: 'Walk-in', paymentMethod: 'apple' }, { id: 'DS-1082', items: [], total: 31.94, tax: 2.79, status: 'completed', timestamp: Date.now() - 1000 * 60 * 72, customerName: 'Walk-in', paymentMethod: 'card' }], adminTab: 'dashboard' };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'NAVIGATE': return { ...state, prevScreen: state.screen, screen: action.screen };
    case 'SELECT_ITEM': return { ...state, prevScreen: state.screen, selectedItem: action.item, screen: 'item-detail' };
    case 'SET_CATEGORY': return { ...state, activeCategory: action.category };
    case 'SET_SEARCH': return { ...state, searchQuery: action.query };
    case 'ADD_TO_CART': { const existing = state.cart.findIndex((ci) => ci.menuItem.id === action.item.menuItem.id && JSON.stringify(ci.selectedModifiers) === JSON.stringify(action.item.selectedModifiers)); if (existing >= 0) { const updated = [...state.cart]; updated[existing].quantity += action.item.quantity; updated[existing].totalPrice += action.item.totalPrice; return { ...state, cart: updated }; } return { ...state, cart: [...state.cart, action.item] }; }
    case 'REMOVE_FROM_CART': return { ...state, cart: state.cart.filter((ci) => ci.id !== action.cartItemId) };
    case 'UPDATE_QUANTITY': if (action.quantity <= 0) return { ...state, cart: state.cart.filter((ci) => ci.id !== action.cartItemId) }; return { ...state, cart: state.cart.map((ci) => ci.id === action.cartItemId ? { ...ci, quantity: action.quantity, totalPrice: (ci.totalPrice / ci.quantity) * action.quantity } : ci) };
    case 'CLEAR_CART': return { ...state, cart: [] };
    case 'PLACE_ORDER': return { ...state, orders: [action.order, ...state.orders], screen: 'order-tracking', prevScreen: state.screen, orderStatus: 'preparing', cart: [] };
    case 'UPDATE_ORDER_STATUS': return { ...state, orders: state.orders.map((o) => o.id === action.orderId ? { ...o, status: action.status } : o) };
    case 'GO_BACK': return { ...state, screen: state.prevScreen ?? 'home', prevScreen: null };
    case 'SET_ADMIN_TAB': return { ...state, adminTab: action.tab };
    default: return state;
  }
}

interface AppContextType { state: AppState; dispatch: React.Dispatch<AppAction>; navigate: (screen: Screen) => void; goBack: () => void; cartTotal: number; cartCount: number; }
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const navigate = useCallback((screen: Screen) => { dispatch({ type: 'NAVIGATE', screen }); }, []);
  const goBack = useCallback(() => { dispatch({ type: 'GO_BACK' }); }, []);
  const cartTotal = state.cart.reduce((sum, ci) => sum + ci.totalPrice, 0);
  const cartCount = state.cart.reduce((sum, ci) => sum + ci.quantity, 0);
  return (
    <AppContext.Provider value={{ state, dispatch, navigate, goBack, cartTotal, cartCount }}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
