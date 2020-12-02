import './MemberDetail.scss';

import { useState, useEffect } from 'react';

import Button from '../../components/button/Button';
import Loading from '../../components/loading/Loading';
import api from '../../lib/api/clothAPI';

import { InstagramOutlined, AlignLeftOutlined, RadarChartOutlined } from '@ant-design/icons';

function MemberDetail({ match }) {
    const [clothsState, setClothsState] = useState({
        status: 'idle',
        cloths: null
    });

    useEffect(()=>{
        setClothsState({
            status: 'pending',
            cloths: null,
        });
        (async ()=>{
            try{
                const result = await api.getClothsById(match.params.id);
                console.log(result);
                setClothsState({
                    status: 'resolved',
                    cloths: result,
                });
            }catch(e){
                setClothsState({
                    status: 'rejected',
                    cloths: null,
                });
            }            
        })();
        // await  서버 통신

        // 성공 resolved
        // 실패 rejecteds
        
    },[match.params.id]);

    const onChangeInputs = async (evt) => {
        const { name, value } = evt.target;
        // 서버 업데이트
        try{
            const cloths = {
                ...clothsState.cloths,
                [name]: value
            }
            setClothsState({
                status: 'resolved',
                cloths
            });
            await api.updateCloths(match.params.id,cloths);
        }catch(e){
            setClothsState({
                status: 'rejected',
                member:{
                    ...clothsState.cloths,
                }
            });
        }
       console.log(evt);
    }

    const memberElement = () => (
        <div className="member-detail">
            <div className="member-detail__button-area">
                <Button text="Add icon"></Button>
                <Button text="Add cover"></Button>
            </div>
            <input className="member-detail__content name" name="name" value={clothsState.cloths.name} onChange={onChangeInputs}/>
            <hr style={{borderTop: "solid 1px #eee", marginBottom: "24px"}}/>
            <div className="member-detail__content">
                <div className="content-title"><InstagramOutlined />&nbsp; 브랜드</div>
                <input className="content-input" name="brand" value={clothsState.cloths.brand} onChange={onChangeInputs}/>
            </div>
            <div className="member-detail__content">
                <div className="content-title"><AlignLeftOutlined />&nbsp; 카테고리</div>
                <input className="content-input" name="category" value={clothsState.cloths.category} onChange={onChangeInputs}/>
            </div>
            <div className="member-detail__content">
                <div className="content-title"><RadarChartOutlined />&nbsp; 가격</div>
                <input className="content-input" name="price" value={clothsState.cloths.price} onChange={onChangeInputs}/>
            </div>
            <div className="member-detail__content">
                { clothsState.cloths.image !== '' ? <img className="content-image" src={clothsState.cloths.image} alt={'product image'} /> : '' }
            </div>
        </div>
    );

    switch (clothsState.status) {
        case 'pending':
            return <Loading />;
        case 'resolved':
            return memberElement();
        case 'rejected':
            return <h1>해당 멤버가 없습니다</h1>;
        case 'idle':
        default: 
            return <div></div>
    }
}

export default MemberDetail;