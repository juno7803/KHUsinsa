import './Card.scss';
import { DeleteOutlined, FileImageOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import api from '../../lib/api/clothAPI';

function Card({ clothData, history, onRemove}) {
    const removeCard = async (evt) => {
        console.log('remove');
        evt.stopPropagation();
        try{
            await api.deleteCloths(clothData.clothIdx);
            onRemove(clothData.clothIdx);
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className="card" draggable onClick={()=> history.push(`/cloth/${clothData.clothIdx}`)}>
            <div className="remove-button" onClick={removeCard}>
                <DeleteOutlined style={{ fontSize: "16px"}}/>
            </div>
            <div className="image-area">
                { clothData.image !== '' ? <img src={clothData.image} alt="profile"/> : <FileImageOutlined style={{fontSize: "40px"}}/> }
            </div> {/* image */}
            <div className="card__content card__text name">{clothData.name}</div>
            <div className="card__content card__text brand">{clothData.brand}</div> {/* brand */}
            <div className="card__content card__text category">{clothData.category}</div> {/* category */}
            <div className="card__content card__text price">{clothData.price}</div> {/* price */}
            <div className="card__content card__text quantity"></div>{/* quantity */}
        </div>
    );
}

export default withRouter(Card);