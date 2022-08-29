import styled from "styled-components";

const StyledLanding = styled.div`
font-family: Arial, Helvetica, sans-serif;
.navBarContainer {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: .5%;
    margin-top: 5rem;
    font-size: 2rem;
    .gridColContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .gridInnerContainer {
        width: 50%;
        border: 1px solid white;
        * {
            color: #DFD4A9
        }
    }
    .textContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
            padding: 1rem;
            &:hover {
                opacity: 0.5;
                cursor: pointer;
            }            
        }

    }
}
.additionalContent {
    position: relative;
}
.additionalContentBG{
    background: black;
    opacity: .8;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
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
    .fastAnim {
        animation-delay: 0s;
        animation-duration: 0.15s;
    }
}
`

export default StyledLanding