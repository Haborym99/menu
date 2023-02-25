import { useState } from "react";
import menuItems from '../menu_items.json'

export interface Dish {
    key: number;
    name: string;
    description: string;
    price: number;
    image: string;
    image_author: string;
}
interface commande {
    name: string;
    price: number;
}

export default function DisplayMenu(props: any) {
    const [data, setData] = useState<Dish[]>(menuItems.appetizers);
    const [limiteStart, setLimiteStart] = useState(0);
    const [limiteEnd, setLimiteEnd] = useState(4);

    function handlePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e.currentTarget.value === "next" && limiteEnd <= data.length) {
            setLimiteStart(limiteStart + 4);
            setLimiteEnd(limiteEnd + 4);
        } else if (e.currentTarget.value === "previous" && limiteStart > 0) {
            setLimiteStart(limiteStart - 4);
            setLimiteEnd(limiteEnd - 4);
        }
    }

    function handleMenuChoice(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const buttonValue = e.currentTarget.value;
        if (buttonValue === "entrees") {
            setData(menuItems.appetizers);
        } else if (buttonValue === "plats") {
            setData(menuItems.dishes);
        } else if (buttonValue === "desserts") {
            setData(menuItems.desserts);
        } else if (buttonValue === "boissons") {
            setData(menuItems.drinks);
        }
    }

    function handleChoice(e: any) {
        const target = e.currentTarget as HTMLLIElement;
        const key = Number(target.getAttribute("data-key"));
        const dish = data.find((d: Dish) => d.key === key);
        if (dish) {
            const item: commande = {
                name: dish.name,
                price: dish.price,
            };
            props.setChoice([...props.choice, item]);
        }
    }

    const list = data
        .filter((dish: Dish) => dish.key > limiteStart && dish.key <= limiteEnd)
        .map((dish: Dish) => (
            <li
                key={dish.key}
                onClick={handleChoice}
                data-key={dish.key}
                id="dishe_choices_li_main"
            >
                <h3 id="dish_name" >{dish.name}</h3>
                <img src={process.env.PUBLIC_URL + dish.image}
                    title={dish.name + " image made by " + dish.image_author}
                    id="dishe_pic" />
                <ul id="dishe_choices_ul_sub" onClick={handleChoice}>
                    <li id="dishe_choices_li_sub"><h4>{dish.description}</h4></li>
                    <li id="dishe_choices_li_sub"><h4>${dish.price}</h4></li>
                </ul>
            </li >

        ))

    return (
        <div id="dishe_container">
            <div id="type_of_dishes">
                <button type="button" value={"entrees"} onClick={handleMenuChoice}>
                    Appetizers
                </button>
                <button type="button" value={"plats"} onClick={handleMenuChoice}>
                    Dishes
                </button>
                <button type="button" value={"desserts"} onClick={handleMenuChoice}>
                    Desserts
                </button>
                <button type="button" value={"boissons"} onClick={handleMenuChoice}>
                    Drinks
                </button>
            </div>
            <div id="dishe_choices_ul_container">
                <ul id="dishe_choices_ul">
                    {list}
                </ul>
            </div>
            <div id="pages_management">
                <button type='button' onClick={handlePage} value="previous">Previous dishes</button>
                <button type='button' onClick={handlePage} value="next">Next dishes</button>
            </div>
        </div>
    );
}