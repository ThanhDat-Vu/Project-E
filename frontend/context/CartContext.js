import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCartContext() {
	const context = useContext(CartContext);
	if (!context)
		throw new Error('useCartContext must be used within a CartProvider');
	return context;
}

export default function CartProvider(props) {
	const [totalQty, setTotalQty] = useState(0);
	const [showCart, setShowCart] = useState(false);
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);

	const addItem = (newItem) => {
		let index = items.findIndex((item) => item._id === newItem._id);
		totalQty += 1;
		total += newItem.price;
		setTotalQty(totalQty);
		setTotal(total);
		if (index < 0) {
			items.push({ ...newItem, quantity: 1 });
		} else {
			items[index].quantity++;
		}
		setItems(items);
		setShowCart(true);
		localStorage.setItem('cart', JSON.stringify({ totalQty, items, total }));
	};

	const adjustQuantity = (currItem, value) => {
		totalQty += value;
		total += value * currItem.price;
		setTotalQty(totalQty);
		setTotal(total);
		let newQuantity = currItem.quantity + value;
		if (newQuantity > 0) {
			items = items.map((item) =>
				item._id == currItem._id ? { ...item, quantity: newQuantity } : item
			);
		} else {
			items = items.filter((item) => item._id !== currItem._id);
		}
		setItems(items);
		localStorage.setItem('cart', JSON.stringify({ totalQty, items, total }));
	};

	const value = {
		showCart,
		setShowCart,
		totalQty,
		setTotalQty,
		items,
		setItems,
		total,
		setTotal,
		addItem,
		adjustQuantity,
	};
	return <CartContext.Provider value={value} {...props} />;
}
