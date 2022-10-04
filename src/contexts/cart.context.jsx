import { createContext, useState, useEffect } from "react";

export const addCardItem = (cartItems, productToAdd) => {
    //busca si cartItems contiene productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // si encuentra, incremeneta cantidad(quantity)
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    // retorna un nuevo array con cartItems modificados.
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    //encontrar el articulo del carrito para eliminar
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //verificar que la cantidad sea 1, al llegar a 0 eliminar el articulo o item del carrito
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }


    // retornar cartItems con la cantidad reducida
    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});



export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] =useState(0);
    const [cartTotal, setCartTotal] =useState(0);

    // Se ejecuta cada vez que cartItems cambia
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    //useeffect de total
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};