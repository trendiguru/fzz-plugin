export default function Lightbox (props) {
    return <div id="lightbox">{props.children}</div>;
}

Lightbox.propTypes = {
    children: React.PropTypes.array
};
