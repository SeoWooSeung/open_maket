import styles from './main.module.css';
import { EventBanner } from '../eventBanner/eventBanner';
import { Product } from '../products/product';
import { useEffect } from 'react';
import { getProducts } from '../../service/fecher';

export const Main = ({ products, setProducts, convertPrice }) => {
    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data.data.products);
        });
    }, [setProducts]);

    const setProduct = (type) => {
        const newProduct = [...products];
        if (type === 'recent') {
            newProduct.sort((a, b) => a.id - b.id);
            setProducts(newProduct);
        } else if (type === 'row') {
            const newProduct = [...products];
            newProduct.sort((a, b) => a.price - b.price);
            setProducts(newProduct);
        } else if (type === 'high') {
            const newProduct = [...products];
            newProduct.sort((a, b) => b.price - a.price);
            setProducts(newProduct);
        }
    };

    return (
        <>
            <EventBanner />
            <div className={styles.filter}>
                <p onClick={() => setProduct("recent")}>최신순</p>
                <p onClick={() => setProduct("row")}>낮은 가격</p>
                <p onClick={() => setProduct("high")}>높은 가격</p>
            </div>
            <main className={styles.flex_wrap}>
                {products.map((product) => {
                    return <Product key={`key-${product.id}`} product={product} convertPrice={convertPrice} />;
                })}
            </main>
        </>
    );
};
