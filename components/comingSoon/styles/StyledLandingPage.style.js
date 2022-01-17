import styled from 'styled-components'

const StyledLandingPage = styled.div`
    min-height: 100vh;
    .overlay {
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-transition: 0.25s opacity;
        background: -webkit-radial-gradient(rgba(127, 127, 127, 0.5),
                                            rgba(127, 127, 127, 0.5) 35%,
                                            rgba(0, 0, 0, 0.7));
        bottom: 0;
        display: -webkit-box;
        left: 0;
        padding: 20px;
        padding-bottom: 130px;
        position: fixed;
        right: 0;
        top: 0;
        z-index: -1;
    }
    .topContainer {
        padding-top: 8rem;
        margin-right: 50%;
        pointer-events: none;
    }
    .nameContainer {
        display: flex;
        width: 100%;
        justify-content: center;
        font-size: 4rem;

        .xPart {
            margin-top: 1rem;
        }
    }
    .flicker-in-1 {
	    -webkit-animation: flicker-in-1 2s linear both;
        animation: flicker-in-1 2s linear both;
    }
    .flicker-in-X {
	    -webkit-animation: flicker-in-X 2s linear both;
        animation: flicker-in-X 2s linear both;
    }
    .text-shadow-drop-center {
        -webkit-animation: text-shadow-drop-center 1s 1.5s both;
        animation: text-shadow-drop-center 1s 1.5s both;
    }

    .bodyContainer {
        .comingSoonContainer{
            padding-top: 10rem;
            font-size: 4rem;
        }
        .comingSoonContainer, .mailContainer {
            justify-content: center;
            display: flex;
        }
        .mailContainer {
            font-size: 1.5rem;
            font-family: system-ui;
            padding-top: .5rem;
        }
    }

    .fade-in-left {
	    -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1.8s both;
        animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1.8s both;
    }
    .fade-in-left-delay {
	    -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2.1s both;
        animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2.1s both;
    }
/* ----------------------------------------------
 * Generated by Animista on 2022-1-18 3:11:22
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-left
 * ----------------------------------------
 */
 @-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
/* ----------------------------------------------
 * Generated by Animista on 2022-1-18 3:12:13
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-left
 * ----------------------------------------
 */
 @-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}


    /* ----------------------------------------------
 * Generated by Animista on 2022-1-18 1:49:20
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * @animation flicker-in-1
 * ----------------------------------------
 */
@-webkit-keyframes flicker-in-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes flicker-in-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes flicker-in-X {
  0% {
    opacity: 0;
  }
  12% {
    opacity: 0;
  }
  12.1% {
    opacity: 1;
  }
  12.2% {
    opacity: 0;
  }
  24% {
    opacity: 0;
  }
  25.1% {
    opacity: 1;
  }
  25.6% {
    opacity: 0;
  }
  32% {
    opacity: 0;
  }
  32.1% {
    opacity: 1;
  }
  32.5% {
    opacity: 1;
  }
  32.6% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  49.1% {
    opacity: 1;
  }
  59% {
    opacity: 1;
  }
  59% {
    opacity: 1;
  }
  59.1% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  60.1% {
    opacity: 1;
  }
  62% {
    opacity: 1;
  }
  62.1% {
    opacity: 0;
  }
  67% {
    opacity: 0;
  }
  69.1% {
    opacity: 1;
  }
  79% {
    opacity: 1;
  }
  79.1% {
    opacity: 0;
  }
  79% {
    opacity: 0;
  }
  79.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes flicker-in-X {
    0% {
    opacity: 0;
    }
    12% {
        opacity: 0;
    }
    12.1% {
        opacity: 1;
    }
    12.2% {
        opacity: 0;
    }
    24% {
        opacity: 0;
    }
    25.1% {
        opacity: 1;
    }
    25.6% {
        opacity: 0;
    }
    32% {
        opacity: 0;
    }
    32.1% {
        opacity: 1;
    }
    32.5% {
        opacity: 1;
    }
    32.6% {
        opacity: 0;
    }
    49% {
        opacity: 0;
    }
    49.1% {
        opacity: 1;
    }
    59% {
        opacity: 1;
    }
    59% {
        opacity: 1;
    }
    59.1% {
        opacity: 0;
    }
    60% {
        opacity: 0;
    }
    60.1% {
        opacity: 1;
    }
    62% {
        opacity: 1;
    }
    62.1% {
        opacity: 0;
    }
    67% {
        opacity: 0;
    }
    69.1% {
        opacity: 1;
    }
    79% {
        opacity: 1;
    }
    79.1% {
        opacity: 0;
    }
    79% {
        opacity: 0;
    }
    79.1% {
        opacity: 1;
    }
    85% {
        opacity: 1;
    }
    85.1% {
        opacity: 0;
    }
    86% {
        opacity: 0;
    }
    86.1% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
    }
    /* ----------------------------------------------
    * Generated by Animista on 2022-1-18 2:3:24
    * Licensed under FreeBSD License.
    * See http://animista.net/license for more info. 
    * w: http://animista.net, t: @cssanimista
    * ---------------------------------------------- */

    /**
    * ----------------------------------------
    * @animation text-shadow-drop-center
    * ----------------------------------------
    */
    @-webkit-keyframes text-shadow-drop-center {
    0% {
        text-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    100% {
        text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
    }
    }
    @keyframes text-shadow-drop-center {
    0% {
        text-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    100% {
        text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
    }
    }





}


    
`

export default StyledLandingPage