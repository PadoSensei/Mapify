import css from "./card.module.css";
import { Link } from 'react-router-dom';

function Card(props) {
    let className = css.container;
    if (props.isSelected) {
        className += ' ' + css.selected;
    }
    return (
        <div className={className}
            onClick={props.onClick}
            >
            <div className={css.title}>{props.name}</div>
            <div className={css.comment}>{props.comment}</div>
            <Link to={`/map/${props.id}`} >Go to Map</Link>
        </div>
    );
}

export default Card;