export default class Price extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        let {currency, price} = this.props.data;
        return <span className="price" data-currency={CURRENCIES[currency]}>{price}</span>;
    }
}

const CURRENCIES = {
    USD: '$',
    Yen: '‎¥'
};
