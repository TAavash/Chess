import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";

function WhitePawnClick(){
    console.log("White pawn clicked!");
    
}

function GlobalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickedID = event.target.parentNode.id;
      const flatArray = globalState.flat();
      const square = flatArray.find((el) => el.id === clickedID);
      if (square.piece.piece_name == "WHITE_PAWN") {
        WhitePawnClick();
      }
    }
  });
}

export { GlobalEvent };
