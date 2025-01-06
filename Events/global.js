import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";
import { renderHighlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { clearPreviousSelfHighlight } from "../Render/main.js";

//highlighted or not
let highlight_state = false;

//current self highlighted square state
let selfHighlightState = null;

function WhitePawnClick({ piece }) {
  //higlight clicked piece
  clearPreviousSelfHighlight(selfHighlightState);
  selfHighlight(piece);
  selfHighlightState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  //pawn initial position
  if (piece.current_position[1] == "2") {

    const hightlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];

    //clear board for any previous hightlight
    clearHighlight();

    hightlightSquareIds.forEach((hightlight) => {
      globalState.forEach((row) => {
        row.forEach((element) => {
          if (element.id == hightlight) {
            element.highlight(true);
          }
        });
      });
    });
  }
}

function GlobalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickedID = event.target.parentNode.id;
      const flatArray = globalState.flat();
      const square = flatArray.find((el) => el.id == clickedID);
      if (square.piece.piece_name == "WHITE_PAWN") {
        WhitePawnClick(square);
      }
    }
  });
}

export { GlobalEvent };
