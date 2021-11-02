/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import './css/Modal.css'

export default function Modal({restartGame, backToHome, win}){
    var winText = "WIN", loseText = "Game Over";
    var btnWinText ="New Game", btnLoseText = "Try Again";
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    return (
        <div className="modalWrapper">
            <div className="modalContent">
                <div className="modalResult">{win? winText : loseText}</div>
                <div className="modalBtnWrapper">
                    <div className="modalBtn">{win? btnWinText:btnLoseText}</div>
                </div>
            </div>
        </div>
        // {/* -- TODO 5-1 -- */}
        /* Useful Hint: style = {{opacity: 1 or 0 }} */
        
    );
}