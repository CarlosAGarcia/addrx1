import styled from "styled-components";

const StyledLanding = styled.div`
font-family: Arial, Helvetica, sans-serif;
.navBarContainer {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: .5%;
    margin-top: 5rem;
    font-size: 2rem;
    .text {
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }
}
.loadIn {
    .slide-tr {
        -webkit-animation: slide-tr 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: slide-tr 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .slide-bottom {
        -webkit-animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation-delay: .15s;
    }
    .slide-tl {
        -webkit-animation: slide-tl 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: slide-tl 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
}
`

export default StyledLanding