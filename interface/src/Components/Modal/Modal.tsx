import React from "react";
import ReactDOM from "react-dom"
import ANTDModal, { ModalProps } from "antd/lib/modal/Modal";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
    return ReactDOM.createPortal(
        <ANTDModal {...props}>
            {children}
        </ANTDModal>,
        modalRoot
    )
}

export default Modal;