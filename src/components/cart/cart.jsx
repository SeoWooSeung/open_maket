import { useState } from 'react';
import styles from './cart.module.css';
import { CartHeaeder } from './cartHeader';
import { CartList } from './cartList';
import { TotalCart } from './totalcart';

export const Cart = ({ cart, setCart, convertPrice, checkLists, setCheckLists }) => {
    const [total, setTotal] = useState(0);
    const handleQuantity = (type, id, quantity) => {
        const found = cart.filter((el) => el.id === id)[0];
        const idx = cart.indexOf(found);
        const cartItem = {
            id: found.id,
            image: found.image,
            name: found.name,
            price: found.price,
            quantity: quantity,
            provider: found.provider,
        };

        if (type === 'plus') {
            setCart([...cart.slice(0, idx), cartItem, ...cart.slice(id + 1)]);
        } else {
            if (quantity === 0) return;
            setCart([...cart.slice(0, idx), cartItem, ...cart.slice(id + 1)]);
        }
    };
    const handleRemove = (id) => {
        setCart(cart.filter((el) => el.id !== id));
        setCheckLists(checkLists.filter((check) => check !== id));
    };
    const handleCheckList = (checked, id) => {
        if (checked) {
            setCheckLists([...checkLists, id]);
        } else {
            setCheckLists(checkLists.filter((check) => check !== id));
        }
    };
    const handleAllCheckList = (checked) => {
        if (checked) {
            const cartItems = [];
            cart.map((cart) => cartItems.push(cart.id));
            setCheckLists(cartItems);
        } else {
            setCheckLists([]);
        }
    };
    const isAllChecked = cart.length === checkLists.length && checkLists.length !== 0;

    const found = checkLists.map((checkList) => cart.filter((el) => el.id === checkList));

    return (
        <>
            <header className={styles.header}>
                <h1>장바구니</h1>
            </header>

            <CartHeaeder handleAllCheckList={handleAllCheckList} isAllChecked={isAllChecked} />

            {cart.length === 0 ? (
                <div className={styles.not}>
                    <h2>장바구니에 담긴 상품이 없습니다.</h2>
                    <p>원하는 상품을 장바구니에 담아보세요!</p>
                </div>
            ) : (
                cart.map((cart) => {
                    return (
                        <CartList
                            key={`key-${cart.id}`}
                            cart={cart}
                            setCart={setCart}
                            convertPrice={convertPrice}
                            handleQuantity={handleQuantity}
                            handleRemove={handleRemove}
                            handleCheckList={handleCheckList}
                            checkLists={checkLists}
                        />
                    );
                })
            )}
            {cart.length === 0 ? (
                ''
            ) : (
                <TotalCart total={total} setTotal={setTotal} cart={cart} found={found} convertPrice={convertPrice} />
            )}
        </>
    );
};
