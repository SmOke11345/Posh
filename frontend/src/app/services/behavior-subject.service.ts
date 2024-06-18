import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart } from "../models/Cart";
import { shortCatalog } from "../models/Catalog";

@Injectable({
    providedIn: "root",
})
export class BehaviorSubjectService {
    // Сохраняю в localStorage, потому что после перезагрузки значение сбрасываться.
    private rememberMe = new BehaviorSubject<boolean>(false);
    rememberMe$ = this.rememberMe.asObservable(); // Хранит в себе последние значение
    //
    private slider = new BehaviorSubject<shortCatalog[]>([]);
    slider$ = this.slider.asObservable();
    //
    private cart = new BehaviorSubject<Cart[]>([]);
    cart$ = this.cart.asObservable();
    //
    private favorite = new BehaviorSubject<shortCatalog[]>([]);
    favorite$ = this.favorite.asObservable();
    //
    private checkout = new BehaviorSubject<Cart[]>([]);
    checkout$ = this.checkout.asObservable();

    constructor() {
        if (typeof localStorage !== "undefined") {
            const initRememberMe = JSON.parse(
                localStorage.getItem("rememberMe") as string,
            );
            this.rememberMe.next(initRememberMe);
        }
    }

    /**
     * Устанавливаем значение rememberMe.
     * @param value
     */
    setRememberMe(value: boolean) {
        this.rememberMe.next(value);
    }

    /**
     * Устанавливаем значение для slider.
     * @param value
     */
    setSlider(value: shortCatalog[]) {
        this.slider.next(value);
    }

    /**
     * Устанавливаем значение cart.
     * @param value
     */
    setCart(value: Cart[]) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(value));
            this.cart.next(value);
        }
    }

    /**
     * Очистка корзины.
     */
    clearCart() {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("cart", JSON.stringify([]));
            this.cart.next([]);
        }
    }

    /**
     * Добавление одного товара в корзину.
     * @param value
     */
    setCartOneItem(value: Cart) {
        const cart: Cart[] = this.getCart();
        if (cart) {
            const newCart = [...cart, value];
            localStorage.setItem("cart", JSON.stringify(newCart));
            this.cart.next(newCart);
        }
    }

    /**
     * Удаление одного товара из корзины.
     * @param catalog_id
     */
    removeCartOneItem(catalog_id: number) {
        const cart: Cart[] = this.getCart();
        if (cart) {
            const newCart = cart.filter((item) => item.id !== catalog_id);
            localStorage.setItem("cart", JSON.stringify(newCart));
            this.cart.next(newCart);
        }
    }

    /**
     * Получение корзины.
     */
    getCart() {
        if (typeof localStorage !== "undefined") {
            return JSON.parse(localStorage.getItem("cart") as string);
        }
    }

    /**
     * Удаление товара из корзины.
     * @param catalog_id
     */
    removeFromCart(catalog_id: number) {
        const cart: Cart[] = this.getCart();
        if (cart) {
            const newCart = cart.filter((item) => item.id !== catalog_id);
            localStorage.setItem("cart", JSON.stringify(newCart));
            this.cart.next(newCart);
        }
        return;
    }

    /**
     * Увеличение/Уменьшение количества товара.
     * @param catalog_id
     * @param direction
     */
    changeCountProduct(catalog_id: number, direction: boolean) {
        const cart: Cart[] = this.getCart();
        if (cart) {
            const newCart = cart.map((item) => {
                if (item.id === catalog_id) {
                    if (direction) {
                        return { ...item, count: item.count + 1 };
                    } else {
                        return { ...item, count: item.count - 1 };
                    }
                }
                return item;
            });
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(newCart));
                this.cart.next(newCart);
            }
        }
        return;
    }

    /**
     * Получение числа товаров в корзине.
     */
    getCountProductInCart(condition: boolean) {
        const data: Cart[] = condition ? this.getCart() : this.getCheckout();
        if (data) {
            return data.reduce((acc, item) => acc + item.count, 0);
        }
        return 0;
    }

    /**
     * Получение итоговой суммы корзины.
     */
    getTotalCost(condition: boolean) {
        const data: Cart[] = condition ? this.getCart() : this.getCheckout();
        if (data) {
            return data.reduce((acc, item) => acc + item.cost * item.count, 0);
        }
        return 0;
    }

    /**
     * Установка значения favorite глобально.
     * @param value
     */
    setFavorite(value: shortCatalog[]) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("favorite", JSON.stringify(value));
            this.favorite.next(value);
        }
    }

    /**
     * Получение списка избранных.
     */
    getFavorite() {
        if (typeof localStorage !== "undefined") {
            return JSON.parse(localStorage.getItem("favorite") as string);
        }
    }

    /**
     * Установка значений checkout.
     * @param value
     */
    setCheckout(value: Cart[]) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("checkout", JSON.stringify(value));
            this.checkout.next(value);
        }
    }

    /**
     * Получение checkout.
     */
    getCheckout() {
        if (typeof localStorage !== "undefined") {
            return JSON.parse(localStorage.getItem("checkout") as string);
        }
    }

    /**
     * Удаление товара из избранных.
     * @param catalog_id
     */
    removeFavorite(catalog_id: number) {
        const favorite: shortCatalog[] = this.getFavorite();
        const newFavorite = favorite.filter((item) => item.id !== catalog_id);
        localStorage.setItem("favorite", JSON.stringify(newFavorite));
        this.favorite.next(newFavorite);
    }
}
