type Props = {
    total: { name: string; price: number }[];
};

export default function Calc(props: Props) {
    const total = props.total.reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
    return (
        <div>
            <h3>Total: ${total}</h3>
        </div>
    );
}