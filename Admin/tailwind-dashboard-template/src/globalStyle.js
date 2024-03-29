import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    ul {
        padding-left: 0;
    }

    a {
        text-decoration: none;
        color: #222;
    }

    a:hover {
        color: #222;
    }

    .flex {
        display: flex;
    }

    .normal-flex {
        display: flex;
        align-items: center;
    }

    .flex-space {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .col-flex {
        display: flex;
        flex-direction: column;
    }

    .col-flex-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .my_flex-1 {
        flex: 1;
        max-width: 50%;
    }

    .my_f1 {
        flex: 1;
    }

    .inline-block {
        display: inline-block;
    }

    .overflow-hidden {
        overflow: hidden;
    }

    .p-relative {
        position: relative;
    }

    .w100-h100 {
        width: 100%;
        height: 100%;
    }

    .w-50 {
        width: 50%;
    }

    .w-100 {
        width: 100%;
    }

    .h-100 {
        height: 100%;
    }

    .jc-sb {
        justify-content: space-between;
    }

    .fw-600 {
        font-weight: 600;
    }

    .fw-500 {
        font-weight: 500;
    }

    .fs-12 {
        font-size: 12px;
    }

    .fs-14 {
        font-size: 14px;
    }

    .fs-16 {
        font-size: 16px;
    }

    .fs-18 {
        font-size: 18px;
    }

    .fs-20 {
        font-size: 20px;
    }

        .fs-22 {
        font-size: 22px;
    }

    .of-c {
        object-fit: cover;
    }

    .jc-fe {
        justify-content: flex-end;
    }

    .jc-center {
        justify-content: center;
    }

    .717171 {
        color: #717171;
    }

    .rounded-border {
        border-radius: 50%;
    }

    .content__box--name {
        font-size: 18px;
        line-height: 24px;
        font-style: bold;
    }

    .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);        
        gap: 10px;
    }

    .grid-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);        
        gap: 10px;
    }

    #main {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
    }

    button.transparent-button {
        background: none;
        border: none;
        outline: none;
    }

    [type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
        --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: #2563eb;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: none !important;
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
        border-color: none !important;
    }
`;

export const MainButton = styled.button`
    cursor: pointer;
    display: inline-block;
    margin: 0px;
    position: relative;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    border-radius: 8px;
    outline: none;
    padding: 14px 24px;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s,
        transform 0.1s ease 0s;
    -webkit-tap-highlight-color: transparent;
    border: none;
    background: linear-gradient(
        to right,
        rgb(230, 30, 77) 0%,
        rgb(227, 28, 95) 50%,
        rgb(215, 4, 102) 100%
    );
    color: rgb(255, 255, 255);
    width: ${props => props.width || "auto"};
    height: ${props => props.height || "auto"};
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgb(228, 228, 228);
`;

export const Div = styled.div`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "100%"};
    margin: ${props => props.margin || "0 0 0 0"};
    padding: ${props => props.padding || "0 0 0 0"};
    background-color: ${props => props.backgroundColor};
`;

export const Image = styled.img.attrs(props => ({
    alt: props.src,
}))`
    ${props => props.size && "width: " + props.size};
    ${props => props.size && "height: " + props.size};
`;

export const DivWithBackGround = styled.div`
    background-image: ${props => "url(" + props.src + ")"};
    background-position: center;
    background-size: cover;
    ${props => props.gradientBg}
`;

export default GlobalStyle;
