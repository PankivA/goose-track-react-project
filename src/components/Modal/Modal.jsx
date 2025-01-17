import { useState, useEffect } from 'react';
import { CloseButton, ModalStyled, Overlay } from './ModalStyled';
import { createPortal } from 'react-dom';

export const Modal = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onActive, children } = props;

  const handleClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      props.onActive();
    }
  };

  useEffect(() => {
    const onEscKey = event => {
      if (event.code !== 'Escape') {
        return;
      }

      onActive();
    };

    document.addEventListener('keydown', onEscKey);
    document.documentElement.style.overflowY = 'hidden';
    setTimeout(() => {
      setIsOpen(true);
    }, 200);

    return () => {
      document.removeEventListener('keydown', onEscKey);
      document.documentElement.style.overflowY = 'auto';
    };
  }, [onActive]);

  const modalClassName = isOpen ? 'modal-open' : '';
  return createPortal(
    <Overlay onClick={handleClick} $backdrop={props.backdrop}>
      <ModalStyled className={modalClassName}>
        {children}
        <CloseButton size="24" type="button" onClick={handleClick} />
      </ModalStyled>
    </Overlay>,
    document.body
  );
};
