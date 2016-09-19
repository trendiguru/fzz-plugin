export default function Card (props) {
    return <a href={props.link} onClick={handleClick.bind(null, props.link)} target="_blank">
        <img src={props.image} />
        <div className="tag">{props.children}</div>
    </a>;
}

Card.propTypes = {
    link: React.PropTypes.string,
    image: React.PropTypes.string,
    children: React.PropTypes.array
};

function handleClick (result) {
    dispatchEvent(Object.assign(new Event('result clicked'), {data: {result}}));
}
