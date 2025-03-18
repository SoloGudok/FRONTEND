import MenuFooter from "../components/MenuFooter";
import './styles-card.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
function Detail() {

    const location = useLocation();
    const cardData = location.state;
    const [isHovered, setIsHovered] = useState(false);
    
    if (!cardData) {
        return <div>No Data available</div>;
    }

    return (
        <>
            <div id="detail-container">
                <div id="detail-row1">
                    <div id="row1-img">
                        <img src={cardData.imageUrl} id="cardImg" className={`hover-img ${isHovered ? "rotated" : ""}`}
                            onMouseEnter={() => setIsHovered(true)}  // 마우스를 올리면 회전
                            onMouseLeave={() => setIsHovered(false)} // 마우스를 떼면 원래 상태로
                        />
                    </div>
                    <div id="row1-description">
                        <h2>{cardData.name}</h2>
                        <h3>{cardData.shortDescription}</h3>
                    </div>
                </div>
                <div id="detail-row2">
                    <hr />
                    <h4>{cardData.description}</h4>
                    <hr /><br />
                </div>

                <div id="detail-row3" class="point-box">
                    카드 이용 시 제공되는 포인트 및 할인 혜택 등의 부가서비스는 카드 신규출시 이후 3년 이상 축소·폐지 없이 유지됩니다.
                    상기에도 불구하고, 다음과 같은 사유가 발생한 경우 카드사는 부가서비스를 변경할 수 있습니다.<br />
                    ①카드사의 휴업·파산·경영상의 위기 등에 따른 불가피한 경우<br />
                    ②제휴업체의 휴업·파산·경영상의 위기로 인해 불가피하게 부가서비스를 축소·변경하는 경우로서 다른 제휴업체를 통해 동종의 유사한 부가서비스 제공이 불가한 경우<br />
                    ③제휴업체가 카드사의 의사에 반하여 해당 부가서비스를 축소하거나 변경 시, 당초 부가서비스에 상응하는 다른 부가서비스를 제공하는 경우<br />
                    ④부가서비스를 3년 이상 제공한 상태에서 해당 부가서비스로 인해 카드의 수익성이 현저히 낮아진 경우<br />
                    카드사가 부가서비스를 변경하는 경우에는 부가서비스 변경 사유, 변경 내용 등을 사유발생 즉시 아래 고지방법 중 서로 다른 2가지 이상의 방법으로 고지해 드립니다. 특히 부가서비스를 3년 이상 제공한 상태에서 해당 부가서비스로 인해 카드의 수익성이 현저히 낮아져 부가서비스를 변경하는 경우에는 6개월 전부터 아래 고지방법 중 서로 다른 2가지 이상의 방법으로 매월 고지 해 드립니다.<br />
                    고지 방법: 서면 교부, 우편 또는 전자우편, 전화 또는 팩스, 휴대폰 메시지 또는 이에 준하는 전자적 의사표시
                </div>

                <div id="detail-row4" class="point-box">
                    회사명 : 신한카드<br />
                    상품명 : {cardData.name}<br />
                    카드 출시 일자 : {cardData.createdAt[0] + '.' + cardData.createdAt[1] + '.' + cardData.createdAt[2]}<br />
                    계약 체결 전, 카드 상품별 연회비, 이용조건 등 상세사항은 금융상품설명서와 약관을 확인하시기 바랍니다.
                    금융소비자는 금융소비자보호법 제19조 제1항에 따라 해당 금융상품 또는 서비스에 대하여 설명 받을 권리가 있습니다.
                    연체이자율은 '회원별, 이용상품별 약정금리+최대 연 3%, 법정 최고금리(연 20%)이내'에서 적용됩니다.<br />
                    단, 연체 발생 시점에 약정금리가 없는 경우 아래와 같이 적용함<br />
                    일시불 거래 연체 시: 거래 발생 시점의 최소기간(2개월) 유이자 할부 금리<br />
                    무이자 할부 거래 연체 시: 거래 발생 시점의 동일한 할부 계약기간의 유이자 할부 금리<br />
                    그 외의 경우: 약정금리는 상법상 상사법정이율과 상호금융 가계자금대출금리*중 높은 금리적용<br />
                    *한국은행에서 매월 발표하는 가장 최근의 비은행 금융기관 가중평균대출금리(신규대출 기준)<br />
                    신용카드 발급이 부적정한 경우(개인신용평점 낮음, 연체(단기 포함) 사유 발생 등), 카드발급이 제한될 수 있습니다.
                    카드 이용대금과 이에 수반되는 모든 수수료는 고객님께서 지정하신 결제일에 상환하여야 합니다.
                    상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.
                    개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.
                    일정기간 신용카드 이용대금을 연체할 경우, 결제일이 도래하지 않은 모든 신용카드 이용대금을 변제할 의무가 발생할 수 있습니다.<br /><br />
                    여신금융협회 심의필 제2024-C1a-07648호(2024.07.01)
                </div>
            </div>

            <MenuFooter />
        </>
    );
}

export default Detail;
