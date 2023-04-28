declare const window: typeof globalThis & {
    IMP: any;
}

export default function PaymentPage(): JSX.Element{

    const onClickPayment = (): void => {
        const IMP = window.IMP; // 생략 가능
        IMP.init("imp50705483"); // 예: imp00000000a
        IMP.request_pay({ // param
            pg: "kakaopay",
            pay_method: "card",
            // merchant_uid: "ORD20180131-0000011",
            name: "노르웨이 회전 의자",
            amount: 100,
            buyer_email: "gildong@gmail.com",
            buyer_name: "홍길동",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
            m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일 에서는 결제시, 보내줄 페이지 필요함
          }, (rsp: any) => { // callback
            if (rsp.success === true) {
              // 결제 성공 시 로직,
                console.log(rsp);
            
            } else {
              // 결제 실패 시 로직,
              
            }
        });
    }

    return (
        <>
            <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
            
            <button onClick={onClickPayment}>결제하기</button>
        </>        
    )

}