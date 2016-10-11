export default function Lightbox ({children, className = ''}) {
    return <div className={className} id="lightbox">{children}</div>;
}

Lightbox.propTypes = {
    children: React.PropTypes.array,
    className: React.PropTypes.string
};
