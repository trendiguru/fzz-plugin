export default function Price ({data: {currency, price}}) {
    return <span className="price" data-currency={CURRENCIES[currency]}>{price}</span>;
}

Price.propTypes = {
    data: React.PropTypes.object.isRequired
};

const CURRENCIES = {
    USD: '$',
    Yen: '‎¥',
    EUR: '€'
};
