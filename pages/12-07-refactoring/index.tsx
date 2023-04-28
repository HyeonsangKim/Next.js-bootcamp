import { Modal } from 'antd';
import { useState } from 'react';
import DaumPostcodeEmbed,{ Address } from 'react-daum-postcode';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(prev=>!prev);
  };

  const handleOk = () => {
    setIsOpen(prev=>!prev);
  };

  const handleCancel = () => {
    setIsOpen(prev=>!prev);
  };

  const handleComplete = (address: Address) => {
    console.log(address);
    setIsOpen(prev=>!prev)
    
  }

  return (
    <>
      <button onClick={showModal}>
        모달창 열기
      </button>
      {/* <Modal title="모달 제목" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete}/>
      </Modal> */}

      {isOpen && (<Modal title="모달 제목" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete}/>
      </Modal>)}
    </>
  );
}
