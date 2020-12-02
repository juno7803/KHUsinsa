import './MemberList.scss'
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';

import api from '../../lib/api/memberAPI';

function MemberList({ history, match }) {
    const [ clothsState, setClothsState ] = useState({
        cloths: null,
        status: 'idle',
    });

    useEffect(() => {
        (async () => {
            setClothsState({ cloths: null, status: 'pending' });
            try {
                const result = await api.getClothsAPI();
                console.log(result);
                setTimeout(() => setClothsState({ cloths: result, status: 'resolved' }), 800);
            } catch (e) {
                setClothsState({ cloths: null, status: 'rejected' });
            }
        })();
    }, []);
    const createCard = async () => {
        try{
            const result = await api.createMember({
                name: "",
                image: "",
                brand: "",
                category: "",
                price: ""
            });
            setClothsState({
                cloths: [...clothsState.cloths, result], // spread 문법으로 서버 통신에 보낸 member(body) 추가
                status: 'resolved'
            })
        } catch (e){
            // fail
        }
    }

    // 클라단에서 필터링하여 삭제된 card 바로 반영되도록 하는 함수
    const onRemove = (id) =>{
        setClothsState({
            status: 'resolved',
            cloths: clothsState.cloths.filter(cloths => cloths.clothIdx !== id),
        });
    }

    switch (clothsState.status) {
        case 'pending':
            return <Loading />;
        case 'rejected':
            return <div>데이터 로딩 실패</div>;
        case 'resolved':
            return (
                <div className="member-list">
                    <div className="member-list__title">현재 재고 목록</div>
                    <div className="member-list__header member-list-header">
                        <div className="member-list-header__nav">Gallery View</div>
                        <div className="member-list-header__empty"></div>
                        <Button text="Properties" textColor="#777"></Button>
                        <Button text="Filter" textColor="#777"></Button>
                        <Button text="Sort" textColor="#777"></Button>
                        <Button text="Search" textColor="#777" icon="search"></Button>
                        <Button text="..." textColor="#777"></Button>
                    </div>
                    <hr />
                    <div className="member-list-content-wrapper">
                        {clothsState.cloths.map((cloths, i) =>
                            <Card key={"card-" + i} clothData={cloths} onRemove={onRemove}/>)}
                        <div className="create-card" onClick={createCard}>+ New</div>
                    </div>
                </div>
            );
        case 'idle':
        default:
            return <div></div>
    }
}

export default MemberList;